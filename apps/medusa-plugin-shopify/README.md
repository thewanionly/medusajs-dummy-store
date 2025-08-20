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

This plugin exposes an API route (`/store/migrate-shopify`) to migrate Shopify products and collections from the provided base URL. The full flow is as follows:

1. Migrate products from Shopify
   - Fetches 250 products at a time, paginated
   - Stops when the retrieved products in the request is less than 250 (assume it is on the last page)
   - Check if any of the Shopify products already exist in the Medusa database, if not then create
   - If product already exists in Medusa database, then update the product
2. Migrate collections from Shopify
   - Fetches 250 collections at a time, paginated
   - Stops when the retrieved collections in the request is less than 250 (assume it is on the last page)
   - Check if any of the Shopify collections already exist in the Medusa database, if not then create
   - If collection already exists in Medusa database, then update the collection
3. Link products to collections
   - Traverse through existing collections in the Medusa database
     - For each collection, retrieve list of products from Shopify
     - Retrieve the Medusa product equivalent to each Shopify product
     - Build the list of product IDs
     - Link the products to the collection using the IDs
   - Stops after 250 collections (hard limit)

### How to use the API

Send a `POST` request to `http://localhost:9000/auth/user/emailpass` to get the authorization tokens, sample request body should be the admin credentials you use for your Medusa admin dashboard:

```json
{
  "email": "admin@email.com",
  "password": "1pass2word3"
}
```

Send a `GET` request to `http://localhost:9000/store/migrate-shopify` with headers:

```plaintext
Authorization: Bearer ${token}
X-Publishable-API-Key: ${apiKey}
```

## Development Mode

When in development, republish the plugin every time new changes are saved:

```bash
npx medusa plugin:develop
```
