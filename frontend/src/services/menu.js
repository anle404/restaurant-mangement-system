import axios from "axios";

const BASE_URL = 'http://localhost:8000'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export const getMenu = async () => {
    try {
        const response = await axiosInstance.get('/menu');
        return response.data
    } catch (error) {
        console.error('Error fetching menu: ', error)
        throw error;
    }
}