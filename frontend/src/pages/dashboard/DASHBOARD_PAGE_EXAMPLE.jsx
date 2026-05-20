/**
 * Example: Dashboard Page Implementation
 * ======================================
 *
 * This is a reference implementation showing how to:
 * - Fetch multiple API endpoints
 * - Handle loading and error states
 * - Display data in components
 * - Use useAuth to access user information
 */

/*
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApi } from '@/hooks/useApi';
import dashboardApi from '@/api/dashboardApi';
import issueApi from '@/api/issueApi';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StatCard from '@/components/dashboard/StatCard';
import AnalyticsCharts from '@/components/charts/AnalyticsCharts';
import RecentTransactionsTable from '@/components/dashboard/RecentTransactionsTable';

export default function DashboardPage() {
  const { user } = useAuth();

  // Fetch dashboard statistics
  const statsApi = useApi(dashboardApi.stats, {
    showErrorToast: true,
  });

  // Fetch analytics data
  const analyticsApi = useApi(dashboardApi.analytics, {
    showErrorToast: true,
  });

  // Fetch overdue books
  const overdueApi = useApi(issueApi.overdue, {
    showErrorToast: true,
  });

  // Fetch recent transactions
  const recentTransactionsApi = useApi(dashboardApi.recentTransactions, {
    showErrorToast: true,
  });

  // Load all data on component mount
  useEffect(() => {
    statsApi.execute();
    analyticsApi.execute({ period: 'MONTH' });
    overdueApi.execute();
    recentTransactionsApi.execute(5);
  }, []);

  const isLoading =
    statsApi.loading ||
    analyticsApi.loading ||
    overdueApi.loading ||
    recentTransactionsApi.loading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner label="Loading dashboard..." />
      </div>
    );
  }

  const stats = statsApi.data;
  const analytics = analyticsApi.data;
  const overdue = overdueApi.data || [];
  const recentTransactions = recentTransactionsApi.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening in your library today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={stats?.totalBooks || 0}
          icon="📚"
          trend="+2.5%"
          color="blue"
        />
        <StatCard
          title="Active Issues"
          value={stats?.activeIssues || 0}
          icon="📤"
          trend="+5.2%"
          color="green"
        />
        <StatCard
          title="Overdue Books"
          value={stats?.overdueIssues || 0}
          icon="⏰"
          trend="-1.3%"
          color="red"
        />
        <StatCard
          title="Pending Fines"
          value={`$${stats?.pendingFines || 0}`}
          icon="💰"
          trend="+3.8%"
          color="orange"
        />
      </div>

      {/* Analytics and Charts */}
      {analytics && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analytics
          </h2>
          <AnalyticsCharts data={analytics} />
        </div>
      )}

      {/* Overdue Books Section */}
      {overdue.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">
            ⚠️ Overdue Books ({overdue.length})
          </h3>
          <div className="space-y-3">
            {overdue.map((issue) => (
              <div
                key={issue.id}
                className="flex justify-between items-center bg-white p-4 rounded border border-red-100"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {issue.book?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    By {issue.book?.author}
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    Issued by {issue.user?.name} on{' '}
                    {new Date(issue.issuedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">
                    {issue.daysOverdue} days overdue
                  </p>
                  <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Collect Fine
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Recent Transactions
        </h2>
        {recentTransactions.length > 0 ? (
          <RecentTransactionsTable transactions={recentTransactions} />
        ) : (
          <p className="text-gray-600">No recent transactions</p>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <p className="text-sm opacity-80">Total Users</p>
          <p className="text-4xl font-bold mt-2">{stats?.totalUsers || 0}</p>
          <p className="text-sm mt-2 opacity-80">
            {stats?.activeUsers || 0} active users
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
          <p className="text-sm opacity-80">Return Rate</p>
          <p className="text-4xl font-bold mt-2">
            {analytics?.returnRate || 0}%
          </p>
          <p className="text-sm mt-2 opacity-80">Books returned on time</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
          <p className="text-sm opacity-80">Collection Rate</p>
          <p className="text-4xl font-bold mt-2">
            {analytics?.fineCollectionRate || 0}%
          </p>
          <p className="text-sm mt-2 opacity-80">Fines collected</p>
        </div>
      </div>
    </div>
  );
}
*/

export default {};
