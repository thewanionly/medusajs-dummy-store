import { wishlistResolvers } from '@graphql/resolvers/wishlist';
import { transformWishlist } from '@graphql/resolvers/wishlist/util/transform';
import { GraphQLContext } from '@graphql/types/context';
import { createMockWishlist } from '@mocks/wishlist';
import { createMockProduct } from '@mocks/products';
import {
  createWishlistHandler,
  wishlistErrorHandler,
  createAddWishlistItemHandler,
  createRemoveWishlistItemHandler,
  addWishlistItemErrorHandler,
  removeWishlistItemErrorHandler,
} from '@mocks/msw/handlers/wishlist';
import { server } from '@mocks/msw/node';
import Medusa from '@medusajs/js-sdk';

import { UnauthorizedError } from '../../../types/errors';

type MockProductService = {
  getProducts: jest.Mock;
};

const createContext = () => {
  const medusa = new Medusa({
    baseUrl: process.env.MEDUSA_API_URL || 'http://localhost:9000',
    apiKey: process.env.MEDUSA_PUBLISHABLE_KEY,
  });

  const session = {
    isCustomerLoggedIn: true,
  };

  const productService: MockProductService = {
    getProducts: jest.fn(),
  };

  return {
    context: {
      medusa,
      session,
      productService: productService as unknown as GraphQLContext['productService'],
    } as unknown as GraphQLContext,
    medusa,
    session,
    productService,
  };
};

describe('wishlistResolvers', () => {
  describe('transformWishlist', () => {
    it('normalizes wishlist payloads from the Medusa Store API', () => {
      const wishlist = createMockWishlist();

      const result = transformWishlist(wishlist);

      expect(result).toMatchObject({
        id: 'wishlist_1',
        items: [
          {
            id: 'wishlist_item_1',
            wishlistId: 'wishlist_1',
            productVariantId: 'var_1',
          },
        ],
      });

      const item = result.items?.[0];
      expect(item?.productVariant?.allowBackorder).toBe(false);
      expect(item?.productVariant?.manageInventory).toBe(true);
      expect(item?.productVariant?.price).toEqual({
        amount: 2500,
        currencyCode: 'usd',
        priceType: 'default',
      });
      expect(item?.productVariant?.originalPrice).toEqual({
        amount: 3000,
        currencyCode: 'usd',
        priceType: 'default',
      });
      expect(item?.productVariant?.options?.[0]).toEqual({
        id: 'opt_val_1',
        optionId: 'opt_1',
        value: 'S',
      });
      expect(item?.productVariant?.product?.id).toBe('prod_1');
    });

    it('fills missing product data from the fallback map', () => {
      const wishlist = createMockWishlist();
      const productVariant = wishlist.items?.[0]?.product_variant;
      expect(productVariant).toBeDefined();
      if (!productVariant) return;

      productVariant.product = undefined;

      const fallbackProduct = createMockProduct({ id: productVariant.product_id });

      const result = transformWishlist(wishlist, {
        productsById: {
          [fallbackProduct.id]: fallbackProduct,
        },
      });

      const item = result.items?.[0];
      expect(item?.productVariant?.product).toEqual(fallbackProduct);
    });

    it('uses fallback data when the product payload is partial', () => {
      const wishlist = createMockWishlist();
      const productVariant = wishlist.items?.[0]?.product_variant;
      expect(productVariant).toBeDefined();
      if (!productVariant) return;

      productVariant.product = {
        id: productVariant.product_id,
      } as typeof productVariant.product;

      const fallbackProduct = createMockProduct({ id: productVariant.product_id });

      const result = transformWishlist(wishlist, {
        productsById: {
          [fallbackProduct.id]: fallbackProduct,
        },
      });

      expect(result.items?.[0]?.productVariant?.product).toEqual(
        fallbackProduct
      );
    });
  });

  describe('Query.wishlist', () => {
    it('returns the wishlist returned by Medusa transformed for GraphQL', async () => {
      const { context, medusa, productService } = createContext();
      const wishlist = createMockWishlist();
      server.use(createWishlistHandler(wishlist));

      const fetchSpy = jest.spyOn(medusa.client, 'fetch');
      const result = await wishlistResolvers.Query.wishlist({}, {}, context);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/store/customers/me/wishlists?fields=')
      );
      expect(result).toEqual(transformWishlist(wishlist));
      expect(productService.getProducts).not.toHaveBeenCalled();

      fetchSpy.mockRestore();
    });

    it('throws when the customer is not logged in', async () => {
      const { context, session, medusa } = createContext();
      session.isCustomerLoggedIn = false;

      const fetchSpy = jest.spyOn(medusa.client, 'fetch');
      await expect(
        wishlistResolvers.Query.wishlist({}, {}, context)
      ).rejects.toBeInstanceOf(UnauthorizedError);
      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it('propagates Medusa API errors', async () => {
      const { context } = createContext();
      server.use(wishlistErrorHandler);

      await expect(
        wishlistResolvers.Query.wishlist({}, {}, context)
      ).rejects.toThrow('Internal Server Error');
    });

    it('fetches missing products when Medusa payload lacks them', async () => {
      const { context, medusa, productService } = createContext();
      const wishlist = createMockWishlist();
      const productVariant = wishlist.items?.[0]?.product_variant;
      expect(productVariant).toBeDefined();
      if (!productVariant) return;

      productVariant.product = undefined;
      server.use(createWishlistHandler(wishlist));

      const fallbackProduct = createMockProduct({ id: productVariant.product_id });
      productService.getProducts.mockResolvedValue({
        products: [fallbackProduct],
        count: 1,
      });

      const result = await wishlistResolvers.Query.wishlist({}, {}, context);

      expect(productService.getProducts).toHaveBeenCalledWith({
        id: [fallbackProduct.id],
      });
      expect(result.items?.[0]?.productVariant?.product).toEqual(
        fallbackProduct
      );
    });

    it('fetches missing products when Medusa payload includes only product ids', async () => {
      const { context, medusa, productService } = createContext();
      const wishlist = createMockWishlist();
      const productVariant = wishlist.items?.[0]?.product_variant;
      expect(productVariant).toBeDefined();
      if (!productVariant) return;

      productVariant.product = {
        id: productVariant.product_id,
      } as typeof productVariant.product;
      server.use(createWishlistHandler(wishlist));

      const fallbackProduct = createMockProduct({ id: productVariant.product_id });
      productService.getProducts.mockResolvedValue({
        products: [fallbackProduct],
        count: 1,
      });

      const result = await wishlistResolvers.Query.wishlist({}, {}, context);

      expect(productService.getProducts).toHaveBeenCalledWith({
        id: [fallbackProduct.id],
      });
      expect(result.items?.[0]?.productVariant?.product).toEqual(
        fallbackProduct
      );
    });
  });

  describe('Mutation.addWishlistItem', () => {
    it('adds an item to the wishlist', async () => {
      const { context, medusa, productService } = createContext();
      const wishlist = createMockWishlist();
      server.use(createAddWishlistItemHandler(wishlist));

      const fetchSpy = jest.spyOn(medusa.client, 'fetch');
      const result = await wishlistResolvers.Mutation.addWishlistItem(
        {},
        { productVariantId: 'variant_123' },
        context
      );

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/store/customers/me/wishlists/items?fields='),
        expect.objectContaining({
          method: 'POST',
          body: { variant_id: 'variant_123' },
        })
      );
      expect(result).toEqual(transformWishlist(wishlist));
      expect(productService.getProducts).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it('throws when the customer is not logged in', async () => {
      const { context, session, medusa } = createContext();
      session.isCustomerLoggedIn = false;

      const fetchSpy = jest.spyOn(medusa.client, 'fetch');
      await expect(
        wishlistResolvers.Mutation.addWishlistItem(
          {},
          { productVariantId: 'variant_123' },
          context
        )
      ).rejects.toBeInstanceOf(UnauthorizedError);
      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it('propagates Medusa API errors', async () => {
      const { context } = createContext();
      server.use(addWishlistItemErrorHandler);

      await expect(
        wishlistResolvers.Mutation.addWishlistItem(
          {},
          { productVariantId: 'variant_123' },
          context
        )
      ).rejects.toThrow('Internal Server Error');
    });

    it('fetches missing products when the payload lacks them', async () => {
      const { context, productService } = createContext();
      const wishlist = createMockWishlist();
      const productVariant = wishlist.items?.[0]?.product_variant;
      expect(productVariant).toBeDefined();
      if (!productVariant || !productVariant.product_id) return;

      productVariant.product = undefined;
      server.use(createAddWishlistItemHandler(wishlist));

      const fallbackProduct = createMockProduct({ id: productVariant.product_id });
      productService.getProducts.mockResolvedValue({
        products: [fallbackProduct],
        count: 1,
      });

      const result = await wishlistResolvers.Mutation.addWishlistItem(
        {},
        { productVariantId: productVariant.product_id },
        context
      );

      expect(productService.getProducts).toHaveBeenCalledWith({
        id: [fallbackProduct.id],
      });
      expect(result.items?.[0]?.productVariant?.product).toEqual(
        fallbackProduct
      );
    });
  });

  describe('Mutation.removeWishlistItem', () => {
    it('removes an item from the wishlist', async () => {
      const { context, medusa, productService } = createContext();
      const wishlist = createMockWishlist();
      server.use(createRemoveWishlistItemHandler(wishlist));

      const fetchSpy = jest.spyOn(medusa.client, 'fetch');
      const result = await wishlistResolvers.Mutation.removeWishlistItem(
        {},
        { wishlistItemId: 'wishlist_item_1' },
        context
      );

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          '/store/customers/me/wishlists/items/wishlist_item_1?fields='
        ),
        expect.objectContaining({ method: 'DELETE' })
      );
      expect(result).toEqual(transformWishlist(wishlist));
      expect(productService.getProducts).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it('throws when the customer is not logged in', async () => {
      const { context, session, medusa } = createContext();
      session.isCustomerLoggedIn = false;

      const fetchSpy = jest.spyOn(medusa.client, 'fetch');
      await expect(
        wishlistResolvers.Mutation.removeWishlistItem(
          {},
          { wishlistItemId: 'wishlist_item_1' },
          context
        )
      ).rejects.toBeInstanceOf(UnauthorizedError);
      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it('propagates Medusa API errors', async () => {
      const { context } = createContext();
      server.use(removeWishlistItemErrorHandler);

      await expect(
        wishlistResolvers.Mutation.removeWishlistItem(
          {},
          { wishlistItemId: 'wishlist_item_1' },
          context
        )
      ).rejects.toThrow('Internal Server Error');
    });

    it('fetches missing products when the payload lacks them', async () => {
      const { context, productService } = createContext();
      const wishlist = createMockWishlist();
      const productVariant = wishlist.items?.[0]?.product_variant;
      expect(productVariant).toBeDefined();
      if (!productVariant || !productVariant.product_id) return;

      productVariant.product = {
        id: productVariant.product_id,
      } as typeof productVariant.product;
      server.use(createRemoveWishlistItemHandler(wishlist));

      const fallbackProduct = createMockProduct({ id: productVariant.product_id });
      productService.getProducts.mockResolvedValue({
        products: [fallbackProduct],
        count: 1,
      });

      const result = await wishlistResolvers.Mutation.removeWishlistItem(
        {},
        { wishlistItemId: 'wishlist_item_1' },
        context
      );

      expect(productService.getProducts).toHaveBeenCalledWith({
        id: [fallbackProduct.id],
      });
      expect(result.items?.[0]?.productVariant?.product).toEqual(
        fallbackProduct
      );
    });
  });
});
