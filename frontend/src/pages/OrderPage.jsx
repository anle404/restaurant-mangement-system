import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useState } from "react";
import OrderDetail from "../components/OrderDetail";
import tableOrderReducer from '../redux/tableOrderSlice.js'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";


export default function OrderPage() {
    let params = useParams();
    const tableId = params.tableId
    
    const store = configureStore({
        reducer: {
            tableOrder: tableOrderReducer
        }
    })

    return (
        <Box sx={{
            display: 'flex',
            height: '100vh'
        }}>
            <Provider store={store}>
                <Box sx={{
                    flex: '1',
                    minHeight: '100%',
                    overflowY: 'scroll'
                }}>
                    Hi
                </Box>
                <Box sx={{
                    width: '35%',
                    minHeight: '100vh',
                    height:'fit-content',
                    borderLeft: '3px solid red'
                }}>
                    <OrderDetail tableId={tableId}/>
                </Box>
            </Provider>   
        </Box>
    )
}