from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
from bson import ObjectId

from ..database import get_database
from ..models.product import ProductCreate, ProductUpdate, ProductResponse
from ..utils.auth import get_current_admin

router = APIRouter(prefix="/api/products", tags=["Products"])


@router.get("", response_model=List[dict])
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    skip: int = 0,
    limit: int = 20
):
    db = get_database()

    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    if min_price is not None:
        query["price"] = {"$gte": min_price}
    if max_price is not None:
        if "price" in query:
            query["price"]["$lte"] = max_price
        else:
            query["price"] = {"$lte": max_price}

    cursor = db.products.find(query).skip(skip).limit(limit)
    products = []
    async for product in cursor:
        product["id"] = str(product["_id"])
        del product["_id"]
        products.append(product)

    return products


@router.get("/categories")
async def get_categories():
    db = get_database()
    categories = await db.products.distinct("category")
    return categories


@router.get("/{product_id}")
async def get_product(product_id: str):
    db = get_database()

    try:
        product = await db.products.find_one({"_id": ObjectId(product_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid product ID")

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    product["id"] = str(product["_id"])
    del product["_id"]
    return product


@router.post("", response_model=dict)
async def create_product(product: ProductCreate, admin: dict = Depends(get_current_admin)):
    db = get_database()

    product_dict = product.model_dump()
    result = await db.products.insert_one(product_dict)

    product_dict["id"] = str(result.inserted_id)
    return product_dict


@router.put("/{product_id}")
async def update_product(
    product_id: str,
    product: ProductUpdate,
    admin: dict = Depends(get_current_admin)
):
    db = get_database()

    update_data = {k: v for k, v in product.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")

    try:
        result = await db.products.update_one(
            {"_id": ObjectId(product_id)},
            {"$set": update_data}
        )
    except:
        raise HTTPException(status_code=400, detail="Invalid product ID")

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")

    updated_product = await db.products.find_one({"_id": ObjectId(product_id)})
    updated_product["id"] = str(updated_product["_id"])
    del updated_product["_id"]
    return updated_product


@router.delete("/{product_id}")
async def delete_product(product_id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()

    try:
        result = await db.products.delete_one({"_id": ObjectId(product_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid product ID")

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}


@router.post("/compare")
async def compare_products(product_ids: List[str]):
    db = get_database()

    if len(product_ids) < 2 or len(product_ids) > 4:
        raise HTTPException(
            status_code=400,
            detail="Please provide 2 to 4 product IDs for comparison"
        )

    products = []
    for pid in product_ids:
        try:
            product = await db.products.find_one({"_id": ObjectId(pid)})
            if product:
                product["id"] = str(product["_id"])
                del product["_id"]
                products.append(product)
        except:
            continue

    if len(products) < 2:
        raise HTTPException(status_code=404, detail="Not enough products found")

    return products
