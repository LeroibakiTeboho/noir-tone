// components/reviews/ReviewSection.tsx
"use client";

import { useReviews } from "@/contexts/ReviewContext";
import ReviewStars from "./ReviewStars";
import ReviewForm from "./ReviewForm";

export default function ReviewSection({ productId }: { productId: string }) {
  const { getProductReviews } = useReviews();
  const reviews = getProductReviews(productId);
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0;

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gold">Customer Reviews</h2>
        <div className="flex items-center gap-4 mt-2">
          <ReviewStars rating={Math.round(averageRating)} />
          <span className="text-silver">{reviews.length} reviews</span>
        </div>
      </div>

      <ReviewForm productId={productId} />

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="card bg-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <ReviewStars rating={review.rating} />
                <span className="text-sm text-silver">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-bold text-gold mt-2">{review.title}</h3>
              <p className="text-silver">{review.comment}</p>
              {review.verifiedPurchase && (
                <div className="badge badge-primary mt-2">
                  Verified Purchase
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
