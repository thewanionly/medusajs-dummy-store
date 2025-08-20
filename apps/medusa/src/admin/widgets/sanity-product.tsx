import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useState, useEffect } from "react"
import { useSanityDocument, useTriggerSanityProductSync } from "../hooks/sanity"

interface ProductData {
  id: string
  title: string
}

interface DetailWidgetProps {
  data: ProductData
}

const ProductWidget = ({ data }: DetailWidgetProps) => {
  const { triggerSync } = useTriggerSanityProductSync(data.id)
  const { fetchDocument } = useSanityDocument(data.id)
  const [sanityDocument, setSanityDocument] = useState<Record<string, unknown> | null>(null)
  const [studioUrl, setStudioUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const result = await fetchDocument()
        setSanityDocument(result.sanity_document)
        setStudioUrl(result.studio_url)
      } catch (error) {
        console.error("Failed to load Sanity document:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDocument()
  }, [fetchDocument])

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      await triggerSync()
      // Reload the document after sync
      const result = await fetchDocument()
      setSanityDocument(result.sanity_document)
      setStudioUrl(result.studio_url)
    } catch (error) {
      console.error("Sync failed:", error)
    } finally {
      setIsSyncing(false)
    }
  }

  const getSyncStatus = () => {
    if (isLoading) {
      return "Loading..."
    }
    
    if (sanityDocument?.title === data.title) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Synced</span>
    } else {
      return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Not Synced</span>
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-ui-bg-base">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center">
          <h2 className="font-medium">Sanity Status</h2>
          <div>
            {getSyncStatus()}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? "Syncing..." : "Sync"}
          </button>
          {studioUrl && (
            <button
              className="px-3 py-1 text-sm border rounded"
              onClick={() => window.open(studioUrl, "_blank")}
            >
              Open Studio
            </button>
          )}
        </div>
      </div>
      {sanityDocument && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Document Details:</h3>
          <div className="text-xs bg-ui-bg-base p-2 rounded">
            <div>ID: {sanityDocument._id as string}</div>
            <div>Type: {sanityDocument._type as string}</div>
            <div>Title: {sanityDocument.title as string}</div>
          </div>
        </div>
      )}
    </div>
  )
}

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductWidget
