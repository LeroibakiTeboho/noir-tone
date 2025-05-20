// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ui/ProductDetails";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import ReviewSection from "@/components/reviews/ReviewSection";
import type { Metadata } from "next";

// Explicit type for generateStaticParams
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

// Type-safe metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  return product ? {
    title: `${product.name} | NoirTone`,
    description: product.description,
    openGraph: {
      images: product.images
    }
  } : {
    title: "Product Not Found",
    description: "This product does not exist in our catalog"
  };
}

// Main component with explicit typing
export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) return notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <ProductDetails product={product} />
      <ReviewSection productId={product.id} />
    </main>
  );
}