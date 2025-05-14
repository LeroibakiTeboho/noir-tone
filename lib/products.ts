// lib/products.ts
import productsData from '@/data/products.json';
import type { Product } from '@/types/product';

// Remove async since we're using local JSON
export function getAllProducts(): Product[] {
  return productsData;
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find(product => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return productsData.filter(product => product.rating >= 4.5);
}