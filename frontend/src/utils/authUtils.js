import { ROLES } from './constants';

/**
 * Authentication Utility Functions
 */

export const authUtils = {
  /**
   * Check if user has admin role
   */
  isAdmin: (user) => {
    if (!user) return false;
    const role = user?.role?.roleCode || user?.role || user?.roleCode;
    return role === ROLES.ADMIN;
  },

  /**
   * Check if user has regular user role
   */
  isRegularUser: (user) => {
    if (!user) return false;
    const role = user?.role?.roleCode || user?.role || user?.roleCode;
    return role === ROLES.USER;
  },

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole: (user, roles = []) => {
    if (!user || !Array.isArray(roles) || roles.length === 0) return false;
    const userRole = user?.role?.roleCode || user?.role || user?.roleCode;
    return roles.includes(userRole);
  },

  /**
   * Check if user has all of the specified roles
   */
  hasAllRoles: (user, roles = []) => {
    if (!user || !Array.isArray(roles) || roles.length === 0) return false;
    // For simplicity, assuming a user has one role; adjust if needed for multiple roles
    const userRole = user?.role?.roleCode || user?.role || user?.roleCode;
    return roles.includes(userRole);
  },

  /**
   * Get user display name
   */
  getDisplayName: (user) => {
    if (!user) return 'Guest';
    return user?.name || user?.username || user?.email || 'User';
  },

  /**
   * Get user initials for avatar
   */
  getInitials: (user) => {
    const name = authUtils.getDisplayName(user);
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n.charAt(0).toUpperCase())
      .join('');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (user, token) => {
    return !!(user && token);
  },

  /**
   * Validate login credentials format
   */
  validateLoginCredentials: (email, password) => {
    const errors = {};

    if (!email || email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  /**
   * Validate registration data
   */
  validateRegistrationData: (data) => {
    const errors = {};

    if (!data.email || data.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.password || data.password === '') {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!data.confirmPassword || data.confirmPassword === '') {
      errors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!data.name || data.name.trim() === '') {
      errors.name = 'Full name is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

/**
 * Helper function to validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default authUtils;
