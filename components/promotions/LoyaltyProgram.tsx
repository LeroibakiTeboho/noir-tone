"use client";

import { usePromotions } from "@/contexts/PromotionsContext";

export default function LoyaltyProgram() {
  const { loyaltyPoints, redeemLoyaltyPoints } = usePromotions();

  return (
    <div className="card bg-base-200 p-6">
      <h3 className="text-xl font-bold text-gold mb-4">Loyalty Program</h3>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-silver">
            Current Points: {loyaltyPoints.currentPoints}
          </p>
          <p className="text-silver">
            Total Earned: {loyaltyPoints.totalEarned}
          </p>
        </div>
        <div
          className="radial-progress text-gold"
          style={
            {
              "--value": (loyaltyPoints.currentPoints / 1000) * 100,
              "--size": "4rem",
            } as React.CSSProperties
          }
        >
          {Math.floor((loyaltyPoints.currentPoints / 1000) * 100)}%
        </div>
      </div>
      <button
        onClick={() => redeemLoyaltyPoints(100)}
        className="btn btn-primary"
        disabled={loyaltyPoints.currentPoints < 100}
      >
        Redeem 100 Points ($1 Discount)
      </button>
    </div>
  );
}
