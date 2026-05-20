import apiClient from './client';

const dashboardApi = {
  stats: async () => {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },
  analytics: async (params = {}) => {
    const response = await apiClient.get('/dashboard/analytics', { params });
    return response.data;
  },
  recentTransactions: async (limit = 10) => {
    const response = await apiClient.get('/dashboard/recent-transactions', {
      params: { limit },
    });
    return response.data;
  },
};

export default dashboardApi;
