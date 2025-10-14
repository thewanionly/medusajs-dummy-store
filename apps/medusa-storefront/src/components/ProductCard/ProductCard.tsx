'use client';

import React, { useEffect, useState } from 'react';

import { Product } from '@lib/gql/generated-types/graphql';
import { getProductPrice } from '@lib/util/get-product-price';
import Thumbnail from '@modules/products/components/thumbnail';

import { listProducts } from './ProductCard.services';

interface ProductCardProps {
  handle: string;
  countryCode: string;
}

export default function ProductCard({ handle, countryCode }: ProductCardProps) {
  const [product, setProduct] = useState<Product>();

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

  // TODO:
  // async function handleAddToCart() {
  //   'use server';
  //   if (!firstVariant) return;
  //   await addToCart({
  //     variantId: firstVariant.id,
  //     quantity: 1,
  //     countryCode,
  //   });
  // }

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
          <form
            // action={handleAddToCart}
            className="mt-2 flex w-full flex-col"
          >
            <button
              type="submit"
              className="rounded bg-black px-4 py-2 text-white hover:bg-gray-700 focus:outline-none"
            >
              Add to Cart
            </button>
          </form>
        </>
      ) : (
        <div className="text-red-500">No variants available</div>
      )}
    </div>
  );
}
