import { ProductDTO } from '@medusajs/framework/types';
import {
  WorkflowResponse,
  createWorkflow,
  transform,
} from '@medusajs/framework/workflows-sdk';
import {
  batchLinkProductsToCollectionWorkflow,
  useQueryGraphStep,
} from '@medusajs/medusa/core-flows';

import { getExistingCollectionStep } from './steps/get-existing-collection';
import { getShopifyProductsInCollectionStep } from './steps/get-shopify-products-in-collection';

// import { logResultStep } from "./steps/log-result"

type LinkProductsToCollectionWorkflowInput = {
  page: number;
};

export const linkProductToCollectionWorkflow = createWorkflow(
  'link-product-to-collection',
  ({ page }: LinkProductsToCollectionWorkflowInput) => {
    const { collection: existingCollection } = getExistingCollectionStep({
      page,
    });

    const { collectionProductsSet } = getShopifyProductsInCollectionStep({
      collectionHandle: existingCollection.handle,
      limit: 250,
    });

    const externalIdFilters = transform({ collectionProductsSet }, (data) => {
      const res = data.collectionProductsSet.products
        .map((p) => p.id.toString())
        .filter((id) => Boolean(id));

      return res;
    });

    // Logs for debugging
    // logResultStep({ message: 'External ID filters: ', result: externalIdFilters }).config({ name: "log-external-ids" });

    const { data: productsInCollection } = useQueryGraphStep({
      entity: 'product',
      fields: ['id', 'handle', 'external_id'],
      filters: {
        external_id: externalIdFilters,
      },
    }).config({ name: 'get-existing-products' });

    const productsInCollectionIds = transform(
      { productsInCollection },
      (data) => {
        return data.productsInCollection.map((p: ProductDTO) => p.id);
      }
    );

    // logResultStep({ message: 'Product IDs in collection: ', result: productsInCollectionIds }).config({ name: "log-product-ids-in-collection" });

    const linkResult = batchLinkProductsToCollectionWorkflow.runAsStep({
      input: {
        id: existingCollection.id,
        add: productsInCollectionIds,
      },
    });

    // logResultStep({ message: '', result: linkResult }).config({ name: "log-batch-link-result" });

    return new WorkflowResponse({ page, collection: existingCollection });
  }
);
