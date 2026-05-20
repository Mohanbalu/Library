import { Bell, Menu, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/70 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={onMenuClick} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 lg:hidden">
          <Menu size={18} />
        </button>

        <div className="hidden flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-400 md:flex">
          <Search size={18} />
          <span className="text-sm">Search books, users, issues, and transactions...</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold">
              {user?.fullName?.slice(0, 1) || user?.name?.slice(0, 1) || 'S'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">{user?.fullName || user?.name || 'Smart Library'}</p>
              <p className="text-xs text-slate-500">{user?.email || 'library@system.local'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
