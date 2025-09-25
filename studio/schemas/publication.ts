import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'authors', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'publishedOn', type: 'date' }),
    defineField({ name: 'venue', type: 'string', title: 'Journal / Conference' }),
    defineField({ name: 'linkUrl', type: 'url', title: 'External Link' }),
    defineField({ name: 'pdf', type: 'file', options: { storeOriginalFilename: true } }),
    defineField({ name: 'abstract', type: 'text' }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
  ],
})
