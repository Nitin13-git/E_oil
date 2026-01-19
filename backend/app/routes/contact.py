from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from bson import ObjectId

from ..database import get_database
from ..models.contact import ContactCreate
from ..utils.auth import get_current_admin

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("")
async def submit_contact(contact: ContactCreate):
    db = get_database()

    contact_dict = contact.model_dump()
    contact_dict["created_at"] = datetime.utcnow()

    result = await db.contacts.insert_one(contact_dict)

    return {
        "message": "Thank you for your message. We will get back to you soon!",
        "id": str(result.inserted_id)
    }


@router.get("")
async def get_all_contacts(
    skip: int = 0,
    limit: int = 20,
    admin: dict = Depends(get_current_admin)
):
    db = get_database()

    cursor = db.contacts.find().sort("created_at", -1).skip(skip).limit(limit)
    contacts = []

    async for contact in cursor:
        contact["id"] = str(contact["_id"])
        del contact["_id"]
        contacts.append(contact)

    total = await db.contacts.count_documents({})

    return {
        "contacts": contacts,
        "total": total
    }


@router.delete("/{contact_id}")
async def delete_contact(contact_id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()

    try:
        result = await db.contacts.delete_one({"_id": ObjectId(contact_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid contact ID")

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")

    return {"message": "Contact deleted successfully"}
