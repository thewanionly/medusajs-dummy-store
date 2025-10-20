# API Mocking with MSW

## What is MSW?

Mock Service Worker (MSW) intercepts actual network requests (REST, GraphQL, etc.) at the network layer during development and tests. This enables you to mock backend APIs for both browser and Node.js environments **without changing your app code**. Learn more at [mswjs.io/docs](https://mswjs.io/docs/).

## Why Mock APIs?

1. **Develop Frontend Before Backend Exists**
   Build and test your frontend even if the backend API isn’t ready yet.

2. **Faster and More Reliable Development**
   Mocked APIs are instant and predictable, unlike real APIs that may be slow, flaky, or temporarily offline. This keeps your local development smooth and consistent.

3. **Easier Testing**
   Mocks give consistent responses, making tests repeatable and reliable. Integration tests won’t fail due to network latency or changes in real data.

4. **Control Over Edge Cases**
   Easily simulate situations like server errors, empty responses, or slow requests to verify your app handles these gracefully.

5. **Protect Real Data**
   During development or testing, you might not want to send requests to production APIs, modify real databases, or expose sensitive information. Mocking completely avoids these risks.

6. **Debugging Network Issues**
   Mocking helps you debug tricky issues that occur only with certain API responses or timing, which can be difficult to reproduce against a real backend.

## Project Setup: Where to Find the Logic

```text
src/
  mocks/
    msw/
      handlers/           // All mock endpoint/query handlers
      browser.ts          // Browser entrypoint for MSW setup
      node.ts             // Node entrypoint for MSW setup
      activeMocks.ts      // Specifies wich mocks are currently enabled
      apis.ts             // Base API URLs used by handlers
    data/                 // Static mock data for handlers
```

- Handlers (GraphQL queries, REST endpoints) live in `src/mocks/msw/handlers`.
- Mock data is pulled from `src/mocks/data` to simulate backend responses.
- Handler activation is controlled in `src/mocks/msw/activeMocks.ts`.

## How MSW is Initialized in this Project

- **Node.js** SSR/dev/test: Enabled via `src/instrumentation.ts`, using the `server` from `msw/node`.
- **Browser**: Enabled via `src/instrumentation-client.ts`, using the `worker` from `msw/browser`.

**MSW is ONLY initialized when `NODE_ENV` is `'development'`.**
Even if the toggles in `activeMocks.ts` are enabled, MSW mocks will never run in production or test environments. This is enforced inside both `instrumentation.ts` and `instrumentation-client.ts`.

This guarantees that API mocking can _never_ affect production users, regardless of the mock toggle file.

You **do not** need to manually run MSW—just edit toggles in `activeMocks.ts` and restart dev server!

Reference: https://dev.to/ajth-in/mock-client-side-server-side-api-requests-using-nextjs-and-mswjs-9f1

## How to Enable or Disable API Mocks

1. Open `src/mocks/msw/activeMocks.ts`.
2. Set the value for the GraphQL or REST handler you want to `true` (enables mock) or `false` (uses real API).

   Example:

   ```js
   export const activeGqlMocks = {
     GetProducts: true, // <------ ENABLES Product mock
     GetCollections: false,
     ...
   };
   export const activeHttpMocks = {};
   ```

3. **Restart** the dev server (e.g. `pnpm run dev`) for changes to take effect.

## How Mock Routing Works

- If a mock is **enabled**, the handler will return the mock data.
- If **disabled** (`false`), the handler will call `passthrough()`, letting the real request hit your backend service.

## Adding New Mock Endpoints

1. Add a new mock data file or update an existing one in `src/mocks/data/`.
2. Create a handler in `src/mocks/msw/handlers/`, or add to an existing handler file, using your mock data.
3. Register your new handler in the `handlers/index.ts` (exported array is merged automatically).
4. Add a toggle to `src/mocks/msw/activeMocks.ts` if needed.
5. (Optionally) Document your new handler in this file or elsewhere!

## See It in Action: Example

- Enable `GetProducts` in `activeGqlMocks`:

  ```js
  export const activeGqlMocks = {
    GetProducts: true,
    ...
  }
  ```

- Restart the dev server.
- Visit a page that triggers a Products fetch — the UI will display data from your mock definition in `src/mocks/data/products.ts`.
- Set `GetProducts` to `false`, restart, and you’ll see real API data again!
