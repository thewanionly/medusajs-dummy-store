import Image from 'next/image'
import { sanityClient, SanityImage, SanityBlock } from '../sanity'

interface SanityImageComponentProps {
  readonly image: SanityImage
  readonly alt?: string
  readonly width?: number
  readonly height?: number
  readonly className?: string
  readonly priority?: boolean
}

interface SanityPortableTextProps {
  readonly content: SanityBlock[]
}

interface ProductBadgesProps {
  readonly badges?: string[]
}

// Helper function to generate Sanity image URLs
export function getSanityImageUrl(image: SanityImage, options?: {
  width?: number
  height?: number
  quality?: number
}) {
  if (!image?.asset?._ref) return ''

  const { width, height, quality = 80 } = options || {}
  
  const url = `https://cdn.sanity.io/images/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
  
  const params = new URLSearchParams()
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  if (quality !== 80) params.append('q', quality.toString())
  
  const paramString = params.toString()
  return paramString ? `${url}?${paramString}` : url
}

// Component for rendering Sanity images
export function SanityImageComponent({
  image,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false
}: SanityImageComponentProps) {
  if (!image?.asset?._ref) {
    return null
  }

  const imageUrl = getSanityImageUrl(image, { width, height })
  const imageAlt = alt || image.alt || 'Product image'

  return (
    <Image
      src={imageUrl}
      alt={imageAlt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}

// Component for rendering Sanity portable text (rich text content)
export function SanityPortableText({ content }: SanityPortableTextProps) {
  if (!content || !Array.isArray(content)) {
    return null
  }

  return (
    <div className="prose prose-sm max-w-none">
      {content.map((block) => {
        if (block._type === 'block') {
          const style = block.style || 'normal'
          const blockKey = `block-${Math.random().toString(36).slice(2, 11)}`
          
          const children = block.children?.map((child) => {
            const childKey = `child-${Math.random().toString(36).slice(2, 11)}`
            return <span key={childKey}>{child.text}</span>
          })

          switch (style) {
            case 'h1':
              return <h1 key={blockKey} className="text-2xl font-bold mb-4">{children}</h1>
            case 'h2':
              return <h2 key={blockKey} className="text-xl font-semibold mb-3">{children}</h2>
            case 'h3':
              return <h3 key={blockKey} className="text-lg font-medium mb-2">{children}</h3>
            default:
              return <p key={blockKey} className="mb-3">{children}</p>
          }
        }
        
        return null
      })}
    </div>
  )
}

// Component for rendering product badges
export function ProductBadges({ badges }: ProductBadgesProps) {
  if (!badges || badges.length === 0) {
    return null
  }

  const badgeStyles: Record<string, string> = {
    new: 'bg-green-100 text-green-800',
    sale: 'bg-red-100 text-red-800',
    bestseller: 'bg-yellow-100 text-yellow-800',
    limited: 'bg-purple-100 text-purple-800',
    eco: 'bg-emerald-100 text-emerald-800',
    premium: 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {badges.map((badge) => {
        const badgeKey = `badge-${badge}-${Math.random().toString(36).slice(2, 11)}`
        return (
          <span
            key={badgeKey}
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              badgeStyles[badge] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {badge.charAt(0).toUpperCase() + badge.slice(1)}
          </span>
        )
      })}
    </div>
  )
}
