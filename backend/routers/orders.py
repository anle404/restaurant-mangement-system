from fastapi import APIRouter, status, Response, HTTPException
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

class UpdateOrderInput(BaseModel):
    quantity: int
    note: str | None

@router.post('/', status_code=status.HTTP_201_CREATED)
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

@router.put('/{order_id}/order-items/{order_item_id}', status_code=status.HTTP_204_NO_CONTENT)
async def update_order(order_id: int, order_item_id: int, input: UpdateOrderInput) -> Response:
    query = '''
        UPDATE order_items SET 
            quantity = %s,
            note = %s
        WHERE order_id = %s AND order_item_id = %s;
    '''
    
    with DatabaseConnector.get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (input.quantity, input.note, order_id, order_item_id))
            updated_row = cursor.rowcount

            if updated_row == 0:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order Item not found")

            return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.delete('/{order_id}/order-items/{order_item_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_order_item(order_id: int, order_item_id: int) -> Response:
    query = '''
        DELETE FROM order_items WHERE order_id = %s AND order_item_id = %s;
    '''

    with DatabaseConnector.get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (order_id, order_item_id))
            deleted_row = cursor.rowcount

            if deleted_row == 0:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order Item not found")

            return Response(status_code=status.HTTP_204_NO_CONTENT)




