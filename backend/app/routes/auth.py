from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from bson import ObjectId

from ..database import get_database
from ..models.user import UserCreate, UserResponse, CartItem
from ..utils.security import get_password_hash, verify_password
from ..utils.auth import create_access_token, get_current_user
from ..config import get_settings

router = APIRouter(prefix="/api/auth", tags=["Authentication"])
settings = get_settings()


@router.post("/register", response_model=dict)
async def register(user: UserCreate):
    db = get_database()

    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    user_dict = {
        "email": user.email,
        "name": user.name,
        "password": get_password_hash(user.password),
        "role": "user",
        "cart": [],
    }

    result = await db.users.insert_one(user_dict)

    access_token = create_access_token(
        data={"sub": str(result.inserted_id)},
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(result.inserted_id),
            "email": user.email,
            "name": user.name,
            "role": "user"
        }
    }


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = get_database()

    user = await db.users.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": str(user["_id"])},
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "email": user["email"],
            "name": user["name"],
            "role": user.get("role", "user")
        }
    }


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["_id"],
        "email": current_user["email"],
        "name": current_user["name"],
        "role": current_user.get("role", "user"),
        "cart": current_user.get("cart", [])
    }
