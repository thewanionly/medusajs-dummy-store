import { graphql } from 'msw';

export const medusaBff: ReturnType<typeof graphql.link> = graphql.link(
  'http://localhost:4000/graphql'
);
