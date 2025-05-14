// components/ui/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow h-full">
      <figure className="px-4 pt-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={300}
          className="rounded-xl h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-gold">{product.name}</h3>
        <div className="badge badge-secondary">${product.price}</div>
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