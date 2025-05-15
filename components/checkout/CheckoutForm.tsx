// components/checkout/CheckoutForm.tsx
'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required')
});

export default function CheckoutForm() {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        country: '',
        paymentMethod: 'credit'
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Handle form submission
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <motion.h2 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold text-gold mb-8"
          >
            Shipping Information
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-silver">First Name</span>
              </label>
              <Field 
                name="firstName" 
                type="text" 
                className="input input-bordered" 
              />
              <ErrorMessage name="firstName" component="div" className="text-error" />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-silver">Last Name</span>
              </label>
              <Field 
                name="lastName" 
                type="text" 
                className="input input-bordered" 
              />
              <ErrorMessage name="lastName" component="div" className="text-error" />
            </div>
          </div>

          {/* Add more form fields following the same pattern */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-8"
          >
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              Complete Order
            </button>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
}