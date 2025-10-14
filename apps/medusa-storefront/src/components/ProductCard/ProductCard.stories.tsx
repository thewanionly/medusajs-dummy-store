import type { Meta, StoryObj } from '@storybook/nextjs';

import { handlers } from '../../mocks/msw/handlers';
import ProductCard from './ProductCard';

const meta = {
  title: 'ProductCard',
  component: ProductCard,
} satisfies Meta<typeof ProductCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: { handle: 'mens-tree-gliders-thunder-green', countryCode: 'dk' },
  parameters: {
    msw: {
      handlers,
    },
  },
};
