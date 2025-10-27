'use client';

import { useState } from 'react';

import Login from '@modules/account/components/login';
import Register from '@modules/account/components/register';

export enum LOGIN_VIEW {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
}

export type LoginTemplateProps = {
  loginHeading?: string;
  loginDescription?: string;
  registerHeading?: string;
  registerDescription?: string;
};

const LoginTemplate = ({
  loginHeading,
  loginDescription,
  registerHeading,
  registerDescription,
}: LoginTemplateProps) => {
  const [currentView, setCurrentView] = useState('sign-in');

  return (
    <div className="flex w-full justify-start px-8 py-8">
      {currentView === 'sign-in' ? (
        <Login
          heading={loginHeading}
          description={loginDescription}
          setCurrentView={setCurrentView}
        />
      ) : (
        <Register
          heading={registerHeading}
          description={registerDescription}
          setCurrentView={setCurrentView}
        />
      )}
    </div>
  );
};

export default LoginTemplate;
