import apiClient from './client';

const userApi = {
  list: async (params = {}) => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  update: async (id, payload) => {
    const response = await apiClient.put(`/users/${id}`, payload);
    return response.data;
  },
  remove: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
  profile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },
};

export default userApi;
