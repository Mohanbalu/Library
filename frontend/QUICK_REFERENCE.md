/**
 * QUICK REFERENCE GUIDE
 * ====================
 *
 * Copy-paste templates for common tasks
 * Use these as starting points for your implementations
 */

// ============================================================================
// AUTHENTICATION
// ============================================================================

/**
 * LOGIN COMPONENT
 */
/*
import { useAuth } from '@/services';
import { useForm } from '@/services';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { values, errors, loading, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (data) => {
      await login(data);
      navigate('/dashboard');
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      <input name="password" value={values.password} onChange={handleChange} type="password" />
      <button disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
    </form>
  );
}
*/

/**
 * CHECK AUTH STATUS
 */
/*
import { useAuth } from '@/services';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
*/

// ============================================================================
// FETCH DATA
// ============================================================================

/**
 * SIMPLE LIST FETCH
 */
/*
import { useApi } from '@/services';
import { bookApi } from '@/services';
import { useEffect } from 'react';

function BooksList() {
  const { data, loading, error, execute } = useApi(bookApi.list);

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
*/

/**
 * FETCH WITH PARAMETERS
 */
/*
import { useApi } from '@/services';
import { bookApi } from '@/services';
import { useState, useEffect } from 'react';

function SearchBooks() {
  const [search, setSearch] = useState('');
  const { data, execute } = useApi(bookApi.list);

  useEffect(() => {
    const timer = setTimeout(() => {
      execute({ page: 1, limit: 10, search });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search books..."
      />
      {data?.map((book) => <div key={book.id}>{book.title}</div>)}
    </div>
  );
}
*/

// ============================================================================
// CREATE/UPDATE
// ============================================================================

/**
 * CREATE WITH FORM
 */
/*
import { useForm } from '@/services';
import { useApi } from '@/services';
import { bookApi } from '@/services';

function AddBook() {
  const { execute } = useApi(bookApi.create, {
    showSuccessToast: true,
    successMessage: 'Book added!',
  });

  const { values, errors, handleChange, handleSubmit } = useForm(
    { title: '', author: '', isbn: '' },
    (data) => execute(data)
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      {errors.title && <span>{errors.title}</span>}

      <input name="author" value={values.author} onChange={handleChange} />
      {errors.author && <span>{errors.author}</span>}

      <button type="submit">Add Book</button>
    </form>
  );
}
*/

/**
 * UPDATE FORM
 */
/*
import { useForm } from '@/services';
import { bookApi } from '@/services';
import { useParams } from 'react-router-dom';

function EditBook() {
  const { bookId } = useParams();

  const { values, handleChange, handleSubmit } = useForm(
    { title: '', author: '', isbn: '' },
    (data) => bookApi.update(bookId, data)
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
}
*/

// ============================================================================
// DELETE
// ============================================================================

/**
 * DELETE WITH CONFIRMATION
 */
/*
import { useApi } from '@/services';
import { bookApi } from '@/services';
import { useState } from 'react';

function DeleteBook({ bookId, onDeleted }) {
  const [confirm, setConfirm] = useState(false);
  const { loading, execute } = useApi(bookApi.remove, {
    showSuccessToast: true,
    successMessage: 'Book deleted',
    onSuccess: onDeleted,
  });

  const handleDelete = () => {
    execute(bookId);
  };

  return (
    <div>
      {!confirm ? (
        <button onClick={() => setConfirm(true)}>Delete</button>
      ) : (
        <div>
          <p>Are you sure?</p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Confirm'}
          </button>
          <button onClick={() => setConfirm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
*/

// ============================================================================
// PROTECTED ROUTES
// ============================================================================

/**
 * BASIC PROTECTED ROUTE
 */
/*
import { ProtectedRoute } from '@/services';
import { DashboardPage } from './pages';

<Routes>
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<DashboardPage />} />
  </Route>
</Routes>
*/

/**
 * ADMIN-ONLY ROUTE
 */
/*
import { RoleProtectedRoute, ROLES } from '@/services';
import { AdminPanel } from './pages';

<Routes>
  <Route element={<RoleProtectedRoute roles={[ROLES.ADMIN]} />}>
    <Route path="/admin" element={<AdminPanel />} />
  </Route>
</Routes>
*/

/**
 * MULTI-ROLE ROUTE
 */
/*
import { RoleProtectedRoute, ROLES } from '@/services';

<Routes>
  <Route element={<RoleProtectedRoute roles={[ROLES.ADMIN, ROLES.STAFF]} />}>
    <Route path="/operations" element={<Operations />} />
  </Route>
</Routes>
*/

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * CUSTOM ERROR HANDLING
 */
/*
import { useApi } from '@/services';
import { bookApi } from '@/services';
import { useNavigate } from 'react-router-dom';

function FetchBooks() {
  const navigate = useNavigate();

  const { data, execute } = useApi(bookApi.list, {
    showErrorToast: true,
    onUnauthorized: () => navigate('/login'),
  });

  const loadBooks = async () => {
    try {
      await execute();
    } catch (error) {
      console.error('Failed to load books:', error);
    }
  };

  return <button onClick={loadBooks}>Load Books</button>;
}
*/

// ============================================================================
// TOKEN MANAGEMENT
// ============================================================================

/**
 * CHECK TOKEN STATUS
 */
/*
import { tokenUtils } from '@/services';
import { getToken } from '@/services';

function TokenStatus() {
  const token = getToken();

  if (tokenUtils.isExpired(token)) {
    console.log('Token expired');
  }

  if (tokenUtils.isExpiringSoon(token, 300)) {
    console.log('Token expiring in 5 minutes');
  }

  const remaining = tokenUtils.getTimeRemaining(token);
  console.log(`Time remaining: ${remaining} seconds`);
}
*/

// ============================================================================
// ROLE CHECKING
// ============================================================================

/**
 * CHECK USER ROLES
 */
/*
import { authUtils } from '@/services';
import { useAuth } from '@/services';

function Dashboard() {
  const { user } = useAuth();

  if (authUtils.isAdmin(user)) {
    return <AdminDashboard />;
  }

  if (authUtils.isRegularUser(user)) {
    return <UserDashboard />;
  }

  return <GuestView />;
}
*/

/**
 * CONDITIONAL RENDERING BY ROLE
 */
/*
import { authUtils, ROLES } from '@/services';
import { useAuth } from '@/services';

function Navigation() {
  const { user } = useAuth();

  return (
    <nav>
      <a href="/dashboard">Dashboard</a>

      {authUtils.hasAnyRole(user, [ROLES.ADMIN]) && (
        <>
          <a href="/admin/users">Users</a>
          <a href="/admin/reports">Reports</a>
        </>
      )}
    </nav>
  );
}
*/

// ============================================================================
// MULTIPLE API CALLS
// ============================================================================

/**
 * PARALLEL API CALLS
 */
/*
import { useApi } from '@/services';
import { dashboardApi } from '@/services';
import { issueApi } from '@/services';
import { useEffect } from 'react';

function Dashboard() {
  const statsApi = useApi(dashboardApi.stats);
  const overdueApi = useApi(issueApi.overdue);

  useEffect(() => {
    statsApi.execute();
    overdueApi.execute();
  }, []);

  const loading = statsApi.loading || overdueApi.loading;

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Stats: {statsApi.data?.totalBooks}</p>
          <p>Overdue: {overdueApi.data?.length}</p>
        </>
      )}
    </div>
  );
}
*/

/**
 * SEQUENTIAL API CALLS
 */
/*
import { useApi } from '@/services';
import { bookApi } from '@/services';
import { issueApi } from '@/services';
import { useEffect } from 'react';

function BookDetails({ bookId }) {
  const bookApi_instance = useApi(bookApi.getById);
  const issuesApi_instance = useApi(issueApi.list);

  useEffect(() => {
    bookApi_instance.execute(bookId).then(() => {
      issuesApi_instance.execute({ bookId });
    });
  }, [bookId]);

  return (
    <div>
      <h1>{bookApi_instance.data?.title}</h1>
      <p>Issues: {issuesApi_instance.data?.length}</p>
    </div>
  );
}
*/

// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * SEARCH WITH DEBOUNCE
 */
/*
import { useState, useEffect } from 'react';
import { useDebounce } from '@/services';
import { bookApi } from '@/services';

function SearchBooks() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!debouncedQuery) return;

    bookApi.list({ search: debouncedQuery }).then((res) => {
      setResults(res.data);
    });
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <div>
        {results.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </div>
  );
}
*/

/**
 * PAGINATION
 */
/*
import { useState, useEffect } from 'react';
import { bookApi } from '@/services';

function PaginatedBooks() {
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    bookApi.list({ page, limit: 10 }).then((res) => {
      setBooks(res.data);
    });
  }, [page]);

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
*/

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * FORMAT DATA
 */
/*
import { currency, dateTime, capitalize } from '@/services';

function Transaction({ amount, date, status }) {
  return (
    <div>
      <p>Amount: {currency(amount)}</p>
      <p>Date: {dateTime(date)}</p>
      <p>Status: {capitalize(status)}</p>
    </div>
  );
}
*/

/**
 * CLEAR STORAGE
 */
/*
import { clearSession } from '@/services';

function Logout() {
  const handleLogout = () => {
    clearSession();
    window.location.href = '/login';
  };

  return <button onClick={handleLogout}>Logout</button>;
}
*/

// ============================================================================
// EXPORT
// ============================================================================

export const QUICK_REFERENCE = {
  auth: 'Login, Check Auth, Logout',
  api: 'Fetch, Create, Update, Delete',
  routes: 'Protected, Admin-only, Multi-role',
  forms: 'Validation, Submission, Error handling',
  tokens: 'Check expiry, Extract info, Validate',
  roles: 'Check permission, Conditional rendering',
  utils: 'Format data, Storage, Error handling',
};
