import productsData from '@/data/products.json';
import type { Product } from '@/types/product';

// Cache products data for better performance
let cachedProducts: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (!cachedProducts) {
    cachedProducts = productsData.map(product => ({
      ...product,
      specs: {
        material: product.specs.material,
        dimensions: product.specs.dimensions,
        colorOptions: [...product.specs.colorOptions]
      }
    }));
  }
  return cachedProducts;
}

export function getProductBySlug(slug: string): Product | null {
  const products = getAllProducts();
  return products.find(product => product.slug === slug) || null;
}

export function getFeaturedProducts(): Product[] {
  const products = getAllProducts();
  return products.filter(product => product.rating >= 4.5);
}