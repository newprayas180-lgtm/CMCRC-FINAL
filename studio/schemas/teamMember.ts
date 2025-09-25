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
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'Core Team',
      options: {
        list: [
          { title: 'Core Team', value: 'Core Team' },
          { title: 'Visibility Team', value: 'Visibility Team' },
          { title: 'Social Media Team', value: 'Social Media Team' },
          { title: 'Research Team', value: 'Research Team' },
          { title: 'Operations Team', value: 'Operations Team' },
        ],
        layout: 'radio',
      },
      description: 'Pick one of the predefined teams to keep naming consistent on the website.',
    }),
  ],
  orderings: [
    { name: 'orderAsc', title: 'Order asc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
