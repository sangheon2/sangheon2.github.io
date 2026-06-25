'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/useMessages';

interface PublicationsListProps {
  config: PublicationPageConfig;
  publications: Publication[];
  embedded?: boolean;
}

const journalCovers = [
  {
    src: '/1.png',
    alt: 'Journal cover 1',
  },
  {
    src: '/2.png',
    alt: 'Journal cover 2',
  },
  {
    src: '/3.jpg',
    alt: 'Journal cover 3',
  },
  {
    src: '/4.png',
    alt: 'Journal cover 4',
  },
  {
    src: '/5.png',
    alt: 'Journal cover 5',
  },
  {
    src: '/6.png',
    alt: 'Journal cover 6',
  },
  {
    src: '/7.png',
    alt: 'Journal cover 7',
  },
  {
    src: '/8.png',
    alt: 'Journal cover 8',
  },
  {
    src: '/9.png',
    alt: 'Journal cover 9',
  },
];

export default function PublicationsList({
  config,
  publications,
  embedded = false,
}: PublicationsListProps) {
  const messages = useMessages();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(publications.map((p) => p.year)));
    return uniqueYears.sort((a, b) => b - a);
  }, [publications]);

  const types = useMemo(() => {
    const uniqueTypes = Array.from(new Set(publications.map((p) => p.type)));
    return uniqueTypes.sort();
  }, [publications]);

  const filteredPublications = useMemo(() => {
    const q = searchQuery.toLowerCase();

    return publications.filter((pub) => {
      const matchesSearch =
        pub.title.toLowerCase().includes(q) ||
        pub.authors.some((author) =>
          author.name.toLowerCase().includes(q)
        ) ||
        pub.journal?.toLowerCase().includes(q) ||
        pub.conference?.toLowerCase().includes(q);

      const matchesYear =
        selectedYear === 'all' || pub.year === selectedYear;

      const matchesType =
        selectedType === 'all' || pub.type === selectedType;

      return matchesSearch && matchesYear && matchesType;
    });
  }, [publications, searchQuery, selectedYear, selectedType]);

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`${
            embedded ? 'text-2xl' : 'text-4xl'
          } mb-4 font-serif font-bold text-primary`}
        >
          {config.title}
        </h1>

        {config.description && (
          <p
            className={`${
              embedded ? 'text-base' : 'text-lg'
            } max-w-2xl text-neutral-600 dark:text-neutral-500`}
          >
            {config.description}
          </p>
        )}
      </div>

      {!embedded && (
        <section className="mb-14">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {journalCovers.map((cover, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] overflow-hidden bg-white"
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 4}
                />
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold tracking-tight text-primary">
            International journal publications
          </h2>
        </section>
      )}

      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-neutral-400" />

            <input
              type="text"
              placeholder={messages.publications.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-10 pr-4 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-accent dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>

          <button
            onClick={() => setShowFilters((v) => !v)}
            className={cn(
              'flex items-center justify-center rounded-lg border px-4 py-2 transition-all duration-200',
              showFilters
                ? 'border-accent bg-accent text-white'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-accent hover:text-accent dark:border-neutral-800 dark:bg-neutral-900'
            )}
          >
            <FunnelIcon className="mr-2 h-5 w-5" />
            {messages.publications.filters}
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800/50">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {messages.publications.year}
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedYear('all')}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs transition-colors',
                    selectedYear === 'all'
                      ? 'bg-accent text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                  )}
                >
                  {messages.common.all}
                </button>

                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs transition-colors',
                      selectedYear === year
                        ? 'bg-accent text-white'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <BookOpenIcon className="mr-1 h-4 w-4" />
                {messages.publications.type}
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs transition-colors',
                    selectedType === 'all'
                      ? 'bg-accent text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                  )}
                >
                  {messages.common.all}
                </button>

                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs capitalize transition-colors',
                      selectedType === type
                        ? 'bg-accent text-white'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                    )}
                  >
                    {type.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {filteredPublications.length === 0 ? (
          <div className="py-12 text-center text-neutral-500">
            {messages.publications.noResults}
          </div>
        ) : (
          filteredPublications.map((pub, index) => (
            <div
              key={pub.id}
              className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
                <div className="w-full flex-shrink-0 md:w-[320px]">
                  <div className="relative h-full min-h-[220px] overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
                    {pub.preview ? (
                      <Image
                        src={`/papers/${pub.preview}`}
                        alt={pub.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                        No image
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <div className="mb-2 text-sm font-medium text-neutral-500">
                    {filteredPublications.length - index}.
                  </div>

                  <h3
                    className={`${
                      embedded ? 'text-lg' : 'text-xl'
                    } mb-2 font-semibold leading-tight text-primary`}
                  >
                    {pub.title}
                  </h3>

                  <p
                    className={`${
                      embedded ? 'text-sm' : 'text-base'
                    } mb-2 text-neutral-600 dark:text-neutral-400`}
                  >
                    {pub.authors.map((author, idx) => (
                      <span key={idx}>
                        <span
                          className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${
                            author.isCoAuthor
                              ? `underline underline-offset-4 ${
                                  author.isHighlighted
                                    ? 'decoration-accent'
                                    : 'decoration-neutral-400'
                                }`
                              : ''
                          }`}
                        >
                          {author.name}
                        </span>

                        {author.isCorresponding && (
                          <sup
                            className={`ml-0 ${
                              author.isHighlighted
                                ? 'text-accent'
                                : 'text-neutral-600 dark:text-neutral-400'
                            }`}
                          >
                            †
                          </sup>
                        )}

                        {idx < pub.authors.length - 1 && ', '}
                      </span>
                    ))}
                  </p>

                  <p className="mb-3 text-sm font-medium text-neutral-800 dark:text-neutral-300">
                    <span className="font-semibold italic">
                      {pub.journal || pub.conference}
                    </span>

                    {pub.volume && `, ${pub.volume}`}
                    {pub.pages && `, ${pub.pages}`}
                    {pub.year && ` (${pub.year})`}

                    {(pub.url || pub.doi) && (
                      <>
                        {' '}
                        <a
                          href={
                            pub.url ||
                            `https://doi.org/${pub.doi}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          [link]
                        </a>
                      </>
                    )}
                  </p>

                  {pub.description && (
                    <p className="mb-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {pub.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      >
                        DOI
                      </a>
                    )}

                    {pub.code && (
                      <a
                        href={pub.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      >
                        {messages.publications.code}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
