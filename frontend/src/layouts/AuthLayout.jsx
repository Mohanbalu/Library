import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-dashboard-radial px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-soft backdrop-blur-xl lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-600 p-10 text-white lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_22%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="mb-10 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                  Smart Library
                </div>
                <h1 className="max-w-xl font-display text-5xl font-bold leading-tight">
                  Modern issue, return, and analytics control for a digital library.
                </h1>
                <p className="mt-6 max-w-lg text-base leading-7 text-white/85">
                  Clean workflows for admins and members with secure JWT authentication, live operations, and presentation-ready reporting.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  ['24/7', 'Access'],
                  ['JWT', 'Protected'],
                  ['Enterprise', 'Dashboard'],
                ].map(([title, subtitle]) => (
                  <div key={title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="font-display text-2xl font-bold">{title}</div>
                    <div className="text-sm text-white/75">{subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 sm:p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
