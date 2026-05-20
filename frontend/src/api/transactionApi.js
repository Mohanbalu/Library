import apiClient from './client';

const transactionApi = {
  list: async (params = {}) => {
    const response = await apiClient.get('/transactions', { params });
    return response.data;
  },
  summary: async () => {
    const response = await apiClient.get('/transactions/summary');
    return response.data;
  },
};

export default transactionApi;
