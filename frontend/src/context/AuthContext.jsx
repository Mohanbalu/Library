import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import authApi from '@/api/authApi';
import { clearSession, getStoredUser, getToken, setSession, setStoredUser } from '@/utils/storage';
import { ROLES } from '@/utils/constants';

const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Manages authentication state, JWT tokens, and user session
 *
 * Features:
 * - Persistent session management
 * - Automatic token hydration on app load
 * - Login/Register/Logout functionality
 * - Auto logout on unauthorized (401) responses
 * - User profile refresh
 * - Role-based authentication checks
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(Boolean(getToken()));

  /**
   * Listen for unauthorized events from API client
   * Auto logout when receiving 401 responses
   */
  useEffect(() => {
    const handleUnauthorized = () => logout(false);
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  /**
   * Hydrate user data from token on app load
   * Validates stored token and fetches current user profile
   */
  useEffect(() => {
    let active = true;

    const hydrate = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await authApi.me();
        if (!active) return;

        const userData = profile?.data ?? profile?.user ?? profile ?? null;
        setUser(userData);
        setStoredUser(userData);
      } catch (error) {
        console.error('Session hydration failed:', error);
        clearSession();
        if (active) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    hydrate();
    return () => {
      active = false;
    };
  }, [token]);

  /**
   * Login function
   * @param {Object} credentials - { email, password }
   * @returns {Object} Auth payload with token and user info
   */
  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const authPayload = response?.data ?? response;

      setToken(authPayload?.token);
      const userData = authPayload?.user ?? authPayload?.profile ?? null;
      setUser(userData);
      setSession({ token: authPayload?.token, user: userData });

      toast.success('Logged in successfully');
      return authPayload;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  /**
   * Register function
   * @param {Object} payload - { email, password, name, etc. }
   * @returns {Object} Auth payload with token and user info
   */
  const register = async (payload) => {
    try {
      const response = await authApi.register(payload);
      const authPayload = response?.data ?? response;

      if (authPayload?.token) {
        setToken(authPayload.token);
        const userData = authPayload?.user ?? null;
        setUser(userData);
        setSession({ token: authPayload.token, user: userData });
      }

      toast.success('Registration completed');
      return authPayload;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  /**
   * Logout function
   * @param {Boolean} showToast - Show success toast notification
   */
  const logout = (showToast = true) => {
    clearSession();
    setToken(null);
    setUser(null);
    if (showToast) toast.success('Logged out successfully');
  };

  /**
   * Refresh user profile from server
   * @returns {Object} Updated user data
   */
  const refreshUser = async () => {
    try {
      const profile = await authApi.me();
      const userData = profile?.data ?? profile?.user ?? profile ?? null;
      setUser(userData);
      setStoredUser(userData);
      return userData;
    } catch (error) {
      console.error('User refresh error:', error);
      throw error;
    }
  };

  /**
   * Manually update user data
   */
  const updateUser = (userData) => {
    setUser(userData);
    setStoredUser(userData);
  };

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      // State
      token,
      user,
      loading,

      // Derived state
      isAuthenticated: Boolean(token),
      isAdmin: user?.role?.roleCode === ROLES.ADMIN || user?.role === ROLES.ADMIN,
      isUser: user?.role?.roleCode === ROLES.USER || user?.role === ROLES.USER,

      // Methods
      login,
      register,
      logout,
      refreshUser,
      setUser: updateUser,
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth Hook
 * Access authentication context in components
 *
 * @returns {Object} Auth context with user, token, and auth methods
 *
 * Usage:
 * const { user, token, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};

export default AuthContext;
