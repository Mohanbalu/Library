import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
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

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute roles={[ROLES.ADMIN, ROLES.USER]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/new" element={<BookFormPage mode="create" />} />
          <Route path="/books/:bookId/edit" element={<BookFormPage mode="edit" />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/issue-book" element={<IssueBookPage />} />
          <Route path="/return-book" element={<ReturnBookPage />} />
          <Route path="/fines" element={<FinesPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
