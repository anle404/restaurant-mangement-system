import { useDispatch, useSelector } from "react-redux";
import OrderItemCard from "./OrderItemCard";
import { setOrderItems } from "../redux/tableOrderSlice";
import { Box } from "@mui/material";
import { useEffect } from "react";


export default function OrderItemList() {
    const orderItems = useSelector(state => state.tableOrder.data.order_items)

    return (
        <Box sx={{
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            marginY: '3%',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
            display: 'none',
            },
        }}>
            {orderItems.map((item, index) => (
                <OrderItemCard key={item.order_item_id} index={index} item={item} />
            ))}          
        </Box>
        
    )
}