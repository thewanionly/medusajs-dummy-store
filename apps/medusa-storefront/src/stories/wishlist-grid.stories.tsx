import { delay } from 'msw';
import { expect, waitFor } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockedProducts } from '../mocks/data/products';
import {
  getCustomerWishlistEmpty,
  getCustomerWishlistError,
  getCustomerWishlistSuccess,
  removeWishlistItemError,
  removeWishlistItemSuccess,
} from '../mocks/msw/handlers/wishlist';
import WishlistGrid, {
  type WishlistGridProps,
} from '../modules/wishlist/components/wishlist-grid';

const baseArgs: WishlistGridProps = {};

const meta = {
  title: 'Wishlist Grid',
  component: WishlistGrid,
  args: baseArgs,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['countryCode', 'dk']],
      },
    },
  },
} satisfies Meta<typeof WishlistGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultHandlers = [getCustomerWishlistSuccess, removeWishlistItemSuccess];
const firstWishlistProductTitle = mockedProducts[0]!.title;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: defaultHandlers,
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [getCustomerWishlistEmpty, removeWishlistItemSuccess],
    },
  },
};

export const LoadingError: Story = {
  parameters: {
    msw: {
      handlers: [getCustomerWishlistError],
    },
  },
};

export const RemoveWishlistItemSuccess: Story = {
  parameters: {
    msw: {
      handlers: defaultHandlers,
    },
  },
  play: async ({ canvas, userEvent }) => {
    await delay(1000);

    const removeButtons = await canvas.findAllByTestId(
      'wishlist-remove-button'
    );
    await userEvent.click(removeButtons[0]!);

    await waitFor(() =>
      expect(document.body).toHaveTextContent('Removed from wishlist')
    );

    await waitFor(() =>
      expect(
        canvas.queryByText(firstWishlistProductTitle)
      ).not.toBeInTheDocument()
    );
  },
};

export const RemoveWishlistItemError: Story = {
  parameters: {
    msw: {
      handlers: [getCustomerWishlistSuccess, removeWishlistItemError],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await delay(1000);

    const removeButtons = await canvas.findAllByTestId(
      'wishlist-remove-button'
    );
    await userEvent.click(removeButtons[0]!);

    await waitFor(() =>
      expect(document.body).toHaveTextContent('Failed to remove from wishlist')
    );

    expect(canvas.getByText(firstWishlistProductTitle)).toBeInTheDocument();
  },
};
