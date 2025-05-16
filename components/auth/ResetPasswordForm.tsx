// components/auth/ResetPasswordForm.tsx
'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/contexts/AuthContext';

const resetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: resetSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await resetPassword(values.email);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Email input similar to LoginForm */}
    </form>
  );
}