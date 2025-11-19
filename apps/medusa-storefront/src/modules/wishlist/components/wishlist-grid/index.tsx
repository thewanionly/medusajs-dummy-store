'use client';

import { JSX, useCallback, useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client/react';
import {
  REMOVE_WISHLIST_ITEM_MUTATION,
  type RemoveWishlistItemMutationResult,
  type RemoveWishlistItemMutationVariables,
  type WishlistItemGraphQL,
} from '@lib/gql/mutations/wishlist';
import {
  GET_CUSTOMER_WISHLIST_QUERY,
  type GetCustomerWishlistQueryResult,
  type GetCustomerWishlistQueryVariables,
} from '@lib/gql/queries/wishlist';
import { convertToLocale } from '@lib/util/money';
import { cn } from '@mds/ui/lib/utils';
import { Button, Text, Toaster, toast } from '@medusajs/ui';
import Thumbnail from '@modules/products/components/thumbnail';

export type WishlistGridProps = {
  className?: string;
};

const formatPrice = (amount?: number | null, currencyCode?: string | null) => {
  if (typeof amount !== 'number') {
    return 'Price unavailable';
  }

  return convertToLocale({
    amount,
    currency_code: currencyCode ?? 'usd',
    minimumFractionDigits: 0,
  });
};

const getProductImage = (item: WishlistItemGraphQL) => {
  const variant = item.productVariant;
  const product = variant?.product;

  return product?.thumbnail || product?.images?.[0]?.url || null;
};

export function WishlistGrid({ className }: WishlistGridProps) {
  const [wishlistItems, setWishlistItems] = useState<
    WishlistItemGraphQL[] | null
  >(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const { data, loading, error } = useQuery<
    GetCustomerWishlistQueryResult,
    GetCustomerWishlistQueryVariables
  >(GET_CUSTOMER_WISHLIST_QUERY, {
    fetchPolicy: 'network-only',
    context: {
      fetchOptions: {
        credentials: 'include',
      },
    },
  });

  useEffect(() => {
    if (data?.wishlist?.items) {
      setWishlistItems(data.wishlist.items);
      return;
    }

    if (!loading && !error && data) {
      setWishlistItems([]);
    }
  }, [data, loading, error]);

  const [removeWishlistItem] = useMutation<
    RemoveWishlistItemMutationResult,
    RemoveWishlistItemMutationVariables
  >(REMOVE_WISHLIST_ITEM_MUTATION);

  const handleRemove = useCallback(
    async (wishlistItemId: string) => {
      if (!wishlistItemId) {
        return;
      }

      setRemovingItemId(wishlistItemId);

      try {
        await removeWishlistItem({
          variables: {
            wishlistItemId,
          },
        });

        setWishlistItems((previous) =>
          (previous ?? []).filter((item) => item.id !== wishlistItemId)
        );
        toast.success('Removed from wishlist', {
          dismissable: false,
        });
      } catch (mutationError) {
        console.error('Failed to remove wishlist item', mutationError);
        const message =
          mutationError instanceof Error
            ? mutationError.message
            : 'Failed to remove from wishlist';
        toast.error(message, {
          dismissable: false,
        });
      } finally {
        setRemovingItemId(null);
      }
    },
    [removeWishlistItem]
  );

  const renderWithToaster = (content: JSX.Element) => (
    <>
      <Toaster position="top-right" />
      {content}
    </>
  );

  const shouldShowLoadingSkeleton =
    loading || (wishlistItems === null && !error);

  if (shouldShowLoadingSkeleton) {
    return renderWithToaster(
      <div
        className={cn('space-y-6', className)}
        data-testid="wishlist-grid-loading"
      >
        <WishlistGridSkeleton />
      </div>
    );
  }

  if (error) {
    return renderWithToaster(
      <div
        className={cn(
          'space-y-2 rounded-2xl border border-ui-border-base p-8 text-center',
          className
        )}
        data-testid="wishlist-grid-error"
      >
        <Text className="text-ui-fg-base">
          We couldn&apos;t load your wishlist items.
        </Text>
      </div>
    );
  }

  const currentWishlistItems = wishlistItems ?? [];
  const hasItems = currentWishlistItems.length > 0;

  return renderWithToaster(
    <div className={cn('space-y-6', className)}>
      {hasItems ? (
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          data-testid="wishlist-grid"
        >
          {currentWishlistItems.map((item) => (
            <WishlistGridCard
              key={item.id}
              item={item}
              onRemove={handleRemove}
              isRemoving={removingItemId === item.id}
            />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border border-dashed border-ui-border-base p-10 text-center"
          data-testid="wishlist-grid-empty"
        >
          <Text className="text-ui-fg-subtle">Your wishlist is empty.</Text>
        </div>
      )}
    </div>
  );
}

type WishlistGridCardProps = {
  item: WishlistItemGraphQL;
  onRemove: (wishlistItemId: string) => void;
  isRemoving: boolean;
};

function WishlistGridCard({
  item,
  onRemove,
  isRemoving,
}: WishlistGridCardProps) {
  const variant = item.productVariant;
  const product = variant?.product;
  const priceLabel = formatPrice(
    variant?.price?.amount,
    variant?.price?.currencyCode
  );
  const thumbnail = useMemo(() => getProductImage(item), [item]);

  return (
    <div
      className="flex h-full flex-col rounded-2xl border border-ui-border-base p-4 shadow-elevation-card-rest"
      data-testid="wishlist-card"
    >
      <Thumbnail
        thumbnail={thumbnail ?? undefined}
        images={product?.images ?? undefined}
        size="square"
        className="aspect-[10/12]"
      />
      <div className="mt-4 flex flex-1 flex-col gap-2">
        <Text className="text-ui-fg-base" data-testid="wishlist-card-title">
          {product?.title ?? 'Untitled product'}
        </Text>
        <Text className="text-ui-fg-subtle" data-testid="wishlist-card-price">
          {priceLabel}
        </Text>
        <Button
          variant="danger"
          className="mt-auto w-full"
          onClick={() => onRemove(item.id)}
          isLoading={isRemoving}
          data-testid="wishlist-remove-button"
        >
          {isRemoving ? 'Removing...' : 'Remove from wishlist'}
        </Button>
      </div>
    </div>
  );
}

const SKELETON_CARD_COUNT = 4;

const WishlistGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
        <div
          key={`wishlist-skeleton-${index}`}
          className="flex h-full flex-col rounded-2xl border border-ui-border-base p-4 shadow-elevation-card-rest"
        >
          <div className="aspect-[1/1] w-full animate-pulse rounded-large bg-ui-bg-disabled" />
          <div className="mt-4 flex flex-1 flex-col gap-3">
            <div className="h-4 w-2/3 animate-pulse rounded bg-ui-bg-disabled" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-ui-bg-disabled" />
            <div className="mt-auto h-10 animate-pulse rounded-md bg-ui-bg-disabled" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistGrid;
