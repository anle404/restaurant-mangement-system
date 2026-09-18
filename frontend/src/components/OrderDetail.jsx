import { Box, Typography } from "@mui/material";
import TableTimer from "./TableTimer";
import OrderItemList from "./OrderItemList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { tableOrderThunk } from "../redux/tableOrderSlice.js";
import { useEffect } from "react";


export default function OrderDetail({tableId}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(tableOrderThunk(tableId))
        
    }, [tableId, dispatch])

    const tableInfo = useSelector((state) => state.tableOrder.data)

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            padding: '4%'
        }}>
            {(tableInfo) && (
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <i className="ri-arrow-left-line" style={{
                        fontSize: '2.5rem',
                        lineHeight: 1
                    }}></i>
                    <Typography sx={{
                        fontWeight: 'bold',
                        fontSize: '2rem'
                    }}>
                        Table {tableInfo.label}
                    </Typography>
                </Box>
            )}
            
            <Box sx={{
                width: '100%',
                height: '3px',
                bgcolor: 'black'
            }} />
            {(tableInfo) && (
                <Box sx={{
                    width: '100%',
                    paddingY: '3%'
                }}>
                    <Box sx={{
                        fontSize: '1.3rem',
                        fontWeight: '500'
                    }}>
                        <Typography component="span" variant="inherit">Order ID: </Typography>
                        <Typography component="span" variant="inherit">{tableInfo.order_id}</Typography>
                    </Box>
                    <Box sx={{
                        fontSize: '1.3rem',
                        fontWeight: '500'
                    }}>
                        <Typography component="span" variant="inherit">Type: </Typography>
                        <Typography component="span" variant="inherit">{tableInfo.type}</Typography>
                    </Box>
                    <Box sx={{
                        fontSize: '1.3rem',
                        fontWeight: '500'
                    }}>
                        <Typography component="span" variant="inherit">Occupied for: </Typography>
                        <Typography component="span" variant="inherit">{(tableInfo.opened_at ? <TableTimer startTime={Date.parse(tableInfo.opened_at)}/> : '')}</Typography>
                    </Box>
                    <OrderItemList />
                </Box>
            )}
            
        </Box>
    )
}