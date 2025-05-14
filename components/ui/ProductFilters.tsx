// components/ui/ProductFilters.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/types/product';

interface Filters {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
}

export default function ProductFilters({
  products,
  onFilterChange
}: {
  products: Product[];
  onFilterChange: (filters: Filters) => void;
}) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleApplyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      minRating
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 p-6 bg-base-200 rounded-box"
    >
      {/* Category Filter */}
      <div className="collapse collapse-plus bg-base-100">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-xl font-medium">Category</div>
        <div className="collapse-content">
          {categories.map(category => (
            <label key={category} className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={selectedCategories.includes(category)}
                onChange={() => setSelectedCategories(prev => 
                  prev.includes(category) 
                    ? prev.filter(c => c !== category) 
                    : [...prev, category]
                )}
              />
              <span className="label-text">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="collapse collapse-plus bg-base-100">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Price Range</div>
        <div className="collapse-content">
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="range range-sm"
          />
          <div className="flex justify-between text-sm">
            <span>$0</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="collapse collapse-plus bg-base-100">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Minimum Rating</div>
        <div className="collapse-content">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="label cursor-pointer justify-start gap-2">
              <input
                type="radio"
                name="rating"
                className="radio radio-sm"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
              />
              <div className="flex">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-gold">★</span>
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handleApplyFilters}
        className="btn btn-primary w-full"
      >
        Apply Filters
      </button>
    </motion.div>
  );
}