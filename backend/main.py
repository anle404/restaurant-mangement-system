from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import tables, orders, receipts, menu, staff

origins = [
    "http://localhost:5173",
    "http://localhost"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)

app.include_router(tables.router)
app.include_router(orders.router)
app.include_router(receipts.router)
app.include_router(menu.router)
app.include_router(staff.router)

