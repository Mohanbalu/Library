import clsx from 'clsx';

export default function StatCard({ title, value, icon: Icon, trend, accent = 'from-brand-500 to-emerald-500' }) {
  return (
    <div className="dashboard-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 font-display text-3xl font-bold text-slate-900">{value}</h3>
          {trend ? <p className="mt-2 text-sm text-emerald-600">{trend}</p> : null}
        </div>
        <div className={clsx('rounded-2xl bg-gradient-to-br p-3 text-white shadow-soft', accent)}>
          {Icon ? <Icon size={22} /> : null}
        </div>
      </div>
    </div>
  );
}
