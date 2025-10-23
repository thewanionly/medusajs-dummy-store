import { mockedProducts } from 'mocks/data/storybook/products';

import { Product } from '@lib/gql/generated-types/graphql';
import { Meta, StoryObj } from '@storybook/nextjs';

import ProductPreview, {
  ProductPreviewProps,
} from '../modules/products/components/product-preview';

const ProductPreviewWithActions = (props: ProductPreviewProps) => (
  <div className="w-1/3 min-w-[250px]">
    <ProductPreview {...props} />
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
};
