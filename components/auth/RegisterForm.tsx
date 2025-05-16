// components/auth/RegisterForm.tsx
'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/contexts/AuthContext';

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
});

export default function RegisterForm() {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await register(values.name, values.email, values.password);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Similar structure to LoginForm with name field */}
    </form>
  );
}