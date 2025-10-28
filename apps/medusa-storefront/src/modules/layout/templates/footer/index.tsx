import { listCategories } from '@lib/data/categories';
import { listCollections } from '@lib/data/collections';
import { getFooterContent } from '@lib/data/footer';
import { RichTextBlock } from '@lib/gql/generated-types/graphql';
import { Text, clx } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import PortableText from '@modules/common/components/portable-text';

export default async function Footer() {
  const { collections } = await listCollections();
  const productCategories = await listCategories();
  const footerContent = await getFooterContent();

  return (
    <footer className="w-full border-t border-ui-border-base">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-y-6 py-40 xsmall:flex-row">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus uppercase text-ui-fg-subtle hover:text-ui-fg-base"
            >
              {footerContent?.storeName || 'Medusa Store'}
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-x-16">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-ui-fg-base txt-small-plus">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parentCategory) {
                      return;
                    }

                    const children =
                      c.categoryChildren?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="txt-small flex flex-col gap-2 text-ui-fg-subtle"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            'hover:text-ui-fg-base',
                            children && 'txt-small-plus'
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="ml-3 grid grid-cols-1 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-ui-fg-base txt-small-plus">
                  Collections
                </span>
                <ul
                  className={clx(
                    'txt-small grid grid-cols-1 gap-2 text-ui-fg-subtle',
                    {
                      'grid-cols-2': (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-ui-fg-base txt-small-plus">Medusa</span>
              <ul className="txt-small grid grid-cols-1 gap-y-2 text-ui-fg-subtle">
                {footerContent?.social &&
                  footerContent?.social.map(
                    (social: { text: string; url: string }, index: number) => (
                      <li key={index}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="capitalize hover:text-ui-fg-base"
                        >
                          {social.text}
                        </a>
                      </li>
                    )
                  )}
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-16 flex w-full flex-col gap-4 text-ui-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <Text className="txt-compact-small">
            ©{`${new Date().getFullYear()} ${footerContent?.copyright}`}
          </Text>
          <div className="flex items-center gap-4">
            {footerContent?.poweredByCta && (
              <PortableText
                value={footerContent.poweredByCta.text as RichTextBlock[]}
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
