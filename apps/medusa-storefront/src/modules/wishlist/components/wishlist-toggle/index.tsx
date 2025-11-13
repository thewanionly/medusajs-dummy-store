'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useMutation } from '@apollo/client/react';
import { Heart, Loader } from '@medusajs/icons';
import { cn } from '@mds/ui/lib/utils';
import { IconButton, Tooltip } from '@medusajs/ui';

import {
  ADD_WISHLIST_ITEM_MUTATION,
  AddWishlistItemMutationResult,
  AddWishlistItemMutationVariables,
  REMOVE_WISHLIST_ITEM_MUTATION,
  RemoveWishlistItemMutationResult,
  RemoveWishlistItemMutationVariables,
} from '../../graphql/mutations';
import { useWishlistContext } from '../../context/wishlist-context';
import { WishlistToggleStatus } from '../../types';

export type WishlistToggleButtonProps = {
  productId: string;
  productHandle?: string;
  productTitle: string;
  productVariantId: string;
  isInitiallyWishlisted?: boolean;
  initialWishlistItemId?: string | null;
  disabled?: boolean;
  className?: string;
  onStatusChange?: (status: WishlistToggleStatus) => void;
};

const getAccessibleLabel = (title: string, isInWishlist: boolean) =>
  isInWishlist
    ? `Remove ${title} from wishlist`
    : `Add ${title} to wishlist`;

const GENERIC_ERROR_MESSAGE =
  'We could not update your wishlist. Please try again.';

export function WishlistToggleButton({
  productId,
  productHandle,
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

  const { isInWishlist, wishlistItemId } = currentStatus;
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

  const [addWishlistItem, addState] = useMutation<
    AddWishlistItemMutationResult,
    AddWishlistItemMutationVariables
  >(ADD_WISHLIST_ITEM_MUTATION);
  const [removeWishlistItem, removeState] = useMutation<
    RemoveWishlistItemMutationResult,
    RemoveWishlistItemMutationVariables
  >(REMOVE_WISHLIST_ITEM_MUTATION);

  const isMutating = addState.loading || removeState.loading;
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

  const handleAddToWishlist = useCallback(async () => {
    const { data } = await addWishlistItem({
      variables: {
        input: {
          productId,
          productHandle,
          productVariantId,
        },
      },
    });

    const nextWishlistItemId =
      data?.addWishlistItem?.wishlistItem?.id ?? null;

    updateStatus({
      isInWishlist: true,
      wishlistItemId: nextWishlistItemId,
    });
    notify(
      { isInWishlist: true, wishlistItemId: nextWishlistItemId },
      'Added to wishlist'
    );
  }, [
    addWishlistItem,
    notify,
    productHandle,
    productId,
    productVariantId,
    updateStatus,
  ]);

  const handleRemoveFromWishlist = useCallback(async () => {
    await removeWishlistItem({
      variables: {
        input: {
          productVariantId,
          wishlistItemId,
        },
      },
    });

    updateStatus({
      isInWishlist: false,
      wishlistItemId: null,
    });
    notify(
      { isInWishlist: false, wishlistItemId: null },
      'Removed from wishlist'
    );
  }, [
    notify,
    productVariantId,
    removeWishlistItem,
    updateStatus,
    wishlistItemId,
  ]);

  const handleToggle = useCallback(async () => {
    if (disabled || isMutating) {
      return;
    }

    setFeedbackMessage('');

    try {
      if (isInWishlist) {
        await handleRemoveFromWishlist();
      } else {
        await handleAddToWishlist();
      }
    } catch (error) {
      console.error('Wishlist toggle failed', error);
      setFeedbackMessage(GENERIC_ERROR_MESSAGE);
      showTooltip(GENERIC_ERROR_MESSAGE);
    }
  }, [
    disabled,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    isInWishlist,
    isMutating,
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
          disabled={disabled || isMutating}
          onClick={handleToggle}
          data-testid="wishlist-toggle-button"
          className={cn(
            'h-9 w-9 rounded-full border border-transparent bg-ui-bg-base shadow-borders-base transition-all duration-200 hover:text-ui-fg-interactive focus-visible:ring-2 focus-visible:ring-ui-bg-interactive focus-visible:ring-offset-2 disabled:cursor-not-allowed',
            isInWishlist &&
              'border-ui-border-interactive bg-ui-bg-interactive text-ui-fg-on-color',
            (disabled || isMutating) && 'opacity-60'
          )}
        >
          {isMutating ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Heart
              className="h-4 w-4"
              color={isInWishlist ? 'currentColor' : undefined}
            />
          )}
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
