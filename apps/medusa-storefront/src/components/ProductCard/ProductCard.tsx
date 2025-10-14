'use client';

import { useEffect, useState } from 'react';

import { Product, ProductVariant } from '@lib/gql/generated-types/graphql';
import { getProductPrice } from '@lib/util/get-product-price';
import { Button } from '@medusajs/ui';
import Thumbnail from '@modules/products/components/thumbnail';

import { addToCart, listProducts } from './ProductCard.services';

interface ProductCardProps {
  handle: string;
  countryCode: string;
}

const checkIfInStock = (variant?: ProductVariant): boolean => {
  // If we don't manage inventory, we can always add to cart
  if (variant && !variant.manageInventory) {
    return true;
  }

  // If we allow back orders on the variant, we can add to cart
  if (variant?.allowBackorder) {
    return true;
  }

  // If there is inventory available, we can add to cart
  if (variant?.manageInventory && (variant?.inventoryQuantity || 0) > 0) {
    return true;
  }

  // Otherwise, we can't add to cart
  return false;
};

export default function ProductCard({ handle, countryCode }: ProductCardProps) {
  const [product, setProduct] = useState<Product>();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch product by handle for the region
      const productData = await listProducts({
        countryCode,
        queryParams: { handle },
      }).then(({ response }) => response.products?.[0]);

      setProduct(productData as Product);
    };

    fetchData();
  }, [countryCode, handle]);

  if (!product) {
    return (
      <div className="flex max-w-sm flex-col gap-3 rounded-lg border p-4">
        <Thumbnail size="square" />
        <h3 className="text-lg font-semibold">Product not found</h3>
      </div>
    );
  }

  // Get the first variant for the UI & Add to Cart
  const firstVariant = product.variants?.[0];

  const { variantPrice } = getProductPrice({
    product: product as Product,
    variantId: firstVariant?.id,
  });

  const inStock = checkIfInStock(firstVariant);

  const handleAddToCart = async () => {
    if (!firstVariant) return;

    setIsAdding(true);

    await addToCart({
      variantId: firstVariant.id,
      quantity: 1,
      countryCode,
    });

    setIsAdding(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleAddToCart();
  };

  return (
    <div className="flex max-w-sm flex-col gap-3 rounded-lg border p-4">
      <Thumbnail
        thumbnail={product.thumbnail}
        images={product.images}
        size="square"
      />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      {firstVariant ? (
        <>
          <div className="text-sm">Size: {firstVariant.options[0]?.value}</div>
          {variantPrice && (
            <div className="text-sm">
              Price: {variantPrice.calculated_price}
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
        </>
      ) : (
        <div className="text-red-500">No variants available</div>
      )}
    </div>
  );
}
