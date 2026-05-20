import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dashboard-radial">
        <LoadingSpinner label="Loading secure workspace" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles?.length) {
    const currentRole = user?.role?.roleCode || user?.role || user?.role_name;
    if (!roles.includes(currentRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
}
