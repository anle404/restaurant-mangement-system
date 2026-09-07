import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
})

export const getTables = async () => {
    try {
        const response = await axiosInstance.get('/tables');
        return response.data
    } catch (error) {
        console.error('Error fetching tables: ', error)
        throw error;
    }
}

export const getTableOrder = async (table_id) => {
    try {
        const response = await axiosInstance.get(`/tables/${table_id}/order`)
        return response.data
    } catch (error) {
        console.error(`Error fetching table's order, table_id: ${table_id}`)
        throw error;
    }
}