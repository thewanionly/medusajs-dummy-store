import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { WishlistToggleStatus } from '../types';

const DEFAULT_STATUS: WishlistToggleStatus = {
  isInWishlist: false,
  wishlistItemId: null,
};

type WishlistSeedEntry = {
  productId: string;
  productVariantId: string;
  wishlistItemId?: string | null;
};

type WishlistStateMap = Record<string, WishlistToggleStatus>;

type WishlistContextValue = {
  getVariantState: (variantId: string) => WishlistToggleStatus;
  setVariantState: (
    variantId: string,
    updater:
      | WishlistToggleStatus
      | ((prev: WishlistToggleStatus) => WishlistToggleStatus)
  ) => void;
  initializeVariantState: (
    variantId: string,
    initialState: WishlistToggleStatus
  ) => void;
  seedWishlist: (entries: WishlistSeedEntry[]) => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

const buildStateFromSeeds = (
  entries: WishlistSeedEntry[]
): WishlistStateMap => {
  return entries.reduce<WishlistStateMap>((acc, entry) => {
    if (entry.productVariantId) {
      acc[entry.productVariantId] = {
        isInWishlist: true,
        wishlistItemId: entry.wishlistItemId ?? null,
      };
    }
    return acc;
  }, {});
};

type WishlistProviderProps = PropsWithChildren<{
  initialEntries?: WishlistSeedEntry[];
}>;

export function WishlistProvider({
  children,
  initialEntries = [],
}: WishlistProviderProps) {
  const [wishlistState, setWishlistState] = useState<WishlistStateMap>(() =>
    buildStateFromSeeds(initialEntries)
  );

  const getVariantState = useCallback(
    (variantId: string) => wishlistState[variantId] ?? DEFAULT_STATUS,
    [wishlistState]
  );

  const setVariantState = useCallback(
    (
      variantId: string,
      updater:
        | WishlistToggleStatus
        | ((prev: WishlistToggleStatus) => WishlistToggleStatus)
    ) => {
      setWishlistState((prev) => {
        const current = prev[variantId] ?? DEFAULT_STATUS;
        const nextState =
          typeof updater === 'function'
            ? (updater as (prev: WishlistToggleStatus) => WishlistToggleStatus)(
                current
              )
            : updater;

        if (
          current.isInWishlist === nextState.isInWishlist &&
          current.wishlistItemId === nextState.wishlistItemId
        ) {
          return prev;
        }

        return {
          ...prev,
          [variantId]: nextState,
        };
      });
    },
    []
  );

  const initializeVariantState = useCallback(
    (variantId: string, initialState: WishlistToggleStatus) => {
      setWishlistState((prev) => {
        if (prev[variantId]) {
          return prev;
        }

        return {
          ...prev,
          [variantId]: initialState,
        };
      });
    },
    []
  );

  const seedWishlist = useCallback((entries: WishlistSeedEntry[]) => {
    setWishlistState(buildStateFromSeeds(entries));
  }, []);

  const value = useMemo(
    () => ({
      getVariantState,
      setVariantState,
      initializeVariantState,
      seedWishlist,
    }),
    [getVariantState, setVariantState, initializeVariantState, seedWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  return useContext(WishlistContext);
}

export type { WishlistSeedEntry };
