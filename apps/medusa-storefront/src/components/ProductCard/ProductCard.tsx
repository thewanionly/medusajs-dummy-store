'use client';

import { useState } from 'react';

import { c } from '@apollo/client/react/internal/compiler-runtime';
import { Button } from '@medusajs/ui';
import Thumbnail from '@modules/products/components/thumbnail';

import { addToCart, listProducts } from './ProductCard.services';

interface ProductCardProps {
  title: string;
  thumbnail: string;
  variantId: string;
  size: string;
  price: string;
  inStock: boolean;
  countryCode: string;
}

export default function ProductCard({
  title,
  thumbnail,
  variantId,
  price,
  size,
  inStock,
  countryCode,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!title) {
    return (
      <div className="flex max-w-sm flex-col gap-3 rounded-lg border p-4">
        <Thumbnail size="square" />
        <h3 className="text-lg font-semibold">Product not found</h3>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    setError(null);
    try {
      await addToCart({
        variantId,
        quantity: 1,
        countryCode,
      });
    } catch (err: any) {
      console.log(err);
      setError('Failed to add product to cart.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleAddToCart();
  };

  return (
    <div className="flex max-w-sm flex-col gap-3 rounded-lg border p-4">
      <Thumbnail thumbnail={thumbnail} size="square" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="text-sm">Size: {size}</div>
      <div className="text-sm">Price: {price}</div>
      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-600">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-2 flex w-full flex-col">
        <Button
          type="submit"
          disabled={!inStock}
          variant="primary"
          className="h-10 w-full"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!inStock ? 'Out of stock' : 'Add to cart'}
        </Button>
      </form>
    </div>
  );
}
