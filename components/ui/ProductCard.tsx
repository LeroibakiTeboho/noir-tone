// components/ui/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="card bg-base-100 shadow-2xl hover:shadow-3xl transition-shadow h-fit">
      <div className="relative">
        <WishlistButton productId={product.id} />
        <figure className="px-4 pt-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-xl h-72 object-cover"
          />
        </figure>
      </div>
      <div className="card-body">
        <h3 className="card-title text-gold">{product.name}</h3>
        <div className="badge badge-secondary">R {product.price}</div>
        <p className="text-silver line-clamp-2">{product.description}</p>
        <div className="card-actions justify-end mt-4">
          <Link
            href={`/products/${product.slug}`}
            className="btn btn-ghost text-gold"
          >
            Details
          </Link>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
