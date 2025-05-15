// contexts/CartContext.tsx
'use client';

import { createContext, ReactNode, useContext, useReducer } from 'react';
import type { Product } from '@/types/product';

type CartItem = {
  product: Product;
  quantity: number;
};

type CheckoutState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

type CartState = {
  items: CartItem[];
  checkout: CheckoutState;
};

type Action = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CHECKOUT_START' }
  | { type: 'CHECKOUT_SUCCESS' }
  | { type: 'CHECKOUT_ERROR'; payload: string };

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<Action>;
  processCheckout: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  checkout: {
    loading: false,
    error: null,
    success: false
  }
};

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id && 
                  item.product.selectedVariant === action.payload.selectedVariant
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id &&
            item.product.selectedVariant === action.payload.selectedVariant
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }]
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload
        )
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };

    case 'CHECKOUT_START':
      return {
        ...state,
        checkout: {
          loading: true,
          error: null,
          success: false
        }
      };

    case 'CHECKOUT_SUCCESS':
      return {
        items: [],
        checkout: {
          loading: false,
          error: null,
          success: true
        }
      };

    case 'CHECKOUT_ERROR':
      return {
        ...state,
        checkout: {
          loading: false,
          error: action.payload,
          success: false
        }
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const processCheckout = async () => {
    try {
      dispatch({ type: 'CHECKOUT_START' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add real payment processing here
      dispatch({ type: 'CHECKOUT_SUCCESS' });
    } catch (error) {
      dispatch({ 
        type: 'CHECKOUT_ERROR', 
        payload: error instanceof Error ? error.message : 'Checkout failed'
      });
    }
  };

  return (
    <CartContext.Provider value={{ state, dispatch, processCheckout }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}