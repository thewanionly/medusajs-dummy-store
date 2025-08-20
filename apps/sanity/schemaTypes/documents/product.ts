import {defineType, defineField} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  groups: [
    {
      name: 'medusa',
      title: 'Medusa Data'
    },
    {
      name: 'content',
      title: 'Content'
    },
    {
      name: 'seo',
      title: 'SEO'
    }
  ],
  fields: [
    // Core Medusa fields (read-only)
    defineField({
      name: 'medusaId',
      title: 'Medusa Product ID',
      type: 'string',
      group: 'medusa',
      description: 'The unique identifier from Medusa backend',
      validation: (Rule) => Rule.required(),
      readOnly: true
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'medusa',
      validation: (Rule) => Rule.required(),
      readOnly: true,
      description: 'Product title synchronized from Medusa'
    }),
    defineField({
      name: 'handle',
      title: 'Handle',
      type: 'slug',
      group: 'medusa',
      description: 'URL-friendly identifier from Medusa',
      validation: (Rule) => Rule.required(),
      readOnly: true
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'medusa',
      description: 'Product description from Medusa',
      readOnly: true
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'medusa',
      readOnly: true,
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Proposed', value: 'proposed'},
          {title: 'Published', value: 'published'},
          {title: 'Rejected', value: 'rejected'}
        ]
      }
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'string',
      group: 'medusa',
      description: 'Product thumbnail URL from Medusa',
      readOnly: true
    }),

    // SEO fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Custom SEO title for this product'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      description: 'Custom SEO description for this product'
    }),

    // CMS-specific content fields
    defineField({
      name: 'additionalContent',
      title: 'Additional Content',
      type: 'array',
      group: 'content',
      of: [{type: 'block'}],
      description: 'Rich text content for product pages'
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      description: 'Custom featured image for marketing'
    }),
    defineField({
      name: 'badges',
      title: 'Product Badges',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Sale', value: 'sale'},
          {title: 'Best Seller', value: 'bestseller'},
          {title: 'Limited Edition', value: 'limited'},
          {title: 'Eco Friendly', value: 'eco'},
          {title: 'Premium', value: 'premium'}
        ]
      }
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      group: 'content',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Manually curated related products'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'handle.current',
      media: 'featuredImage'
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled Product',
        subtitle: subtitle || 'No handle',
        media: media
      }
    }
  }
})
