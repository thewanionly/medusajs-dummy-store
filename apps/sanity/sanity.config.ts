import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { media } from 'sanity-plugin-media';

export default defineConfig({
  name: 'default',
  title: 'Medusa Store CMS',

  projectId: '3cxc3sms',
  dataset: 'production',

  plugins: [structureTool(), 
 visionTool({ defaultApiVersion: '2023-10-20' }),media()
  ],

  schema: {
    types: schemaTypes,
  },
})
