import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#25b884', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function OverviewLineChart({ data }) {
  return (
    <div className="dashboard-card p-5">
      <h3 className="mb-4 font-display text-lg font-semibold text-slate-900">Monthly Activity</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line type="monotone" dataKey="transactions" stroke="#25b884" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="issues" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CategoryPieChart({ data }) {
  return (
    <div className="dashboard-card p-5">
      <h3 className="mb-4 font-display text-lg font-semibold text-slate-900">Book Categories</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={65} outerRadius={95} paddingAngle={4}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function FineBarChart({ data }) {
  return (
    <div className="dashboard-card p-5">
      <h3 className="mb-4 font-display text-lg font-semibold text-slate-900">Fine Analytics</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Legend />
            <Bar dataKey="collected" fill="#25b884" radius={[8, 8, 0, 0]} />
            <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
