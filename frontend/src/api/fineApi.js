import apiClient from './client';

const fineApi = {
  list: async (params = {}) => {
    const response = await apiClient.get('/fines', { params });
    return response.data;
  },
  collect: async (id, payload) => {
    const response = await apiClient.post(`/fines/${id}/collect`, payload);
    return response.data;
  },
  waive: async (id, payload) => {
    const response = await apiClient.post(`/fines/${id}/waive`, payload);
    return response.data;
  },
};

export default fineApi;
