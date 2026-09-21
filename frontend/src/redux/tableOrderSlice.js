import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTableOrder } from "../services/tables";
import { deleteOrderItem, updateOrderItem } from "../services/orders";

export const tableOrderThunk = createAsyncThunk(
    'table/getOrder',
    async (tableId, { rejectWithValue }) => {
        try {
            return await getTableOrder(tableId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const syncQuantityThunk = createAsyncThunk(
    'order/updateOrderItem',
    async ({orderId, orderItemId, data}, { rejectWithValue }) => {
        try {
            return await updateOrderItem(orderId, orderItemId, data)
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteOrderItemThunk = createAsyncThunk(
    'order/deleteOrderItem',
    async ({orderId, orderItemId}, { rejectWithValue }) => {
        try {
            return await deleteOrderItem(orderId, orderItemId)
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    data: {
        order_items: []
    },
    status: 'idle',
    error : null
}

const tableOrderSlice = createSlice({
    name: 'tableOrder',
    initialState,
    reducers: {
        increment: (state, action) => {
            const item = state.data.order_items.find(i => i.order_item_id == action.payload) 
            if (item) {
                item.quantity += 1
            }
        },
        decrement: (state, action) => {
            const item = state.data.order_items.find(i => i.order_item_id == action.payload) 
            if (item) {
                item.quantity -= 1
            }
        },
        removeItem: (state, action) => {
            state.data.order_items = state.data.order_items.filter(i => i.order_item_id != action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(tableOrderThunk.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(tableOrderThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.data = {
                    ...action.payload,
                    order_items: action.payload.order_items.map(item => ({
                        ...item,
                        last_synced_quantity: item.quantity
                    }))
                }
            })
            .addCase(tableOrderThunk.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message ?? 'Unknown Error'
            })
            .addCase(syncQuantityThunk.fulfilled, (state, action) => {
                const item = state.data.order_items.find(i => i.order_item_id == action.meta.arg.orderItemId)
                if (item) {
                    item.last_synced_quantity = action.meta.arg.data.quantity
                }
            })
            .addCase(syncQuantityThunk.rejected, (state, action) => {
                const item = state.data.order_items.find(i => i.order_item_id == action.meta.arg.orderItemId)
                if (item) {
                    item.quantity = item.last_synced_quantity
                }
            })
    }
})

export const {setOrderItems, increment, decrement, removeItem} = tableOrderSlice.actions
export default tableOrderSlice.reducer