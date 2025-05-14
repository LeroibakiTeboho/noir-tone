// app/search/page.tsx
import ProductGrid from '@/components/ui/ProductGrid';
import { getAllProducts } from '@/lib/products';
import type { Product } from '@/types/product';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const allProducts = await getAllProducts();
  const searchQuery = searchParams.q?.toLowerCase() || '';

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery)
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gold mb-8">
        Search Results for "{searchQuery}"
      </h1>
      <ProductGrid products={filteredProducts} />
    </main>
  );
}