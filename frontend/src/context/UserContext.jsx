import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import userApi from '@/api/userApi';
import { useAuth } from './AuthContext';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user: authUser, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(authUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProfile(authUser);
  }, [authUser]);

  const refreshProfile = async () => {
    if (!isAuthenticated) return null;
    setLoading(true);
    try {
      const response = await userApi.profile();
      const nextProfile = response?.data ?? response?.user ?? response ?? null;
      setProfile(nextProfile);
      return nextProfile;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (payload) => {
    if (!profile?.id && !profile?.userId) return null;
    const identifier = profile.id ?? profile.userId;
    const response = await userApi.update(identifier, payload);
    const nextProfile = response?.data ?? response?.user ?? response ?? null;
    setProfile(nextProfile);
    toast.success('Profile updated');
    return nextProfile;
  };

  const value = useMemo(
    () => ({ profile, setProfile, loading, refreshProfile, updateProfile }),
    [loading, profile],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return context;
};
