// types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  images: string[];
  specs: {
    material: string;
    dimensions: string;
    colorOptions: string[];
  };
  slug: string;
  sku: string;
  inStock: boolean;
  selectedVariant?: string; // Add optional variant field
}