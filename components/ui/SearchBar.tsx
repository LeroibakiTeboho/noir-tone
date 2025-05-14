// components/ui/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types/product';

export default function SearchBar({ products }: { products: Product[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search instruments..."
        className="input input-bordered w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      
      <AnimatePresence>
        {showSuggestions && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-14 w-full bg-base-200 shadow-lg z-50 rounded-box max-h-96 overflow-y-auto"
          >
            {filteredProducts.slice(0, 5).map(product => (
              <div
                key={product.id}
                className="p-4 hover:bg-base-300 cursor-pointer"
                onMouseDown={() => router.push(`/products/${product.slug}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-12 rounded">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gold">{product.name}</h3>
                    <p className="text-sm text-silver">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="p-4 text-silver">No products found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}