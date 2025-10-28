import { graphqlFetch } from '@lib/gql/apollo-client';
import {
  GetFooterQuery,
  GetFooterQueryVariables,
} from '@lib/gql/generated-types/graphql';
import { GET_FOOTER } from '@lib/gql/queries/footer';

export const getFooterContent = async () => {
  try {
    const data = await graphqlFetch<GetFooterQuery, GetFooterQueryVariables>({
      query: GET_FOOTER,
    });
    return data?.footer || null;
  } catch (error) {
    console.error('Error fetching footer content:', error);
    return null;
  }
};
