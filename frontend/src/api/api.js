import axios from "axios";

const production = '';
const local = 'http://localhost:5000';

const api = axios.create({
    baseURL : `${local}/api`
});

export default api;