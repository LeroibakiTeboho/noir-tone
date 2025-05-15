// app/checkout/page.tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function CheckoutPage() {
  const { state } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gold mb-4">Your cart is empty</h1>
        <p className="text-silver">Please add items to your cart before checking out</p>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="grid lg:grid-cols-2 gap-12">
        <CheckoutForm />
        <OrderSummary />
      </div>
    </motion.main>
  );
}