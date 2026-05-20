import { TOKEN_KEY } from './constants';

/**
 * JWT Token Utilities
 */

export const tokenUtils = {
  /**
   * Decode JWT token to extract payload
   */
  decode: (token) => {
    try {
      if (!token) return null;
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const decoded = JSON.parse(atob(parts[1]));
      return decoded;
    } catch {
      return null;
    }
  },

  /**
   * Check if token is expired
   */
  isExpired: (token) => {
    const decoded = tokenUtils.decode(token);
    if (!decoded || !decoded.exp) return true;

    // Convert exp (seconds) to milliseconds and compare with current time
    const expiryTime = decoded.exp * 1000;
    return Date.now() >= expiryTime;
  },

  /**
   * Get token expiration time in seconds
   */
  getExpiryTime: (token) => {
    const decoded = tokenUtils.decode(token);
    if (!decoded || !decoded.exp) return null;
    return decoded.exp;
  },

  /**
   * Check if token is valid (exists and not expired)
   */
  isValid: (token) => {
    if (!token) return false;
    return !tokenUtils.isExpired(token);
  },

  /**
   * Extract user info from token
   */
  extractUserInfo: (token) => {
    const decoded = tokenUtils.decode(token);
    if (!decoded) return null;

    return {
      userId: decoded.sub || decoded.userId || decoded.id,
      email: decoded.email,
      role: decoded.role,
      exp: decoded.exp,
    };
  },

  /**
   * Get remaining time before expiration (in seconds)
   */
  getTimeRemaining: (token) => {
    const expiryTime = tokenUtils.getExpiryTime(token);
    if (!expiryTime) return null;

    const secondsRemaining = expiryTime - Math.floor(Date.now() / 1000);
    return Math.max(0, secondsRemaining);
  },

  /**
   * Check if token will expire soon (within threshold seconds)
   */
  isExpiringSoon: (token, thresholdSeconds = 300) => {
    const timeRemaining = tokenUtils.getTimeRemaining(token);
    if (timeRemaining === null) return true;
    return timeRemaining < thresholdSeconds;
  },
};

export default tokenUtils;
