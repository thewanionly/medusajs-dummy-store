import { useEffect, useState } from 'react'
import { getSiteSettings,  type SiteSettings, } from '../sanity-client'

export function useSiteSettings() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true)
        const settings = await getSiteSettings()
        setSiteSettings(settings)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch site settings')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { siteSettings, loading, error }
}