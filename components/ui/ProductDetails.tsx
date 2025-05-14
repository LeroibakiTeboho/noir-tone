// components/ui/ProductDetails.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AddToCartButton from './AddToCartButton';
import type { Product } from '@/types/product';

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.specs.colorOptions[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-box overflow-hidden">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button
              key={image}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-box overflow-hidden border-2 ${
                index === selectedImage ? 'border-gold' : 'border-transparent'
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gold"
        >
          {product.name}
        </motion.h1>

        <div className="flex items-center gap-4">
          <div className="badge badge-secondary badge-lg text-xl">
            ${product.price}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gold text-xl">★</span>
            <span className="text-silver">{product.rating}</span>
          </div>
          {product.inStock ? (
            <div className="badge badge-success">In Stock</div>
          ) : (
            <div className="badge badge-error">Out of Stock</div>
          )}
        </div>

        <p className="text-silver text-lg">{product.description}</p>

        {/* Color Selection */}
        {product.specs.colorOptions.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xl text-gold">Color Options</h3>
            <div className="flex gap-2">
              {product.specs.colorOptions.map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === selectedColor ? 'border-gold' : 'border-base-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gold">Quantity</h3>
          <div className="join">
            <button
              className="join-item btn btn-sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              className="join-item input input-sm w-16 text-center"
              min="1"
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
            <button
              className="join-item btn btn-sm"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="pt-4">
          <AddToCartButton 
            product={product} 
            quantity={quantity}
            variant={selectedColor}
          />
        </div>

        {/* Specifications */}
        <div className="space-y-2 pt-6">
          <h2 className="text-2xl text-gold">Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-silver">Material</h3>
              <p className="text-gold">{product.specs.material}</p>
            </div>
            <div>
              <h3 className="text-silver">Dimensions</h3>
              <p className="text-gold">{product.specs.dimensions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}