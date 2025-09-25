import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import deskStructure from './deskStructure'
import schemas from './schemas'

export default defineConfig({
  name: 'default',
  title: 'CMCRC Studio',
  projectId: process.env.SANITY_PROJECT_ID as string,
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [deskTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemas,
  },
})
