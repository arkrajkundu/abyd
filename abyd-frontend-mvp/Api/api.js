import axios from 'axios';
import config from '../src/config';

const API_BASE_URL = `${config.API_BASE_URL}/api`;

export const fetchState = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const saveState = async (state) => {
    const token = localStorage.getItem('token');
    await axios.post(API_BASE_URL, state, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
