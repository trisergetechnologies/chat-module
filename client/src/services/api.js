import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getUsers = (token) => API.get('/auth/users', { headers: { Authorization: `Bearer ${token}` } });
export const sendMessage = (data, token) => API.post('/chat/send', data, { headers: { Authorization: `Bearer ${token}` } });
export const getChatHistory = (userId, token) => API.get(`/chat/history/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
