import { Order } from '@lib/gql/generated-types/graphql';
import { convertToLocale } from '@lib/util/money';
import { Heading, Text } from '@medusajs/ui';
import Divider from '@modules/common/components/divider';

type ShippingDetailsProps = {
  order: Order;
};

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <Heading level="h2" className="text-3xl-regular my-6 flex flex-row">
        Delivery
      </Heading>
      <div className="flex items-start gap-x-8">
        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-address-summary"
        >
          <Text className="txt-medium-plus mb-1 text-ui-fg-base">
            Shipping Address
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.address1} {order.shippingAddress?.address2}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.postalCode}, {order.shippingAddress?.city}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.countryCode?.toUpperCase()}
          </Text>
        </div>

        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-contact-summary"
        >
          <Text className="txt-medium-plus mb-1 text-ui-fg-base">Contact</Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingAddress?.phone}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">{order.email}</Text>
        </div>

        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-method-summary"
        >
          <Text className="txt-medium-plus mb-1 text-ui-fg-base">Method</Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shippingMethods?.[0]?.name} (
            {convertToLocale({
              amount: order.shippingMethods?.[0]?.total ?? 0,
              currency_code: order.currencyCode,
            })
              .replace(/,/g, '')
              .replace(/\./g, ',')}
            )
          </Text>
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  );
};

export default ShippingDetails;
