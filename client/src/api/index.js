import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const getScheduleAPI = () => API.get('/schedule');
export const changeScheduleAPI = (formData) => API.post('/schedule', formData);