import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', type: 'string', title: 'Site Title' }),
    defineField({ name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true } }),
    defineField({ name: 'homeWhoWeAreImage', type: 'image', title: 'Home: Who We Are Image', options: { hotspot: true } }),
    defineField({ name: 'aboutWhoWeAreImage', type: 'image', title: 'About: Who We Are Image', options: { hotspot: true } }),
    defineField({
      name: 'ctas',
      title: 'Important Buttons / Links',
      type: 'object',
      fields: [
        { name: 'applyNowUrl', type: 'url', title: 'Apply Now URL' },
        { name: 'registerUrl', type: 'url', title: 'Register URL' },
        { name: 'donateUrl', type: 'url', title: 'Donate URL' },
      ],
    }),
    defineField({
      name: 'contact',
      type: 'object',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'address', type: 'text', title: 'Address' },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'label', type: 'string' },
        { name: 'url', type: 'url' },
      ] }],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'ogImage', type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
})
