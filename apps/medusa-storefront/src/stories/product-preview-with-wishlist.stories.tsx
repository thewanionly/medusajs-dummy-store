import { delay } from 'msw';
import { expect, waitFor } from 'storybook/test';

import { Product } from '@lib/gql/generated-types/graphql';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  WishlistProvider,
  WishlistSyncEntry,
} from '../lib/context/wishlist-context';
import { mockedProducts } from '../mocks/data/products';
import {
  mockedProductVariantId,
  mockedWishlistItemId,
} from '../mocks/data/wishlist';
import {
  addWishlistItemError,
  addWishlistItemSuccess,
  removeWishlistItemError,
  removeWishlistItemSuccess,
} from '../mocks/msw/handlers/wishlist';
import ProductPreview, {
  ProductPreviewProps,
} from '../modules/products/components/product-preview';

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
      const initialEntries =
        (context.parameters?.wishlist?.initialEntries as WishlistSyncEntry[]) ||
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
  mockedProps.product.variants?.[0]?.id ?? mockedProductVariantId;

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
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
    await waitFor(() =>
      expect(canvas.getByText('Added to wishlist')).toBeInTheDocument()
    );
  },
};

export const RemoveFromWishlistSuccess: Story = {
  args: mockedProps,
  parameters: {
    wishlist: {
      initialEntries: [
        {
          productVariantId: baseVariantId,
          wishlistItemId: mockedWishlistItemId,
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
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
    await waitFor(() =>
      expect(canvas.getByText('Removed from wishlist')).toBeInTheDocument()
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
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

    await waitFor(() =>
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    );
    await waitFor(() =>
      expect(canvas.getByText('Failed to add to wishlist')).toBeInTheDocument()
    );
  },
};

export const RemoveFromWishlistError: Story = {
  args: mockedProps,
  parameters: {
    wishlist: {
      initialEntries: [
        {
          productVariantId: baseVariantId,
          wishlistItemId: mockedWishlistItemId,
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
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

    await waitFor(() =>
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
    );
    await waitFor(() =>
      expect(
        canvas.getByText('Failed to remove from wishlist')
      ).toBeInTheDocument()
    );
  },
};
