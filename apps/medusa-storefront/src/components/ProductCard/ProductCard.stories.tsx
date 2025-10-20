import { mockedCart } from 'mocks/data/storybook/carts';
import {
  mockedProducts,
  outOfStockProduct,
} from 'mocks/data/storybook/products';
import { HttpResponse, delay, http } from 'msw';

import { Product, ProductVariant } from '@lib/gql/generated-types/graphql';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { medusaBff } from '../../mocks/msw/apis';
import { handlers } from '../../mocks/msw/handlers/storybook';
import { handlers as regionsHandlers } from '../../mocks/msw/handlers/storybook/regions';
import ProductCard from './ProductCard';

const meta = {
  title: 'ProductCard',
  component: ProductCard,
  argTypes: {
    variantId: { table: { disable: true } },
    countryCode: { table: { disable: true } },
  },
} satisfies Meta<typeof ProductCard>;
export default meta;

type Story = StoryObj<typeof meta>;

const mockedProduct = mockedProducts[0] as Product;
const mockedProductVariant = mockedProduct.variants?.[0] as ProductVariant;

const mockedProductCardProps = {
  title: mockedProduct.title,
  thumbnail: mockedProduct.thumbnail as string,
  variantId: mockedProductVariant.id,
  size: mockedProductVariant.options[0]?.value || '',
  price: new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'gbp',
  }).format(135),
  inStock: true,
};

export const Default: Story = {
  args: { ...mockedProductCardProps, countryCode: 'dk' },
  parameters: {
    msw: {
      handlers,
    },
  },
};

export const ErrorATB: Story = {
  args: { ...mockedProductCardProps, countryCode: 'dk' },
  parameters: {
    msw: {
      handlers: [
        ...regionsHandlers,
        http.post('http://localhost:9000/store/carts', async () => {
          await delay(1000);

          return HttpResponse.json({
            cart: mockedCart,
          });
        }),
        http.post(
          'http://localhost:9000/store/carts/:id/line-items',
          async () => {
            await delay(1000);

            return HttpResponse.json(
              { message: 'Failed to add to cart. Please try again.' },
              { status: 500 }
            );
          }
        ),
      ],
    },
  },
};

export const OutOfStock: Story = {
  args: { ...mockedProductCardProps, inStock: false, countryCode: 'dk' },
  parameters: {
    msw: {
      handlers: [
        medusaBff.query('GetProducts', () => {
          return HttpResponse.json({
            data: {
              products: {
                products: [outOfStockProduct],
                count: 1,
                limit: 50,
                offset: 0,
              },
            },
          });
        }),
      ],
    },
  },
};
