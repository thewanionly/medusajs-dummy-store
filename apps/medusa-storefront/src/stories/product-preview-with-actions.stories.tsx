import { mockedProducts } from 'mocks/data/storybook/products';

import { Product } from '@lib/gql/generated-types/graphql';
import ProductActions, {
  ProductActionsProps,
} from '@modules/products/components/product-actions';
import { Meta, StoryObj } from '@storybook/nextjs';
import { PlayFunction } from '@storybook/types';

import { handlers as cartsHandlers } from '../mocks/msw/handlers/storybook/carts';
import { handlers as regionsHandlers } from '../mocks/msw/handlers/storybook/regions';
import ProductPreview, {
  ProductPreviewProps,
} from '../modules/products/components/product-preview';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const addToCartPlay: PlayFunction = async ({ canvas, userEvent }) => {
  await delay(500);

  const options = canvas.getAllByTestId('option-button');
  await userEvent.click(options[0]!);
  await delay(1000);

  await userEvent.click(canvas.getByTestId('add-product-button'));
};

const ProductPreviewWithActions = ({
  product,
  isFeatured,
  disabled,
}: ProductPreviewProps & ProductActionsProps) => (
  <div className="flex flex-col gap-8 sm:flex-row">
    <div className="w-1/3 min-w-[250px]">
      <ProductPreview product={product} isFeatured={isFeatured} />
    </div>
    <div className="mt-4">
      <ProductActions product={product} disabled={disabled} />
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

const mockedProps: ProductPreviewProps = {
  product: mockedProducts[0] as Product,
  isFeatured: true,
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
