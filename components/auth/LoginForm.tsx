// components/auth/LoginForm.tsx
'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function LoginForm() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await login(values.email, values.password);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-silver">Email</span>
        </label>
        <input
          name="email"
          type="email"
          className="input input-bordered"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-error">{formik.errors.email}</div>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-silver">Password</span>
        </label>
        <input
          name="password"
          type="password"
          className="input input-bordered"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <div className="text-error">{formik.errors.password}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="btn btn-primary w-full"
      >
        Login
      </button>
    </form>
  );
}