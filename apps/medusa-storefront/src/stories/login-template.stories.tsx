import 'storybook/test';

import LoginTemplate, {
  LoginTemplateProps,
} from '@modules/account/templates/login-template';
import { Meta, StoryObj } from '@storybook/nextjs';
import type { PlayFunction } from '@storybook/types';

import {
  accountAlreadyExists,
  handlers as customerHandlers,
  invalidCredentials,
  serverErrorLogin,
  serverErrorRegister,
} from '../mocks/msw/handlers/storybook/customer';
import {
  LOGIN_DESCRIPTION,
  LOGIN_HEADING,
} from '../modules/account/components/login/constants';
import {
  REGISTER_DESCRIPTION,
  REGISTER_HEADING,
} from '../modules/account/components/register/constants';

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

const registerPlay: PlayFunction = async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByTestId('register-button'));
  await delay(150);

  await userEvent.type(canvas.getByTestId('first-name-input'), 'John');
  await delay(300);

  await userEvent.type(canvas.getByTestId('last-name-input'), 'Doe');
  await delay(300);

  await userEvent.type(canvas.getByTestId('email-input'), 'john.doe@gmail.com');
  await delay(300);

  await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
  await delay(300);

  await userEvent.click(canvas.getByTestId('register-button'));
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

export const LoginServerError: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [serverErrorLogin],
    },
  },
  play: loginPlay,
};

export const RegisterSuccess: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: customerHandlers,
    },
  },
  play: registerPlay,
};

export const RegisterAccountAlreadyExists: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [accountAlreadyExists],
    },
  },
  play: registerPlay,
};

export const RegisterServerError: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [serverErrorRegister],
    },
  },
  play: registerPlay,
};
