import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  accountLocked,
  handlers as customerHandlers,
  invalidCredentials,
  rateLimited,
  serverError,
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

export const AccountLocked: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: [accountLocked],
    },
  },
};

export const RateLimited: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: [rateLimited],
    },
  },
};

export const ServerError: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: [serverError],
    },
  },
};
