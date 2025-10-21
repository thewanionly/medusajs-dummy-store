import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  handlers as customerHandlers,
  invalidCredentials,
} from '../../mocks/msw/handlers/storybook/customer';
import LoginForm from './LoginForm';

const meta = {
  title: 'LoginForm',
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

const commonArgs = {
  title: 'Log in',
  description: 'Log in to access an enhanced shopping experience.',
};

export const Default: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: customerHandlers,
    },
  },
};

export const InvalidCredentials: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: [invalidCredentials],
    },
  },
};
