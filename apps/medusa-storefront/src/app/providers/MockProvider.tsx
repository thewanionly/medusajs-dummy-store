'use client';

import { useEffect } from 'react';

export function MockProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING_ENABLED === 'true') {
      import('../../mocks/msw/init-browser-mock').then(({ initMocks }) =>
        initMocks()
      );
    }
  }, []);

  return <>{children}</>;
}
