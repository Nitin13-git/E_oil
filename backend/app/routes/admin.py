from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId

from ..database import get_database
from ..utils.auth import get_current_admin

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/stats")
async def get_dashboard_stats(admin: dict = Depends(get_current_admin)):
    db = get_database()

    total_users = await db.users.count_documents({})
    total_products = await db.products.count_documents({})
    total_orders = await db.orders.count_documents({})
    pending_orders = await db.orders.count_documents({"status": "pending"})

    pipeline = [
        {"$group": {"_id": None, "total": {"$sum": "$total"}}}
    ]
    revenue_result = await db.orders.aggregate(pipeline).to_list(1)
    total_revenue = revenue_result[0]["total"] if revenue_result else 0

    recent_orders = []
    cursor = db.orders.find().sort("created_at", -1).limit(5)
    async for order in cursor:
        order["id"] = str(order["_id"])
        del order["_id"]
        recent_orders.append(order)

    return {
        "total_users": total_users,
        "total_products": total_products,
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "total_revenue": total_revenue,
        "recent_orders": recent_orders
    }


@router.get("/orders")
async def get_all_orders(
    status: str = None,
    skip: int = 0,
    limit: int = 20,
    admin: dict = Depends(get_current_admin)
):
    db = get_database()

    query = {}
    if status:
        query["status"] = status

    cursor = db.orders.find(query).sort("created_at", -1).skip(skip).limit(limit)
    orders = []

    async for order in cursor:
        order["id"] = str(order["_id"])
        del order["_id"]

        user = await db.users.find_one({"_id": ObjectId(order["user_id"])})
        if user:
            order["user_name"] = user.get("name", "Unknown")
            order["user_email"] = user.get("email", "Unknown")

        orders.append(order)

    total = await db.orders.count_documents(query)

    return {
        "orders": orders,
        "total": total
    }


@router.get("/users")
async def get_all_users(
    skip: int = 0,
    limit: int = 20,
    admin: dict = Depends(get_current_admin)
):
    db = get_database()

    cursor = db.users.find().skip(skip).limit(limit)
    users = []

    async for user in cursor:
        users.append({
            "id": str(user["_id"]),
            "email": user["email"],
            "name": user["name"],
            "role": user.get("role", "user"),
            "created_at": user.get("created_at")
        })

    total = await db.users.count_documents({})

    return {
        "users": users,
        "total": total
    }


@router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: str,
    role: str,
    admin: dict = Depends(get_current_admin)
):
    db = get_database()

    if role not in ["user", "admin"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    try:
        result = await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"role": role}}
        )
    except:
        raise HTTPException(status_code=400, detail="Invalid user ID")

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User role updated", "role": role}


@router.delete("/users/{user_id}")
async def delete_user(user_id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()

    if user_id == admin["_id"]:
        raise HTTPException(status_code=400, detail="Cannot delete yourself")

    try:
        result = await db.users.delete_one({"_id": ObjectId(user_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid user ID")

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}
