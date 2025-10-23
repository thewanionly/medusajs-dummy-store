import 'storybook/test';

import {
  LoginTemplate,
  LoginTemplateProps,
} from '@modules/account/templates/login-template';
import { Meta, StoryObj } from '@storybook/nextjs';
import type { PlayFunction } from '@storybook/types';

import {
  accountLocked,
  handlers as customerHandlers,
  invalidCredentials,
  rateLimited,
  serverError,
} from '../../../../mocks/msw/handlers/storybook/customer';
import {
  LOGIN_DESCRIPTION,
  LOGIN_HEADING,
} from '../../components/login/constants';
import {
  REGISTER_DESCRIPTION,
  REGISTER_HEADING,
} from '../../components/register/constants';

const meta = {
  title: 'LoginRegisterForm',
  component: LoginTemplate,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['countryCode', 'dk']],
      },
    },
  },
} satisfies Meta<typeof LoginTemplate>;
export default meta;

type Story = StoryObj<typeof meta>;

const mockedProps: LoginTemplateProps = {
  loginHeading: LOGIN_HEADING,
  loginDescription: LOGIN_DESCRIPTION,
  registerHeading: REGISTER_HEADING,
  registerDescription: REGISTER_DESCRIPTION,
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loginPlay: PlayFunction = async ({ canvas, userEvent }) => {
  await userEvent.type(canvas.getByTestId('email-input'), 'john.doe@gmail.com');
  await delay(300);

  await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
  await delay(300);

  await userEvent.click(canvas.getByTestId('sign-in-button'));
};

export const LoginSuccess: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: customerHandlers,
    },
  },
  play: loginPlay,
};

export const LoginInvalidCredentials: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [invalidCredentials],
    },
  },
  play: loginPlay,
};

export const LoginAccountLocked: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [accountLocked],
    },
  },
  play: loginPlay,
};

export const LoginRateLimited: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [rateLimited],
    },
  },
  play: loginPlay,
};

export const LoginServerError: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [serverError],
    },
  },
  play: loginPlay,
};
