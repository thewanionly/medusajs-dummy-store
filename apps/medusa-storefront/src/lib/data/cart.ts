'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { sdk } from '@lib/config';
import { graphqlFetch, graphqlMutation } from '@lib/gql/apollo-client';
import {
  AddShippingMethodMutation,
  AddShippingMethodMutationVariables,
  CreateCartMutation,
  CreateCartMutationVariables,
  CreateLineItemMutation,
  CreateLineItemMutationVariables,
  DeleteLineItemMutation,
  DeleteLineItemMutationVariables,
  GetCartQuery,
  GetCartQueryVariables,
  UpdateCartMutation,
  UpdateCartMutationVariables,
  UpdateLineItemMutation,
  UpdateLineItemMutationVariables,
} from '@lib/gql/generated-types/graphql';
import {
  ADD_SHIPPING_METHOD_MUTATION,
  CREATE_CART_MUTATION,
  CREATE_LINE_ITEM_MUTATION,
  DELETE_LINE_ITEM_MUTATION,
  UPDATE_CART_MUTATION,
  UPDATE_LINE_ITEM_MUTATION,
} from '@lib/gql/mutations/cart';
import { GET_CART_QUERY } from '@lib/gql/queries/cart';
import medusaError from '@lib/util/medusa-error';
import { HttpTypes } from '@medusajs/types';

import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeCartId,
  setCartId,
} from './cookies';
import { getRegion } from './regions';

/**
 * Retrieves a cart by its ID. If no ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to retrieve.
 * @returns The cart object if found, or null if not found.
 */
export const retrieveCart = async (
  cartId?: string
): Promise<GetCartQuery['getCart'] | null> => {
  const id = cartId || (await getCartId());
  if (!id) {
    return null;
  }

  try {
    const data = await graphqlFetch<GetCartQuery, GetCartQueryVariables>({
      query: GET_CART_QUERY,
      variables: { id },
    });

    return data?.getCart ?? null;
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return null;
  }
};

export const getOrSetCart = async (
  countryCode: string
): Promise<
  CreateCartMutation['createCart'] | UpdateCartMutation['updateCart'] | null
> => {
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  let cart = await retrieveCart();

  if (!cart) {
    const data = await graphqlMutation<
      CreateCartMutation,
      CreateCartMutationVariables
    >({
      mutation: CREATE_CART_MUTATION,
      variables: {
        data: { region_id: region.id },
      },
    });

    cart = data?.createCart;

    console.log('setting cart id with id: ' + cart?.id);

    await setCartId(cart?.id || '');

    const cartCacheTag = await getCacheTag('carts');
    revalidateTag(cartCacheTag);

    if (cart) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
    }
  }

  if (cart && cart.region_id !== region.id) {
    const data = await graphqlMutation<
      UpdateCartMutation,
      UpdateCartMutationVariables
    >({
      mutation: UPDATE_CART_MUTATION,
      variables: {
        id: cart.id,
        data: { region_id: region.id },
      },
    });

    cart = data?.updateCart ?? cart;

    if (cart) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
    }
  }

  return cart;
};

export const updateCart = async (
  data: UpdateCartMutationVariables['data']
): Promise<UpdateCartMutation['updateCart'] | null> => {
  const cartId = await getCartId();

  if (!cartId) {
    throw new Error(
      'No existing cart found, please create one before updating'
    );
  }

  try {
    const result = await graphqlMutation<
      UpdateCartMutation,
      UpdateCartMutationVariables
    >({
      mutation: UPDATE_CART_MUTATION,
      variables: {
        id: cartId,
        data,
      },
    });

    const cart = result?.updateCart ?? null;

    if (cart) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = await getCacheTag('fulfillment');
      revalidateTag(fulfillmentCacheTag);
    }

    return cart;
  } catch (err) {
    medusaError(err);
  }
};

export const addToCart = async ({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string;
  quantity: number;
  countryCode: string;
}): Promise<CreateLineItemMutation['createLineItem'] | null> => {
  if (!variantId) {
    throw new Error('Missing variant ID when adding to cart');
  }

  if (!countryCode) {
    throw new Error('Missing country code when adding to cart');
  }

  const cart = await getOrSetCart(countryCode);

  if (!cart) {
    throw new Error('Error retrieving or creating cart');
  }

  try {
    const result = await graphqlMutation<
      CreateLineItemMutation,
      CreateLineItemMutationVariables
    >({
      mutation: CREATE_LINE_ITEM_MUTATION,
      variables: {
        cartId: cart.id,
        data: {
          variant_id: variantId,
          quantity,
        },
      },
    });

    const lineItem = result?.createLineItem ?? null;

    if (lineItem) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = await getCacheTag('fulfillment');
      revalidateTag(fulfillmentCacheTag);
    }

    return lineItem;
  } catch (error: any) {
    console.error('GraphQL addToCart error:', error.message);
    throw error;
  }
};

export const updateLineItem = async ({
  lineId,
  quantity,
}: {
  lineId: string;
  quantity: number;
}): Promise<UpdateLineItemMutation['updateLineItem'] | null> => {
  if (!lineId) {
    throw new Error('Missing lineItem ID when updating line item');
  }

  const cartId = await getCartId();

  if (!cartId) {
    throw new Error('Missing cart ID when updating line item');
  }

  try {
    const result = await graphqlMutation<
      UpdateLineItemMutation,
      UpdateLineItemMutationVariables
    >({
      mutation: UPDATE_LINE_ITEM_MUTATION,
      variables: {
        cartId,
        lineItemId: lineId,
        data: { quantity },
      },
    });

    const lineItem = result?.updateLineItem ?? null;

    if (lineItem) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = await getCacheTag('fulfillment');
      revalidateTag(fulfillmentCacheTag);
    }

    return lineItem;
  } catch (error: any) {
    console.error('GraphQL updateLineItem error:', error.message);
    throw error;
  }
};

export const deleteLineItem = async (
  lineId: string
): Promise<DeleteLineItemMutation['deleteLineItem'] | null> => {
  if (!lineId) {
    throw new Error('Missing lineItem ID when deleting line item');
  }

  const cartId = await getCartId();

  if (!cartId) {
    throw new Error('Missing cart ID when deleting line item');
  }

  try {
    const result = await graphqlMutation<
      DeleteLineItemMutation,
      DeleteLineItemMutationVariables
    >({
      mutation: DELETE_LINE_ITEM_MUTATION,
      variables: {
        cartId,
        lineItemId: lineId,
      },
    });

    const deletedLineItem = result?.deleteLineItem ?? null;

    if (deletedLineItem) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = await getCacheTag('fulfillment');
      revalidateTag(fulfillmentCacheTag);
    }

    return deletedLineItem;
  } catch (error: any) {
    console.error('GraphQL deleteLineItem error:', error.message);
    throw error;
  }
};

// export async function setShippingMethod({
//   cartId,
//   shippingMethodId,
// }: {
//   cartId: string;
//   shippingMethodId: string;
// }) {
//   const headers = {
//     ...(await getAuthHeaders()),
//   };

//   return sdk.store.cart
//     .addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers)
//     .then(async () => {
//       const cartCacheTag = await getCacheTag('carts');
//       revalidateTag(cartCacheTag);
//     })
//     .catch(medusaError);
// }

export const setShippingMethod = async ({
  cartId,
  optionId,
}: {
  cartId: string;
  optionId: string;
}): Promise<AddShippingMethodMutation['addShippingMethod'] | null> => {
  if (!cartId) {
    throw new Error('Missing cart ID when setting shipping method');
  }

  try {
    const result = await graphqlMutation<
      AddShippingMethodMutation,
      AddShippingMethodMutationVariables
    >({
      mutation: ADD_SHIPPING_METHOD_MUTATION,
      variables: {
        cartId,
        optionId,
      },
    });

    console.log('addShippingMethod result:', JSON.stringify(result, null, 2));
    const updatedCart = result?.addShippingMethod;

    if (updatedCart) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
    }

    return updatedCart;
  } catch (error: any) {
    console.error('GraphQL setShippingMethod error:', error.message);
    throw error;
  }
};

export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: HttpTypes.StoreInitializePaymentSession
) {
  const headers = {
    ...(await getAuthHeaders()),
  };

  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, headers)
    .then(async (resp) => {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
      return resp;
    })
    .catch(medusaError);
}

export async function applyPromotions(codes: string[]) {
  const cartId = await getCartId();

  if (!cartId) {
    throw new Error('No existing cart found');
  }

  const headers = {
    ...(await getAuthHeaders()),
  };

  return sdk.store.cart
    .update(cartId, { promo_codes: codes }, {}, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = await getCacheTag('fulfillment');
      revalidateTag(fulfillmentCacheTag);
    })
    .catch(medusaError);
}

export async function applyGiftCard(code: string) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function removeDiscount(code: string) {
  // const cartId = getCartId()
  // if (!cartId) return "No cartId cookie found"
  // try {
  //   await deleteDiscount(cartId, code)
  //   revalidateTag("cart")
  // } catch (error: any) {
  //   throw error
  // }
}

export async function removeGiftCard(
  codeToRemove: string,
  giftCards: any[]
  // giftCards: GiftCard[]
) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, {
  //       gift_cards: [...giftCards]
  //         .filter((gc) => gc.code !== codeToRemove)
  //         .map((gc) => ({ code: gc.code })),
  //     }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function submitPromotionForm(
  currentState: unknown,
  formData: FormData
) {
  const code = formData.get('code') as string;
  try {
    await applyPromotions([code]);
  } catch (e: any) {
    return e.message;
  }
}

// TODO: Pass a POJO instead of a form entity here
export async function setAddresses(currentState: unknown, formData: FormData) {
  try {
    if (!formData) {
      throw new Error('No form data found when setting addresses');
    }
    const cartId = getCartId();
    if (!cartId) {
      throw new Error('No existing cart found when setting addresses');
    }

    const data = {
      shipping_address: {
        first_name: formData.get('shipping_address.first_name'),
        last_name: formData.get('shipping_address.last_name'),
        address_1: formData.get('shipping_address.address_1'),
        address_2: '',
        company: formData.get('shipping_address.company'),
        postal_code: formData.get('shipping_address.postal_code'),
        city: formData.get('shipping_address.city'),
        country_code: formData.get('shipping_address.country_code'),
        province: formData.get('shipping_address.province'),
        phone: formData.get('shipping_address.phone'),
      },
      email: formData.get('email'),
    } as any;

    const sameAsBilling = formData.get('same_as_billing');
    if (sameAsBilling === 'on') data.billing_address = data.shipping_address;

    if (sameAsBilling !== 'on')
      data.billing_address = {
        first_name: formData.get('billing_address.first_name'),
        last_name: formData.get('billing_address.last_name'),
        address_1: formData.get('billing_address.address_1'),
        address_2: '',
        company: formData.get('billing_address.company'),
        postal_code: formData.get('billing_address.postal_code'),
        city: formData.get('billing_address.city'),
        country_code: formData.get('billing_address.country_code'),
        province: formData.get('billing_address.province'),
        phone: formData.get('billing_address.phone'),
      };
    await updateCart(data);
  } catch (e: any) {
    return e.message;
  }

  redirect(
    `/${formData.get('shipping_address.country_code')}/checkout?step=delivery`
  );
}

/**
 * Places an order for a cart. If no cart ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to place an order for.
 * @returns The cart object if the order was successful, or null if not.
 */
export async function placeOrder(cartId?: string) {
  const id = cartId || (await getCartId());

  if (!id) {
    throw new Error('No existing cart found when placing an order');
  }

  const headers = {
    ...(await getAuthHeaders()),
  };

  const cartRes = await sdk.store.cart
    .complete(id, {}, headers)
    .then(async (cartRes) => {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
      return cartRes;
    })
    .catch(medusaError);

  if (cartRes?.type === 'order') {
    const countryCode =
      cartRes.order.shipping_address?.country_code?.toLowerCase();

    const orderCacheTag = await getCacheTag('orders');
    revalidateTag(orderCacheTag);

    removeCartId();
    redirect(`/${countryCode}/order/${cartRes?.order.id}/confirmed`);
  }

  return cartRes.cart;
}

/**
 * Updates the countrycode param and revalidates the regions cache
 * @param regionId
 * @param countryCode
 */
export async function updateRegion(countryCode: string, currentPath: string) {
  const cartId = await getCartId();
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (cartId) {
    await updateCart({ region_id: region.id });
    const cartCacheTag = await getCacheTag('carts');
    revalidateTag(cartCacheTag);
  }

  const regionCacheTag = await getCacheTag('regions');
  revalidateTag(regionCacheTag);

  const productsCacheTag = await getCacheTag('products');
  revalidateTag(productsCacheTag);

  redirect(`/${countryCode}${currentPath}`);
}

export async function listCartOptions() {
  const cartId = await getCartId();
  const headers = {
    ...(await getAuthHeaders()),
  };
  const next = {
    ...(await getCacheOptions('shippingOptions')),
  };

  return await sdk.client.fetch<{
    shipping_options: HttpTypes.StoreCartShippingOption[];
  }>('/store/shipping-options', {
    query: { cart_id: cartId },
    next,
    headers,
    cache: 'force-cache',
  });
}
