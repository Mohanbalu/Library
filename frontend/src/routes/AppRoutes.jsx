import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import BooksPage from '@/pages/books/BooksPage';
import BookFormPage from '@/pages/books/BookFormPage';
import UsersPage from '@/pages/users/UsersPage';
import IssueBookPage from '@/pages/transactions/IssueBookPage';
import ReturnBookPage from '@/pages/transactions/ReturnBookPage';
import TransactionsPage from '@/pages/transactions/TransactionsPage';
import FinesPage from '@/pages/fines/FinesPage';
import ReportsPage from '@/pages/reports/ReportsPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { ROLES } from '@/utils/constants';

/**
 * Application Routes
 * ==================
 *
 * Route Structure:
 * - Public Routes: Login, Register
 * - Protected Routes: Require authentication
 * - Role-based Routes: Require specific roles
 *
 * Protected routes use:
 * - ProtectedRoute: For basic auth requirement
 * - RoleProtectedRoute: For role-based restrictions
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* ============================================================
          PUBLIC ROUTES - No authentication required
          ============================================================ */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Error Pages */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ============================================================
          PROTECTED ROUTES - Authentication required
          ============================================================ */}

      {/* Basic Protected Routes - All authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Book Management - Both Admin and Users (with restrictions) */}
      <Route element={<RoleProtectedRoute roles={[ROLES.ADMIN, ROLES.USER]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/books/new" element={<BookFormPage mode="create" />} />
          <Route path="/books/:bookId/edit" element={<BookFormPage mode="edit" />} />
        </Route>
      </Route>

      {/* ============================================================
          ADMIN-ONLY ROUTES - Requires ADMIN role
          ============================================================ */}
      <Route element={<RoleProtectedRoute roles={[ROLES.ADMIN]} />}>
        <Route element={<DashboardLayout />}>
          {/* User Management */}
          <Route path="/users" element={<UsersPage />} />

          {/* Book Transactions */}
          <Route path="/issue-book" element={<IssueBookPage />} />
          <Route path="/return-book" element={<ReturnBookPage />} />

          {/* Finance Management */}
          <Route path="/fines" element={<FinesPage />} />

          {/* Reporting & Analytics */}
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Route>

      {/* ============================================================
          404 - Not Found (Catch all remaining routes)
          ============================================================ */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
