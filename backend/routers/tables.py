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

class TableOrder(BaseModel):
    order_id: int | None = None
    table_id: int
    label: str
    staff_id: int | None = None
    type: str | None = None
    status: str | None = None
    opened_at: datetime | None = None
    closed_at: datetime | None = None
    order_items: list[OrderItem] = []


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
            SELECT o.*, COALESCE(SUM(quantity * price), 0) AS total FROM orders AS o 
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
async def get_open_order(table_id: int) -> TableOrder:
    response = {}
    query1: str = '''
        SELECT o.*, t.label FROM orders AS o INNER JOIN tables AS t USING(table_id)
        WHERE table_id = %s AND status = 'open';
    '''
    query2: str = '''
            SELECT table_id, label FROM tables WHERE table_id = %s
        '''
    query3: str = '''
        SELECT oi.*, mi.name FROM order_items AS oi
        INNER JOIN menu_items AS mi USING(menu_item_id)
        WHERE order_id = %s;
    '''
    

    with DatabaseConnector.get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query1, (table_id,))
            result1 = cursor.fetchone()

            if result1 is None:
                cursor.execute(query2, (table_id,))
                result2 = cursor.fetchone()
                if result2 is None:
                    return None
    
                return TableOrder(**result2)

            cursor.execute(query3, (result1["order_id"],))
            result3 = cursor.fetchall()
            result = {
                **dict(result1),
                "order_items": [dict(item) for item in result3]
            }
            
            response = TableOrder.model_validate(result)

    return response
