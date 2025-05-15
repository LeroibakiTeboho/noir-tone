// contexts/ReviewContext.tsx
'use client';

import { createContext, ReactNode, useContext, useReducer, useEffect } from 'react';
import type { Review } from '@/types/review';

type ReviewState = Review[];
type Action = 
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'LOAD_REVIEWS'; payload: Review[] };

type ReviewContextType = {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'userId'> & { userId: string }) => void;
  getProductReviews: (productId: string) => Review[];
};

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

function reviewReducer(state: ReviewState, action: Action): ReviewState {
  switch (action.type) {
    case 'ADD_REVIEW':
      return [...state, action.payload];
    case 'LOAD_REVIEWS':
      return action.payload;
    default:
      return state;
  }
}

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, dispatch] = useReducer(reviewReducer, []);

  useEffect(() => {
    const saved = localStorage.getItem('reviews');
    dispatch({ type: 'LOAD_REVIEWS', payload: saved ? JSON.parse(saved) : [] });
  }, []);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `REV-${Date.now()}`,
      date: new Date().toISOString()
    };
    dispatch({ type: 'ADD_REVIEW', payload: newReview });
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(review => review.productId === productId);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getProductReviews }}>
      {children}
    </ReviewContext.Provider>
  );
}

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useReviews must be used within ReviewProvider');
  return context;
};