from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactInDB(ContactCreate):
    id: Optional[str] = Field(None, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: datetime

    class Config:
        populate_by_name = True
