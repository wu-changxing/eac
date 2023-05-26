import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
    baseURL: `${config.BACKEND}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
