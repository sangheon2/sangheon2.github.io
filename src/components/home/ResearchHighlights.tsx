'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';

export interface HighlightItem {
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

interface ResearchHighlightsProps {
  items: HighlightItem[];
}

export default function ResearchHighlights({
  items,
}: ResearchHighlightsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const active = items[activeIndex];

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setActiveIndex((prev) =>
      prev === items.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full bg-white pt-0 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="mb-3 border-b border-neutral-300 pb-2">
          <h2 className="text-xl font-light tracking-tight text-neutral-900 sm:text-2xl md:text-3xl">
            Research Highlights
          </h2>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_32px]">

          {/* Main card */}
          <div className="overflow-hidden border border-neutral-300 bg-[#f4efdc]">

            <div className="grid grid-cols-1 lg:h-[520px] lg:grid-cols-12">

              {/* Image area */}
              <div className="relative h-[280px] overflow-hidden sm:h-[360px] lg:col-span-5 lg:h-[520px]">
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

                {/* Previous */}
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute bottom-3 left-3 z-20 flex h-10 w-10 items-center justify-center bg-neutral-800/80 text-white transition hover:bg-neutral-900"
                  aria-label="Previous highlight"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>

                {/* Mobile next button */}
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center bg-neutral-800/80 text-white transition hover:bg-neutral-900 lg:hidden"
                  aria-label="Next highlight"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Text area */}
              <div className="relative flex flex-col p-5 sm:p-6 lg:col-span-7 lg:h-[520px] lg:overflow-hidden lg:p-7">

                <h3 className="mb-3 text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                  {active.title}
                </h3>

                <div className="mb-4 h-px bg-neutral-500" />

                {/* Summary */}
                <div className="text-neutral-900 lg:flex-1 lg:overflow-y-auto lg:pr-10">
                  <p className="text-sm leading-relaxed sm:text-base md:text-lg">
                    {active.summary}
                  </p>
                </div>

                {/* Desktop next button */}
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 bg-neutral-700/90 p-2 text-white hover:bg-neutral-900 lg:block"
                  aria-label="Next highlight"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>

                {/* Related paper */}
                <div className="mt-5 border-t border-neutral-400 pt-4 lg:mt-3">
                  <p className="mb-1 text-sm font-semibold text-neutral-900 sm:text-base">
                    Related paper
                  </p>

                  <p className="text-xs leading-relaxed text-neutral-800 sm:text-sm md:text-base">
                    {active.paper_title}

                    {active.journal && (
                      <>
                        {', '}
                        <span className="italic">
                          {active.journal}
                        </span>
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
              </div>
            </div>
          </div>

          {/* Number navigation */}
          <div className="flex w-full flex-row flex-wrap justify-center gap-1 pt-2 lg:w-8 lg:flex-col lg:flex-nowrap lg:items-center lg:justify-start lg:pt-0">
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-8 w-8 shrink-0 border border-neutral-500 p-0 text-[11px] font-medium leading-none transition-colors ${
                    isActive
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-400 text-white hover:bg-neutral-700'
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
