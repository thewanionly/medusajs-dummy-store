# Medusa

## Backend Development Server Setup Instructions

1. Set up the environment variables. Copy the `.env.template` to a local `.env` and update the values as needed.

```
cp .env.template .env
```

2. Start the development server:

```
pnpm run dev
```

This will open the medusa app in http://localhost:9000.

3. Open the Medusa Admin dashboard at `http://localhost:9000/app`.

4. Login with your admin user credentials in `http://localhost:9000/app/login`. If you don't have a user yet, create one using:

```
npx medusa user -e youremail@email.com -p password
```

Reference: https://docs.medusajs.com/learn/installation#create-medusa-admin-user

5. Go to `http://localhost:9000/app/settings/publishable-api-keys` and copy a Publishable API key. This will be used for running the `medusa-storefront` application.
