from fastapi import APIRouter
from datetime import datetime
from pydantic import BaseModel
from db import DatabaseConnector
from .tables import TableOrder
from psycopg2.extras import RealDictCursor

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)

class NewOrderInput(BaseModel):
    table_id: int
    staff_id: int
    type: str
    status: str = 'open',
    opened_at: datetime

@router.post('/')
async def create_order(input: NewOrderInput) -> TableOrder:
    query = '''
        WITH new_order AS (
            INSERT INTO orders(table_id, staff_id, type, status, opened_at) 
            VALUES(%s, %s, %s, %s, %s) 
            RETURNING *
        )
        SELECT new_order.*, tables.label FROM new_order 
        INNER JOIN tables USING(table_id);
    '''
    with DatabaseConnector.get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, (input.table_id, input.staff_id, input.type, input.status, input.opened_at))
            result = cursor.fetchone()

            return TableOrder(**result)

