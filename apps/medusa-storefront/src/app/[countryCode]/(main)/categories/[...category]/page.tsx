import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCategoryByHandle } from '@lib/data/categories';
import CategoryTemplate from '@modules/categories/templates';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>;
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  try {
    const productCategory = await getCategoryByHandle(params.category);

    const title = productCategory?.name + ' | Medusa Store';

    const description = productCategory?.description ?? `${title} category.`;

    return {
      title: `${title} | Medusa Store`,
      description,
      alternates: {
        canonical: `${params.category.join('/')}`,
      },
    };
  } catch (error) {
    notFound();
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sortBy, page } = searchParams;

  const productCategory = await getCategoryByHandle(params.category);

  if (!productCategory) {
    notFound();
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  );
}
