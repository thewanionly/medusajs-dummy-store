import { Product } from '@lib/gql/generated-types/graphql';
import ProductActions, {
  ProductActionsProps,
} from '@modules/products/components/product-actions';
import { Meta, StoryObj } from '@storybook/nextjs';
import { PlayFunction } from '@storybook/types';

import {
  mockedProducts,
  outOfStockProduct,
} from '../mocks/data/storybook/products';
import {
  addToCartServerError,
  handlers as cartsHandlers,
  createCartSuccess,
} from '../mocks/msw/handlers/storybook/carts';
import { handlers as regionsHandlers } from '../mocks/msw/handlers/storybook/regions';
import ProductPreview, {
  ProductPreviewProps,
} from '../modules/products/components/product-preview';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const addToCartPlay: PlayFunction = async ({ canvas, userEvent }) => {
  const options = canvas.getAllByTestId('option-button');
  await userEvent.click(options[0]!);
  await delay(300);

  await userEvent.click(canvas.getByTestId('add-product-button'));
};

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
  title: 'ProductCard',
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

export const Default: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [...cartsHandlers, ...regionsHandlers],
    },
  },
  play: addToCartPlay,
};

export const ErrorAddToCart: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [...regionsHandlers, createCartSuccess, addToCartServerError],
    },
  },
  play: addToCartPlay,
};

export const OutOfStock: Story = {
  args: { ...mockedProps, product: outOfStockProduct as Product },
  play: async ({ canvas, userEvent }) => {
    const options = canvas.getAllByTestId('option-button');
    await userEvent.click(options[0]!);
  },
};
