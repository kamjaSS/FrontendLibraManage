import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backendmanage-kamjass-daniel-munozs-projects.vercel.app/',
});

export default api;
