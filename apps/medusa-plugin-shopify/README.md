# Shopify Plugin for Medusa

This plugin uses the public product feeds from Shopify.

## Get Started

1. To get started, install the project dependencies:

   ```bash
   pnpm install
   ```

2. Then, publish the plugin locally:

   ```bash
   npx medusa plugin:publish
   ```

3. In your Medusa application, add the Shopify plugin to your project:

   ```bash
   npx medusa plugin:add medusa-plugin-shopify
   ```

   This will add `medusa-plugin-shopify` in your Medusa application's package.json's dependencies, with its value containing a file path:

   ```json
    "medusa-plugin-shopify": "file:.yalc/medusa-plugin-shopify",
   ```

   It is important to note that this change is only temporary and is only needed during local development. **It should not be committed to Git and pushed to the remote repo.**<br/><br/>

   Also, when running pnpm install in the Medusa application or in the monorepo's root with this change in place, it will be added in pnpm-lock.yaml. **This change should also not be committed to Git and pushed to remote repo.**<br/><br/>

   To prevent committing these to remote repo, before committing your changes, you need to remove the changes to `medusa-plugin-shopify` in the Medusa application's package.json and run `pnpm install` afterwards to update the pnpm-lock file.<br/><br/>

4. If you haven't already, register the plugin in your Medusa application's `medusa-config.ts`. This step is already implemented in `apps/medusa` so skip this step if you are working on `apps/medusa`:

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

5. This plugin contains new models for the custom product properties that are linked to Product module's models. To reflect these new models in your database, in the root of your Medusa application (`apps/medusa`), run the ff:

   ```bash
   npx medusa db:migrate
   ```

6. You can now run the development server of your Medusa application (`apps/medusa`):

   ```bash
   pnpm run dev
   ```

   Your local development server runs at http://localhost:9000 by default. Refer to [How to use the API](#how-to-use-the-api) section to start using this API for product data migration.

## How it Works

This plugin exposes an API route (`/admin/shopify-plugin/migrate`) to migrate Shopify products, collections, tags, and types from the provided base URL. The full flow is as follows:

1. Extract all Products from Shopify
2. Extract all Product Collections from Shopify
3. Build the unique list of Product Types then import them to Medusa
4. Build the unique list of Product Tags then import them to Medusa
5. Import all Product Collections to Medusa, update existing ones if necessary
6. Import all Products to Medusa, update existing ones if necessary
7. Link Products to Product Collections

> **Note**: There is a default hard limit of 2000 Products and 2000 Product Collections to be extracted from Shopify to prevent a heap out of memory error.

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

## Custom Properties

In this plugin, I've added two new models: `product_extended` and `product_variant_extended`, which are linked to `product` and `product_variant` models respectively. These new models holds custom properties for the product. During product migration, these custom properties are already populated. To interact with the custom properties after the migration, please refer to the ff sections below:

### Creating/Updating a Product via API route

In the body of POST request to `admin/products` API route, pass the custom property in the `additional_data` object. For example, in this plugin, the custom property for product data model is `vendor`. To pass a `vendor` property when creating a new product, do the ff:

```cURL
curl -X POST 'localhost:9000/admin/products' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {token}' \
--data '{
    "title": "Shoes",
    "options": [
      {
        "title": "Default option",
        "values": ["Default option value"]
      }
    ],
    "shipping_profile_id": "{shipping_profile_id}",
    "additional_data": {
        "vendor": "test"
    }
}'
```

Same concept when updating an existing product:

```cURL
curl -X POST 'localhost:9000/admin/products/{product_id}' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {token}' \
--data '{
    "additional_data": {
        "vendor": "test 2"
    }
}'
```

The same process can be done when creating (`/admin/products/:id/variants`) or updating (`/admin/products/:id/variants/:variant_id`) a product variant with custom properties.

### Querying with Custom Property

To retrieve the custom property when retrieving the product through API routes, pass in the `fields` query parameter `+custom_model_name.*`. For example, for the `product_extended` model, do the ff:

```cURL
curl 'localhost:9000/admin/products/{product_id}?fields=+product_extended.*' \
-H 'Authorization: Bearer {token}'
```

Among the returned product object, you'll find a `product_extended` property which holds the details of the linked product extended record:

```JSON
{
  "products": [
    {
      "id": "prod_01K4D425DJ271F7N8A8268B15Y",
      "title": "Kepler Sweater",
      // ...
      "product_extended": {
        "id": "01K4D45ZEB0XF3ZDNTR0H16MQ8",
        "vendor": "tentree",
        "created_at": "2025-09-05T14:23:42.027Z",
        "updated_at": "2025-09-05T14:23:42.027Z",
        "deleted_at": null
      }
    }
  ]
}
```

To get the custom properties of the variants (`product_variant_extended`) within the product, you can do the ff:

```cURL
curl 'localhost:9000/admin/products/{product_id}?fields=+product_extended.*,+variants.product_variant_extended.*' \
-H 'Authorization: Bearer {token}'
```

```JSON
{
  "products": [
    {
      "id": "prod_01K4D425DJ271F7N8A8268B15Y",
      "title": "Kepler Sweater",
      // ...
      "product_extended": {
        "id": "01K4D45ZEB0XF3ZDNTR0H16MQ8",
        "vendor": "tentree",
        "created_at": "2025-09-05T14:23:42.027Z",
        "updated_at": "2025-09-05T14:23:42.027Z",
        "deleted_at": null
      },
      "variants": [
        {
          "id": "variant_01K4D44JXDJ39RDJAX5V5XZXXM",
          "title": "MIDNIGHT BLUE KEPLER / S",
          // ...
          "product_variant_extended": {
            "id": "01K4D45ZFDYCDM5CB36VD2H7VW",
            "requires_shipping": true,
            "created_at": "2025-09-05T14:23:42.061Z",
            "updated_at": "2025-09-05T14:23:42.061Z",
            "deleted_at": null
          },
        }
      ]
    }
  ]
}
```

When retrieving the custom properties of a variant (`product_variant_extended`) using the product variant API route (`/admin/products/:id/variants`), do the ff:

```cURL
curl 'localhost:9000/admin/products/{product_id}/variants?fields=+product_variant_extended.*' \
-H 'Authorization: Bearer {token}'
```

```JSON
{
  "variants": [
    {
      "id": "variant_01K4D44JXD8GMBFSFC95P8EDAJ",
      "product_id": "prod_01K4D425DJ271F7N8A8268B15Y",
      "title": "MIDNIGHT BLUE KEPLER / XL",
      // ...
      "product_variant_extended": {
          "id": "01K4D45ZG87Z6608TC5FS7RZ8G",
          "requires_shipping": true,
          "created_at": "2025-09-05T14:23:42.088Z",
          "updated_at": "2025-09-05T14:23:42.088Z",
          "deleted_at": null
      },
    }
  ]
}
```

### Showing Custom Property in Admin UI

To show the custom properties in the [Admin UI](http://localhost:9000/app), we need to utilize [Medusa Admin Widget(https://docs.medusajs.com/learn/customization/customize-admin/widget)]. We can add widgets to any of the pre-defined zones in the Product Detail Page of the Admin UI to show the Product data model's custom properties that we added.

For the product-level custom properties, a [`product-extended` widget](src/admin/widgets/product-extended.tsx) is created. For the variant-level custom properties, a [`product-variant-extended` widget](src/admin/widgets/product-variant-extended.tsx) is created.

However, there’s currently no way to customize the existing create/update product form page to add a new field that represents the custom property we added to the Product model. This means there’s currently no way for us to add a new or update the value of the custom property in the Admin UI. We can only do so using API routes.

### Filtering by Custom Property

Currently, we can't use the built-in Product API routes to filter the products by custom property. Instead, we need to create a custom API route and construct our own custom logic to support filtering by custom property.

To filter the products by product-level custom property, use the ff API route: `/admin/products-with-custom-properties`:

```cURL
curl 'localhost:9000/admin/products-with-custom-properties?vendor=test&fields=+product_extended.*' \
-H 'Authorization: Bearer {token}'
```

To filter the product variants by variant-level custom property, use the ff API route: `/admin/product-variants-with-custom-properties`:

```cURL
curl 'localhost:9000/admin/products-variants-with-custom-properties?requires_shipping=false&fields=+product_variant_extended.*' \
-H 'Authorization: Bearer {token}'
```
