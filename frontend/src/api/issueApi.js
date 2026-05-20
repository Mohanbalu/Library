import apiClient from './client';

const issueApi = {
  issueBook: async (payload) => {
    const response = await apiClient.post('/issues', payload);
    return response.data;
  },
  returnBook: async (payload) => {
    const response = await apiClient.post('/issues/return', payload);
    return response.data;
  },
  list: async (params = {}) => {
    const response = await apiClient.get('/issues', { params });
    return response.data;
  },
  overdue: async () => {
    const response = await apiClient.get('/issues/overdue');
    return response.data;
  },
};

export default issueApi;
