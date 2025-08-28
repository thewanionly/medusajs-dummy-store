import {
  CreateProductCollectionDTO,
  UpsertProductCollectionDTO,
} from '@medusajs/framework/types';
import {
  WorkflowResponse,
  createWorkflow,
  transform,
} from '@medusajs/framework/workflows-sdk';
import {
  createCollectionsWorkflow,
  updateCollectionsWorkflow,
} from '@medusajs/medusa/core-flows';

import { sanitizeHandle } from '../lib/utils';
import { getExistingCollectionsStep } from './steps/get-existing-collections';
import { getShopifyCollectionsStep } from './steps/get-shopify-collections';

type MigrateCollectionsFromShopifyWorkflowInput = {
  page: number;
  limit: number;
};

export const migrateCollectionsFromShopifyWorkflowId =
  'migrate-collections-from-shopify';

export const migrateCollectionsFromShopifyWorkflow = createWorkflow(
  {
    name: migrateCollectionsFromShopifyWorkflowId,
    retentionTime: 10000,
    store: true,
  },
  (input: MigrateCollectionsFromShopifyWorkflowInput) => {
    const { collections, page } = getShopifyCollectionsStep(input);

    const { collectionHandles } = transform({ collections }, (data) => {
      return {
        collectionHandles: data.collections?.map((c) =>
          sanitizeHandle(c.handle)
        ),
      };
    });

    const { collections: existingCollections } = getExistingCollectionsStep({
      filters: {
        handle: collectionHandles,
      },
    });

    const { collectionsToCreate, collectionsToUpdate } = transform(
      {
        collections,
        existingCollections,
      },
      (data) => {
        const collectionsToCreate = new Map<
          string,
          CreateProductCollectionDTO
        >();
        const collectionsToUpdate = new Map<
          string,
          UpsertProductCollectionDTO
        >();

        data.collections.forEach((shopifyCollection) => {
          const collectionHandle = sanitizeHandle(shopifyCollection.handle);

          const collectionData: CreateProductCollectionDTO = {
            title: shopifyCollection.title,
            handle: collectionHandle,
          };

          const existingCollection = data.existingCollections?.find(
            (eC) => eC.handle === collectionHandle
          );

          if (existingCollection?.id || existingCollection?.handle) {
            collectionsToUpdate.set(existingCollection?.id, collectionData);
          } else {
            collectionsToCreate.set(
              shopifyCollection.id.toString(),
              collectionData
            );
          }
        });

        return {
          collectionsToCreate: Array.from(collectionsToCreate.values()),
          collectionsToUpdate: Array.from(collectionsToUpdate.values()),
        };
      }
    );

    createCollectionsWorkflow.runAsStep({
      input: {
        collections: collectionsToCreate,
      },
    });

    transform({ collectionsToUpdate }, (data) => {
      data.collectionsToUpdate.map((collectionToUpdate) => {
        if (collectionToUpdate) {
          updateCollectionsWorkflow.runAsStep({
            input: {
              selector: {
                id: collectionToUpdate.id,
              },
              update: collectionToUpdate,
            },
          });
        }
      });
    });

    return new WorkflowResponse({ page, pageResults: collections.length });
  }
);
