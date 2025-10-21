import { handleMedusaError } from '../../../lib/error-utils';
import { GraphQLContext } from '../../types/context';
import { transformCustomer } from './util/transforms';

export const customerResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, { medusa }: GraphQLContext) => {
      try {
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
      { medusa }: GraphQLContext
    ) => {
      try {
        const token = await medusa.auth.login('customer', 'emailpass', {
          email: args.email,
          password: args.password,
        });

        if (typeof token !== 'string') {
          // TODO - Handle error
          throw new Error('Unable to login');
        }

        await medusa.client.setToken(token);

        return { token };
      } catch (e) {
        handleMedusaError(e, 'run Mutation.login', ['Mutation', 'login']);
      }
    },
  },
};
