// components/promotions/PromoCodeInput.tsx
'use client';

import { useState } from 'react';
import { usePromotions } from '@/contexts/PromotionsContext';

export default function PromoCodeInput() {
  const [code, setCode] = useState('');
  const { applyPromoCode } = usePromotions();

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter promo code"
        className="input input-bordered flex-1"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
      />
      <button 
        onClick={() => applyPromoCode(code)}
        className="btn btn-primary"
      >
        Apply
      </button>
    </div>
  );
}