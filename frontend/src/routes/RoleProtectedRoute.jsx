import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authUtils } from '@/utils/authUtils';
import LoadingSpinner from '@/components/common/LoadingSpinner';

/**
 * Role-based Protected Route
 * Restricts access based on user roles
 */
export default function RoleProtectedRoute({ roles = [] }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dashboard-radial">
        <LoadingSpinner label="Verifying access..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles required, allow access
  if (!roles || roles.length === 0) {
    return <Outlet />;
  }

  // Check if user has required role
  if (!authUtils.hasAnyRole(user, roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
