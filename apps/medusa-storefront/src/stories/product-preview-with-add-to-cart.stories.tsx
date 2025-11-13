import { expect } from 'storybook/test';

import { Product } from '@lib/gql/generated-types/graphql';
import ProductActions, {
  ProductActionsProps,
} from '@modules/products/components/product-actions';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockedProducts, outOfStockProduct } from '../mocks/data/products';
import {
  addToCartServerError,
  addToCartSuccess,
  createCartSuccess,
} from '../mocks/msw/handlers/carts';
import { getRegionSuccess } from '../mocks/msw/handlers/regions';
import ProductPreview, {
  ProductPreviewProps,
} from '../modules/products/components/product-preview';
import { delay } from './utils/delay';

type ProductPreviewWithActionsProps = ProductPreviewProps & ProductActionsProps;

const ProductPreviewWithActions = ({
  product,
  isFeatured,
  disabled,
}: ProductPreviewWithActionsProps) => (
  <div className="flex flex-col gap-8 sm:flex-row">
    <div className="w-1/3 min-w-[250px]">
      <ProductPreview product={product} isFeatured={isFeatured} />
    </div>
    <div className="mt-4">
      <ProductActions
        product={product}
        disabled={disabled}
        enableMobileActions={false}
      />
    </div>
  </div>
);

const meta = {
  title: 'ProductCard/AddToCart',
  component: ProductPreviewWithActions,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['countryCode', 'dk']],
      },
    },
  },
} satisfies Meta<typeof ProductPreviewWithActions>;
export default meta;

type Story = StoryObj<typeof meta>;

const mockedProps: ProductPreviewWithActionsProps = {
  product: mockedProducts[0] as Product,
  isFeatured: true,
  disabled: false,
};

export const SuccessAddToCart: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [getRegionSuccess, createCartSuccess, addToCartSuccess],
    },
  },
  play: async ({ canvas, userEvent }) => {
    const options = canvas.getAllByTestId('option-button');
    await userEvent.click(options[0]!);
    await delay(300);

    await userEvent.click(canvas.getByTestId('add-product-button'));
    await delay(1000);

    expect(
      await canvas.findByText(/Successfully added product to cart/i)
    ).toBeInTheDocument();
  },
};

export const ErrorAddToCart: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [getRegionSuccess, createCartSuccess, addToCartServerError],
    },
  },
  play: async ({ canvas, userEvent }) => {
    const options = canvas.getAllByTestId('option-button');
    await userEvent.click(options[0]!);
    await delay(300);

    await userEvent.click(canvas.getByTestId('add-product-button'));
    await delay(1000);

    expect(
      await canvas.findByText(
        /Failed adding product to cart. Please try again./i
      )
    ).toBeInTheDocument();
  },
};

export const OutOfStock: Story = {
  args: { ...mockedProps, product: outOfStockProduct as Product },
  play: async ({ canvas, userEvent }) => {
    const options = canvas.getAllByTestId('option-button');
    await userEvent.click(options[0]!);

    expect(canvas.getByTestId('add-product-button')).toHaveTextContent(
      'Out of stock'
    );
  },
};
