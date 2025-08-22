import { HttpTypes } from "@medusajs/types"
import { useProductCMSContent, useFeaturedProducts } from "../hooks/use-sanity"
import { 
  SanityImageComponent, 
  SanityPortableText, 
  ProductBadges
} from "./sanity-components"

interface EnhancedProductDetailsProps {
  readonly product: HttpTypes.StoreProduct
}

export function EnhancedProductDetails({ product }: EnhancedProductDetailsProps) {
  const { cmsContent, loading, error } = useProductCMSContent(product.id)

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  if (error) {
    console.warn('Failed to load CMS content:', error)
    // Fallback to basic product info without CMS enhancements
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        {product.description && (
          <p className="text-gray-600 mb-4">{product.description}</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Product Badges */}
      {cmsContent?.badges && (
        <ProductBadges badges={cmsContent.badges} />
      )}

      {/* Product Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        {product.title}
      </h1>

      {/* SEO Title (if different from main title) */}
      {cmsContent?.seoTitle && cmsContent.seoTitle !== product.title && (
        <p className="text-sm text-gray-500 italic">
          SEO Title: {cmsContent.seoTitle}
        </p>
      )}

      {/* Product Description */}
      <div className="text-gray-700">
        {cmsContent?.description || product.description ? (
          <p>{cmsContent?.description || product.description}</p>
        ) : null}
      </div>

      {/* Featured Image (from CMS) */}
      {cmsContent?.featuredImage && (
        <div className="mb-6">
          <SanityImageComponent
            image={cmsContent.featuredImage}
            alt={`Featured image for ${product.title}`}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
            priority={true}
          />
        </div>
      )}

      {/* Additional Rich Content */}
      {cmsContent?.additionalContent && cmsContent.additionalContent.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
          <SanityPortableText content={cmsContent.additionalContent} />
        </div>
      )}

      {/* Related Products */}
      {cmsContent?.relatedProducts && cmsContent.relatedProducts.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Related Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cmsContent.relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                {relatedProduct.featuredImage && (
                  <SanityImageComponent
                    image={relatedProduct.featuredImage}
                    alt={relatedProduct.title}
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h4 className="font-medium text-sm">{relatedProduct.title}</h4>
                <p className="text-xs text-gray-500">{relatedProduct.handle.current}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Component for displaying featured products on homepage
export function FeaturedProductsSection() {
  const { products, loading, error } = useFeaturedProducts()

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => {
          const skeletonKey = `skeleton-${i}-${Math.random().toString(36).slice(2, 11)}`
          return (
            <div key={skeletonKey} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          )
        })}
      </div>
    )
  }

  if (error || !products.length) {
    return null
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="group">
            {product.featuredImage && (
              <div className="mb-3 overflow-hidden rounded-lg">
                <SanityImageComponent
                  image={product.featuredImage}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
            {product.badges && <ProductBadges badges={product.badges} />}
            <h3 className="font-medium text-gray-900">{product.title}</h3>
            <p className="text-sm text-gray-500">{product.handle.current}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
