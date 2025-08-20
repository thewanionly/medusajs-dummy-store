import { useState, useEffect } from 'react'
import { sanityHelpers, SanityCMSContent } from '../sanity'

// Hook to get CMS content for a product by Medusa ID
export function useProductCMSContent(medusaId: string | null) {
  const [cmsContent, setCmsContent] = useState<SanityCMSContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!medusaId) {
      setCmsContent(null)
      return
    }

    const fetchCMSContent = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const content = await sanityHelpers.getProductCMSContent(medusaId)
        setCmsContent(content)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch CMS content')
        setCmsContent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCMSContent()
  }, [medusaId])

  return { cmsContent, loading, error }
}

// Hook to get featured products
export function useFeaturedProducts() {
  const [products, setProducts] = useState<SanityCMSContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const featuredProducts = await sanityHelpers.getFeaturedProducts()
        setProducts(featuredProducts || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return { products, loading, error }
}
