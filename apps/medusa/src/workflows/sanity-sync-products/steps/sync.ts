import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { ProductDTO } from "@medusajs/framework/types"
import { 
  ContainerRegistrationKeys,
  promiseAll,
} from "@medusajs/framework/utils"
import SanityModuleService from "@/modules/sanity/service"
import { SANITY_MODULE } from "@/modules/sanity"

export type SyncStepInput = {
  product_ids?: string[];
}
 
export const syncStep = createStep(
   { name: "sync-step", async: true },
  async (input: SyncStepInput, { container }) => {
    const sanityModule: SanityModuleService = container.resolve(SANITY_MODULE)
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    let total = 0
    const upsertMap: {
      before: unknown
      after: unknown
    }[] = []

    const batchSize = 200
    let hasMore = true
    let offset = 0
    const filters = input.product_ids ? {
      id: input.product_ids,
    } : {}

    while (hasMore) {
      const {
        data: products,
         metadata: { count } = {},
      } = await query.graph({
        entity: "product",
        fields: [
          "id",
          "title",
          "handle",
          "description",
          "status",
          "thumbnail",
          "images.*",
          "variants.*",
          "categories.*",
          "sanity_product.*",
        ],
        filters,
        pagination: {
          skip: offset,
          take: batchSize,
          order: {
            id: "ASC",
          },
        },
      })

      try {
        await promiseAll(
          products.map(async (prod) => {
            const after = await sanityModule.upsertSyncDocument(
              "product", 
              prod as ProductDTO
            )

            upsertMap.push({
              // @ts-expect-error sanity_product may be undefined
              before: prod.sanity_product,
              after,
            })

            return after
          })
        )
      } catch (e) {
        return StepResponse.permanentFailure(
          `An error occurred while syncing documents: ${e}`,
          upsertMap
        )
      }

      offset += batchSize
      hasMore = offset < (count || 0)
      total += products.length
    }

    return new StepResponse({ total }, upsertMap)
  },
  async (upsertMap, { container }) => {
    if (!upsertMap) {
      return
    }

    const sanityModule: SanityModuleService = container.resolve(SANITY_MODULE)

    await promiseAll(
      upsertMap.map(({ before, after }) => {
        if (!before) {
          // delete the document
          return sanityModule.delete((after as Record<string, unknown>)._id as string)
        }

        const { _id: id, ...oldData } = before as Record<string, unknown>

        return sanityModule.update(
          id as string,
          oldData
        )
      })
    )
  }
)
