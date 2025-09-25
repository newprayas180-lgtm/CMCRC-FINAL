import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_PROJECT_ID || 'bqf2304q'
const dataset = process.env.SANITY_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  // Optionally set a custom Studio hostname like "cmcrc-studio"
  // studioHost: process.env.SANITY_STUDIO_HOST,
})
