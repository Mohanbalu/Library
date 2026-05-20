import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { handleValidationError } from '@/utils/apiErrorHandler';

/**
 * Custom Hook for Form Handling
 * Manages form state, validation, and submission
 *
 * Usage:
 * const { values, errors, loading, handleChange, handleSubmit } = useForm(
 *   { email: '', password: '' },
 *   onSubmit,
 *   validate
 * );
 */
export const useForm = (initialValues = {}, onSubmit, validate = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * Handle input change
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  /**
   * Handle input blur
   */
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate single field if validate function provided
    if (validate) {
      const fieldError = validate(name, values[name], values);
      if (fieldError) {
        setErrors((prev) => ({
          ...prev,
          [name]: fieldError,
        }));
      }
    }
  }, [values, validate]);

  /**
   * Reset form to initial values
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  /**
   * Set field error manually
   */
  const setFieldError = useCallback((fieldName, errorMessage) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      // Run custom validation if provided
      if (validate) {
        const newErrors = {};
        Object.keys(values).forEach((key) => {
          const error = validate(key, values[key], values);
          if (error) {
            newErrors[key] = error;
          }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
          return;
        }
      }

      setLoading(true);
      try {
        await onSubmit(values);
        reset();
      } catch (error) {
        // If error has validation errors, set them
        const validationErrors = handleValidationError(error);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
        }
      } finally {
        setLoading(false);
      }
    },
    [values, onSubmit, validate, reset]
  );

  /**
   * Get field props for easy binding
   */
  const getFieldProps = useCallback(
    (fieldName) => ({
      name: fieldName,
      value: values[fieldName] || '',
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched[fieldName] ? errors[fieldName] : '',
      touched: touched[fieldName] || false,
    }),
    [values, errors, touched, handleChange, handleBlur]
  );

  return {
    values,
    errors,
    touched,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldError,
    setValues,
    getFieldProps,
  };
};

export default useForm;
