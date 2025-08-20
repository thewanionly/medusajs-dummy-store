import { defineConfig, loadEnv } from '@medusajs/framework/utils';





loadEnv(process.env.NODE_ENV || 'development', process.cwd());
const {
  MEDUSA_BACKEND_URL,
  MEDUSA_DISABLE_ADMIN,
   MEDUSA_DATABASE_URL,
  MEDUSA_WORKER_MODE,
  MEDUSA_STORE_CORS,
  MEDUSA_ADMIN_CORS,
  MEDUSA_AUTH_CORS,
  MEDUSA_JWT_SECRET,
  MEDUSA_COOKIE_SECRET,
  SANITY_API_TOKEN,
  SANITY_API_VERSION,
  SANITY_PROJECT_ID,
 SANITY_STUDIO_URL,
  SANITY_DATASET,
} = process.env;
module.exports = defineConfig({
  projectConfig: {
    databaseUrl: MEDUSA_DATABASE_URL,
    workerMode: MEDUSA_WORKER_MODE as
      | 'shared'
      | 'worker'
      | 'server',
    http: {
      storeCors: MEDUSA_STORE_CORS!,
      adminCors: MEDUSA_ADMIN_CORS!,
      authCors: MEDUSA_AUTH_CORS!,
      jwtSecret: MEDUSA_JWT_SECRET || 'supersecret',
      cookieSecret: MEDUSA_COOKIE_SECRET || 'supersecret',
    },
  },
  admin: {
    backendUrl: MEDUSA_BACKEND_URL,
    disable: MEDUSA_DISABLE_ADMIN === 'true',
  },
  modules: [
    {
      resolve: './src/modules/algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID!,
        apiKey: process.env.ALGOLIA_API_KEY!,
        productIndexName: process.env.ALGOLIA_PRODUCT_INDEX_NAME!,
      },
    },
    {
      resolve: './src/modules/loyalty',
      options: {
        conversionRate: process.env.LOYALTY_CONVERSION_RATE,
      },
    },
  ],
  plugins: [
    {
      resolve: '@mds/medusa-plugin-shopify',
      options: {
        baseUrl: process.env.SHOPIFY_BASE_URL,
      },
    },
  ],
});
      resolve: "./src/modules/sanity",
      options: {
        api_token: SANITY_API_TOKEN,
        project_id: SANITY_PROJECT_ID,
        api_version: SANITY_API_VERSION,
        dataset: SANITY_DATASET,
        studio_url: SANITY_STUDIO_URL ,
        type_map: {
          product: "product",
        },
      },
    },
  ],
});
