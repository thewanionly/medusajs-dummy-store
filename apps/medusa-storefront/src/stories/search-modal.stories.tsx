import { expect, screen } from 'storybook/test';

import SearchModal from '@modules/search/components/modal';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  searchSuggestionsSuccess,
  serverError,
} from '../mocks/msw/handlers/search';
import { delay } from './utils/delay';

const SearchModalWrapper = () => <SearchModal buttonClassName="block" />;

const meta = {
  title: 'SearchModal',
  component: SearchModalWrapper,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['countryCode', 'dk']],
      },
    },
  },
} satisfies Meta<typeof SearchModalWrapper>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [searchSuggestionsSuccess],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('search-button'));
    await delay(500);

    await userEvent.type(screen.getByTestId('search-input'), 'shirt');
    await delay(500);

    const suggestions = await screen.findAllByTestId('search-hit');
    expect(suggestions.length).toBeGreaterThan(0);
  },
};

export const NoResultsFound: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [searchSuggestionsSuccess],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('search-button'));
    await delay(500);

    await userEvent.type(screen.getByTestId('search-input'), 'jacket');
    await delay(500);

    expect(await screen.findByText(/No products found/i)).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [serverError],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('search-button'));
    await delay(500);

    await userEvent.type(screen.getByTestId('search-input'), 'shirt');
    await delay(1000);

    expect(
      await screen.findByText(/Something went wrong. Please try again./i)
    ).toBeInTheDocument();
  },
};
