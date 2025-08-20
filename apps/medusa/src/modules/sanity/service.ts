import {
  Logger,
} from "@medusajs/framework/types"
import {
  SanityClient,
  createClient,
  FirstDocumentMutationOptions,
} from "@sanity/client"
import {
  ProductDTO,
} from "@medusajs/framework/types"

const SyncDocumentTypes = {
  PRODUCT: "product",
} as const

type SyncDocumentTypes =
  (typeof SyncDocumentTypes)[keyof typeof SyncDocumentTypes];

type ModuleOptions = {
  api_token: string;
  project_id: string;
  api_version: string;
  dataset: "production" | "development";
  type_map?: Record<SyncDocumentTypes, string>;
  studio_url?: string;
}

type SyncDocumentInputs<T> = T extends "product"
  ? ProductDTO
  : never

type TransformationMap<T> = Record<
  SyncDocumentTypes,
  (data: SyncDocumentInputs<T>) => Record<string, unknown>
>;

type InjectedDependencies = {
  logger: Logger
};

class SanityModuleService {
  private client: SanityClient
  private studioUrl?: string
  private logger: Logger
  private typeMap: Record<SyncDocumentTypes, string>
  private createTransformationMap: TransformationMap<SyncDocumentTypes>
  private updateTransformationMap: TransformationMap<SyncDocumentTypes>

  constructor({
    logger,
  }: InjectedDependencies, options: ModuleOptions) {
    this.client = createClient({
      projectId: options.project_id,
      apiVersion: options.api_version,
      dataset: options.dataset,
      token: options.api_token,
    })
    this.logger = logger

    this.logger.info("Connected to Sanity")

    this.studioUrl = options.studio_url
    
    this.typeMap = Object.assign(
      {},
      {
        [SyncDocumentTypes.PRODUCT]: "product",
      },
      options.type_map || {}
    )

    this.createTransformationMap = {
      [SyncDocumentTypes.PRODUCT]: this.transformProductForCreate,
    }

    this.updateTransformationMap = {
      [SyncDocumentTypes.PRODUCT]: this.transformProductForUpdate,
    }
  }

  private transformProductForCreate = (product: ProductDTO) => {
    const data: Record<string, unknown> = {
      _type: this.typeMap[SyncDocumentTypes.PRODUCT],
      _id: product.id,
      medusaId: product.id,
      title: product.title,
      handle: product.handle ? {
        _type: 'slug',
        current: product.handle
      } : undefined,
      description: product.description || undefined,
      status: product.status || 'draft',
      thumbnail: product.thumbnail || undefined,
    }

    // Handle images
    if (product.images && Array.isArray(product.images)) {
      data.images = product.images.map((image: { url?: string } | string) => 
        typeof image === 'string' ? image : image.url || ''
      )
    }

    // Handle variants
    if (product.variants && Array.isArray(product.variants)) {
      data.variants = product.variants.map((variant) => ({
        id: variant.id,
        title: variant.title || undefined,
        sku: variant.sku || undefined,
        options: variant.options?.map((opt) => 
          typeof opt === 'string' ? opt : (opt as { value?: string }).value || ''
        ) || []
      }))
    }

    // Handle categories
    if (product.categories && Array.isArray(product.categories)) {
      data.categories = product.categories.map((category: {
        id: string;
        name?: string;
        handle?: string;
      }) => ({
        id: category.id,
        name: category.name,
        handle: category.handle
      }))
    }

    return data
  }

  private readonly transformProductForUpdate = (product: ProductDTO) => {
    const updateData: Record<string, unknown> = {
      title: product.title,
      medusaId: product.id,
    }

    if (product.handle) {
      updateData.handle = {
        _type: 'slug',
        current: product.handle
      }
    }

    if (product.description !== undefined) {
      updateData.description = product.description
    }

    if (product.status) {
      updateData.status = product.status
    }

    if (product.thumbnail !== undefined) {
      updateData.thumbnail = product.thumbnail
    }

    // Handle images
    if (product.images && Array.isArray(product.images)) {
      updateData.images = product.images.map((image: { url?: string } | string) => 
        typeof image === 'string' ? image : image.url || ''
      )
    }

    // Handle variants
    if (product.variants && Array.isArray(product.variants)) {
      updateData.variants = product.variants.map((variant) => ({
        id: variant.id,
        title: variant.title || undefined,
        sku: variant.sku || undefined,
        options: variant.options?.map((opt) => 
          typeof opt === 'string' ? opt : (opt as { value?: string }).value || ''
        ) || []
      }))
    }

    // Handle categories
    if (product.categories && Array.isArray(product.categories)) {
      updateData.categories = product.categories.map((category: {
        id: string;
        name?: string;
        handle?: string;
      }) => ({
        id: category.id,
        name: category.name,
        handle: category.handle
      }))
    }

    return {
      set: updateData,
    }
  }

  async upsertSyncDocument<T extends SyncDocumentTypes>(
    type: T,
    data: SyncDocumentInputs<T>
  ) {
    try {
      const existing = await this.client.getDocument(data.id)
      if (existing) {
        this.logger.info(`Updating existing Sanity document: ${data.id}`)
        return await this.updateSyncDocument(type, data)
      }

      this.logger.info(`Creating new Sanity document: ${data.id}`)
      return await this.createSyncDocument(type, data)
    } catch (error) {
      this.logger.error(`Failed to upsert Sanity document ${data.id}: ${error instanceof Error ? error.message : String(error)}`)
      throw error
    }
  }

  async createSyncDocument<T extends SyncDocumentTypes>(
    type: T,
    data: SyncDocumentInputs<T>,
    options?: FirstDocumentMutationOptions
  ) {
    const doc = this.createTransformationMap[type](data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this.client.create(doc as any, options)
  }

  async updateSyncDocument<T extends SyncDocumentTypes>(
    type: T,
    data: SyncDocumentInputs<T>
  ) {
    const operations = this.updateTransformationMap[type](data)
    return await this.client.patch(data.id, operations).commit()
  }

  async retrieve(id: string) {
    try {
      const document = await this.client.getDocument(id)
      this.logger.info(`Successfully retrieved Sanity document: ${id}`)
      return document
    } catch (error) {
      this.logger.error(`Failed to retrieve Sanity document ${id}: ${error instanceof Error ? error.message : String(error)}`)
      // Return null instead of throwing to handle gracefully
      return null
    }
  }

  async delete(id: string) {
    return this.client.delete(id)
  }

  async update(id: string, data: Record<string, unknown>) {
    return await this.client.patch(id, {
      set: data,
    }).commit()
  }

  async list(
    filter: {
      id: string | string[]
    }
  ) {
    const data = await this.client.getDocuments(
      Array.isArray(filter.id) ? filter.id : [filter.id]
    )

    return data.map((doc) => ({
      id: doc?._id,
      ...doc,
    }))
  }

  async getStudioLink(
    type: string,
    id: string,
    config: { explicit_type?: boolean } = {}
  ) {
    const resolvedType = config.explicit_type ? type : this.typeMap[type as SyncDocumentTypes]
    if (!this.studioUrl) {
      throw new Error("No studio URL provided")
    }
    return `${this.studioUrl}/structure/${resolvedType};${id}`
  }
}

export default SanityModuleService
