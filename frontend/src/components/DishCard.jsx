import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addOrderItemThunk, createOrderThunk, increment, setTable, syncQuantityThunk } from "../redux/tableOrderSlice";
import { scheduleQuantitySync } from "../utils/debouneSync";


export default function DishCard({sx, menuItem}) {
    const dispatch = useDispatch()
    const tableInfo = useSelector(state => state.tableOrder.data)

    const handleAddOrderItem = async (orderId, data) => {
        if (!orderId) {
            const result = await dispatch(createOrderThunk({
                table_id: tableInfo.table_id,
                staff_id: 1,
                type: 'Dine In'
            })).unwrap()
            orderId = result.order_id
        }
        
        const item = tableInfo.order_items.find(i => i.menu_item_id == data.menu_item_id)
        if (item) {
            dispatch(increment(item.order_item_id))
            scheduleQuantitySync(dispatch, syncQuantityThunk, orderId, item.order_item_id, {
                quantity: item.quantity + 1,
                note: item.note
            })
        } else {
            dispatch(addOrderItemThunk({ orderId, data }))
        }
        
    }

    return (
        <Box sx={{
            border: '1px solid #cecece',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            background: '#ececec',
            fontSize: '1cqw',
            overflow: 'hidden',
            ...sx
        }} onClick={() => handleAddOrderItem(tableInfo.order_id, { 
            menu_item_id: menuItem.menu_item_id, 
            price: menuItem.price 
        })}>
            <Box sx={{
                height: '9cqw',
                overflow: 'hidden'
            }}>
                <img className='object-cover' src={menuItem?.url} />
            </Box>
            <Typography sx={{
                width: '100%',
                padding: '2% 5%',
                fontWeight: 'bold',
                fontSize: '1.1em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {menuItem.name}
            </Typography>

            
        </Box>
    )
}