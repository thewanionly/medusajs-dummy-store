import { sdk } from '@lib/config';

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await sdk.auth.login('customer', 'emailpass', { email, password });
  } catch (error: any) {
    return error.toString();
  }
}
