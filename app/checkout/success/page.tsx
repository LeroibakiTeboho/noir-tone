"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderConfirmation() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl font-bold text-gold mb-4">Order Confirmed!</h1>
        <p className="text-silver mb-8">
          Thank you for your purchase. We've sent a confirmation email with your
          order details.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link href="/orders" className="btn btn-ghost">
            View Orders
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
