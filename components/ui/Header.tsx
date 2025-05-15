// components/ui/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import SearchBar from './SearchBar';
import { getAllProducts } from '@/lib/products';
import type { Product } from '@/types/product';

export default function Header() {
  const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);


  const { state } = useCart();

  return (
    <header className="bg-base-200 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gold">
          MusicStore
        </Link>

         <SearchBar products={products} />
         
        
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-silver hover:text-gold">
            Shop
          </Link>

           <Link href="/orders" className="text-silver hover:text-gold">
    Orders
  </Link>
          
          
          <div className="indicator">
 {/* Search Icon Link */}
          {/* <Link 
            href="/search" 
            className="text-silver hover:text-gold transition-colors"
            aria-label="Search page"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </Link> */}

          
            <span className="indicator-item badge badge-secondary">
              {state.items.length}
            </span>
            <Link href="/cart" className="btn btn-ghost">
              🛒 Cart
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}