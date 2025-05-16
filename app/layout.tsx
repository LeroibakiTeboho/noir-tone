import type { Metadata } from "next";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/ui/Header";
import { Geist, Geist_Mono } from "next/font/google";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ReviewProvider } from "@/contexts/ReviewContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PromotionsProvider } from "@/contexts/PromotionsContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Instruments Store",
  description: "Premium musical instruments marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <PromotionsProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ReviewProvider>
                  <Header />
                  {children}
                </ReviewProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </PromotionsProvider>
      </body>
    </html>
  );
}
