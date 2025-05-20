"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import SearchBar from "./SearchBar";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <header className="bg-base-200 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        {/* Top Row - Logo & Icons */}
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-silver hover:text-gold"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="group relative flex items-center space-x-2 mr-4"
          >
            <svg
              className="w-12 h-12 text-gold transition-transform group-hover:rotate-[30deg]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M35 60L35 30L65 30L65 45"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M50 25Q55 35 50 45Q45 55 50 65"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M25 70Q30 65 35 70Q40 75 45 70Q50 65 55 70Q60 75 65 70Q70 65 75 70"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span className="text-2xl font-bold text-gold relative">
              Noir<span className="text-bronze">Tone</span>
              <span className="absolute -right-6 top-0 text-gold opacity-75 group-hover:animate-pulse">
                ♫
              </span>
            </span>
          </Link>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/products" className="text-silver hover:text-gold">
              Shop
            </Link>

            <Link href="/wishlist" className="text-silver hover:text-gold">
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            <div className="indicator">
              <span className="indicator-item badge badge-secondary">
                {state.items.length}
              </span>
              <Link href="/cart" className="btn btn-ghost">
                🛒 Cart
              </Link>
            </div>

            <Link href="/orders" className="text-silver hover:text-gold">
              Orders
            </Link>

            <Link href="/blog" className="text-silver hover:text-gold">
              Blog
            </Link>

            <div className="flex items-center gap-6">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="btn btn-ghost">
                    <div className="avatar online">
                      <div className="w-8 rounded-full">
                        <Image
                          src={user.avatar || "/default-avatar.png"}
                          alt="User avatar"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </div>
                    <span className="ml-2 text-silver">{user.name}</span>
                  </div>
                  <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-silver hover:text-gold">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-silver hover:text-gold"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Search & Navigation */}
        <div className="hidden lg:block">
          <div className="flex flex-col items-center mt-4 space-y-4">
            {/* Centered Search Bar */}
            <div className="w-full max-w-2xl">
              <SearchBar products={products} />
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <SearchBar products={products} />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 space-y-4"
            >
              <Link
                href="/products"
                className="block text-silver hover:text-gold"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/wishlist"
                className="block text-silver hover:text-gold"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                href="/orders"
                className="block text-silver hover:text-gold"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                href="/blog"
                className="block text-silver hover:text-gold"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              <div className="pt-4 border-t border-base-100">
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-silver hover:text-gold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Cart</span>
                  <span className="badge badge-secondary">
                    {state.items.length}
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-6">
                {user ? (
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="btn btn-ghost">
                      <div className="avatar online">
                        <div className="w-8 rounded-full">
                          <img
                            src={user.avatar || "images/user/user.png"}
                            alt="User avatar"
                          />
                        </div>
                      </div>
                      <span className="ml-2 text-silver">{user.name}</span>
                    </div>
                    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 left-0">
                      <li>
                        <Link
                          href="/profile"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button onClick={logout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block text-silver hover:text-gold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block text-silver hover:text-gold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
