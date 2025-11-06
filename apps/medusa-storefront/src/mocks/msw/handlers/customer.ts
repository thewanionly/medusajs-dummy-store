import { HttpResponse, delay, http } from 'msw';

import { mockedCustomer, mockedToken } from '../../data/customer';
import { storefrontMedusaBffWrapper } from '../apis';

export const handlers = [
  storefrontMedusaBffWrapper.mutation('Login', async () => {
    await delay(1000);

    return HttpResponse.json({
      data: {
        login: {
          token: mockedToken,
        },
      },
    });
  }),
  http.post('http://localhost:9000/auth/customer/emailpass', async () => {
    await delay(1000);

    return HttpResponse.json({
      token: mockedToken,
    });
  }),
  http.post(
    'http://localhost:9000/auth/customer/emailpass/register',
    async () => {
      await delay(250);

      return HttpResponse.json({
        token: mockedToken,
      });
    }
  ),
  http.post('http://localhost:9000/store/customers', async () => {
    await delay(250);

    return HttpResponse.json({
      customer: mockedCustomer,
    });
  }),
];

export const invalidCredentials = storefrontMedusaBffWrapper.mutation(
  'Login',
  async () => {
    await delay(1000);

    return HttpResponse.json({
      errors: [
        {
          message: 'Invalid email or password',
        },
      ],
    });
  }
);

export const serverErrorLogin = storefrontMedusaBffWrapper.mutation(
  'Login',
  async () => {
    await delay(1000);

    return HttpResponse.json({
      errors: [
        {
          message: 'Something went wrong. Please try again.',
        },
      ],
    });
  }
);

export const accountAlreadyExists = http.post(
  'http://localhost:9000/auth/customer/emailpass/register',
  async () => {
    await delay(1000);

    return HttpResponse.json(
      {
        type: 'unauthorized',
        message: 'Identity with email already exists',
      },
      { status: 401 }
    );
  }
);

export const serverErrorRegister = http.post(
  'http://localhost:9000/auth/customer/emailpass/register',
  async () => {
    await delay(1000);

    return HttpResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
);
