# Medusa

## Backend Development Server Setup Instructions

1. Set up the environment variables. Copy the `.env.template` to a local `.env` and update the values as needed.

   ```
   cp .env.template .env
   ```

2. In the `.env` file, specify the `DATABASE_URL` value. The format is as follows:

   ```
   postgres://[user][:password]@[host][:port]/[dbname]
   ```

   _Read more about the DATABASE_URL format [here](https://docs.medusajs.com/learn/configurations/medusa-config#databaseurl)._

   e.g.

   ```
   postgres://postgres:pass123@localhost/medusajs-dummy-store-db
   ```

   If you already have a PostgreSQL database (deployed or local), you can already construct the `DATABASE_URL` value. You could also store the value somewhere where it's safe to store secrets and variables and retrieve it from there.

   However, If you haven't created and set up a PostgreSQL database yet, follow the ff instructions:
   - Create a PostgreSQL database using Medusa CLI's [db commands](https://docs.medusajs.com/resources/medusa-cli/commands/db):

     ```
     npx medusa db:create --db <dbname>
     ```

     _Note_: Use the same `dbname` you specified in the `DATABASE_URL` env variable

   - Apply database migrations and set up your database schema:

     ```
     npx medusa db:migrate
     ```

   - Seed the database with initial/dummy data

     ```
     pnpm run seed
     ```

3. Start the development server:

   ```
   pnpm run dev
   ```

   This will open the medusa app in http://localhost:9000.

4. Open the Medusa Admin dashboard at `http://localhost:9000/app`.

5. Login with your admin user credentials in `http://localhost:9000/app/login`. If you don't have a user yet, create one using:

   ```
   npx medusa user -e youremail@email.com -p password
   ```

   Reference: https://docs.medusajs.com/learn/installation#create-medusa-admin-user

6. Go to `http://localhost:9000/app/settings/publishable-api-keys` and copy a Publishable API key. This will be used for running the `medusa-storefront` application.
