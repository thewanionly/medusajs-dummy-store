import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export {footerType} from './footer'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Default meta description for the site',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon for browser tabs (32x32px recommended)',
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
              description: 'e.g., Facebook, Twitter, Instagram',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'logo',
              title: 'Platform Logo',
              type: 'image',
              description: 'Icon/logo for the social platform',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              description: 'Full URL to your social media profile',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
              media: 'logo',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})

export const navigationSettingsType = defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'headerNavigation',
      title: 'Header Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            {name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'url', title: 'URL', type: 'string', validation: (Rule) => Rule.required()},
            {
              name: 'children',
              title: 'Sub-items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
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
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerNavigation',
      title: 'Footer Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerSection',
          title: 'Footer Section',
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
                      title: 'Label',
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation Settings',
        subtitle: 'Header and footer navigation',
      }
    },
  },
})
