// contexts/CartContext.tsx
'use client';

import { createContext, ReactNode, useContext, useReducer, useEffect } from 'react';
import type { Product } from '@/types/product';

type CartItem = {
  product: Product;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
};

type CheckoutState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

type CartState = {
  items: CartItem[];
  checkout: CheckoutState;
  orders: Order[];
};

type Action = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CHECKOUT_START' }
  | { type: 'CHECKOUT_SUCCESS'; payload: Order }
  | { type: 'CHECKOUT_ERROR'; payload: string }
  | { type: 'LOAD_STATE'; payload: CartState };

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
  },
  orders: []
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
        },
        orders: [...state.orders, action.payload]
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

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load state from localStorage on initial load
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('cartState');
      return savedState ? JSON.parse(savedState) : initialState;
    }
    return initialState;
  });

  // Save state to localStorage on every change
  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify(state));
  }, [state]);

  const processCheckout = async () => {
    try {
      dispatch({ type: 'CHECKOUT_START' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order
      const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        items: state.items,
        total: state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        status: 'processing'
      };

      dispatch({ type: 'CHECKOUT_SUCCESS', payload: newOrder });
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