import { useMemo } from 'react';
import { BookOpen, CircleDollarSign, ClipboardList, UserRound, AlertTriangle } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import StatCard from '@/components/dashboard/StatCard';
import RecentTransactionsTable from '@/components/dashboard/RecentTransactionsTable';
import { CategoryPieChart, FineBarChart, OverviewLineChart } from '@/components/charts/AnalyticsCharts';

const summary = {
  totalBooks: 1840,
  issuedBooks: 126,
  totalUsers: 378,
  pendingFines: 24,
  overdueBooks: 18,
};

const monthlyData = [
  { month: 'Jan', transactions: 42, issues: 18 },
  { month: 'Feb', transactions: 55, issues: 22 },
  { month: 'Mar', transactions: 68, issues: 28 },
  { month: 'Apr', transactions: 72, issues: 30 },
  { month: 'May', transactions: 81, issues: 34 },
  { month: 'Jun', transactions: 90, issues: 39 },
];

const categoryData = [
  { name: 'Technology', value: 42 },
  { name: 'Fiction', value: 26 },
  { name: 'Business', value: 18 },
  { name: 'Science', value: 14 },
];

const fineData = [
  { month: 'Jan', collected: 120, pending: 32 },
  { month: 'Feb', collected: 160, pending: 28 },
  { month: 'Mar', collected: 220, pending: 22 },
  { month: 'Apr', collected: 170, pending: 19 },
  { month: 'May', collected: 240, pending: 24 },
  { month: 'Jun', collected: 260, pending: 17 },
];

const recentTransactions = [
  { id: 1, reference: 'TXN-ISSUE-0001', type: 'ISSUE', user: 'Aarav Sharma', amount: 0, date: '2026-05-01T10:00:00Z', status: 'SUCCESS' },
  { id: 2, reference: 'TXN-RETURN-0001', type: 'RETURN', user: 'Aarav Sharma', amount: 0, date: '2026-05-12T15:30:00Z', status: 'SUCCESS' },
  { id: 3, reference: 'TXN-FINE-0001', type: 'FINE_PAYMENT', user: 'Aarav Sharma', amount: 20, date: '2026-05-12T16:00:00Z', status: 'SUCCESS' },
  { id: 4, reference: 'TXN-ISSUE-0002', type: 'ISSUE', user: 'Meera Iyer', amount: 0, date: '2026-05-10T11:00:00Z', status: 'SUCCESS' },
];

export default function DashboardPage() {
  const stats = useMemo(
    () => [
      { title: 'Total Books', value: summary.totalBooks, icon: BookOpen, trend: '+12% this month' },
      { title: 'Issued Books', value: summary.issuedBooks, icon: ClipboardList, trend: '8 due today' },
      { title: 'Total Users', value: summary.totalUsers, icon: UserRound, trend: '+24 new members' },
      { title: 'Pending Fines', value: summary.pendingFines, icon: CircleDollarSign, trend: '₹2,480 outstanding' },
      { title: 'Overdue Books', value: summary.overdueBooks, icon: AlertTriangle, trend: '12 need reminders' },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Command Center"
        title="Library Dashboard"
        description="A unified view of inventory, circulation, fines, and activity across the Smart Library platform."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <OverviewLineChart data={monthlyData} />
        <CategoryPieChart data={categoryData} />
      </div>

      <FineBarChart data={fineData} />

      <div>
        <SectionHeader
          title="Recent Transactions"
          description="Latest issue, return, and fine payment activity from the circulation desk."
        />
        <RecentTransactionsTable data={recentTransactions} />
      </div>
    </div>
  );
}
