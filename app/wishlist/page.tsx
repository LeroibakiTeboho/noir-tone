// app/wishlist/page.tsx
"use client";
import ProductGrid from "@/components/ui/ProductGrid";
import { getAllProducts } from "@/lib/products";
import { useWishlist } from "@/contexts/WishlistContext";

export default function WishlistPage() {
  const products = getAllProducts();
  const { wishlist } = useWishlist();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gold mb-8">
        Your Wishlist ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-silver">
          No items in your wishlist. Start adding some!
        </div>
      ) : (
        <ProductGrid products={wishlistProducts} />
      )}
    </main>
  );
}
