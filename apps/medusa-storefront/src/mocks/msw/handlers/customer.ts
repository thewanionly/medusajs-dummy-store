import { HttpResponse, delay, http } from 'msw';

import { mockedCustomer, mockedToken } from '../../data/customer';
import { medusaBackend, storefrontMedusaBffWrapper } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const loginBffSuccess = storefrontMedusaBffWrapper.mutation(
  'Login',
  async () => {
    await delay(1000);

    return HttpResponse.json({
      data: {
        login: {
          token: mockedToken,
        },
      },
    });
  }
);

export const loginRestSuccess = http.post(
  `${medusaBackend}/auth/customer/emailpass`,
  async () => {
    await delay(1000);

    return HttpResponse.json({
      token: mockedToken,
    });
  }
);

export const registerSuccess = http.post(
  `${medusaBackend}/auth/customer/emailpass/register`,
  async () => {
    await delay(250);

    return HttpResponse.json({
      token: mockedToken,
    });
  }
);

export const createCustomerSuccess = http.post(
  `${medusaBackend}/store/customers`,
  async () => {
    await delay(250);

    return HttpResponse.json({
      customer: mockedCustomer,
    });
  }
);

// Handlers used in the application.
// Use `withActiveMockGate` to enable/disable the handler based on activeMock config
export const handlers = [
  withActiveMockGate('Login', loginBffSuccess),
  withActiveMockGate('Login', loginRestSuccess),
  withActiveMockGate('Register', registerSuccess),
  withActiveMockGate('CreateCustomer', createCustomerSuccess),
];

// Other paths
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
  `${medusaBackend}/auth/customer/emailpass/register`,
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
  `${medusaBackend}/auth/customer/emailpass/register`,
  async () => {
    await delay(1000);

    return HttpResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
);
