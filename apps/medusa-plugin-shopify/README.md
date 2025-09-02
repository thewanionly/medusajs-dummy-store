# Shopify Plugin for Medusa

This plugin uses the public product feeds from Shopify.

## Get Started

To get started, install the project dependencies:

```bash
pnpm install
```

Then, publish the plugin locally:

```bash
npx medusa plugin:publish
```

In your Medusa application, add the Shopify plugin to your project:

```bash
npx medusa plugin:add medusa-plugin-shopify
```

Next, register the plugin in your Medusa application's `medusa-config.ts`:

```ts
module.exports = defineConfig({
  // ...
  plugins: [
    {
      resolve: 'medusa-plugin-shopify',
      options: {
        baseUrl: process.env.SHOPIFY_BASE_URL,
      },
    },
  ],
});
```

where `SHOPIFY_BASE_URL` should point to the website domain of the Shopify storefront, e.g.

```plaintext
SHOPIFY_BASE_URL=https://www.my-store.com
```

## How it Works

This plugin exposes an API route (`/admin/shopify-plugin/migrate`) to migrate Shopify products, collections, tags, and types from the provided base URL. The full flow is as follows:

1. Extract all Products from Shopify
2. Extract all Product Collections from Shopify
3. Build the unique list of Product Types then import them to Medusa
4. Build the unique list of Product Tags then import them to Medusa
5. Import all Product Collections to Medusa, update existing ones if necessary
6. Import all Products to Medusa, update existing ones if necessary

> **Note**: There is a hard limit of 2000 Products and 2000 Product Collections to be extracted from Shopify to prevent a heap out of memory error.

### How to use the API

#### Authentication

Send a `POST` request to `http://localhost:9000/auth/user/emailpass` to get the authorization tokens, sample request body should contain the admin credentials you use for your Medusa admin dashboard:

```cURL
curl --location 'http://localhost:9000/auth/user/emailpass' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "YOUR_EMAIL",
    "password": "YOUR_PASSWORD"
}'
```

The above request should give you an authorization token.

#### Migrate

Send a `GET` request to `http://localhost:9000/admin/shopify-plugin/migrate`:

```cURL
curl --location 'http://localhost:9000/admin/shopify-plugin/migrate' \
--header 'X-Publishable-API-Key: YOUR_PUBLISHABLE_KEY' \
--header 'Authorization: Bearer AUTHORIZATION_TOKEN' \
--data ''
```

## Development Mode

When in development, republish the plugin every time new changes are saved:

```bash
npx medusa plugin:develop
```
