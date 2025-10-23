import { handleMedusaError } from '../../../lib/error-utils';
import { GraphQLContext } from '../../types/context';
import { transformCustomer } from './util/transforms';

export const customerResolvers = {
  Query: {
    me: async (
      _: unknown,
      __: unknown,
      { medusa, session }: GraphQLContext
    ) => {
      try {
        if (!session.isCustomerLoggedIn) {
          handleMedusaError({ message: 'Unauthorized' }, 'run Query.me', [
            'Query',
            'me',
          ]);
        }

        const { customer } = await medusa.store.customer.retrieve({
          fields: '*orders',
        });

        return transformCustomer(customer);
      } catch (e) {
        handleMedusaError(e, 'run Query.me', ['Query', 'me']);
      }
    },
  },

  Mutation: {
    login: async (
      _: unknown,
      args: { email: string; password: string },
      { medusa, session }: GraphQLContext
    ) => {
      try {
        const token = await medusa.auth.login('customer', 'emailpass', {
          email: args.email,
          password: args.password,
        });

        if (typeof token !== 'string') {
          throw new Error('Unable to login');
        }

        session.medusaToken = token;
        session.isCustomerLoggedIn = true;

        await new Promise<void>((resolve, reject) => {
          session.save((err) => {
            if (err) reject(err);
            else resolve();
          });
        });

        return { token };
      } catch (e) {
        handleMedusaError(e, 'run Mutation.login', ['Mutation', 'login']);
      }
    },
    logout: async (
      _: unknown,
      __: unknown,
      { res, medusa, session }: GraphQLContext
    ) => {
      await medusa.auth.logout();

      session.medusaToken = undefined;
      session.isCustomerLoggedIn = false;

      await new Promise<void>((resolve, reject) => {
        session.destroy((err) => {
          if (err) reject(err);
          else {
            res.clearCookie('storefront.sid', {
              // TODO: Adjust for production
              httpOnly: true,
              sameSite: 'lax',
              secure: false,
            });
            resolve();
          }
        });
      });

      return { success: true };
    },
  },
};
