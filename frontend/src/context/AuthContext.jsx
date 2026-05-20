import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import authApi from '@/api/authApi';
import { clearSession, getStoredUser, getToken, setSession, setStoredUser } from '@/utils/storage';
import { ROLES } from '@/utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    const handleUnauthorized = () => logout(false);
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

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
        setUser(profile?.data ?? profile?.user ?? profile ?? null);
        setStoredUser(profile?.data ?? profile?.user ?? profile ?? null);
      } catch {
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

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    const authPayload = response?.data ?? response;
    setToken(authPayload?.token);
    setUser(authPayload?.user ?? authPayload?.profile ?? null);
    setSession({ token: authPayload?.token, user: authPayload?.user ?? authPayload?.profile ?? null });
    toast.success('Logged in successfully');
    return authPayload;
  };

  const register = async (payload) => {
    const response = await authApi.register(payload);
    const authPayload = response?.data ?? response;
    if (authPayload?.token) {
      setToken(authPayload.token);
      setUser(authPayload?.user ?? null);
      setSession({ token: authPayload.token, user: authPayload?.user ?? null });
    }
    toast.success('Registration completed');
    return authPayload;
  };

  const logout = (showToast = true) => {
    clearSession();
    setToken(null);
    setUser(null);
    if (showToast) toast.success('Logged out');
  };

  const refreshUser = async () => {
    const profile = await authApi.me();
    const nextUser = profile?.data ?? profile?.user ?? profile ?? null;
    setUser(nextUser);
    setStoredUser(nextUser);
    return nextUser;
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role?.roleCode === ROLES.ADMIN || user?.role === ROLES.ADMIN,
      isUser: user?.role?.roleCode === ROLES.USER || user?.role === ROLES.USER,
      login,
      register,
      logout,
      refreshUser,
      setUser,
    }),
    [loading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
