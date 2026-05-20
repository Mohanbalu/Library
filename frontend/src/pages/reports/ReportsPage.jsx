import SectionHeader from '@/components/common/SectionHeader';
import StatCard from '@/components/dashboard/StatCard';
import { CategoryPieChart, FineBarChart, OverviewLineChart } from '@/components/charts/AnalyticsCharts';
import { BookOpen, CircleDollarSign, ClipboardList, TrendingUp } from 'lucide-react';

const stats = [
  { title: 'Most Borrowed', value: 'Clean Code', icon: BookOpen, trend: '96 issues' },
  { title: 'Avg. Return Time', value: '7.4 days', icon: ClipboardList, trend: '-8% vs last month' },
  { title: 'Fine Recovery', value: '84%', icon: CircleDollarSign, trend: 'Healthy collections' },
  { title: 'Issue Growth', value: '+18%', icon: TrendingUp, trend: 'Month over month' },
];

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

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Analytics"
        title="Reports & Analytics"
        description="View category trends, monthly circulation, most borrowed titles, and fine recovery patterns in one executive view."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <OverviewLineChart data={monthlyData} />
        <CategoryPieChart data={categoryData} />
      </div>
      <FineBarChart data={fineData} />
      <div className="dashboard-card p-6">
        <h3 className="font-display text-lg font-semibold text-slate-900">Most Borrowed Books</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Clean Code', '96 issues'],
            ['1984', '81 issues'],
            ['Zero to One', '64 issues'],
            ['The 7 Habits', '53 issues'],
          ].map(([title, count]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-1 text-sm text-slate-500">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
