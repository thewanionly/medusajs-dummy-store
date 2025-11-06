import { graphql } from 'msw';

export const medusaBff: ReturnType<typeof graphql.link> = graphql.link(
  'http://localhost:4000/graphql'
);

export const storefrontMedusaBffWrapper: ReturnType<typeof graphql.link> =
  graphql.link('http://localhost:8000/api/graphql');
