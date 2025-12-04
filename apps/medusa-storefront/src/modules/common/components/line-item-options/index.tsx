import { Maybe, ProductVariant } from '@lib/gql/generated-types/graphql';
import { Text } from '@medusajs/ui';

type LineItemOptionsProps = {
  variant?: Maybe<ProductVariant>;
  'data-testid'?: string;
  'data-value'?: Maybe<ProductVariant>;
};

const LineItemOptions = ({
  variant,
  'data-testid': dataTestid,
  'data-value': dataValue,
}: LineItemOptionsProps) => {
  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className="txt-medium inline-block w-full overflow-hidden text-ellipsis text-ui-fg-subtle"
    >
      Variant: {variant?.title}
    </Text>
  );
};

export default LineItemOptions;
