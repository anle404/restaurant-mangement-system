import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTableOrder } from "../services/tables";

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
                state.data = action.payload
            })
            .addCase(tableOrderThunk.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message ?? 'Unknown Error'
            })
    }
})

export const {setOrderItems, increment, decrement, removeItem} = tableOrderSlice.actions
export default tableOrderSlice.reducer