from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from typing import List

from ..database import get_database
from ..utils.auth import get_current_user

router = APIRouter(prefix="/api/cart", tags=["Cart"])


@router.get("")
async def get_cart(current_user: dict = Depends(get_current_user)):
    db = get_database()

    cart = current_user.get("cart", [])
    cart_with_products = []

    for item in cart:
        try:
            product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
            if product:
                cart_with_products.append({
                    "product_id": str(product["_id"]),
                    "name": product["name"],
                    "price": product["price"],
                    "image_url": product.get("image_url", ""),
                    "quantity": item["quantity"],
                    "subtotal": product["price"] * item["quantity"]
                })
        except:
            continue

    total = sum(item["subtotal"] for item in cart_with_products)

    return {
        "items": cart_with_products,
        "total": total
    }


@router.post("/add")
async def add_to_cart(
    product_id: str,
    quantity: int = 1,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    try:
        product = await db.products.find_one({"_id": ObjectId(product_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid product ID")

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product.get("stock", 0) < quantity:
        raise HTTPException(status_code=400, detail="Not enough stock available")

    cart = current_user.get("cart", [])
    existing_item = next(
        (item for item in cart if item["product_id"] == product_id),
        None
    )

    if existing_item:
        existing_item["quantity"] += quantity
    else:
        cart.append({"product_id": product_id, "quantity": quantity})

    await db.users.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {"$set": {"cart": cart}}
    )

    return {"message": "Product added to cart", "cart": cart}


@router.put("/update")
async def update_cart_item(
    product_id: str,
    quantity: int,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    if quantity < 1:
        raise HTTPException(status_code=400, detail="Quantity must be at least 1")

    cart = current_user.get("cart", [])
    item_found = False

    for item in cart:
        if item["product_id"] == product_id:
            item["quantity"] = quantity
            item_found = True
            break

    if not item_found:
        raise HTTPException(status_code=404, detail="Item not in cart")

    await db.users.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {"$set": {"cart": cart}}
    )

    return {"message": "Cart updated", "cart": cart}


@router.delete("/remove/{product_id}")
async def remove_from_cart(
    product_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()

    cart = current_user.get("cart", [])
    new_cart = [item for item in cart if item["product_id"] != product_id]

    if len(new_cart) == len(cart):
        raise HTTPException(status_code=404, detail="Item not in cart")

    await db.users.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {"$set": {"cart": new_cart}}
    )

    return {"message": "Item removed from cart", "cart": new_cart}


@router.delete("/clear")
async def clear_cart(current_user: dict = Depends(get_current_user)):
    db = get_database()

    await db.users.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {"$set": {"cart": []}}
    )

    return {"message": "Cart cleared"}
