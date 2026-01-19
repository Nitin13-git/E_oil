from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from datetime import datetime
from typing import List

from ..database import get_database
from ..models.order import OrderCreate, OrderResponse, OrderStatusUpdate, OrderItem
from ..utils.auth import get_current_user, get_current_admin

router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.post("")
async def create_order(
    order: OrderCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    cart = current_user.get("cart", [])
    if not cart:
        raise HTTPException(status_code=400, detail="Cart is empty")

    order_items = []
    total = 0

    for item in cart:
        try:
            product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
            if product:
                if product.get("stock", 0) < item["quantity"]:
                    raise HTTPException(
                        status_code=400,
                        detail=f"Not enough stock for {product['name']}"
                    )

                order_items.append({
                    "product_id": str(product["_id"]),
                    "name": product["name"],
                    "quantity": item["quantity"],
                    "price": product["price"]
                })
                total += product["price"] * item["quantity"]

                await db.products.update_one(
                    {"_id": product["_id"]},
                    {"$inc": {"stock": -item["quantity"]}}
                )
        except HTTPException:
            raise
        except:
            continue

    if not order_items:
        raise HTTPException(status_code=400, detail="No valid products in cart")

    order_dict = {
        "user_id": current_user["_id"],
        "items": order_items,
        "total": total,
        "status": "pending",
        "shipping_address": order.shipping_address.model_dump(),
        "created_at": datetime.utcnow()
    }

    result = await db.orders.insert_one(order_dict)

    await db.users.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {"$set": {"cart": []}}
    )

    return {
        "id": str(result.inserted_id),
        "message": "Order placed successfully",
        "total": total
    }


@router.get("")
async def get_user_orders(current_user: dict = Depends(get_current_user)):
    db = get_database()

    cursor = db.orders.find({"user_id": current_user["_id"]}).sort("created_at", -1)
    orders = []

    async for order in cursor:
        order["id"] = str(order["_id"])
        del order["_id"]
        orders.append(order)

    return orders


@router.get("/{order_id}")
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()

    try:
        order = await db.orders.find_one({"_id": ObjectId(order_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid order ID")

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order["user_id"] != current_user["_id"] and current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    order["id"] = str(order["_id"])
    del order["_id"]
    return order


@router.put("/{order_id}/status")
async def update_order_status(
    order_id: str,
    status_update: OrderStatusUpdate,
    admin: dict = Depends(get_current_admin)
):
    db = get_database()

    valid_statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
    if status_update.status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Must be one of: {valid_statuses}"
        )

    try:
        result = await db.orders.update_one(
            {"_id": ObjectId(order_id)},
            {"$set": {"status": status_update.status}}
        )
    except:
        raise HTTPException(status_code=400, detail="Invalid order ID")

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")

    return {"message": "Order status updated", "status": status_update.status}
