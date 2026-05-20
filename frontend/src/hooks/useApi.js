import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { handleApiError } from '@/utils/apiErrorHandler';

/**
 * Custom Hook for API Calls
 * Handles loading state, error handling, and toast notifications
 *
 * Usage:
 * const { data, loading, error, execute } = useApi(apiFunction);
 * const handleFetch = async () => {
 *   const result = await execute(params);
 * };
 */
export const useApi = (apiFunction, options = {}) => {
  const {
    showSuccessToast = false,
    successMessage = 'Operation successful',
    showErrorToast = true,
    onSuccess = null,
    onError = null,
    onUnauthorized = null,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...args);

        setData(result?.data ?? result);

        if (showSuccessToast) {
          toast.success(successMessage);
        }

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        const errorObj = handleApiError(err, {
          showToast: showErrorToast,
          onUnauthorized,
        });

        setError(errorObj);

        if (onError) {
          onError(errorObj);
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, onSuccess, onError, onUnauthorized, showSuccessToast, showErrorToast, successMessage]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

export default useApi;
