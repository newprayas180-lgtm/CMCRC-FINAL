import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'bio', type: 'text' }),
    defineField({
      name: 'social',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'label', type: 'string' },
        { name: 'url', type: 'url' },
      ] }],
    }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'category', type: 'string' }),
  ],
  orderings: [
    { name: 'orderAsc', title: 'Order asc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
