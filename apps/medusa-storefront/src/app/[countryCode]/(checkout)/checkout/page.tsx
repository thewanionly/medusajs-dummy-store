import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { retrieveCart } from '@lib/data/cart';
import { retrieveCustomer } from '@lib/data/customer';
import { Cart } from '@lib/gql/generated-types/graphql';
import PaymentWrapper from '@modules/checkout/components/payment-wrapper';
import CheckoutForm from '@modules/checkout/templates/checkout-form';
import CheckoutSummary from '@modules/checkout/templates/checkout-summary';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default async function Checkout() {
  const cart = await retrieveCart();

  if (!cart) {
    return notFound();
  }

  const customer = await retrieveCustomer();

  return (
    <div className="content-container grid grid-cols-1 gap-x-40 py-12 small:grid-cols-[1fr_416px]">
      <PaymentWrapper cart={cart as Cart}>
        <CheckoutForm cart={cart as Cart} customer={customer} />
      </PaymentWrapper>
      <CheckoutSummary cart={cart as Cart} />
    </div>
  );
}
