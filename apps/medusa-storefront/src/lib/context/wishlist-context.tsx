import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type WishlistSyncEntry = {
  productVariantId: string;
  wishlistItemId?: string | null;
};

type WishlistItem = {
  productVariantId: string;
  wishlistItemId: string | null;
};

type WishlistContextValue = {
  getVariantEntry: (variantId: string) => WishlistItem | undefined;
  upsertVariantEntry: (wishlistItem: WishlistItem) => void;
  removeVariantEntry: (variantId: string) => void;
  syncWishlist: (entries: WishlistSyncEntry[]) => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

const buildStateFromEntries = (
  entries: WishlistSyncEntry[]
): WishlistItem[] => {
  const map = new Map<string, WishlistItem>();

  for (const entry of entries) {
    if (!entry.productVariantId) {
      continue;
    }

    map.set(entry.productVariantId, {
      productVariantId: entry.productVariantId,
      wishlistItemId: entry.wishlistItemId ?? null,
    });
  }

  return Array.from(map.values());
};

type WishlistProviderProps = PropsWithChildren<{
  initialEntries?: WishlistSyncEntry[];
}>;

export function WishlistProvider({
  children,
  initialEntries = [],
}: WishlistProviderProps) {
  const [wishlistState, setWishlistState] = useState<WishlistItem[]>(() =>
    buildStateFromEntries(initialEntries)
  );

  const getVariantEntry = useCallback(
    (variantId: string) =>
      wishlistState.find((entry) => entry.productVariantId === variantId),
    [wishlistState]
  );

  const upsertVariantEntry = useCallback((wishlistItem: WishlistItem) => {
    setWishlistState((prev) => {
      const index = prev.findIndex(
        (item) => item.productVariantId === wishlistItem.productVariantId
      );

      if (index !== -1) {
        const existing = prev[index];

        if (!existing) {
          return prev;
        }

        if (existing.wishlistItemId === wishlistItem.wishlistItemId) {
          return prev;
        }

        const nextState = [...prev];
        nextState[index] = wishlistItem;
        return nextState;
      }

      return [...prev, wishlistItem];
    });
  }, []);

  const removeVariantEntry = useCallback((variantId: string) => {
    setWishlistState((prev) => {
      const index = prev.findIndex(
        (entry) => entry.productVariantId === variantId
      );

      if (index === -1) {
        return prev;
      }

      const nextState = [...prev];
      nextState.splice(index, 1);
      return nextState;
    });
  }, []);

  const syncWishlist = useCallback((entries: WishlistSyncEntry[]) => {
    setWishlistState(buildStateFromEntries(entries));
  }, []);

  const value = useMemo(
    () => ({
      getVariantEntry,
      upsertVariantEntry,
      removeVariantEntry,
      syncWishlist,
    }),
    [getVariantEntry, upsertVariantEntry, removeVariantEntry, syncWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }

  return context;
}

export type { WishlistItem, WishlistSyncEntry };
