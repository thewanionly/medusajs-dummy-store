import {defineType, defineField} from 'sanity'
import {ComponentIcon} from '@sanity/icons'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer Content',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Company Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Company Description',
          type: 'text',
          description: 'Brief description about your company',
        },
        {
          name: 'logo',
          title: 'Footer Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'text',
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
        {
          name: 'businessHours',
          title: 'Business Hours',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Link Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'linkSection',
          title: 'Link Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Link Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'openInNewTab',
                      title: 'Open in New Tab',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              linkCount: 'links.length',
            },
            prepare({title, linkCount}) {
              return {
                title: title,
                subtitle: `${linkCount || 0} links`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform Name',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'Pinterest', value: 'pinterest'},
                  {title: 'Other', value: 'other'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'customPlatformName',
              title: 'Custom Platform Name',
              type: 'string',
              description: 'Required if platform is "Other"',
              hidden: ({parent}) => parent?.platform !== 'other',
            },
            {
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            },
            {
              name: 'icon',
              title: 'Custom Icon',
              type: 'image',
              description: 'Optional custom icon (will use platform default if not provided)',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'platform',
              customTitle: 'customPlatformName',
              subtitle: 'url',
              media: 'icon',
            },
            prepare({title, customTitle, subtitle, media}) {
              return {
                title: customTitle || title,
                subtitle: subtitle,
                media: media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter Signup',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Newsletter Signup',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'title',
          title: 'Newsletter Title',
          type: 'string',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'placeholderText',
          title: 'Email Placeholder Text',
          type: 'string',
          initialValue: 'Enter your email address',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'buttonText',
          title: 'Subscribe Button Text',
          type: 'string',
          initialValue: 'Subscribe',
          hidden: ({parent}) => !parent?.enabled,
        },
      ],
    }),
    defineField({
      name: 'legalInfo',
      title: 'Legal Information',
      type: 'object',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description: 'e.g., "© 2024 Your Company Name. All rights reserved."',
        },
        {
          name: 'privacyPolicyUrl',
          title: 'Privacy Policy URL',
          type: 'string',
        },
        {
          name: 'termsOfServiceUrl',
          title: 'Terms of Service URL',
          type: 'string',
        },
        {
          name: 'additionalLegalLinks',
          title: 'Additional Legal Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Link Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Payment Methods',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Payment Methods',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'We Accept',
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'methods',
          title: 'Payment Method Icons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Payment Method Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'icon',
                  title: 'Payment Method Icon',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          hidden: ({parent}) => !parent?.enabled,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Content',
        subtitle: 'Website footer configuration',
      }
    },
  },
})
