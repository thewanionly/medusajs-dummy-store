import {StructureBuilder} from 'sanity/structure'
import {CogIcon, DocumentIcon, ComponentIcon} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Footer Content')
        .icon(ComponentIcon)
        .child(S.document().schemaType('footer').documentId('footer').title('Footer Content')),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings'),
        ),
      S.listItem()
        .title('Navigation')
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType('navigationSettings')
            .documentId('navigationSettings')
            .title('Navigation Settings'),
        ),
    ])
