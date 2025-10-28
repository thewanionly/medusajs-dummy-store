import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemas'
import structure from './structure'
const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET, SANITY_STUDIO_API_VERSION } = process.env

export default defineConfig({
  name: 'Medusa_Dummy_Store',
  title: 'Medusa Dummy Store',

  projectId: SANITY_STUDIO_PROJECT_ID || '',
  dataset: SANITY_STUDIO_DATASET || '',
  apiVersion: SANITY_STUDIO_API_VERSION,

  plugins: [structureTool({ structure }), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
