// components/ui/AddToCartButton.tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types/product';
import { motion } from 'framer-motion';

export default function AddToCartButton({
  product,
  quantity = 1,
  variant
}: { 
  product: Product;
  quantity?: number;
  variant?: string;
}) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
  type: 'ADD_ITEM',
    payload: {
      ...product,
      selectedVariant: variant // This is now part of the Product type
    
      }
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`btn ${product.inStock ? 'btn-primary' : 'btn-disabled'}`}
      onClick={handleAddToCart}
      disabled={!product.inStock}
      aria-label={`Add ${product.name} to cart`}
    >
      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </motion.button>
  );
}