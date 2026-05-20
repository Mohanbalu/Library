import apiClient from './client';

const bookApi = {
  list: async (params = {}) => {
    const response = await apiClient.get('/books', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },
  create: async (payload) => {
    const response = await apiClient.post('/books', payload);
    return response.data;
  },
  update: async (id, payload) => {
    const response = await apiClient.put(`/books/${id}`, payload);
    return response.data;
  },
  remove: async (id) => {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
  },
  summary: async () => {
    const response = await apiClient.get('/books/summary');
    return response.data;
  },
};

export default bookApi;
