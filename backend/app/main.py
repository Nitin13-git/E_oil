from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import connect_to_mongo, close_mongo_connection
from .routes import auth, products, cart, orders, admin, contact

app = FastAPI(
    title="Essential Oils E-Commerce API",
    description="API for Essential Oils E-Commerce Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(admin.router)
app.include_router(contact.router)


@app.on_event("startup")
async def startup():
    await connect_to_mongo()


@app.on_event("shutdown")
async def shutdown():
    await close_mongo_connection()


@app.get("/")
async def root():
    return {"message": "Welcome to Essential Oils E-Commerce API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
