import { Metadata } from 'next';

import 'styles/globals.css';

import { ApolloClientProvider } from '@lib/context/apollo-context';
import { getBaseURL } from '@lib/util/env';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">
          <ApolloClientProvider>{props.children}</ApolloClientProvider>
        </main>
      </body>
    </html>
  );
}
