import React from 'react';

import { initialize, mswLoader } from 'msw-storybook-addon';
import 'styles/globals.css';

import { TooltipProvider } from '@medusajs/ui';
import type { Preview } from '@storybook/nextjs-vite';

import { ApolloClientProvider } from '../src/lib/context/apollo-context';

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <ApolloClientProvider>
        <TooltipProvider delayDuration={100}>
          <Story />
        </TooltipProvider>
      </ApolloClientProvider>
    ),
  ],
};

export default preview;
