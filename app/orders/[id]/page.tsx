// app/orders/[id]/page.tsx
"use client";

import { useCart } from "@/contexts/CartContext";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { state } = useCart();
  const order = state.orders.find((o) => o.id === params.id);

  if (!order) return notFound();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-4xl font-bold text-gold">Order #{order.id}</h1>
          <div className="badge badge-primary badge-lg">{order.status}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gold mb-4">Items</h2>
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-gold">{item.product.name}</h3>
                  <p className="text-silver">
                    {item.quantity} x ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-base-200 p-6 rounded-box">
            <h2 className="text-2xl font-bold text-gold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-silver">Order Date:</span>
                <span className="text-silver">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-silver">Total Items:</span>
                <span className="text-silver">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-silver">Order Total:</span>
                <span className="text-gold font-bold">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
