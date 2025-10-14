import { outOfStockProduct } from 'mocks/data/products';
import { HttpResponse } from 'msw';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { medusaBff } from '../../mocks/msw/apis';
import { handlers } from '../../mocks/msw/handlers';
import ProductCard from './ProductCard';

const meta = {
  title: 'ProductCard',
  component: ProductCard,
} satisfies Meta<typeof ProductCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { handle: 'mens-tree-gliders-thunder-green', countryCode: 'dk' },
  parameters: {
    msw: {
      handlers,
    },
  },
};

export const Error: Story = {
  args: { handle: 'mens-tree-gliders-thunder-green', countryCode: 'dk' },
  parameters: {
    msw: {
      handlers: [
        medusaBff.query('GetProducts', () => {
          return HttpResponse.json({
            errors: [
              {
                message: 'Not found',
              },
            ],
          });
        }),
      ],
    },
  },
};

export const OutOfStock: Story = {
  args: { handle: 'mens-tree-gliders-thunder-green', countryCode: 'dk' },
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
