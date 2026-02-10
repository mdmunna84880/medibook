import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

// Create an instance of axios to make it reusable
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default api;