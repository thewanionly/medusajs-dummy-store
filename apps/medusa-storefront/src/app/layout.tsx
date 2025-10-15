import { Metadata } from 'next';

import 'styles/globals.css';

import { getBaseURL } from '@lib/util/env';

import { MockProvider } from './providers/MockProvider';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <MockProvider>
          <main className="relative">{props.children}</main>
        </MockProvider>
      </body>
    </html>
  );
}
