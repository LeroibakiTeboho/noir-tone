"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { state, dispatch } = useCart();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gold mb-8">Your Cart</h1>

      {state.items.length === 0 ? (
        <div className="text-center text-silver">
          Your cart is empty.{" "}
          <Link href="/products" className="text-gold hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {state.items.map((item) => (
            <div key={item.product.id} className="card bg-base-100 shadow-xl">
              <div className="card-body flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gold">
                      {item.product.name}
                    </h3>
                    <p className="text-silver">
                      ${item.product.price} x {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: item.product.id,
                      })
                    }
                    className="btn btn-error"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Link href="/checkout" className="btn btn-primary">
              Proceed to Checkout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
