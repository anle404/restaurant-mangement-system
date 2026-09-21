import { Box, Button, Stack, Typography } from "@mui/material";
import { decrement, deleteOrderItemThunk, increment, removeItem, syncQuantityThunk } from "../redux/tableOrderSlice";
import { useDispatch } from "react-redux";
import { memo } from "react";
import { cancelPendingSync, scheduleQuantitySync } from "../utils/debouneSync";

function OrderItemCard({index, item}) {
    const dispatch = useDispatch()

    const handleQuantityChange = (changeFunction, orderId, orderItemId, data) => {
        dispatch(changeFunction(orderItemId))
        scheduleQuantitySync(dispatch, syncQuantityThunk, orderId, orderItemId, data)
    }

    const handleOrderItemRemove = async (orderId, orderItemId) => {
        cancelPendingSync(orderItemId)
        const result = await dispatch(deleteOrderItemThunk({ orderId, orderItemId }))
        if (deleteOrderItemThunk.fulfilled.match(result)) {
            dispatch(removeItem(orderItemId))
        }
    }

    return (
        <Box sx={{
            width: '100%',
            padding: '3%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#ececec'
        }}>
            <Box sx={{
                width: '60%'
            }}>
                <Typography sx={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {index + 1}. {item.name}
                </Typography>
                {(item.note) && (
                    <Typography sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        Note: {item.note}
                    </Typography>
                )}
            </Box>
            <Box sx={{
                width: 'fit-content',
                display: 'flex',
                gap: 3
            }}>
                <Button sx={{
                    padding: 0.5,
                    minWidth: 0,
                    border: '0.5px solid #243642',
                    borderRadius: '2px',
                    color: '#243642'
                }} onClick={() => {
                    if (item.quantity == 1) {
                        handleOrderItemRemove(item.order_id, item.order_item_id)
                    } else {
                        handleQuantityChange(decrement, item.order_id, item.order_item_id, { 
                            quantity: item.quantity - 1, 
                            note: item.note})}
                }}>
                    <i className="ri-subtract-line" style={{fontSize: '1.8rem', lineHeight: 1}}></i>
                </Button>
                <Typography sx={{
                    fontSize: '1.5rem',
                    minWidth: '2ch',
                    textAlign: 'center'
                }}>
                    {item.quantity}
                </Typography>
                <Button sx={{
                    padding: 0.5,
                    minWidth: 0,
                    bgcolor: '#243642',
                    color: 'white'
                }} onClick={() => handleQuantityChange(increment, item.order_id, item.order_item_id, {
                    quantity: item.quantity + 1, 
                    note: item.note})}>
                    <i className="ri-add-line" style={{fontSize: '1.8rem', lineHeight: 1}}></i>
                </Button>
            </Box>
        </Box>
    )
}

export default memo(OrderItemCard);