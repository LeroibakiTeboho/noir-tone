// components/ui/WishlistButton.tsx
"use client";

import { useWishlist } from "@/contexts/WishlistContext";

export default function WishlistButton({ productId }: { productId: string }) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <button
      onClick={() => toggleWishlist(productId)}
      className="absolute top-2 right-2 btn btn-circle btn-ghost btn-sm"
      aria-label={
        isWishlisted(productId) ? "Remove from wishlist" : "Add to wishlist"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${
          isWishlisted(productId) ? "text-red-500 fill-current" : "text-silver"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
