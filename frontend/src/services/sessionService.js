import { clearSession, getStoredUser, getToken, setSession, setStoredUser } from '@/utils/storage';

export const sessionService = {
  getToken,
  getStoredUser,
  setSession,
  setStoredUser,
  clearSession,
};

export default sessionService;