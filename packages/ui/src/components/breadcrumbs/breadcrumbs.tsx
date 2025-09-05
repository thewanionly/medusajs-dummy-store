'use client';

import { Fragment } from 'react';

import { usePathname } from 'next/navigation';

import { SlashIcon, Tally1 } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@mds/ui/components/breadcrumb';

const SEPARATOR_ICONS = {
  verticalLine: Tally1,
  slash: SlashIcon,
} as const;

interface BreadcrumbsProps {
  separatorIcon?: keyof typeof SEPARATOR_ICONS;
  iconSize?: number;
  iconClassName?: string;
}

const formatSegmentLabel = (segment: string): string =>
  segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

const createBreadcrumbItems = (segments: string[]) => [
  { label: 'Home', href: '/' },
  ...segments.map((segment, index) => ({
    href: '/' + segments.slice(0, index + 1).join('/'),
    label: formatSegmentLabel(segment),
  })),
];

export function Breadcrumbs({
  iconClassName,
  iconSize,
  separatorIcon,
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = createBreadcrumbItems(pathSegments);
  const SeparatorIcon = separatorIcon ? SEPARATOR_ICONS[separatorIcon] : null;

  return (
    <Breadcrumb className="mt-3">
      <BreadcrumbList className="lg:gap-6">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <Fragment key={item.href}>
              <BreadcrumbItem className="text-sm">
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  {SeparatorIcon && (
                    <SeparatorIcon size={iconSize} className={iconClassName} />
                  )}
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
