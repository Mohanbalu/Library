import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/common/Sidebar';
import Navbar from '@/components/common/Navbar';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dashboard-radial">
      <div className="flex min-h-screen">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
          <Navbar onMenuClick={() => setMobileOpen((current) => !current)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
