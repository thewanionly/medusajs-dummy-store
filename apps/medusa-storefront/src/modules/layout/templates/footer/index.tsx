import { listCategories } from '@lib/data/categories';
import { listCollections } from '@lib/data/collections';
import { getSiteSettings, urlFor } from '@lib/sanity-client';
import { Text, clx } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import MedusaCTA from '@modules/layout/components/medusa-cta';
import Image from 'next/image';

export default async function Footer() {
  const { collections } = await listCollections();
  const productCategories = await listCategories();
  
  const siteSettings = await getSiteSettings();

  return (
    <footer className="w-full border-t border-ui-border-base">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-y-6 py-40 xsmall:flex-row">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus uppercase text-ui-fg-subtle hover:text-ui-fg-base"
            >
              {siteSettings?.title || 'Medusa Store'}
            </LocalizedClientLink>
            {siteSettings?.description && (
              <Text className="txt-small mt-2 text-ui-fg-subtle max-w-xs">
                {siteSettings.description}
              </Text>
            )}
          </div>
          <div className="text-small-regular grid grid-cols-2 gap-10 sm:grid-cols-4 md:gap-x-16">
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
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
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
                            {children?.map((child) => (
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
            
            {/* Sanity Social Media Links */}
            {siteSettings?.socialMedia && siteSettings.socialMedia.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-ui-fg-base txt-small-plus">Follow Us</span>
                <ul className="txt-small grid grid-cols-1 gap-y-2 text-ui-fg-subtle">
                  {siteSettings.socialMedia.slice(0, 5).map((social) => (
                    <li key={social.platform} className="flex items-center gap-2">
                      {social.logo && (
                        <Image
                          src={urlFor(social.logo).width(16).height(16).url()}
                          alt={social.platform}
                          width={16}
                          height={16}
                          className="opacity-70"
                        />
                      )}
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-ui-fg-base"
                      >
                        {social.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex flex-col gap-y-2">
              <span className="txt-ui-fg-base txt-small-plus">Help</span>
              <ul className="txt-small grid grid-cols-1 gap-y-2 text-ui-fg-subtle">
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="hover:text-ui-fg-base"
                  >
                    About Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="hover:text-ui-fg-base"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/privacy"
                    className="hover:text-ui-fg-base"
                  >
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/terms"
                    className="hover:text-ui-fg-base"
                  >
                    Terms of Service
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-16 flex w-full justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} {siteSettings?.title || 'Medusa Store'}. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  );
}
