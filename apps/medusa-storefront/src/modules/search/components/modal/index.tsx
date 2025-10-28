'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DOMPurify from 'isomorphic-dompurify';

import { ProductHit } from '@lib/gql/generated-types/graphql';
import { cn } from '@mds/ui/lib/utils';
import { Button } from '@medusajs/ui';
import PlaceholderImage from '@modules/common/icons/placeholder-image';

import { useSearch } from '../../../../lib/hooks/use-search';
import Modal from '../../../common/components/modal';

type SearchModalProps = {
  buttonClassName?: string;
};

export default function SearchModal({ buttonClassName }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { query, setQuery, results, loading, error, isTyping } = useSearch();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen, setQuery]);

  return (
    <>
      <div
        className={cn(
          'hidden h-full items-center gap-x-6 small:flex',
          buttonClassName
        )}
      >
        <Button
          onClick={() => setIsOpen(true)}
          variant="transparent"
          className="text-small-regular px-0 hover:bg-transparent hover:text-ui-fg-base focus:!bg-transparent"
          data-testid="search-button"
        >
          Search
        </Button>
      </div>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="flex h-full max-h-[75vh] min-h-0 flex-col">
          <div className="shrink-0">
            <SearchBox query={query} setQuery={setQuery} loading={loading} />
          </div>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
            <SearchResults
              results={results}
              loading={loading}
              error={error}
              query={query}
              isTyping={isTyping}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
const SearchBox = ({
  query,
  setQuery,
  loading,
}: {
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500"
        disabled={loading}
        autoFocus
        data-testid="search-input"
      />
    </div>
  );
};

const SearchResults = ({
  results,
  loading,
  error,
  query,
  isTyping,
}: {
  results: { items: ProductHit[] } | null;
  loading: boolean;
  error: string | null;
  query: string;
  isTyping: boolean;
}) => {
  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="mt-2 text-sm text-gray-500">Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-full items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (
    query.trim() &&
    !isTyping &&
    !loading &&
    (!results || !results.items || results.items.length === 0)
  ) {
    return (
      <div className="flex min-h-full items-center justify-center text-gray-500">
        <p>No products found</p>
      </div>
    );
  }

  if (!query.trim()) {
    return null;
  }

  return (
    <div>
      {results?.items?.map((hit: ProductHit) => (
        <Hit key={hit.id} hit={hit} />
      ))}
    </div>
  );
};

const Hit = ({ hit }: { hit: ProductHit }) => {
  return (
    <div
      className="relative mt-4 flex flex-row gap-x-2"
      data-testid="search-hit"
    >
      <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden border border-gray-200">
        {hit.thumbnail ? (
          <Image
            src={hit.thumbnail}
            alt={hit.title ?? 'Product Image'}
            width={100}
            height={100}
            className="aspect-square object-cover"
          />
        ) : (
          <div className="border-grey-400 flex h-[125px] w-[100px] items-center justify-center self-start border">
            <PlaceholderImage size={40} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <h3>{hit.title}</h3>
        <p
          className="text-sm text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(hit.description ?? ''),
          }}
        />
      </div>
      <Link
        href={`/products/${hit.handle}`}
        className="absolute right-0 top-0 h-full w-full"
        aria-label={`View Product: ${hit.title}`}
      />
    </div>
  );
};
