// contexts/PromotionsContext.tsx
'use client';

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';

type PromotionType = 'discount' | 'flash_sale' | 'gift_card' | 'loyalty';

interface Promotion {
  id: string;
  type: PromotionType;
  code: string;
  value: number;
  expiresAt?: string;
  products?: string[];
}

interface LoyaltyPoints {
  currentPoints: number;
  totalEarned: number;
}

interface PromotionsContextType {
  activePromotions: Promotion[];
  loyaltyPoints: LoyaltyPoints;
  giftCards: Promotion[];
  applyPromoCode: (code: string) => void;
  redeemLoyaltyPoints: (points: number) => void;
  addGiftCard: (code: string, value: number) => void;
}

const PromotionsContext = createContext<PromotionsContextType | undefined>(undefined);

export function PromotionsProvider({ children }: { children: ReactNode }) {
  const [activePromotions, setActivePromotions] = useState<Promotion[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<LoyaltyPoints>({ 
    currentPoints: 500, 
    totalEarned: 1500 
  });
  const [giftCards, setGiftCards] = useState<Promotion[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedPromos = localStorage.getItem('promotions');
    if (savedPromos) setActivePromotions(JSON.parse(savedPromos));
    
    const savedGiftCards = localStorage.getItem('giftCards');
    if (savedGiftCards) setGiftCards(JSON.parse(savedGiftCards));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('promotions', JSON.stringify(activePromotions));
    localStorage.setItem('giftCards', JSON.stringify(giftCards));
  }, [activePromotions, giftCards]);

  const applyPromoCode = (code: string) => {
    const mockPromotions: Promotion[] = [
      { id: '1', type: 'discount', code: 'MUSIC20', value: 20 },
      { id: '2', type: 'flash_sale', code: 'FLASH30', value: 30, expiresAt: '2024-03-20' },
    ];

    const promotion = mockPromotions.find(p => p.code === code);
    if (promotion) {
      setActivePromotions(prev => [...prev, promotion]);
    }
  };

  const redeemLoyaltyPoints = (points: number) => {
    if (loyaltyPoints.currentPoints >= points) {
      setLoyaltyPoints(prev => ({
        ...prev,
        currentPoints: prev.currentPoints - points
      }));
      setActivePromotions(prev => [...prev, {
        id: `loyalty-${Date.now()}`,
        type: 'loyalty',
        code: 'LOYALTY',
        value: points / 100 // 1% per point
      }]);
    }
  };

  const addGiftCard = (code: string, value: number) => {
    setGiftCards(prev => [...prev, {
      id: `gift-${Date.now()}`,
      type: 'gift_card',
      code,
      value,
      expiresAt: '2025-01-01'
    }]);
  };

  return (
    <PromotionsContext.Provider 
      value={{ activePromotions, loyaltyPoints, giftCards, applyPromoCode, redeemLoyaltyPoints, addGiftCard }}
    >
      {children}
    </PromotionsContext.Provider>
  );
}

export const usePromotions = () => {
  const context = useContext(PromotionsContext);
  if (!context) throw new Error('usePromotions must be used within PromotionsProvider');
  return context;
};