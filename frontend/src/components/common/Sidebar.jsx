import { BookOpen, Gauge, LogOut, ReceiptText, RotateCcw, ScanSearch, ShieldUser, Sparkles, UserCircle2, Users, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROLES } from '@/utils/constants';

const navItemClass = ({ isActive }) =>
  `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`;

export default function Sidebar({ mobileOpen = false, onClose }) {
  const { user, logout } = useAuth();
  const role = user?.role?.roleCode || user?.role || ROLES.USER;
  const isAdmin = role === ROLES.ADMIN;

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: Gauge },
    { to: '/books', label: 'Books', icon: BookOpen },
    ...(isAdmin
      ? [
          { to: '/users', label: 'Users', icon: Users },
          { to: '/issue-book', label: 'Issue Book', icon: ScanSearch },
          { to: '/return-book', label: 'Return Book', icon: RotateCcw },
          { to: '/fines', label: 'Fines', icon: ReceiptText },
          { to: '/transactions', label: 'Transactions', icon: Sparkles },
          { to: '/reports', label: 'Reports', icon: ShieldUser },
        ]
      : []),
    { to: '/profile', label: 'Profile', icon: UserCircle2 },
  ];

  return (
    <>
      {mobileOpen ? <div onClick={onClose} className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden" /> : null}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 shrink-0 border-r border-slate-200/80 bg-white/95 px-4 py-6 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:block lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <span className="font-display text-lg font-bold text-slate-900">Smart Library</span>
          <button onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-600">
            <X size={18} />
          </button>
        </div>
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-brand-600 to-emerald-500 p-5 text-white shadow-soft">
        <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
          Smart Library
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold">Issue & Return Hub</h2>
        <p className="mt-2 text-sm text-white/80">
          Streamlined circulation for admins and students.
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} className={navItemClass}>
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <UserCircle2 size={20} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{user?.fullName || user?.name || 'Library User'}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{role}</p>
          </div>
        </div>
        <button onClick={logout} className="btn-secondary mt-4 w-full justify-center">
          <LogOut size={16} />
          Logout
        </button>
      </div>
      </aside>
    </>
  );
}
