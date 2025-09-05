'use client';

import Image from 'next/image';
import Link from 'next/link';

import { type VariantProps, cva } from 'class-variance-authority';

import { Badge } from '@mds/ui/components/badge';
import { Button } from '@mds/ui/components/button';
import { RatingCount } from '@mds/ui/components/rating-count/rating-count';
import { VariantSelector } from '@mds/ui/components/variant-selector/variant-selector';
import { cn } from '@mds/ui/lib/utils';

const productCardVariants = cva(
  'rounded-2xl border overflow-hidden transition',
  {
    variants: {
      variant: {
        default: 'flex flex-col shadow-sm hover:shadow-md',
        withAddToCart: 'flex flex-col shadow-sm hover:shadow-md',
        minimal: 'flex flex-col hover:shadow hover:border-muted-foreground/30',
      },
      size: {
        sm: 'w-48',
        md: 'w-64',
        lg: 'w-80',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface Price {
  current: string;
  old?: string;
}

interface Product {
  id: string;
  image: {
    src: string;
    alt?: string;
  };
  localize?: {
    currency: string;
    locale: string;
  };
  title: string;
  href?: string;
  price: Price;
}

interface ProductCardProps extends VariantProps<typeof productCardVariants> {
  product: Product;
  rating?: {
    average: number;
    count?: number;
  };
  badge?: {
    label: string;
    variant?: 'default' | 'sale' | 'new' | 'limited';
  };
  variants?: {
    options: {
      value: string;
      label?: string;
      imageSrc?: string;
      color?: string;
    }[];
    value: string;
    onChange: (value: string) => void;
  };
  quantity?: {
    value: number;
    onChange: (value: number) => void;
  };
  className?: string;
}

const formatPrice = (price: Price, locale = 'en-GB', currency = 'GBP') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });

  return {
    currentPrice: formatter.format(Number(price.current)),
    oldPrice: price.old ? formatter.format(Number(price.old)) : undefined,
  };
};

export function ProductCard({
  product,
  rating,
  badge,
  variants,
  variant,
  size,
  className,
}: ProductCardProps) {
  const { currentPrice, oldPrice } = formatPrice(
    product.price,
    product.localize?.locale,
    product.localize?.currency
  );

  switch (variant) {
    case 'minimal':
      return (
        <div
          className={cn(
            productCardVariants({ variant, size }),
            'w-60 overflow-hidden rounded-2xl border p-0 shadow-sm'
          )}
        >
          <div className="h-72 w-full overflow-hidden">
            <img
              src={product.image.src}
              alt={product.image.alt ?? product.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-1 p-3">
            <div className="flex items-center justify-between">
              <h3 className="truncate text-base font-medium">
                {product.href ? (
                  <Link href={product.href} className="hover:underline">
                    {product.title}
                  </Link>
                ) : (
                  product.title
                )}
              </h3>
              <p className="mt-0 text-lg font-semibold text-gray-900">
                {currentPrice}
              </p>
            </div>
            <p className="text-xs text-gray-500">7 colors</p>
          </div>
        </div>
      );
    default:
      return (
        <div className={cn(productCardVariants({ variant, size }), className)}>
          {/* Image */}
          <div className="relative">
            <Image
              src={product.image.src || '/assets/images/missing-img.webp'}
              alt={product.image.alt ?? product.title}
              width={500}
              height={500}
              className={cn('w-full object-cover')}
            />
            {badge && (
              <div className="absolute top-2 left-2">
                <Badge variant="default">{badge.label}</Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 p-3">
            <h3 className="truncate text-base font-medium">
              {product.href ? (
                <Link href={product.href} className="hover:underline">
                  {product.title}
                </Link>
              ) : (
                product.title
              )}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{currentPrice}</p>
              {oldPrice && (
                <p className="text-muted-foreground text-sm line-through">
                  {oldPrice}
                </p>
              )}
            </div>

            {/* Rating */}
            {rating !== undefined && (
              <div className="flex items-center gap-2">
                <RatingCount
                  average={rating.average}
                  ratingCount={rating.count}
                />
              </div>
            )}

            {/* Variant Selector */}
            {variants && (
              <VariantSelector
                options={variants.options}
                value={variants.value ?? ''}
                onChange={variants.onChange}
                type="color"
              />
            )}

            {/* Add to Cart button */}
            {variant === 'withAddToCart' && (
              <Button variant="default" className="w-full cursor-pointer">
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      );
  }
}
