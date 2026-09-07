from fastapi import APIRouter
from db import DatabaseConnector
from pydantic import BaseModel
from datetime import datetime
from psycopg2.extras import NamedTupleCursor, RealDictCursor

class Table(BaseModel):
    table_id: int
    label: str
    seats: int
    order_id: int | None
    staff_id: int | None
    type: str | None
    status: str | None
    opened_at: datetime | None
    closed_at: str | None
    total: float | None

class OrderItem(BaseModel):
    order_item_id: int
    order_id: int
    menu_item_id: int
    name: str
    status: str
    quantity: int
    note: str | None
    created_at: datetime

class Order(BaseModel):
    order_id: int
    table_id: int
    staff_id: int
    type: str
    status: str
    opened_at: datetime
    closed_at: datetime | None
    order_items: list[OrderItem]


router = APIRouter(
    prefix="/tables",
    tags=["tables"]
)

@router.get("/")
async def get_tables() -> list[Table]:
    response: list[Table] = []
    query: str = '''
        SELECT * FROM tables
        LEFT JOIN (
            SELECT o.*, SUM(quantity * price) AS total FROM orders AS o 
            LEFT JOIN order_items USING(order_id) 
            GROUP BY order_id
        )
        USING(table_id) ORDER BY table_id;
    '''

    with DatabaseConnector.get_connection() as conn:
        with conn.cursor(cursor_factory=NamedTupleCursor) as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
            for table in result:
                response.append(Table.model_validate(table, from_attributes=True))
                
    return response

@router.get("/{table_id}/order")
async def get_open_order(table_id: int):
    response = {}
    query1: str = '''
        SELECT * FROM orders
        WHERE table_id = %s AND status = 'open';
    '''
    query2: str = '''
        SELECT oi.*, mi.name FROM order_items AS oi
        INNER JOIN menu_items AS mi USING(menu_item_id)
        WHERE order_id = 1;
    '''

    with DatabaseConnector.get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query1, (table_id,))
            result1 = cursor.fetchone()

            if result1 is None:
                return None

            cursor.execute(query2, (result1["order_id"],))
            result2 = cursor.fetchall()
            result = {
                **dict(result1),
                "order_items": [dict(item) for item in result2]
            }
            print(result)

            response = Order.model_validate(result)

    return response
