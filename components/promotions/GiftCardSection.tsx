// components/promotions/GiftCardSection.tsx
'use client';

import { useState } from 'react';
import { usePromotions } from '@/contexts/PromotionsContext';

export default function GiftCardSection() {
  const [giftCardCode, setGiftCardCode] = useState('');
  const { giftCards, addGiftCard } = usePromotions();

  return (
    <div className="card bg-base-200 p-6">
      <h3 className="text-xl font-bold text-gold mb-4">Gift Cards</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter gift card code"
          className="input input-bordered flex-1"
          value={giftCardCode}
          onChange={(e) => setGiftCardCode(e.target.value)}
        />
        <button 
          onClick={() => {
            addGiftCard(giftCardCode, 50); // Mock $50 value
            setGiftCardCode('');
          }}
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {giftCards.map(card => (
          <div key={card.id} className="flex justify-between items-center">
            <span className="text-silver">{card.code}</span>
            <span className="text-gold">${card.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}