// components/auth/RegisterForm.tsx
'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
});

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    router.push('/')
  }

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
       <div className="form-control flex flex-col">
        <label className="label">
          <span className="label-text text-silver">Username</span>
        </label>
        <input
          name="name"
          type="text"
          className="input input-bordered"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <div className="text-error">{formik.errors.name}</div>
        )}
      </div>

       <div className="form-control flex flex-col">
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

      <div className="form-control flex flex-col">
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
        onClick={handleClick}
        className="btn btn-primary"
      >
        Register
      </button>
    </form>
  );
}