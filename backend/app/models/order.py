from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId


class OrderItem(BaseModel):
    product_id: str
    name: str
    quantity: int
    price: float


class ShippingAddress(BaseModel):
    full_name: str
    address: str
    city: str
    state: str
    postal_code: str
    phone: str


class OrderCreate(BaseModel):
    shipping_address: ShippingAddress


class OrderInDB(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    items: List[OrderItem]
    total: float
    status: str = "pending"
    shipping_address: ShippingAddress
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class OrderResponse(BaseModel):
    id: str
    user_id: str
    items: List[OrderItem]
    total: float
    status: str
    shipping_address: ShippingAddress
    created_at: datetime

    class Config:
        populate_by_name = True


class OrderStatusUpdate(BaseModel):
    status: str
