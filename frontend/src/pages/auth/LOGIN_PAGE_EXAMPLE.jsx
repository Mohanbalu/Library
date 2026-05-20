/**
 * Example: Login Page Implementation
 * ==================================
 *
 * This is a reference implementation showing how to use:
 * - useForm hook for form handling
 * - useAuth context for authentication
 * - authUtils for validation
 * - Error handling and toast notifications
 */

/*
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from '@/hooks/useForm';
import { useAuth } from '@/context/AuthContext';
import { authUtils } from '@/utils/authUtils';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Validation function for form fields
  const validateForm = (fieldName, value, values) => {
    if (fieldName === 'email') {
      if (!value?.trim()) return 'Email is required';
      if (!isValidEmail(value)) return 'Please enter a valid email';
    }

    if (fieldName === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
    }

    return '';
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Initialize form with useForm hook
  const { 
    values, 
    errors, 
    touched,
    loading, 
    handleChange, 
    handleBlur,
    handleSubmit 
  } = useForm(
    { email: '', password: '' },
    async (formValues) => {
      try {
        await login(formValues);
        // Redirect to where user came from or dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } catch (error) {
        // Error is already displayed via toast notification
        // Error handling is done in the useForm hook
      }
    },
    validateForm
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                touched.email && errors.email
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  touched.password && errors.password
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⏳</span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign up
          </a>
        </p>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900">Demo Credentials:</p>
          <p className="text-sm text-blue-800 mt-1">
            Email: admin@example.com
          </p>
          <p className="text-sm text-blue-800">Password: password123</p>
        </div>
      </div>
    </div>
  );
}
*/

export default {};
