import clsx from 'clsx';

const styles = {
  ACTIVE: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  INACTIVE: 'bg-slate-100 text-slate-700 ring-slate-200',
  BLOCKED: 'bg-rose-50 text-rose-700 ring-rose-100',
  ISSUED: 'bg-blue-50 text-blue-700 ring-blue-100',
  RETURNED: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  OVERDUE: 'bg-amber-50 text-amber-700 ring-amber-100',
  LOST: 'bg-rose-50 text-rose-700 ring-rose-100',
  CANCELLED: 'bg-slate-100 text-slate-700 ring-slate-200',
  PENDING: 'bg-amber-50 text-amber-700 ring-amber-100',
  PARTIALLY_PAID: 'bg-sky-50 text-sky-700 ring-sky-100',
  PAID: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  WAIVED: 'bg-violet-50 text-violet-700 ring-violet-100',
  SUCCESS: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  FAILED: 'bg-rose-50 text-rose-700 ring-rose-100',
  REVERSED: 'bg-slate-100 text-slate-700 ring-slate-200',
};

export default function StatusBadge({ value }) {
  return (
    <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset', styles[value] || 'bg-slate-100 text-slate-700 ring-slate-200')}>
      {value?.toString().replaceAll('_', ' ')}
    </span>
  );
}
