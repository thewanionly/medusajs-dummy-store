import 'storybook/test';

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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//@ts-ignore
const commonPlay = async ({ canvas, userEvent }) => {
  await userEvent.type(canvas.getByTestId('email-input'), 'john.doe@gmail.com');
  await sleep(300);
  await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
  await sleep(300);
  await userEvent.click(canvas.getByTestId('sign-in-button'));
};

export const Default: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: customerHandlers,
    },
  },
  play: commonPlay,
};

export const InvalidCredentials: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: [invalidCredentials],
    },
  },
  play: commonPlay,
};

export const AccountLocked: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: [accountLocked],
    },
  },
  play: commonPlay,
};

export const RateLimited: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: [rateLimited],
    },
  },
  play: commonPlay,
};

export const ServerError: Story = {
  args: commonArgs,
  parameters: {
    msw: {
      handlers: [serverError],
    },
  },
  play: commonPlay,
};
