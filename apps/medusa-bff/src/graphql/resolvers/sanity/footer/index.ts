import { GraphQLContext } from '@graphql/types/context';

import { FOOTER_QUERY } from './groq-queries';

export const footerResolvers = {
  Query: {
    footer: async (
      _parent: unknown,
      _args: unknown,
      context: GraphQLContext
    ) => {
      try {
        const result = await context.sanityClient.fetch(FOOTER_QUERY);
        return result;
      } catch (error) {
        console.error('Error fetching footer content from Sanity:', error);
        return [];
      }
    },
  },
  RichTextBlock: {
    __resolveType(obj: { _type: string }) {
      if (obj._type === 'block') {
        return 'TextBlock';
      }
      if (obj._type === 'image') {
        return 'ImageBlock';
      }
      if (obj._type === 'file') {
        return 'FileBlock';
      }
      return null;
    },
  },
  MarkDef: {
    __resolveType(obj: { _type: string }) {
      if (obj._type === 'link') {
        return 'LinkMark';
      }
      if (obj._type === 'iconlink') {
        return 'IconLinkMark';
      }
      return null;
    },
  },
};
