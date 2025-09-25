import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import deskStructure from './deskStructure'
import schemas from './schemas'

const projectId = process.env.SANITY_PROJECT_ID || 'bqf2304q'
const dataset = process.env.SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'CMCRC Studio',
  projectId,
  dataset,
  plugins: [deskTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemas,
  },
})
