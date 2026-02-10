import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
});

export const getContacts = async (skip = 0, limit = 100, search = '') => {
    const params = { skip, limit };
    if (search) {
        params.search = search;
    }
    const response = await api.get('/contacts/', { params });
    return response.data;
};

export const getContact = async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
};

export const createContact = async (contact) => {
    const response = await api.post('/contacts/', contact);
    return response.data;
};

export const updateContact = async (id, contact) => {
    const response = await api.put(`/contacts/${id}`, contact);
    return response.data;
};

export const deleteContact = async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
};

export default api;
