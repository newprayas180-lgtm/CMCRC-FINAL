import { StructureBuilder } from 'sanity/desk'

export default (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.documentTypeListItem('navigation'),
      S.documentTypeListItem('teamMember'),
      S.documentTypeListItem('event'),
      S.documentTypeListItem('publication'),
      S.documentTypeListItem('achievement'),
      S.documentTypeListItem('galleryAlbum'),
    ])
