import { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework/http"
import { 
  sanitySyncProductsWorkflow,
} from "@/workflows/sanity-sync-products"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ 
        error: "Missing product ID parameter" 
      })
    }

    console.log(`Initiating sync for product: ${id}`)

    const { transaction } = await sanitySyncProductsWorkflow(req.scope)
      .run({
        input: { product_ids: [id] },
      })

    console.log(`Sync workflow started with transaction ID: ${transaction.transactionId}`)

    res.json({ 
      transaction_id: transaction.transactionId,
      product_id: id,
      status: "started"
    })

  } catch (error) {
    console.error("Error in POST /admin/sanity/documents/[id]/sync:", error)
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const isDevelopment = process.env.NODE_ENV === 'development'
    const errorStack = isDevelopment && error instanceof Error ? error.stack : undefined
    
    res.status(500).json({ 
      error: "Sync workflow failed", 
      message: errorMessage,
      stack: errorStack
    })
  }
}
