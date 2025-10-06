import { Product } from '@lib/bff/generated-types/graphql';

export const isSimpleProduct = (product: Product): boolean => {
  return (
    product.options?.length === 1 && product.options[0]?.values?.length === 1
  );
};
