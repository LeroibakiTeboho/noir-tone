// app/orders/page.tsx
"use client";

import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderHistoryPage() {
  const { state } = useCart();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gold mb-8">Order History</h1>

      {state.orders.length === 0 ? (
        <div className="text-center text-silver">
          No orders found.{" "}
          <Link href="/products" className="text-gold hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {state.orders.map((order) => (
            <div key={order.id} className="card bg-base-200">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gold">
                      Order #{order.id}
                    </h2>
                    <p className="text-silver">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <div className="badge badge-primary">{order.status}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-silver">
                      Total: ${order.total.toFixed(2)}
                    </p>
                    <Link
                      href={`/orders/${order.id}`}
                      className="btn btn-ghost btn-sm text-gold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.main>
  );
}
