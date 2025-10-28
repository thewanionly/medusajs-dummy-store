import { expect } from 'storybook/test';

import LoginTemplate, {
  LoginTemplateProps,
} from '@modules/account/templates/login-template';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

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
import { delay } from './utils/delay';

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

export const LoginSuccess: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: customerHandlers,
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(
      canvas.getByTestId('email-input'),
      'john.doe@gmail.com'
    );
    await delay(300);

    await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
    await delay(300);

    await userEvent.click(canvas.getByTestId('sign-in-button'));
    await delay(1000);

    expect(await canvas.findByText(/Login successful/i)).toBeInTheDocument();
  },
};

export const LoginInvalidCredentials: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [invalidCredentials],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(
      canvas.getByTestId('email-input'),
      'john.doe@gmail.com'
    );
    await delay(300);

    await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
    await delay(300);

    await userEvent.click(canvas.getByTestId('sign-in-button'));
    await delay(1000);

    expect(
      await canvas.findByText(/Invalid email or password/i)
    ).toBeInTheDocument();
  },
};

export const LoginServerError: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [serverErrorLogin],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(
      canvas.getByTestId('email-input'),
      'john.doe@gmail.com'
    );
    await delay(300);

    await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
    await delay(300);

    await userEvent.click(canvas.getByTestId('sign-in-button'));
    await delay(1000);

    expect(
      await canvas.findByText(/Something went wrong. Please try again./i)
    ).toBeInTheDocument();
  },
};

export const RegisterSuccess: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: customerHandlers,
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('register-button'));
    await delay(150);

    await userEvent.type(canvas.getByTestId('first-name-input'), 'John');
    await delay(300);

    await userEvent.type(canvas.getByTestId('last-name-input'), 'Doe');
    await delay(300);

    await userEvent.type(
      canvas.getByTestId('email-input'),
      'john.doe@gmail.com'
    );
    await delay(300);

    await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
    await delay(300);

    await userEvent.click(canvas.getByTestId('register-button'));
    await delay(1500);

    expect(
      await canvas.findByText(/Registration successful/i)
    ).toBeInTheDocument();
  },
};

export const RegisterAccountAlreadyExists: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [accountAlreadyExists],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('register-button'));
    await delay(150);

    await userEvent.type(canvas.getByTestId('first-name-input'), 'John');
    await delay(300);

    await userEvent.type(canvas.getByTestId('last-name-input'), 'Doe');
    await delay(300);

    await userEvent.type(
      canvas.getByTestId('email-input'),
      'john.doe@gmail.com'
    );
    await delay(300);

    await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
    await delay(300);

    await userEvent.click(canvas.getByTestId('register-button'));
    await delay(1000);

    expect(
      await canvas.findByText(/Identity with email already exists/i)
    ).toBeInTheDocument();
  },
};

export const RegisterServerError: Story = {
  args: mockedProps,
  parameters: {
    msw: {
      handlers: [serverErrorRegister],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('register-button'));
    await delay(150);

    await userEvent.type(canvas.getByTestId('first-name-input'), 'John');
    await delay(300);

    await userEvent.type(canvas.getByTestId('last-name-input'), 'Doe');
    await delay(300);

    await userEvent.type(
      canvas.getByTestId('email-input'),
      'john.doe@gmail.com'
    );
    await delay(300);

    await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
    await delay(300);

    await userEvent.click(canvas.getByTestId('register-button'));
    await delay(1000);

    expect(
      await canvas.findByText(/Something went wrong. Please try again./i)
    ).toBeInTheDocument();
  },
};
