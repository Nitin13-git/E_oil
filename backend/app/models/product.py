from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId


class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: str = ""
    stock: int = 0
    benefits: List[str] = []
    usage: str = ""


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None
    benefits: Optional[List[str]] = None
    usage: Optional[str] = None


class ProductInDB(ProductBase):
    id: Optional[str] = Field(None, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class ProductResponse(ProductBase):
    id: str
    created_at: datetime

    class Config:
        populate_by_name = True
