// app/products/page.tsx
import ProductsPageClient from "@/components/ui/ProductsPageClient";
import { getAllProducts } from "@/lib/products";

export default function ProductsPage() {
  const products = getAllProducts();

  return <ProductsPageClient products={products} />;
}
