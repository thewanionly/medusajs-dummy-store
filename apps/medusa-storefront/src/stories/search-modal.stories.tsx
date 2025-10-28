import { screen } from 'storybook/test';

import SearchModal from '@modules/search/components/modal';
import { Meta, StoryObj } from '@storybook/nextjs';
import { PlayFunction } from '@storybook/types';

import { handlers as searchHandlers } from '../mocks/msw/handlers/storybook';
import { serverError } from '../mocks/msw/handlers/storybook/search';
import { delay } from './utils/delay';

const searchPlay: (query: string) => PlayFunction =
  (query) =>
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('search-button'));
    await delay(500);

    const searchInput = screen.getByTestId('search-input');

    await userEvent.type(searchInput as HTMLInputElement, query);
  };

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
      handlers: searchHandlers,
    },
  },
  play: searchPlay('shirt'),
};

export const NoResultsFound: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: searchHandlers,
    },
  },
  play: searchPlay('smartphone'),
};

export const Error: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [serverError],
    },
  },
  play: searchPlay('shirt'),
};
