/**
 * API INTEGRATION GUIDE
 * =====================
 *
 * Complete guide for integrating frontend with Spring Boot backend APIs
 * for the Smart Library Book Issue & Return Management System
 */

// ============================================================================
// 1. ARCHITECTURE OVERVIEW
// ============================================================================

/**
 * API Layer Architecture:
 *
 * src/api/
 * ├── client.js           - Axios instance with interceptors
 * ├── authApi.js          - Authentication endpoints
 * ├── bookApi.js          - Book management endpoints
 * ├── userApi.js          - User management endpoints
 * ├── issueApi.js         - Book issue/return endpoints
 * ├── fineApi.js          - Fine management endpoints
 * ├── transactionApi.js   - Transaction endpoints
 * └── dashboardApi.js     - Dashboard/analytics endpoints
 *
 * Request Flow:
 * Component → useApi Hook → API Service → Axios Client → Interceptors → Backend
 *
 * Response Flow:
 * Backend → Axios Response Interceptor → API Service → useApi Hook → Component
 */

// ============================================================================
// 2. BASE URL CONFIGURATION
// ============================================================================

/**
 * Set backend API base URL via environment variables:
 *
 * File: .env.local
 * VITE_API_BASE_URL=http://localhost:8080/api
 *
 * For production:
 * VITE_API_BASE_URL=https://api.yourdomain.com/api
 *
 * Default: http://localhost:8080/api
 */

// ============================================================================
// 3. JWT TOKEN HANDLING
// ============================================================================

/**
 * Token Storage & Retrieval:
 *
 * - Tokens are stored in localStorage
 * - Keys: 'smart-library-token', 'smart-library-user'
 * - Automatically injected in request headers as: Authorization: Bearer {token}
 * - Auto-cleared on 401 unauthorized response
 *
 * Token Lifecycle:
 * 1. User logs in → Token received → Stored in localStorage
 * 2. Token auto-attached to all API requests via interceptor
 * 3. Token validated on app load via authApi.me()
 * 4. On token expiry (401 response) → Auto logout & redirect to login
 * 5. User logout → Token cleared from storage
 */

// ============================================================================
// 4. AUTHENTICATION API ENDPOINTS
// ============================================================================

/**
 * POST /auth/login
 * ----------------
 * Login with email and password
 *
 * Request:
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 *
 * Response:
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIs...",
 *   "user": {
 *     "id": 1,
 *     "email": "user@example.com",
 *     "name": "John Doe",
 *     "role": {
 *       "roleCode": "USER",
 *       "roleName": "Regular User"
 *     }
 *   }
 * }
 *
 * Usage:
 * const { login } = useAuth();
 * await login({ email: 'user@example.com', password: 'password123' });
 */

/**
 * POST /auth/register
 * -------------------
 * Register new user
 *
 * Request:
 * {
 *   "name": "John Doe",
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 *
 * Response: Same as login
 *
 * Usage:
 * const { register } = useAuth();
 * await register(formData);
 */

/**
 * GET /auth/me
 * -----------
 * Get current authenticated user profile
 *
 * Response: User object
 *
 * Usage:
 * Called automatically on app load to validate token and restore session
 */

// ============================================================================
// 5. BOOK API ENDPOINTS
// ============================================================================

/**
 * GET /books
 * ----------
 * Fetch list of books with pagination and filtering
 *
 * Query Parameters:
 * - page: number (default: 1)
 * - limit: number (default: 10)
 * - status: string (ACTIVE, INACTIVE, ARCHIVED)
 * - search: string (search by title/author/isbn)
 *
 * Response:
 * {
 *   "data": [
 *     {
 *       "id": 1,
 *       "title": "The Great Gatsby",
 *       "author": "F. Scott Fitzgerald",
 *       "isbn": "978-0743273565",
 *       "status": "ACTIVE",
 *       "totalCopies": 5,
 *       "availableCopies": 3
 *     }
 *   ],
 *   "total": 100,
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * Usage:
 * const { data, execute } = useApi(bookApi.list);
 * await execute({ page: 1, limit: 10 });
 */

/**
 * GET /books/{id}
 * ---------------
 * Fetch single book by ID
 *
 * Response: Book object
 *
 * Usage:
 * const { data } = useApi(bookApi.getById);
 * await execute(bookId);
 */

/**
 * POST /books
 * -----------
 * Create new book (Admin only)
 *
 * Request:
 * {
 *   "title": "The Great Gatsby",
 *   "author": "F. Scott Fitzgerald",
 *   "isbn": "978-0743273565",
 *   "description": "...",
 *   "publishedYear": 1925,
 *   "totalCopies": 5
 * }
 *
 * Response: Created book object
 *
 * Usage:
 * await bookApi.create(bookData);
 */

/**
 * PUT /books/{id}
 * ---------------
 * Update existing book (Admin only)
 *
 * Response: Updated book object
 *
 * Usage:
 * await bookApi.update(bookId, updatedData);
 */

/**
 * DELETE /books/{id}
 * ------------------
 * Delete book (Admin only)
 *
 * Response: Success message
 *
 * Usage:
 * await bookApi.remove(bookId);
 */

/**
 * GET /books/summary
 * ------------------
 * Get book statistics summary
 *
 * Response:
 * {
 *   "totalBooks": 150,
 *   "activeBooks": 145,
 *   "inactiveBooks": 5
 * }
 */

// ============================================================================
// 6. ISSUE API ENDPOINTS
// ============================================================================

/**
 * POST /issues
 * -----------
 * Issue a book to user
 *
 * Request:
 * {
 *   "userId": 1,
 *   "bookId": 1,
 *   "dueDate": "2024-06-20"
 * }
 *
 * Response:
 * {
 *   "id": 1,
 *   "userId": 1,
 *   "bookId": 1,
 *   "issuedDate": "2024-05-20",
 *   "dueDate": "2024-06-20",
 *   "status": "ISSUED"
 * }
 *
 * Usage:
 * await issueApi.issueBook({ userId, bookId, dueDate });
 */

/**
 * POST /issues/return
 * ------------------
 * Return issued book
 *
 * Request:
 * {
 *   "issueId": 1,
 *   "returnDate": "2024-05-25"
 * }
 *
 * Response: Updated issue object with RETURNED status
 *
 * Usage:
 * await issueApi.returnBook({ issueId, returnDate });
 */

/**
 * GET /issues
 * -----------
 * List all issues with filtering
 *
 * Query Parameters:
 * - userId: number
 * - status: string (ISSUED, RETURNED, OVERDUE, LOST)
 * - page: number
 * - limit: number
 *
 * Response: Paginated issues list
 *
 * Usage:
 * const { data } = useApi(issueApi.list);
 * await execute({ status: 'ISSUED', page: 1 });
 */

/**
 * GET /issues/overdue
 * ------------------
 * Get all overdue issues
 *
 * Response:
 * [
 *   {
 *     "id": 1,
 *     "user": { "id": 1, "name": "John", "email": "john@example.com" },
 *     "book": { "id": 1, "title": "The Great Gatsby" },
 *     "issuedDate": "2024-03-20",
 *     "dueDate": "2024-04-20",
 *     "daysOverdue": 30
 *   }
 * ]
 *
 * Usage:
 * const { data } = useApi(issueApi.overdue);
 * await execute();
 */

// ============================================================================
// 7. USER API ENDPOINTS
// ============================================================================

/**
 * GET /users
 * ----------
 * List all users with pagination
 *
 * Response: Paginated users list
 *
 * Usage:
 * const { data } = useApi(userApi.list);
 * await execute({ page: 1, limit: 10 });
 */

/**
 * GET /users/{id}
 * ---------------
 * Fetch user by ID
 *
 * Response: User object
 */

/**
 * PUT /users/{id}
 * ---------------
 * Update user (Admin can update anyone, users can update themselves)
 *
 * Request:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "phone": "1234567890"
 * }
 *
 * Response: Updated user object
 */

/**
 * DELETE /users/{id}
 * ------------------
 * Delete user (Admin only)
 *
 * Response: Success message
 */

/**
 * GET /users/profile
 * ------------------
 * Get current user profile
 *
 * Response: Current user object
 */

// ============================================================================
// 8. FINE API ENDPOINTS
// ============================================================================

/**
 * GET /fines
 * ----------
 * List fines with filtering
 *
 * Query Parameters:
 * - userId: number
 * - status: string (PENDING, PARTIALLY_PAID, PAID, WAIVED)
 * - page: number
 * - limit: number
 *
 * Response: Paginated fines list
 *
 * Usage:
 * const { data } = useApi(fineApi.list);
 * await execute({ status: 'PENDING' });
 */

/**
 * POST /fines/{id}/collect
 * -------------------------
 * Pay/collect fine amount
 *
 * Request:
 * {
 *   "amount": 50,
 *   "paymentMethod": "CASH",
 *   "paymentDate": "2024-05-20"
 * }
 *
 * Response: Updated fine object
 *
 * Usage:
 * await fineApi.collect(fineId, paymentData);
 */

/**
 * POST /fines/{id}/waive
 * ----------------------
 * Waive/forgive fine (Admin only)
 *
 * Request:
 * {
 *   "reason": "Book returned in damaged condition",
 *   "approvedBy": "admin@example.com"
 * }
 *
 * Response: Updated fine object with WAIVED status
 *
 * Usage:
 * await fineApi.waive(fineId, waiveData);
 */

// ============================================================================
// 9. TRANSACTION API ENDPOINTS
// ============================================================================

/**
 * GET /transactions
 * -----------------
 * List all transactions with filtering
 *
 * Query Parameters:
 * - type: string (ISSUE, RETURN, FINE_PAYMENT, FINE_WAIVER)
 * - page: number
 * - limit: number
 *
 * Response: Paginated transactions list
 *
 * Usage:
 * const { data } = useApi(transactionApi.list);
 * await execute({ type: 'ISSUE', page: 1 });
 */

/**
 * GET /transactions/summary
 * -------------------------
 * Get transaction statistics
 *
 * Response:
 * {
 *   "totalTransactions": 1000,
 *   "issueCount": 500,
 *   "returnCount": 450,
 *   "finePayments": 50
 * }
 */

// ============================================================================
// 10. DASHBOARD API ENDPOINTS
// ============================================================================

/**
 * GET /dashboard/stats
 * --------------------
 * Get dashboard statistics
 *
 * Response:
 * {
 *   "totalBooks": 150,
 *   "activeIssues": 45,
 *   "overdueIssues": 5,
 *   "pendingFines": 2000,
 *   "totalUsers": 50,
 *   "activeUsers": 40,
 *   "recentTransactions": 25
 * }
 *
 * Usage:
 * const { data } = useApi(dashboardApi.stats);
 * await execute();
 */

/**
 * GET /dashboard/analytics
 * -------------------------
 * Get detailed analytics data
 *
 * Query Parameters:
 * - period: string (TODAY, WEEK, MONTH, YEAR)
 *
 * Response:
 * {
 *   "issuesByCategory": {...},
 *   "returnRate": 95,
 *   "fineCollectionRate": 80,
 *   "topBooks": [...],
 *   "activeUsers": 40
 * }
 *
 * Usage:
 * const { data } = useApi(dashboardApi.analytics);
 * await execute({ period: 'MONTH' });
 */

/**
 * GET /dashboard/recent-transactions
 * -----------------------------------
 * Get recent transactions
 *
 * Query Parameters:
 * - limit: number (default: 10)
 *
 * Response: Array of recent transaction objects
 *
 * Usage:
 * const { data } = useApi(dashboardApi.recentTransactions);
 * await execute(10);
 */

// ============================================================================
// 11. ERROR HANDLING
// ============================================================================

/**
 * Error Responses from API:
 *
 * 400 Bad Request:
 * {
 *   "message": "Invalid request parameters",
 *   "errors": {
 *     "email": "Email already exists",
 *     "password": "Password too weak"
 *   }
 * }
 *
 * 401 Unauthorized:
 * {
 *   "message": "Token expired or invalid"
 * }
 * → Auto logout and redirect to login
 *
 * 403 Forbidden:
 * {
 *   "message": "You do not have permission to perform this action"
 * }
 *
 * 404 Not Found:
 * {
 *   "message": "Resource not found"
 * }
 *
 * 500 Internal Server Error:
 * {
 *   "message": "Internal server error"
 * }
 */

// ============================================================================
// 12. COMMON INTEGRATION PATTERNS
// ============================================================================

/**
 * Pattern 1: Simple Data Fetching
 * --------------------------------
 */
/*
import { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import bookApi from '@/api/bookApi';

function BooksList() {
  const { data: books, loading, execute } = useApi(bookApi.list);

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{books?.length} books found</div>;
}
*/

/**
 * Pattern 2: Form Submission
 * ----------------------------
 */
/*
import { useForm } from '@/hooks/useForm';
import bookApi from '@/api/bookApi';

function AddBookForm() {
  const { values, errors, loading, handleChange, handleSubmit } = useForm(
    { title: '', author: '', isbn: '' },
    async (data) => {
      await bookApi.create(data);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      {errors.title && <span>{errors.title}</span>}
      <button disabled={loading}>Submit</button>
    </form>
  );
}
*/

/**
 * Pattern 3: Protected Admin Route
 * ---------------------------------
 */
/*
import RoleProtectedRoute from '@/routes/RoleProtectedRoute';
import { ROLES } from '@/utils/constants';

<Routes>
  <Route element={<RoleProtectedRoute roles={[ROLES.ADMIN]} />}>
    <Route path="/admin/users" element={<UsersManagement />} />
    <Route path="/admin/books" element={<BookManagement />} />
  </Route>
</Routes>
*/

/**
 * Pattern 4: JWT Token Validation
 * --------------------------------
 */
/*
import { tokenUtils } from '@/utils/tokenUtils';
import { getToken } from '@/utils/storage';

function checkTokenStatus() {
  const token = getToken();
  
  if (tokenUtils.isExpired(token)) {
    console.log('Token expired');
  }
  
  if (tokenUtils.isExpiringSoon(token, 300)) {
    console.log('Token expiring in 5 minutes');
  }
  
  const info = tokenUtils.extractUserInfo(token);
  console.log('User ID:', info.userId);
}
*/

// ============================================================================
// 13. BEST PRACTICES
// ============================================================================

/**
 * 1. Always use the useApi hook for API calls
 * 2. Implement proper error handling and toast notifications
 * 3. Show loading states during API calls
 * 4. Validate form input before submission
 * 5. Use role-based route protection for admin endpoints
 * 6. Implement proper token refresh logic
 * 7. Clear sensitive data on logout
 * 8. Handle network errors gracefully
 * 9. Implement request retry logic for critical operations
 * 10. Monitor API response times in production
 */

export default {};
