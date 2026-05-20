# Frontend API Integration - Complete Setup

## Project Structure

```
frontend/src/
├── api/                    # API Layer
│   ├── client.js          # Axios instance with interceptors
│   ├── authApi.js         # Authentication endpoints
│   ├── bookApi.js         # Book management endpoints
│   ├── userApi.js         # User management endpoints
│   ├── issueApi.js        # Book issue/return endpoints
│   ├── fineApi.js         # Fine management endpoints
│   ├── transactionApi.js  # Transaction endpoints
│   ├── dashboardApi.js    # Dashboard endpoints
│   ├── INTEGRATION_EXAMPLES.js      # Code examples
│   └── API_INTEGRATION_GUIDE.md     # Detailed documentation
│
├── hooks/                 # Custom Hooks
│   ├── useApi.js         # API call hook with loading/error states
│   ├── useForm.js        # Form handling hook
│   └── useDebounce.js    # Debounce hook
│
├── context/              # React Context
│   ├── AuthContext.jsx   # Authentication state management
│   └── UserContext.jsx   # User state management
│
├── routes/               # Routing
│   ├── AppRoutes.jsx     # Main application routes
│   ├── ProtectedRoute.jsx         # Basic protected routes
│   └── RoleProtectedRoute.jsx     # Role-based protected routes
│
├── utils/                # Utility Functions
│   ├── tokenUtils.js     # JWT token utilities
│   ├── authUtils.js      # Authentication utilities
│   ├── apiErrorHandler.js        # Centralized error handling
│   ├── storage.js        # LocalStorage utilities
│   ├── constants.js      # Application constants
│   └── formatters.js     # Data formatters
│
├── services/
│   └── index.js          # Central exports for easy imports
│
├── components/
│   ├── common/
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ToastProvider.jsx
│   │   └── StatusBadge.jsx
│   ├── forms/
│   │   ├── FormInput.jsx
│   │   └── FormSelect.jsx
│   ├── tables/
│   │   └── DataTable.jsx
│   ├── charts/
│   │   └── AnalyticsCharts.jsx
│   └── dashboard/
│       ├── StatCard.jsx
│       └── RecentTransactionsTable.jsx
│
├── pages/                # Page Components
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── books/
│   │   ├── BooksPage.jsx
│   │   └── BookFormPage.jsx
│   ├── users/
│   │   └── UsersPage.jsx
│   ├── dashboard/
│   │   └── DashboardPage.jsx
│   ├── transactions/
│   │   ├── IssueBookPage.jsx
│   │   ├── ReturnBookPage.jsx
│   │   └── TransactionsPage.jsx
│   ├── fines/
│   │   └── FinesPage.jsx
│   ├── reports/
│   │   └── ReportsPage.jsx
│   ├── profile/
│   │   └── ProfilePage.jsx
│   ├── UnauthorizedPage.jsx
│   └── NotFoundPage.jsx
│
└── App.jsx
```

## Key Features Implemented

### 1. **API Layer (client.js)**
- ✅ Axios instance with custom configuration
- ✅ Request interceptor for JWT token injection
- ✅ Response interceptor for error handling
- ✅ Auto logout on 401 unauthorized
- ✅ Timeout configuration (30s)
- ✅ Request/response timing for monitoring

### 2. **Authentication (AuthContext.jsx)**
- ✅ JWT token management
- ✅ User session persistence
- ✅ Auto-hydration on app load
- ✅ Login/Register/Logout functionality
- ✅ Role-based access checks
- ✅ Automatic unauthorized event handling

### 3. **API Services**
- ✅ `authApi.js` - Login, Register, Me endpoints
- ✅ `bookApi.js` - CRUD operations on books
- ✅ `userApi.js` - User management
- ✅ `issueApi.js` - Book issue/return operations
- ✅ `fineApi.js` - Fine collection/waiver
- ✅ `transactionApi.js` - Transaction history
- ✅ `dashboardApi.js` - Dashboard stats and analytics

### 4. **Custom Hooks**
- ✅ `useApi` - API calls with loading/error states
- ✅ `useForm` - Form handling with validation
- ✅ `useDebounce` - Debounce hook for search

### 5. **Error Handling (apiErrorHandler.js)**
- ✅ Centralized error message extraction
- ✅ Status code-specific handling
- ✅ Validation error formatting
- ✅ Toast notifications for errors
- ✅ Custom error object creation

### 6. **JWT Token Utilities (tokenUtils.js)**
- ✅ Token decoding
- ✅ Expiration checking
- ✅ Token validity validation
- ✅ User info extraction
- ✅ Remaining time calculation

### 7. **Route Protection**
- ✅ `ProtectedRoute` - Basic authentication requirement
- ✅ `RoleProtectedRoute` - Role-based access control
- ✅ Auto-redirect to login for unauthenticated
- ✅ Unauthorized page for insufficient permissions

### 8. **Storage Utilities (storage.js)**
- ✅ Secure token storage in localStorage
- ✅ User data persistence
- ✅ Safe session clearing
- ✅ Error-safe JSON parsing

## Installation & Setup

### Step 1: Backend Configuration

Ensure your Spring Boot backend is running at `http://localhost:8080/api`

```bash
# Backend should have these endpoints:
POST /api/auth/login
POST /api/auth/register
GET /api/auth/me
# ... other endpoints as documented
```

### Step 2: Environment Variables

Create `.env.local` in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Step 3: Install Dependencies

```bash
cd frontend
npm install
```

All required packages are already in `package.json`:
- `axios` - HTTP client
- `react-router-dom` - Routing
- `react-hot-toast` - Notifications
- `recharts` - Charts
- `tailwindcss` - Styling

### Step 4: Start Development Server

```bash
npm run dev
```

Application will be available at `http://localhost:5173`

## Usage Examples

### Example 1: Simple API Call

```jsx
import { useApi } from '@/services';
import { bookApi } from '@/services';

function BooksList() {
  const { data, loading, execute } = useApi(bookApi.list);

  useEffect(() => {
    execute({ page: 1, limit: 10 });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{data?.map(book => <p>{book.title}</p>)}</div>;
}
```

### Example 2: Form Submission

```jsx
import { useForm, useApi } from '@/services';
import { bookApi } from '@/services';

function AddBook() {
  const { loading, execute } = useApi(bookApi.create, {
    showSuccessToast: true,
    successMessage: 'Book added successfully',
  });

  const { values, errors, handleChange, handleSubmit } = useForm(
    { title: '', author: '', isbn: '' },
    (data) => execute(data)
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <button disabled={loading}>Submit</button>
    </form>
  );
}
```

### Example 3: Protected Route

```jsx
import { RoleProtectedRoute } from '@/services';
import { ROLES } from '@/services';

<Routes>
  <Route element={<RoleProtectedRoute roles={[ROLES.ADMIN]} />}>
    <Route path="/admin/users" element={<Users />} />
  </Route>
</Routes>
```

### Example 4: Authentication

```jsx
import { useAuth } from '@/services';

function LoginForm() {
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (error) {
      // Error already shown via toast
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## API Endpoints Reference

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user profile

### Books
- `GET /books` - List books
- `GET /books/{id}` - Get book details
- `POST /books` - Create book
- `PUT /books/{id}` - Update book
- `DELETE /books/{id}` - Delete book
- `GET /books/summary` - Book statistics

### Issues
- `POST /issues` - Issue a book
- `POST /issues/return` - Return a book
- `GET /issues` - List issues
- `GET /issues/overdue` - Get overdue issues

### Users
- `GET /users` - List users
- `GET /users/{id}` - Get user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Fines
- `GET /fines` - List fines
- `POST /fines/{id}/collect` - Collect fine
- `POST /fines/{id}/waive` - Waive fine

### Transactions
- `GET /transactions` - List transactions
- `GET /transactions/summary` - Transaction stats

### Dashboard
- `GET /dashboard/stats` - Dashboard statistics
- `GET /dashboard/analytics` - Analytics data
- `GET /dashboard/recent-transactions` - Recent transactions

## Error Handling

Errors are automatically handled by the API client and displayed via toast notifications:

- **400 Bad Request** - Validation errors shown with field-specific messages
- **401 Unauthorized** - Auto-logout and redirect to login
- **403 Forbidden** - Redirect to unauthorized page
- **404 Not Found** - Show "Resource not found" message
- **500+ Server Errors** - Show generic server error message
- **Network Errors** - Show connection error message

## Token Management

The system automatically:
1. Stores JWT token in localStorage
2. Injects token in `Authorization: Bearer {token}` header
3. Validates token on app load
4. Refreshes user session if needed
5. Clears token on logout or 401 response
6. Redirects to login on token expiry

## Security Considerations

✅ **Implemented Security Features:**
1. JWT token storage in localStorage (consider httpOnly for higher security)
2. Automatic token injection in headers
3. Token expiration checking
4. Secure session clearing on logout
5. HTTPS ready for production
6. CORS handled by backend
7. XSS protection via React's built-in escaping

## Development Workflow

```
1. Design API requirements
2. Create API service in src/api/
3. Create custom hook if needed (useApi)
4. Import and use in component
5. Handle loading and error states
6. Test with backend endpoints
```

## Troubleshooting

### Token Not Being Sent
- Check if token exists: `localStorage.getItem('smart-library-token')`
- Verify request interceptor is working
- Check backend authorization header parsing

### Auto Logout Not Working
- Ensure backend returns 401 for expired tokens
- Check if `auth:unauthorized` event listener is active
- Verify clearSession() is being called

### CORS Errors
- Configure CORS on backend
- Ensure base URL is correct
- Check if credentials are being sent (if needed)

### Form Validation Not Working
- Ensure validate function is passed to useForm
- Check field names match form values
- Verify error state is being displayed

## Next Steps

1. Implement specific page components (LoginPage, DashboardPage, etc.)
2. Add more sophisticated error recovery strategies
3. Implement request retry logic for critical operations
4. Add API request caching
5. Implement real-time updates with WebSockets
6. Add offline support with service workers
7. Implement analytics tracking

## Support & Resources

- API Integration Guide: See `src/api/API_INTEGRATION_GUIDE.md`
- Integration Examples: See `src/api/INTEGRATION_EXAMPLES.js`
- Component Examples: Check individual component files
- Utility Functions: Available in `src/utils/`

---

**Last Updated:** May 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
