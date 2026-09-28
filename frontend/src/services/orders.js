import axios from "axios";

const BASE_URL = 'http://localhost:8000'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export const createOrder = async (table_id, staff_id, type) => {
    console.log(table_id, staff_id, type)
    try {
        const response = await axiosInstance.post(`/orders`, {
            table_id: table_id,
            staff_id: staff_id,
            type: type
        })
        
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const addOrderItem = async (orderId, { menu_item_id, price }) => {
    try {
        const response = await axiosInstance.post(`/orders/${orderId}/order_items`, {
            menu_item_id: menu_item_id,
            price: price
        })

        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const updateOrderItem = async (orderId, orderItemId, { quantity, note }) => {
    try {
        const response = await axiosInstance.put(`/orders/${orderId}/order-items/${orderItemId}`, {
            quantity: quantity,
            note: note
        })

        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const deleteOrderItem = async (orderId, orderItemId) => {
    console.log(orderId, orderItemId)
    try {
        const response = await axiosInstance.delete(`/orders/${orderId}/order-items/${orderItemId}`)

        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}