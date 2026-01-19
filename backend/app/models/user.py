from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId


class CartItem(BaseModel):
    product_id: str
    quantity: int = 1


class UserBase(BaseModel):
    email: EmailStr
    name: str


class UserCreate(UserBase):
    password: str


class UserInDB(UserBase):
    id: Optional[str] = Field(None, alias="_id")
    password: str
    role: str = "user"
    cart: List[CartItem] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class UserResponse(UserBase):
    id: str
    role: str
    cart: List[CartItem] = []
    created_at: datetime

    class Config:
        populate_by_name = True
