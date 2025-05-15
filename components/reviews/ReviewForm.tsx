// components/reviews/ReviewForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useReviews } from "@/contexts/ReviewContext";
import ReviewStars from "./ReviewStars";
import { motion } from "framer-motion";

const reviewSchema = Yup.object().shape({
  rating: Yup.number().min(1, "Please select a rating").required("Required"),
  title: Yup.string()
    .min(5, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  comment: Yup.string()
    .min(10, "Minimum 10 characters")
    .max(500, "Maximum 500 characters")
    .required("Required"),
  verifiedPurchase: Yup.boolean(),
});

export default function ReviewForm({ productId }: { productId: string }) {
  const { addReview } = useReviews();
  const [userId, setUserId] = useState<string>("");

  // Get or create user ID
  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = `user-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  const formik = useFormik({
    initialValues: {
      rating: 0,
      title: "",
      comment: "",
      verifiedPurchase: false,
    },
    validationSchema: reviewSchema,
    onSubmit: (values, { resetForm }) => {
      addReview({
        productId,
        userId, // Add user ID
        rating: values.rating,
        title: values.title,
        comment: values.comment,
        verifiedPurchase: values.verifiedPurchase,
      });
      resetForm();
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-200 p-6"
    >
      <h3 className="text-xl font-bold text-gold mb-4">Write a Review</h3>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Rating Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-silver">Your Rating</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                type="button"
                key={rating}
                onClick={() => formik.setFieldValue("rating", rating)}
                className={`p-1 ${
                  formik.values.rating >= rating ? "text-gold" : "text-silver"
                }`}
                aria-label={`Rate ${rating} stars`}
              >
                <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          {formik.errors.rating && formik.touched.rating && (
            <div className="text-error text-sm">{formik.errors.rating}</div>
          )}
        </div>

        {/* Title Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-silver mr-4">Review Title</span>
          </label>
          <input
            name="title"
            type="text"
            className="input input-bordered"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && formik.touched.title && (
            <div className="text-error text-sm">{formik.errors.title}</div>
          )}
        </div>

        {/* Comment Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-silver mr-4">Your Review</span>
          </label>
          <textarea
            name="comment"
            className="textarea textarea-bordered h-32"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.errors.comment && formik.touched.comment && (
            <div className="text-error text-sm">{formik.errors.comment}</div>
          )}
        </div>

        {/* Verified Purchase Checkbox */}
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            name="verifiedPurchase"
            className="checkbox checkbox-sm"
            checked={formik.values.verifiedPurchase}
            onChange={formik.handleChange}
          />
          <span className="label-text text-silver">
            I purchased this product
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="btn btn-primary w-full"
        >
          Submit Review
        </button>
      </form>
    </motion.div>
  );
}
