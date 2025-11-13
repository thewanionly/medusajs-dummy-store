import { delay } from 'msw';
import { expect, waitFor } from 'storybook/test';

import { Product } from '@lib/gql/generated-types/graphql';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockedProducts } from '../mocks/data/products';
import {
  addWishlistItemError,
  addWishlistItemSuccess,
  removeWishlistItemError,
  removeWishlistItemSuccess,
  resetWishlistMocks,
} from '../mocks/msw/handlers/wishlist';
import ProductPreview, {
  ProductPreviewProps,
} from '../modules/products/components/product-preview';
import {
  WishlistProvider,
  WishlistSeedEntry,
} from '../modules/wishlist/context/wishlist-context';

const ProductPreviewWithWishlist = ({
  product,
  isFeatured,
}: ProductPreviewProps) => (
  <div className="w-1/3 min-w-[250px]">
    <ProductPreview
      product={product}
      isFeatured={isFeatured}
      showWishlistToggle
    />
  </div>
);

const meta = {
  title: 'ProductCard/Wishlist',
  component: ProductPreviewWithWishlist,
  decorators: [
    (Story, context) => {
      resetWishlistMocks();
      const initialEntries =
        (context.parameters?.wishlist?.initialEntries as WishlistSeedEntry[]) ||
        [];
      return (
        <WishlistProvider initialEntries={initialEntries}>
          <Story />
        </WishlistProvider>
      );
    },
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['countryCode', 'dk']],
      },
    },
  },
} satisfies Meta<typeof ProductPreviewWithWishlist>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockedProps: ProductPreviewProps = {
  product: mockedProducts[0] as Product,
  isFeatured: true,
};

const baseVariantId =
  mockedProps.product.variants?.[0]?.id ?? 'variant_default_id';
const baseProductId = mockedProps.product.id ?? 'product_default_id';
const defaultWishlistItemId = 'wishlist-item-initial';

export const AddToWishlistSuccess: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [addWishlistItemSuccess, removeWishlistItemSuccess],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await delay(500);

    const toggleButton = canvas.getByTestId('wishlist-toggle-button');
    await userEvent.click(toggleButton);
    await waitFor(() =>
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
    );
  },
};

export const RemoveFromWishlistSuccess: Story = {
  args: mockedProps,
  parameters: {
    wishlist: {
      initialEntries: [
        {
          productId: baseProductId,
          productVariantId: baseVariantId,
          wishlistItemId: defaultWishlistItemId,
        },
      ],
    },
    msw: {
      handlers: [removeWishlistItemSuccess, addWishlistItemSuccess],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await delay(500);

    const toggleButton = canvas.getByTestId('wishlist-toggle-button');
    await waitFor(() =>
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
    );

    await userEvent.click(toggleButton);
    await waitFor(() =>
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    );
  },
};

export const AddToWishlistError: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [addWishlistItemError, removeWishlistItemSuccess],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await delay(500);

    const toggleButton = canvas.getByTestId('wishlist-toggle-button');
    await userEvent.click(toggleButton);

    await waitFor(() =>
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    );
  },
};

export const RemoveFromWishlistError: Story = {
  args: mockedProps,
  parameters: {
    wishlist: {
      initialEntries: [
        {
          productId: baseProductId,
          productVariantId: baseVariantId,
          wishlistItemId: defaultWishlistItemId,
        },
      ],
    },
    msw: {
      handlers: [removeWishlistItemError, addWishlistItemSuccess],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await delay(500);

    const toggleButton = canvas.getByTestId('wishlist-toggle-button');
    await waitFor(() =>
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
    );

    await userEvent.click(toggleButton);
    await waitFor(() =>
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
    );
  },
};
