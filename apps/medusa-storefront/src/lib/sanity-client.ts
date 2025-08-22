import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {SanityImageSource} from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, 
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN, 
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export interface SiteSettings {
  _id: string
  title: string
  description: string
  logo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
  }
  favicon?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  socialMedia?: Array<{
    platform: string
    logo?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
    url: string
  }>
}

export interface NavigationSettings {
  _id: string
  headerNavigation?: Array<{
    label: string
    url: string
    children?: Array<{
      label: string
      url: string
    }>
  }>
  footerNavigation?: Array<{
    title: string
    links: Array<{
      label: string
      url: string
    }>
  }>
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    
    const settings = await sanityClient.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0]{
        _id,
        title,
        description,
        logo,
        favicon,
        socialMedia[]{
          platform,
          logo,
          url
        }
      }`
    )
    return settings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}
