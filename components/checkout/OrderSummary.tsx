// components/checkout/OrderSummary.tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

export default function OrderSummary() {
  const { state } = useCart();

  const subtotal = state.items.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );
  const shipping = 49.99;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  return (
    <motion.div
      initial={{ x: 20 }}
      animate={{ x: 0 }}
      className="bg-base-200 p-6 rounded-box"
    >
      <h2 className="text-2xl font-bold text-gold mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {state.items.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                  />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gold">{item.product.name}</h3>
                <p className="text-silver">
                  {item.quantity} x ${item.product.price}
                </p>
              </div>
            </div>
            <p className="text-silver">
              ${(item.quantity * item.product.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-silver">Subtotal</span>
          <span className="text-silver">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-silver">Shipping</span>
          <span className="text-silver">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-silver">Tax</span>
          <span className="text-silver">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold">
          <span className="text-gold">Total</span>
          <span className="text-gold">${total.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
}