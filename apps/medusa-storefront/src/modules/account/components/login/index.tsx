import { useActionState } from 'react';

import { login } from '@lib/data/customer';
import { LOGIN_VIEW } from '@modules/account/templates/login-template';
import ErrorMessage from '@modules/checkout/components/error-message';
import { SubmitButton } from '@modules/checkout/components/submit-button';
import Input from '@modules/common/components/input';

import { LOGIN_DESCRIPTION, LOGIN_HEADING } from './constants';

type LoginProps = {
  heading?: string;
  description?: string;
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({
  heading = LOGIN_HEADING,
  description = LOGIN_DESCRIPTION,
  setCurrentView,
}: LoginProps) => {
  const [state, formAction] = useActionState(login, null);

  return (
    <div
      className="flex w-full max-w-sm flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi mb-6 uppercase">{heading}</h1>
      <p className="text-base-regular mb-8 text-center text-ui-fg-base">
        {description}
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
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
        {state?.status === 'error' && (
          <ErrorMessage
            error={state?.message}
            data-testid="login-error-message"
          />
        )}
        {state?.status === 'success' && (
          <div className="text-small-regular pt-2 text-green-700">
            {state?.message}
          </div>
        )}
        <SubmitButton data-testid="sign-in-button" className="mt-6 w-full">
          Sign in
        </SubmitButton>
      </form>
      <span className="text-small-regular mt-6 text-center text-ui-fg-base">
        Not a member?{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  );
};

export default Login;
