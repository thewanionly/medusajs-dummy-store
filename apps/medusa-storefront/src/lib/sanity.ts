import { createClient } from '@sanity/client'

const { SANITY_API_VERSION, SANITY_PROJECT_ID, SANITY_DATASET } = process.env

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true,
  apiVersion: SANITY_API_VERSION
})

// Core product queries
export const productQueries = {
  // Get product CMS content by Medusa ID
  getProductByMedusaId: `*[_type == "product" && medusaId == $medusaId][0] {
    _id,
    medusaId,
    title,
    handle,
    description,
    seoTitle,
    seoDescription,
    additionalContent,
    featuredImage,
    badges,
    relatedProducts[]-> {
      _id,
      medusaId,
      title,
      handle,
      featuredImage
    }
  }`,

  // Get featured products
  getFeaturedProducts: `*[_type == "product" && defined(featuredImage)] | order(_createdAt desc) [0...8] {
    _id,
    medusaId,
    title,
    handle,
    featuredImage,
    badges
  }`
}

// Helper functions
export const sanityHelpers = {
  async getProductCMSContent(medusaId: string) {
    return await sanityClient.fetch(productQueries.getProductByMedusaId, { medusaId })
  },

  async getFeaturedProducts() {
    return await sanityClient.fetch(productQueries.getFeaturedProducts)
  }
}

// Simplified types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SanityBlock {
  _type: 'block'
  children: Array<{
    _type: 'span'
    text: string
    marks?: string[]
  }>
  style?: string
}

export interface SanityCMSContent {
  _id: string
  medusaId: string
  title: string
  handle: { current: string }
  description?: string
  seoTitle?: string
  seoDescription?: string
  additionalContent?: SanityBlock[]
  featuredImage?: SanityImage
  badges?: string[]
  relatedProducts?: Array<{
    _id: string
    medusaId: string
    title: string
    handle: { current: string }
    featuredImage?: SanityImage
  }>
}
