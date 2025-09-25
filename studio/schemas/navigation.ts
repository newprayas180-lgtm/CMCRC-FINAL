import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'label', type: 'string' },
        { name: 'url', type: 'string', description: 'Internal path or absolute URL' },
      ] }],
    }),
    defineField({ name: 'footer', title: 'Is Footer Menu', type: 'boolean' }),
  ],
})
