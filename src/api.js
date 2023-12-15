import axios from 'axios';

const api = axios.create({
    baseURL: 'https://managebackend.azurewebsites.net/',
});

export default api;
