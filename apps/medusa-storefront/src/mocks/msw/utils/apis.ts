import { graphql } from 'msw';

export const medusaBackend =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';

export const medusaBff: ReturnType<typeof graphql.link> = graphql.link(
  process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:4000/graphql'
);

export const storefrontMedusaBffWrapper: ReturnType<typeof graphql.link> =
  graphql.link(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/graphql`
  );
