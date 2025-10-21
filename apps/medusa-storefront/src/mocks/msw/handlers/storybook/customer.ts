import { HttpResponse, delay, http } from 'msw';

import { mockedToken } from '../../../data/storybook/customer';

export const handlers = [
  http.post('http://localhost:9000/auth/customer/emailpass', async () => {
    await delay(1000);

    return HttpResponse.json({
      token: mockedToken,
    });
  }),
];

export const invalidCredentials = http.post(
  'http://localhost:9000/auth/customer/emailpass',
  async () => {
    await delay(1000);

    return HttpResponse.json(
      {
        type: 'unauthorized',
        message: 'Invalid email or password',
      },
      { status: 401 }
    );
  }
);
