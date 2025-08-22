import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {colorInput} from '@sanity/color-input'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Medusa Store CMS',

  projectId: '3cxc3sms',
  dataset: 'production',

  plugins: [
    structureTool({
      structure
    }), 
    visionTool({ defaultApiVersion: '2023-10-20' }),
    media(),
    colorInput()
  ],

  schema: {
    types: schemaTypes,
  },
})
