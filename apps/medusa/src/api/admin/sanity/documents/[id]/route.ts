import { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework/http"
import SanityModuleService from "@/modules/sanity/service"
import { SANITY_MODULE } from "@/modules/sanity"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ 
        error: "Missing product ID parameter" 
      })
    }

    const sanityModule: SanityModuleService = req.scope.resolve(
      SANITY_MODULE
    )

    // Get Sanity document
    let sanityDocument = null
    let url = ""

    try {
      sanityDocument = await sanityModule.retrieve(id)
      
      if (sanityDocument) {
        url = await sanityModule.getStudioLink(
          sanityDocument._type,
          sanityDocument._id,
          { explicit_type: true }
        )
      }
    } catch (sanityError) {
      console.error(`Sanity API Error for product ${id}:`, sanityError)
      // Don't fail the entire request if Sanity is down
      sanityDocument = null
      url = ""
    }

    res.json({ 
      sanity_document: sanityDocument, 
      studio_url: url 
    })

  } catch (error) {
    console.error("Error in GET /admin/sanity/documents/[id]:", error)
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const isDevelopment = process.env.NODE_ENV === 'development'
    const errorStack = isDevelopment && error instanceof Error ? error.stack : undefined
    
    res.status(500).json({ 
      error: "Internal server error", 
      message: errorMessage,
      stack: errorStack
    })
  }
}
