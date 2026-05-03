'use client';

import { useState, useCallback } from 'react';

/**
 * Generic form state management hook.
 * @param {Object} initialValues — { field: defaultValue }
 * @param {Function} onSubmit — async (values) => void
 * @param {Function} validate — optional (values) => { field: errorMsg }
 */
export function useForm(initialValues = {}, onSubmit, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback((nameOrEvent, value) => {
    if (typeof nameOrEvent === 'string') {
      setValues(prev => ({ ...prev, [nameOrEvent]: value }));
      setErrors(prev => ({ ...prev, [nameOrEvent]: undefined }));
    } else {
      const { name, value: val, type, checked } = nameOrEvent.target;
      setValues(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : val,
      }));
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();

    if (validate) {
      const validationErrors = validate(values);
      if (validationErrors && Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      // Error handling done by caller
    } finally {
      setSubmitting(false);
    }
  }, [values, onSubmit, validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setErrors,
  };
}
