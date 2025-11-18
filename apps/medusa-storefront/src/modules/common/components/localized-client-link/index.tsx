'use client';

import type { ComponentProps, ReactNode } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

type LocalizedClientLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  children?: ReactNode;
  href: string;
};

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: LocalizedClientLinkProps) => {
  const { countryCode } = useParams();

  return (
    <Link href={`/${countryCode}${href}`} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedClientLink;
