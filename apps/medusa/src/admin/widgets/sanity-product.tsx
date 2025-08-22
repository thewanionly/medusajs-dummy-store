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
  const { mutateAsync } = useTriggerSanityProductSync(data.id)
  const { sanity_document, studio_url, isLoading, fetchDocument } = useSanityDocument(data.id)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    fetchDocument()
  }, [fetchDocument])

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      await mutateAsync()
      setTimeout(() => {
        fetchDocument()
      }, 1000)
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
    
    if (sanity_document?.title === data.title) {
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
          {studio_url && (
            <button
              className="px-3 py-1 text-sm border rounded"
              onClick={() => window.open(studio_url, "_blank")}
            >
              Open Studio
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductWidget
