'use client';

import { useState } from 'react';

import { sdk } from '@lib/config';
import { Button } from '@medusajs/ui';
import ErrorMessage from '@modules/checkout/components/error-message';
import Input from '@modules/common/components/input';

interface LoginFormProps {
  title: string;
  description?: string;
}

export default function LoginForm({ title, description }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await sdk.auth.login('customer', 'emailpass', { email, password });
      setIsSuccessful(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Something went wrong. Please try again.');
      setIsSuccessful(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    handleLogin(email, password);
  };

  return (
    <div
      className="flex w-full max-w-sm flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi mb-6 uppercase">{title}</h1>
      <p className="text-base-regular mb-8 text-center text-ui-fg-base">
        {description}
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4 flex w-full flex-col gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <Button
          size="large"
          className="mt-2 w-full"
          type="submit"
          isLoading={isLoading}
          data-testid="sign-in-button"
        >
          Log in
        </Button>
        {isSuccessful && (
          <div className="text-small-regular pt-2 text-green-700">
            <span>Successfully logged in.</span>
          </div>
        )}
        <ErrorMessage error={error} data-testid="login-error-message" />
      </form>
    </div>
  );
}
