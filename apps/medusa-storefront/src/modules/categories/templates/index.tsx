import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { ProductCategory } from '@lib/gql/generated-types/graphql';
import InteractiveLink from '@modules/common/components/interactive-link';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid';
import RefinementList from '@modules/store/components/refinement-list';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import PaginatedProducts from '@modules/store/templates/paginated-products';

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: ProductCategory;
  sortBy?: SortOptions;
  page?: string;
  countryCode: string;
}) {
  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || 'created_at';

  if (!category || !countryCode) notFound();

  const parents = [] as ProductCategory['parentCategory'][];

  const getParents = (category: ProductCategory) => {
    if (category?.parentCategory) {
      parents.push(category.parentCategory);
      getParents(category.parentCategory);
    }
  };

  getParents(category);

  return (
    <div
      className="content-container flex flex-col py-6 small:flex-row small:items-start"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} data-testid="sort-by-container" />
      <div className="w-full">
        <div className="text-2xl-semi mb-8 flex flex-row gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent?.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent?.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent?.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title">{category.name}</h1>
        </div>
        {category.description && (
          <div className="text-base-regular mb-8">
            <p>{category.description}</p>
          </div>
        )}
        {category.categoryChildren && category.categoryChildren.length > 0 && (
          <div className="text-base-large mb-8">
            <ul className="grid grid-cols-1 gap-2">
              {category.categoryChildren?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.count ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
}
