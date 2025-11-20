'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { PointerEvent } from 'react';

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
  type WishlistItem,
  type WishlistSyncEntry,
  useWishlistContext,
} from '../../../../lib/context/wishlist-context';

export type WishlistToggleButtonProps = {
  productTitle: string;
  productVariantId: string;
  isInitiallyWishlisted?: boolean;
  initialWishlistItemId?: string | null;
  disabled?: boolean;
  className?: string;
  onStatusChange?: (entry: WishlistItem | null) => void;
};

const getAccessibleLabel = (title: string, isInWishlist: boolean) =>
  isInWishlist ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`;

const GENERIC_ERROR_MESSAGE =
  'We could not update your wishlist. Please try again.';
const ADD_SUCCESS_MESSAGE = 'Added to wishlist';
const REMOVE_SUCCESS_MESSAGE = 'Removed from wishlist';
type TooltipVariant = 'success' | 'error';
const TOOLTIP_VARIANT_CLASSES: Record<TooltipVariant, string> = {
  success: 'bg-green-50 text-green-700',
  error: 'bg-rose-50 text-rose-700',
};

const buildWishlistSyncEntries = (
  wishlist?: WishlistGraphQL | null
): WishlistSyncEntry[] => {
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

const useWishlistTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [tooltipVariant, setTooltipVariant] =
    useState<TooltipVariant>('success');
  const tooltipTimer = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = useCallback(
    (message: string, variant: TooltipVariant = 'success') => {
      if (!message) {
        return;
      }

      if (tooltipTimer.current) {
        clearTimeout(tooltipTimer.current);
      }

      setTooltipMessage(message);
      setTooltipVariant(variant);
      setIsTooltipVisible(true);

      tooltipTimer.current = setTimeout(() => {
        setIsTooltipVisible(false);
      }, 2000);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (tooltipTimer.current) {
        clearTimeout(tooltipTimer.current);
      }
    };
  }, []);

  return { isTooltipVisible, tooltipMessage, tooltipVariant, showTooltip };
};

export function WishlistToggleButton({
  productTitle,
  productVariantId,
  isInitiallyWishlisted = false,
  initialWishlistItemId = null,
  disabled = false,
  className,
  onStatusChange,
}: WishlistToggleButtonProps) {
  const {
    getVariantEntry,
    upsertVariantEntry,
    removeVariantEntry,
    syncWishlist,
  } = useWishlistContext();

  useEffect(() => {
    if (!isInitiallyWishlisted) {
      return;
    }

    if (getVariantEntry(productVariantId)) {
      return;
    }

    upsertVariantEntry({
      productVariantId,
      wishlistItemId: initialWishlistItemId ?? null,
    });
  }, [
    initialWishlistItemId,
    isInitiallyWishlisted,
    productVariantId,
    getVariantEntry,
    upsertVariantEntry,
  ]);

  const currentEntry = getVariantEntry(productVariantId) ?? null;

  const updateEntry = useCallback(
    (nextEntry: WishlistItem | null) => {
      if (nextEntry) {
        upsertVariantEntry(nextEntry);
      } else {
        removeVariantEntry(productVariantId);
      }
    },
    [productVariantId, removeVariantEntry, upsertVariantEntry]
  );

  const isInWishlist = Boolean(currentEntry);

  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const { isTooltipVisible, tooltipMessage, tooltipVariant, showTooltip } =
    useWishlistTooltip();

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
    (
      nextEntry: WishlistItem | null,
      message: string,
      options?: { skipTooltip?: boolean; variant?: TooltipVariant }
    ) => {
      setFeedbackMessage(message);
      if (!options?.skipTooltip) {
        showTooltip(message, options?.variant);
      }
      onStatusChange?.(nextEntry);
    },
    [onStatusChange, showTooltip]
  );

  const handleToggle = useCallback(async () => {
    if (disabled) {
      return;
    }

    setFeedbackMessage('');
    const previousEntry = currentEntry;
    const revert = () => updateEntry(previousEntry);

    try {
      if (isInWishlist) {
        const wishlistItemIdToRemove = previousEntry?.wishlistItemId;

        if (!wishlistItemIdToRemove) {
          throw new Error('Wishlist item ID is missing.');
        }

        updateEntry(null);
        notify(null, REMOVE_SUCCESS_MESSAGE);

        const { data } = await removeWishlistItem({
          variables: {
            wishlistItemId: wishlistItemIdToRemove,
          },
        });

        const nextWishlist = data?.removeWishlistItem?.wishlist;

        if (nextWishlist) {
          syncWishlist(buildWishlistSyncEntries(nextWishlist));
        }
      } else {
        const optimisticEntry: WishlistItem = {
          productVariantId,
          wishlistItemId: previousEntry?.wishlistItemId ?? null,
        };

        updateEntry(optimisticEntry);
        notify(optimisticEntry, ADD_SUCCESS_MESSAGE);

        const { data } = await addWishlistItem({
          variables: {
            productVariantId,
          },
        });

        const nextWishlist = data?.addWishlistItem?.wishlist;
        const nextWishlistItemId =
          getWishlistItemIdFromWishlist(nextWishlist, productVariantId) ??
          previousEntry?.wishlistItemId ??
          null;

        if (nextWishlist) {
          syncWishlist(buildWishlistSyncEntries(nextWishlist));
        }

        const nextEntry: WishlistItem = {
          productVariantId,
          wishlistItemId: nextWishlistItemId,
        };

        updateEntry(nextEntry);
        notify(nextEntry, ADD_SUCCESS_MESSAGE, { skipTooltip: true });
      }
    } catch (error) {
      revert();
      console.error('Wishlist toggle failed', error);
      const errorMessage =
        error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;
      setFeedbackMessage(errorMessage);
      showTooltip(errorMessage, 'error');
    }
  }, [
    addWishlistItem,
    currentEntry,
    disabled,
    isInWishlist,
    notify,
    productVariantId,
    removeWishlistItem,
    showTooltip,
    syncWishlist,
    updateEntry,
  ]);

  const handlePointerDown = useCallback((event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen' || event.pointerType === 'touch') {
      event.preventDefault();
    }
  }, []);

  return (
    <div className={cn('flex flex-col items-center gap-y-1', className)}>
      <Tooltip
        open={Boolean(isTooltipVisible && tooltipMessage)}
        content={tooltipMessage}
        className={TOOLTIP_VARIANT_CLASSES[tooltipVariant]}
      >
        <IconButton
          type="button"
          variant="transparent"
          aria-pressed={isInWishlist}
          aria-label={ariaLabel}
          disabled={disabled}
          onClick={handleToggle}
          data-testid="wishlist-toggle-button"
          onPointerDown={handlePointerDown}
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
