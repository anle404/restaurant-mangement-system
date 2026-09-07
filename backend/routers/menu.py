from fastapi import APIRouter
from db import DatabaseConnector
from pydantic import BaseModel
from datetime import datetime
from psycopg2.extras import NamedTupleCursor

class MenuItem(BaseModel):
    menu_item_id: int
    name: str
    price: float
    created_at: datetime

router = APIRouter(
    prefix="/menu",
    tags=["menu"]
)

@router.get("/")
async def get_menu():
    response: list[MenuItem] = []
    query: str = '''
        SELECT * FROM menu_items;
    '''
    with DatabaseConnector.get_connection() as conn:
        with conn.cursor(cursor_factory=NamedTupleCursor) as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
            for item in result:
                response.append(MenuItem.model_validate(item, from_attributes=True))

    return response

