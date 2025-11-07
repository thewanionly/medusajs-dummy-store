# Storybook Guide

## What is Storybook

Storybook is our component workbench. It renders UI components outside of the storefront's Next.js app so we can build them in isolation. Every story becomes:

- **Interactive documentation** – we can click through different states of a component without spinning up the full app or seeding test data.
- **A reproducible sandbox** – stories freeze props, feature flags, and mocked responses, which makes debugging regressions much faster.
- **A contract for tests** – interaction, a11y, and visual suites all reuse the same stories, ensuring coverage stays in sync with the UI.

Because Storybook runs alongside—but separately from—the Next.js app, we avoid slow pages, routing side effects, and server-only constraints while still exercising the exact storefront code paths.

## Why use Storybook?

Storybook gives us a fast feedback loop when building or refactoring UI. It lets us:

- Exercise every loading, success, empty, and error state without wiring a real backend.
- Share living documentation with the team so they can validate changes without running the full app.
- Reuse stories as the source of truth for interaction, accessibility, and visual regression tests.
- Ship confidently by catching breaking changes in isolation before they surface inside the actual storefront routes.

## Project Setup

Get familiar with the Storybook-related file layout so you know where to add stories, mocks, and config:

```
apps/medusa-storefront/
├─ .storybook/              # Storybook config (main.ts, preview.tsx, Vitest setup)
├─ src/stories/             # Component stories + helpers (one *.stories.tsx per scenario)
│  ├─ utils/                # Shared story utilities (delays, knobs, etc.)
├─ src/mocks/
│  └─ msw/                  # MSW browser/node setup + request handlers
│     ├─ handlers/          # Domain-specific handlers (cart, search, auth…)
│     └─ utils/             # Fixture builders and helpers
└─ public/mockServiceWorker.js
```

## Running Storybook

From the monorepo root:

```bash
pnpm --filter medusa-storefront storybook
```

From `apps/medusa-storefront` directly:

```bash
pnpm storybook
```

Either command starts Storybook on http://localhost:6006 with hot reload. Stop it with `Ctrl+C`.

### Building the static bundle

From the monorepo root:

```bash
pnpm --filter medusa-storefront build-storybook
```

From `apps/medusa-storefront` directly:

```bash
pnpm build-storybook
```

This emits a static Storybook site under `apps/medusa-storefront/storybook-static/`—handy for preview deployments (Chromatic, Netlify, etc.).

## Adding a story

Stories can be found in `src/stories/`. You can add a new story by creating a new file inside `src/stories` that ends with `.stories.tsx`. Export a typed CSF (Component Story Format) meta object plus the variants you need. You can refer to existing stories or Storybook [docs](https://storybook.js.org/docs/writing-stories) for reference when creating a story.

Example:

```tsx
const meta = {
  title: 'LoginRegisterForm',
  component: LoginTemplate,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['countryCode', 'dk']],
      },
    },
  },
} satisfies Meta<typeof LoginTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginSuccess: Story = {
  args: {},
};

export const LoginInvalidCredentials: Story = {
  args: {},
};
```

## Mocking with MSW

We can also use MSW to mock the network requests made by the components used in the stories.

The worker is initialized globally in `.storybook/preview.tsx` via `msw-storybook-addon`, so individual stories only need to provide handlers. Place reusable handlers in `src/mocks/msw/handlers/<domain>.ts` and import them into the story:

```tsx
import {
  invalidCredentials,
  loginBffSuccess,
} from '../mocks/msw/handlers/customer';

// rest of the codes here ...

export const LoginSuccess: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [loginBffSuccess],
    },
  },
};

export const LoginInvalidCredentials: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [invalidCredentials],
    },
  },
};
```

Handlers can share fixtures from `src/mocks/data` and helpers from `src/mocks/msw/utils`. For complex sequences (e.g., optimistic updates) create multiple handlers and switch between them with `parameters.msw.handlers` per story.

## Testing

Stories double as our test surface. We rely on Storybook’s Vitest integration plus built-in addons for accessibility and visual checks.

### Interaction Tests

Add a `play` function that uses `storybook/test` utilities (`userEvent`, `expect`, etc.) to simulate flows in the stories. The test runner in `vitest.config.ts` executes those plays in a headless browser:

```tsx
import { expect } from 'storybook/test';

import LoginTemplate from '@modules/account/templates/login-template';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  invalidCredentials,
  loginBffSuccess,
} from '../mocks/msw/handlers/customer';
import { delay } from './utils/delay';

const meta = {
  title: 'LoginRegisterForm',
  component: LoginTemplate,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['countryCode', 'dk']],
      },
    },
  },
} satisfies Meta<typeof LoginTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginSuccess: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [loginBffSuccess],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(
      canvas.getByTestId('email-input'),
      'john.doe@gmail.com'
    );
    await delay(300);

    await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
    await delay(300);

    await userEvent.click(canvas.getByTestId('sign-in-button'));
    await delay(1000);

    expect(await canvas.findByText(/Login successful/i)).toBeInTheDocument();
  },
};

export const LoginInvalidCredentials: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [invalidCredentials],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(
      canvas.getByTestId('email-input'),
      'john.doe@gmail.com'
    );
    await delay(300);

    await userEvent.type(canvas.getByTestId('password-input'), 'e0wtr7sRXk5d');
    await delay(300);

    await userEvent.click(canvas.getByTestId('sign-in-button'));
    await delay(1000);

    expect(
      await canvas.findByText(/Invalid email or password/i)
    ).toBeInTheDocument();
  },
};
```

### Accessibility Tests

`@storybook/addon-a11y` is enabled in `.storybook/preview.tsx`. Use the **Accessibility** panel while developing, and tighten enforcement by setting per-story parameters:

```ts
parameters: {
  a11y: { element: '#storybook-root', manual: false, config: { rules: [{ id: 'color-contrast', enabled: true }] } },
}
```

Flip the global `a11y.test` option from `todo` to `error` once a component is compliant so accessibility issues fail CI rather than silently accumulating.

### Visual Tests

Visual baselines come from the static build under `apps/medusa-storefront/storybook-static`. After running `pnpm --filter medusa-storefront build-storybook`, upload that directory to Chromatic or any deployment target:

```bash
pnpm dlx chromatic --project-token=<token> --storybook-build-dir apps/medusa-storefront/storybook-static
```

Chromatic (already enabled via `@chromatic-com/storybook`) will compare screenshots per story and block merges when deltas exceed the set threshold. For manual reviews, serve the static bundle from Netlify/Vercel to share a frozen snapshot with stakeholders.
