import type { Meta, StoryObj } from '@storybook/nextjs';

import { handlers as customerHandlers } from '../../mocks/msw/handlers/storybook/customer';
import LoginForm from './LoginForm';

const meta = {
  title: 'LoginForm',
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Log in',
    description: 'Log in to access an enhanced shopping experience.',
  },
  parameters: {
    msw: {
      handlers: customerHandlers,
    },
  },
};
