import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-manage-tau.vercel.app/',
});

export default api;
