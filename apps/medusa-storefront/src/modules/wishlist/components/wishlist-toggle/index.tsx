'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useMutation } from '@apollo/client/react';
import {
  ADD_WISHLIST_ITEM_MUTATION,
  AddWishlistItemMutationResult,
  AddWishlistItemMutationVariables,
  REMOVE_WISHLIST_ITEM_MUTATION,
  RemoveWishlistItemMutationResult,
  RemoveWishlistItemMutationVariables,
} from '@lib/gql/mutations/wishlist';
import type { WishlistGraphQL } from '@lib/gql/mutations/wishlist';
import { cn } from '@mds/ui/lib/utils';
import { Heart } from '@medusajs/icons';
import { IconButton, Tooltip } from '@medusajs/ui';

import {
  type WishlistSeedEntry,
  useWishlistContext,
} from '../../../../lib/context/wishlist-context';
import { WishlistToggleStatus } from '../../types';

export type WishlistToggleButtonProps = {
  productTitle: string;
  productVariantId: string;
  isInitiallyWishlisted?: boolean;
  initialWishlistItemId?: string | null;
  disabled?: boolean;
  className?: string;
  onStatusChange?: (status: WishlistToggleStatus) => void;
};

const getAccessibleLabel = (title: string, isInWishlist: boolean) =>
  isInWishlist ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`;

const GENERIC_ERROR_MESSAGE =
  'We could not update your wishlist. Please try again.';

const buildWishlistSeeds = (
  wishlist?: WishlistGraphQL | null
): WishlistSeedEntry[] => {
  if (!wishlist) {
    return [];
  }

  return (wishlist.items ?? []).map((item) => ({
    productVariantId: item.productVariantId,
    wishlistItemId: item.id,
  }));
};

const getWishlistItemIdFromWishlist = (
  wishlist: WishlistGraphQL | undefined,
  productVariantId: string
) =>
  wishlist?.items?.find((item) => item.productVariantId === productVariantId)
    ?.id ?? null;

export function WishlistToggleButton({
  productTitle,
  productVariantId,
  isInitiallyWishlisted = false,
  initialWishlistItemId = null,
  disabled = false,
  className,
  onStatusChange,
}: WishlistToggleButtonProps) {
  const wishlistContext = useWishlistContext();
  const fallbackStatus = useMemo<WishlistToggleStatus>(
    () => ({
      isInWishlist: isInitiallyWishlisted,
      wishlistItemId: initialWishlistItemId ?? null,
    }),
    [initialWishlistItemId, isInitiallyWishlisted]
  );

  const [localStatus, setLocalStatus] =
    useState<WishlistToggleStatus>(fallbackStatus);

  useEffect(() => {
    if (wishlistContext) {
      wishlistContext.initializeVariantState(productVariantId, fallbackStatus);
    } else {
      setLocalStatus(fallbackStatus);
    }
  }, [fallbackStatus, productVariantId, wishlistContext]);

  const currentStatus = wishlistContext
    ? wishlistContext.getVariantState(productVariantId)
    : localStatus;

  const updateStatus = useCallback(
    (
      updater:
        | WishlistToggleStatus
        | ((prev: WishlistToggleStatus) => WishlistToggleStatus)
    ) => {
      if (wishlistContext) {
        wishlistContext.setVariantState(productVariantId, updater);
      } else {
        setLocalStatus((prev) =>
          typeof updater === 'function'
            ? (updater as (prev: WishlistToggleStatus) => WishlistToggleStatus)(
                prev
              )
            : updater
        );
      }
    },
    [productVariantId, wishlistContext]
  );

  const { isInWishlist } = currentStatus;

  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const tooltipTimer = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = useCallback((message: string) => {
    if (!message) {
      return;
    }

    if (tooltipTimer.current) {
      clearTimeout(tooltipTimer.current);
    }

    setTooltipMessage(message);
    setIsTooltipVisible(true);

    tooltipTimer.current = setTimeout(() => {
      setIsTooltipVisible(false);
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (tooltipTimer.current) {
        clearTimeout(tooltipTimer.current);
      }
    };
  }, []);

  const [addWishlistItem] = useMutation<
    AddWishlistItemMutationResult,
    AddWishlistItemMutationVariables
  >(ADD_WISHLIST_ITEM_MUTATION);
  const [removeWishlistItem] = useMutation<
    RemoveWishlistItemMutationResult,
    RemoveWishlistItemMutationVariables
  >(REMOVE_WISHLIST_ITEM_MUTATION);

  const ariaLabel = useMemo(
    () => getAccessibleLabel(productTitle, isInWishlist),
    [productTitle, isInWishlist]
  );

  const notify = useCallback(
    (nextState: WishlistToggleStatus, message: string) => {
      setFeedbackMessage(message);
      showTooltip(message);
      onStatusChange?.(nextState);
    },
    [onStatusChange, showTooltip]
  );

  const handleToggle = useCallback(async () => {
    if (disabled) {
      return;
    }

    setFeedbackMessage('');
    const previousState = currentStatus;
    const revert = () => updateStatus(previousState);

    try {
      if (isInWishlist) {
        const wishlistItemIdToRemove = previousState.wishlistItemId;

        if (!wishlistItemIdToRemove) {
          throw new Error('Wishlist item ID is missing.');
        }

        updateStatus({
          isInWishlist: false,
          wishlistItemId: null,
        });

        const { data } = await removeWishlistItem({
          variables: {
            wishlistItemId: wishlistItemIdToRemove,
          },
        });

        const nextWishlist = data?.removeWishlistItem?.wishlist;

        if (wishlistContext && nextWishlist) {
          wishlistContext.seedWishlist(buildWishlistSeeds(nextWishlist));
        }

        notify(
          { isInWishlist: false, wishlistItemId: null },
          'Removed from wishlist'
        );
      } else {
        updateStatus({
          isInWishlist: true,
          wishlistItemId: previousState.wishlistItemId,
        });

        const { data } = await addWishlistItem({
          variables: {
            productVariantId,
          },
        });

        const nextWishlist = data?.addWishlistItem?.wishlist;
        const nextWishlistItemId =
          getWishlistItemIdFromWishlist(nextWishlist, productVariantId) ??
          previousState.wishlistItemId ??
          null;

        if (wishlistContext && nextWishlist) {
          wishlistContext.seedWishlist(buildWishlistSeeds(nextWishlist));
        }

        updateStatus({
          isInWishlist: true,
          wishlistItemId: nextWishlistItemId,
        });
        notify(
          { isInWishlist: true, wishlistItemId: nextWishlistItemId },
          'Added to wishlist'
        );
      }
    } catch (error) {
      revert();
      console.error('Wishlist toggle failed', error);
      const errorMessage =
        error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;
      setFeedbackMessage(errorMessage);
      showTooltip(errorMessage);
    }
  }, [
    addWishlistItem,
    currentStatus,
    disabled,
    isInWishlist,
    notify,
    productVariantId,
    removeWishlistItem,
    showTooltip,
    updateStatus,
    wishlistContext,
  ]);

  return (
    <div className={cn('flex flex-col items-center gap-y-1', className)}>
      <Tooltip
        open={Boolean(isTooltipVisible && tooltipMessage)}
        content={tooltipMessage}
      >
        <IconButton
          type="button"
          variant="transparent"
          aria-pressed={isInWishlist}
          aria-label={ariaLabel}
          disabled={disabled}
          onClick={handleToggle}
          data-testid="wishlist-toggle-button"
          className={cn(
            'h-9 w-9 rounded-full border shadow-borders-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-bg-interactive focus-visible:ring-offset-2 disabled:cursor-not-allowed',
            isInWishlist
              ? 'hover:bg-ui-bg-interactive/90 border-ui-border-interactive bg-ui-bg-interactive text-ui-fg-on-color hover:text-ui-fg-on-color focus-visible:border-ui-border-interactive focus-visible:bg-ui-bg-interactive focus-visible:text-ui-fg-on-color'
              : 'border-transparent bg-ui-bg-base text-ui-fg-subtle hover:border-ui-border-interactive hover:text-ui-fg-interactive focus-visible:border-ui-border-interactive focus-visible:bg-ui-bg-base focus-visible:text-ui-fg-interactive',
            disabled && 'opacity-60'
          )}
        >
          <Heart
            className="h-4 w-4"
            color={isInWishlist ? 'currentColor' : undefined}
          />
        </IconButton>
      </Tooltip>
      <span aria-live="polite" className="sr-only">
        {feedbackMessage}
      </span>
    </div>
  );
}

export default WishlistToggleButton;
export type { WishlistToggleStatus } from '../../types';
