import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dashboard-radial px-4">
      <div className="dashboard-card max-w-xl p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn-primary mt-6">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
