// app/ProductsPageClient.tsx
'use client';

import { useState } from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import ProductFilters from '@/components/ui/ProductFilters';
import type { Product } from '@/types/product';

export default function ProductsPageClient({
  products,
}: {
  products: Product[];
}) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('price');

  const handleFilterChange = (filters: {
    categories: string[];
    priceRange: [number, number];
    minRating: number;
  }) => {
    const filtered = products.filter(product => {
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(product.category);
      
      const matchesPrice = product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];
      
      const matchesRating = product.rating >= filters.minRating;

      return matchesCategory && matchesPrice && matchesRating;
    });

    setFilteredProducts(filtered);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price': return a.price - b.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <ProductFilters 
              products={products}
              onFilterChange={handleFilterChange}
            />
          </aside>
          
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h1 className="text-4xl font-bold text-gold">
                All Instruments ({sortedProducts.length})
              </h1>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="select select-bordered"
              >
                <option value="price">Price: Low to High</option>
                <option value="rating">Rating: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
            <div className="divider"></div>
            <ProductGrid products={sortedProducts} />
          </div>
        </div>
      </div>
    </main>
  );
}