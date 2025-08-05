# Medusa Storefront

## Storefront Development Server Setup Instructions

1. Set up the environment variables. Copy the `.env.template` to a local `.env` and update the values as needed.

   ```
   cp .env.template .env
   ```

2. Copy the Publishable API key obtained from the medusa server (http://localhost:9000/app/settings/publishable-api-keys). Paste it as the value of the `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` env variable in your .env file.

3. Start the development server:

   ```
   pnpm run dev
   ```

   This will open the storefront app in http://localhost:8000.
