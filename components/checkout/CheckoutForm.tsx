// components/checkout/CheckoutForm.tsx
'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const validationSchema = Yup.object().shape({
  // Shipping Information
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  
  // Payment Information
  cardNumber: Yup.string()
    .required('Required')
    .matches(/^\d{16}$/, 'Must be 16 digits'),
  expDate: Yup.string()
    .required('Required')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'MM/YY format'),
  cvc: Yup.string()
    .required('Required')
    .matches(/^\d{3,4}$/, '3 or 4 digits'),
  saveCard: Yup.boolean()
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
        cardNumber: '',
        expDate: '',
        cvc: '',
        saveCard: false
      }}
      validationSchema={validationSchema}
      onSubmit={() => {
        // Handle form submission
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          {/* Shipping Information Section */}
          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <h1 className="text-5xl font-bold text-gold mb-8">
              Shipping Information
            </h1>
            
            {/* ... existing shipping fields ... */}
          </motion.div>

          {/* Payment Information Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gold mb-8">
              Payment Details
            </h2>

            <div className="space-y-4">
              {/* Card Number */}
              <div className="form-control">
                <label className="label mr-4">
                  <span className="label-text text-silver">Card Number</span>
                </label>
                <Field 
                  name="cardNumber" 
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="input input-bordered"
                />
                <ErrorMessage name="cardNumber" component="div" className="text-error" />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Expiration Date */}
                <div className="form-control">
                  <label className="label mr-4">
                    <span className="label-text text-silver">Expiration Date</span>
                  </label>
                  <Field 
                    name="expDate" 
                    type="text"
                    placeholder="MM/YY"
                    className="input input-bordered"
                  />
                  <ErrorMessage name="expDate" component="div" className="text-error" />
                </div>

                {/* CVC */}
                <div className="form-control">
                  <label className="label mr-4">
                    <span className="label-text text-silver">CVC</span>
                  </label>
                  <Field 
                    name="cvc" 
                    type="text"
                    placeholder="123"
                    className="input input-bordered"
                  />
                  <ErrorMessage name="cvc" component="div" className="text-error" />
                </div>
              </div>

              {/* Save Card Checkbox */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <Field 
                    name="saveCard" 
                    type="checkbox" 
                    className="checkbox checkbox-primary" 
                  />
                  <span className="label-text text-silver">
                    Save payment method for future purchases
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-8"
          >
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Complete Order
            </button>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
}