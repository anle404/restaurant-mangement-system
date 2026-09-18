import { Box, Button, Stack, Typography } from "@mui/material";
import { decrement, increment, removeItem } from "../redux/tableOrderSlice";
import { useDispatch } from "react-redux";
import { memo } from "react";

function OrderItemCard({index, item}) {
    const dispatch = useDispatch()

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
                        dispatch(removeItem(item.order_item_id))
                    } else
                        dispatch(decrement(item.order_item_id))
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
                }} onClick={() => dispatch(increment(item.order_item_id))}>
                    <i className="ri-add-line" style={{fontSize: '1.8rem', lineHeight: 1}}></i>
                </Button>
            </Box>
        </Box>
    )
}

export default memo(OrderItemCard);