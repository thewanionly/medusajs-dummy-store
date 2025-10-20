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
        return await context.sanityFooterService.getFooterContent(FOOTER_QUERY);
      } catch (error) {
        console.error('Error in footer resolver:', error);
        throw error;
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
