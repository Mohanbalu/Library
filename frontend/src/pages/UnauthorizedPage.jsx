import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dashboard-radial px-4">
      <div className="dashboard-card max-w-xl p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Unauthorized</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-slate-900">Access denied</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Your account does not have permission to open this section.
        </p>
        <Link to="/dashboard" className="btn-primary mt-6">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
