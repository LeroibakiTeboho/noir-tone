// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ui/ProductDetails";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import ReviewSection from "@/components/reviews/ReviewSection";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) return notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <ProductDetails product={product} />
      <ReviewSection productId={product.id} />
    </main>
  );
}
