/**
 * Frontend Services Index
 * ======================
 *
 * Central export point for all frontend services, hooks, and utilities
 * Simplifies imports across the application
 */

// ============================================================================
// API SERVICES
// ============================================================================
export { default as authApi } from '@/api/authApi';
export { default as bookApi } from '@/api/bookApi';
export { default as userApi } from '@/api/userApi';
export { default as issueApi } from '@/api/issueApi';
export { default as fineApi } from '@/api/fineApi';
export { default as transactionApi } from '@/api/transactionApi';
export { default as dashboardApi } from '@/api/dashboardApi';
export { default as apiClient } from '@/api/client';

// ============================================================================
// CUSTOM HOOKS
// ============================================================================
export { useApi } from '@/hooks/useApi';
export { useForm } from '@/hooks/useForm';
export { useDebounce } from '@/hooks/useDebounce';

// ============================================================================
// AUTH & CONTEXT
// ============================================================================
export { useAuth, AuthProvider } from '@/context/AuthContext';
export { default as UserContext } from '@/context/UserContext';

// ============================================================================
// UTILITIES
// ============================================================================
export { tokenUtils } from '@/utils/tokenUtils';
export { authUtils } from '@/utils/authUtils';
export {
  handleApiError,
  validateApiResponse,
  handleValidationError,
  createErrorObject,
  extractErrorMessage,
  getStatusCodeMessage,
  API_ERROR_CODES,
} from '@/utils/apiErrorHandler';

export {
  getToken,
  getStoredUser,
  setSession,
  clearSession,
  setStoredUser,
} from '@/utils/storage';

export {
  TOKEN_KEY,
  USER_KEY,
  ROLES,
  BOOK_STATUSES,
  ISSUE_STATUSES,
  FINE_STATUSES,
  TRANSACTION_TYPES,
} from '@/utils/constants';

export {
  currency,
  dateTime,
  dateOnly,
  capitalize,
} from '@/utils/formatters';

// ============================================================================
// ROUTES
// ============================================================================
export { default as ProtectedRoute } from '@/routes/ProtectedRoute';
export { default as RoleProtectedRoute } from '@/routes/RoleProtectedRoute';
