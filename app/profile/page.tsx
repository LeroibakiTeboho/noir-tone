// app/profile/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const profileSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function ProfilePage() {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: { name: user?.name || '', email: user?.email || '' },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      // Update mock user in localStorage
      const updatedUser = { ...user, ...values };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    },
  });

  if (!user) return <div className='container mx-auto px-4 py-8'><h1 className="text-4xl font-bold text-gold mb-8" >Please login to view profile</h1></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gold mb-8">Profile</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6 max-w-lg">
        {/* Profile form fields */}
      </form>
    </div>
  );
}