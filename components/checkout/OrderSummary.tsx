"use client";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

interface ContextCartItem {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    category?: string;
  };
  quantity: number;
}

interface Promotion {
  type: "discount" | "gift_card";
  value: number;
  code?: string;
}

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    category?: "guitar" | "piano" | "drums" | "accessories"; // Instrument-specific
  };
  quantity: number;
}

const calculateInstrumentOrderTotal = (
  items: ContextCartItem[],
  promotions: Promotion[] = []
) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  let discount = 0;

  // Instrument-specific promotions (e.g., 10% off all guitars)
  promotions.forEach((promo) => {
    if (promo.type === "discount") {
      discount += subtotal * (promo.value / 100);
    } else if (promo.type === "gift_card") {
      discount = Math.min(discount + promo.value, subtotal);
    }
  });

  return {
    subtotal,
    discount: Math.min(discount, subtotal),
    total: Math.max(0, subtotal - discount),
  };
};

export default function OrderSummary() {
  const { state } = useCart();
  const promotions = (state as any).promotions || [];

  const {
    subtotal,
    discount,
    total: subtotalAfterDiscount,
  } = calculateInstrumentOrderTotal(state.items, promotions);

  // Instrument-specific shipping logic
  const hasLargeItems = state.items.some((item) =>
    ["piano", "drums"].includes(item.product.category || "")
  );
  const shipping = hasLargeItems ? 99.99 : 49.99;

  const tax = subtotal * 0.15; // Tax calculated on original subtotal
  const total = subtotalAfterDiscount + shipping + tax;

  return (
    <motion.div
      initial={{ x: 20 }}
      animate={{ x: 0 }}
      className="bg-base-200 p-6 rounded-box border border-gold/20"
    >
      <h2 className="text-2xl font-bold text-gold mb-6">
        Your Instrument Order
      </h2>

      <div className="space-y-4 mb-6">
        {state.items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center group"
          >
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-lg border border-gold/10">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={64}
                    height={64}                    
                    className="group-hover:scale-105 transition-transform w-16 h-16 object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gold">{item.product.name}</h3>
                <p className="text-silver text-sm">
                  {item.quantity} × ${item.product.price.toFixed(2)}
                  {item.product.category && (
                    <span className="ml-2 px-2 py-1 bg-gold/10 text-xs rounded">
                      {item.product.category}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <p className="text-silver">
              ${(item.quantity * item.product.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="divider my-4"></div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-silver">Subtotal</span>
          <span className="text-silver">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-silver">
            Shipping
            {hasLargeItems && (
              <span className="text-xs block text-gold/70">
                (Large items included)
              </span>
            )}
          </span>
          <span className="text-silver">${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-silver">Tax (15%)</span>
          <span className="text-silver">${tax.toFixed(2)}</span>
        </div>

        <div className="divider my-2"></div>

        <div className="flex justify-between text-xl font-bold pt-2">
          <span className="text-gold">Total</span>
          <span className="text-gold">${total.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
}
