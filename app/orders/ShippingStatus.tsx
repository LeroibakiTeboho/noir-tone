// components/orders/ShippingStatus.tsx
"use client";

import { useEffect, useState } from "react";

const shippingStatuses = [
  "Order confirmed",
  "Preparing for shipment",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

export default function ShippingStatus({ orderId }: { orderId: string }) {
  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus((prev) =>
        Math.min(prev + 1, shippingStatuses.length - 1)
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {shippingStatuses.map((status, index) => (
        <div key={status} className="flex items-center gap-4">
          <div
            className={`w-3 h-3 rounded-full ${
              index <= currentStatus ? "bg-gold" : "bg-base-300"
            }`}
          />
          <span
            className={index <= currentStatus ? "text-gold" : "text-silver"}
          >
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}
