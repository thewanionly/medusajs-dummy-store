export const FOOTER_QUERY = `*[_id == "footerId"][0]{
  _id,
  storeName,
  social[]{
    text,
    url
  },
  copyright,
  poweredByCta{
    text[]{
      ...,
      markDefs[]{
        ...,
        _type == "iconlink" => {
          _key,
          href,
          iconType,
          iconClass,
          iconFill,
          iconComponent,
          iconImage{
            asset->{
              url
            }
          },
          iconUrl,
          target
        },
        _type == "link" => {
          _key,
          href,
          target
        }
      },
      _type == "image" => {
        asset->{
          url
        },
        alt
      }
    }
  }
}`;
