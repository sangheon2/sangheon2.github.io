'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface HighlightItem {
  id: number;
  title: string;
  image: string;
  summary: string;
  paper_title?: string;
  journal?: string;
  volume?: string;
  pages?: string;
  year?: string;
  link?: string;
}

interface Props {
  items: HighlightItem[];
}

export default function ResearchHighlights({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const active = items[activeIndex];

  return (
    <section className="w-full pt-0">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="mb-3 border-b border-neutral-300 pb-1">
          <h2 className="text-xl font-light tracking-tight text-neutral-900 sm:text-2xl md:text-3xl">
            Research Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-[minmax(0,1fr)_32px]">
          <div className="overflow-hidden border border-neutral-300 bg-[#f4efdc]">
            <div className="grid grid-cols-1 lg:h-[520px] lg:grid-cols-12">
              {/* Image area */}
              <div className="relative h-[220px] overflow-hidden sm:h-[300px] lg:col-span-5 lg:h-[520px]">
                {items.map((item, idx) => (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      idx === activeIndex
                        ? 'z-10 opacity-100'
                        : 'z-0 opacity-0'
                    }`}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority={idx === 0}
                  />
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === 0 ? items.length - 1 : prev - 1
                    )
                  }
                  className="absolute bottom-3 left-3 z-20 bg-neutral-700/90 p-2 text-white hover:bg-neutral-900"
                  aria-label="Previous highlight"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Text area */}
              <div className="relative flex h-auto flex-col p-4 sm:p-5 md:p-6 lg:col-span-7 lg:h-[520px] lg:p-7">
                <h3 className="mb-3 text-xl font-bold leading-tight text-neutral-900 sm:text-2xl md:text-3xl lg:text-4xl">
                  {active.title}
                </h3>

                <div className="mb-4 h-px bg-neutral-500" />

                <div className="text-neutral-900 lg:flex-1 lg:overflow-y-auto lg:pr-2">
                  <p className="text-sm leading-relaxed sm:text-base md:text-lg">
                    {active.summary}
                  </p>
                </div>

                <div className="pt-4">
                  <p className="mb-1 text-sm font-semibold text-neutral-900 sm:text-base">
                    Related paper
                  </p>

                  <p className="text-xs leading-relaxed text-neutral-800 sm:text-sm md:text-base">
                    {active.paper_title}

                    {active.journal && (
                      <>
                        {active.paper_title ? ', ' : ''}
                        <span className="italic">{active.journal}</span>
                      </>
                    )}

                    {active.volume && ` ${active.volume}`}
                    {active.pages && `, ${active.pages}`}
                    {active.year && ` (${active.year})`}
                  </p>

                  {active.link && (
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline"
                    >
                      View paper
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === items.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute bottom-3 right-3 z-20 bg-neutral-700/90 p-2 text-white hover:bg-neutral-900 lg:bottom-auto lg:right-4 lg:top-1/2 lg:-translate-y-1/2"
                  aria-label="Next highlight"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Number buttons */}
          <div className="flex w-full flex-row items-center justify-center gap-1 lg:w-8 lg:flex-col">
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-7 min-h-7 w-7 min-w-7 shrink-0 rounded-none border border-neutral-500 p-0 text-[10px] font-medium leading-none transition-colors lg:h-8 lg:min-h-8 lg:w-8 lg:min-w-8 lg:text-[11px] ${
                    isActive
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-500 text-white hover:bg-neutral-700'
                  }`}
                  aria-label={`Go to highlight ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
