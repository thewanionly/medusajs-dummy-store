import { initialize, mswLoader } from 'msw-storybook-addon';
import 'styles/globals.css';

import type { Preview } from '@storybook/nextjs-vite';

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    a11y: { test: 'error' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
