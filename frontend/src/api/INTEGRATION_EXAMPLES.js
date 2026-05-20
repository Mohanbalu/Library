/**
 * API Integration Examples
 * ========================
 *
 * This file demonstrates how to use the API layer with React components
 * for common scenarios in the Library Management System
 */

// ============================================================================
// EXAMPLE 1: Login with Form Handling and Error Handling
// ============================================================================

/*
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useForm } from '@/hooks/useForm';
import { authUtils } from '@/utils/authUtils';

export function LoginPageExample() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = (fieldName, value, values) => {
    const validation = authUtils.validateLoginCredentials(values.email, values.password);
    return validation.errors[fieldName];
  };

  const { values, errors, loading, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (formValues) => {
      await login(formValues);
      navigate('/dashboard');
    },
    validateForm
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
*/

// ============================================================================
// EXAMPLE 2: Fetch and Display Books List
// ============================================================================

/*
import { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import bookApi from '@/api/bookApi';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export function BooksListExample() {
  const { data: books, loading, error, execute } = useApi(bookApi.list);

  useEffect(() => {
    execute({ page: 1, limit: 10 });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Failed to load books</div>;

  return (
    <div>
      {books?.data?.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 3: Issue a Book
// ============================================================================

/*
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useApi } from '@/hooks/useApi';
import issueApi from '@/api/issueApi';

export function IssueBookExample() {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');

  const { loading, execute } = useApi(issueApi.issueBook, {
    showSuccessToast: true,
    successMessage: 'Book issued successfully',
  });

  const handleIssueBook = async () => {
    try {
      await execute({
        userId: parseInt(userId),
        bookId: parseInt(bookId),
      });
      // Handle success
    } catch (error) {
      // Error already handled by useApi hook
    }
  };

  return (
    <div>
      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
      />
      <input
        type="number"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Book ID"
      />
      <button onClick={handleIssueBook} disabled={loading}>
        {loading ? 'Issuing...' : 'Issue Book'}
      </button>
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 4: Create/Update Book with Validation
// ============================================================================

/*
import { useApi } from '@/hooks/useApi';
import { useForm } from '@/hooks/useForm';
import bookApi from '@/api/bookApi';
import toast from 'react-hot-toast';

export function BookFormExample() {
  const { execute: createBook } = useApi(bookApi.create, {
    showSuccessToast: true,
    successMessage: 'Book created successfully',
  });

  const validateForm = (fieldName, value) => {
    const errors = {};

    if (fieldName === 'title' && !value?.trim()) {
      errors.title = 'Title is required';
    }

    if (fieldName === 'author' && !value?.trim()) {
      errors.author = 'Author is required';
    }

    if (fieldName === 'isbn' && !value?.trim()) {
      errors.isbn = 'ISBN is required';
    }

    return errors[fieldName] || '';
  };

  const { values, errors, loading, handleChange, handleSubmit } = useForm(
    {
      title: '',
      author: '',
      isbn: '',
      description: '',
      publishedYear: new Date().getFullYear(),
    },
    async (formValues) => {
      await createBook(formValues);
    },
    validateForm
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={values.title}
        onChange={handleChange}
        placeholder="Book Title"
      />
      {errors.title && <span className="error">{errors.title}</span>}

      <input
        name="author"
        value={values.author}
        onChange={handleChange}
        placeholder="Author"
      />
      {errors.author && <span className="error">{errors.author}</span>}

      <input
        name="isbn"
        value={values.isbn}
        onChange={handleChange}
        placeholder="ISBN"
      />
      {errors.isbn && <span className="error">{errors.isbn}</span>}

      <textarea
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <input
        type="number"
        name="publishedYear"
        value={values.publishedYear}
        onChange={handleChange}
        placeholder="Published Year"
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Book'}
      </button>
    </form>
  );
}
*/

// ============================================================================
// EXAMPLE 5: Fetch Dashboard Stats
// ============================================================================

/*
import { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import dashboardApi from '@/api/dashboardApi';

export function DashboardExample() {
  const { data: stats, loading, execute } = useApi(dashboardApi.stats, {
    showErrorToast: true,
  });

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <div>Loading stats...</div>;

  return (
    <div>
      <div>Total Books: {stats?.totalBooks}</div>
      <div>Active Issues: {stats?.activeIssues}</div>
      <div>Pending Fines: {stats?.pendingFines}</div>
      <div>Total Users: {stats?.totalUsers}</div>
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 6: Fetch Overdue Books
// ============================================================================

/*
import { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import issueApi from '@/api/issueApi';

export function OverdueBooksExample() {
  const { data: overdueBooks, loading, execute } = useApi(issueApi.overdue);

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Overdue Books</h2>
      {overdueBooks?.map((issue) => (
        <div key={issue.id}>
          <p>Book: {issue.book?.title}</p>
          <p>User: {issue.user?.name}</p>
          <p>Issued Date: {issue.issuedDate}</p>
          <p>Days Overdue: {issue.daysOverdue}</p>
        </div>
      ))}
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 7: Handle Unauthorized Access
// ============================================================================

/*
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function ProtectedComponentExample() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    // This component might check for specific permissions
    if (!isAdmin) {
      navigate('/unauthorized');
    }
  }, [isAdmin, navigate]);

  return <div>Admin Only Content</div>;
}
*/

// ============================================================================
// EXAMPLE 8: Handle Multiple API Calls
// ============================================================================

/*
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import dashboardApi from '@/api/dashboardApi';
import issueApi from '@/api/issueApi';

export function MultipleApisExample() {
  const statsApi = useApi(dashboardApi.stats);
  const overdueApi = useApi(issueApi.overdue);

  useEffect(() => {
    statsApi.execute();
    overdueApi.execute();
  }, []);

  const isLoading = statsApi.loading || overdueApi.loading;

  if (isLoading) return <div>Loading data...</div>;

  return (
    <div>
      <div>Stats: {JSON.stringify(statsApi.data)}</div>
      <div>Overdue: {JSON.stringify(overdueApi.data)}</div>
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 9: Handle Deletion with Confirmation
// ============================================================================

/*
import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import bookApi from '@/api/bookApi';

export function DeleteBookExample({ bookId }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const { loading, execute } = useApi(bookApi.remove, {
    showSuccessToast: true,
    successMessage: 'Book deleted successfully',
    onSuccess: () => {
      setShowConfirm(false);
      // Refresh the list or navigate
    },
  });

  const handleDelete = async () => {
    await execute(bookId);
  };

  return (
    <div>
      {!showConfirm ? (
        <button onClick={() => setShowConfirm(true)}>Delete Book</button>
      ) : (
        <div>
          <p>Are you sure you want to delete this book?</p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
*/

// ============================================================================
// EXAMPLE 10: Authentication Flow - Register and Login
// ============================================================================

/*
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useForm } from '@/hooks/useForm';
import { authUtils } from '@/utils/authUtils';

export function AuthFlowExample() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const validateForm = (fieldName, value, values) => {
    if (!isRegistering) {
      const validation = authUtils.validateLoginCredentials(values.email, values.password);
      return validation.errors[fieldName];
    } else {
      const validation = authUtils.validateRegistrationData(values);
      return validation.errors[fieldName];
    }
  };

  const { values, errors, loading, handleChange, handleSubmit, reset } = useForm(
    isRegistering
      ? {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }
      : {
          email: '',
          password: '',
        },
    async (formValues) => {
      if (isRegistering) {
        await register(formValues);
      }
      navigate('/dashboard');
    },
    validateForm
  );

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    reset();
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>

      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </>
        )}

        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}

        {isRegistering && (
          <>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      <p onClick={toggleMode} style={{ cursor: 'pointer' }}>
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </p>
    </div>
  );
}
*/

export default {};
