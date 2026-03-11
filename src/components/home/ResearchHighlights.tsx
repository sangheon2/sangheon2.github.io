'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

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

export default function ResearchHighlights({ items }: ResearchHighlightsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const active = items[activeIndex];

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full pt-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-3 border-b border-neutral-300 pb-1">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-neutral-900">
            Research Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_32px] gap-x-2 gap-y-2 items-start">
          <div className="border border-neutral-300 bg-[#f4efdc]">
            <div className="grid grid-cols-1 lg:grid-cols-12 h-[520px]">
<div className="lg:col-span-5 relative h-[320px] lg:h-[520px] overflow-hidden">
  {items.map((item, idx) => (
    <Image
      key={item.id}
      src={item.image}
      alt={item.title}
      fill
      className={`object-cover transition-opacity duration-300 ${
        idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
      sizes="(max-width: 1024px) 100vw, 42vw"
      priority={idx === 0}
    />
  ))}
</div>

                <button
                  onClick={goPrev}
                  className="absolute left-3 bottom-3 bg-neutral-700/90 hover:bg-neutral-900 text-white p-2"
                  aria-label="Previous highlight"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="lg:col-span-7 h-[520px] p-5 md:p-6 lg:p-7 flex flex-col relative overflow-hidden">
                <h3 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-neutral-900 mb-3">
                  {active.title}
                </h3>

                <div className="h-px bg-neutral-500 mb-4" />

                <div className="space-y-4 text-neutral-900">
                  <p className="text-base md:text-lg leading-relaxed">
                    {active.summary}
                  </p>
                </div>

                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-700/90 hover:bg-neutral-900 text-white p-2"
                  aria-label="Next highlight"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>

                <div className="mt-auto pt-6">
                  <p className="text-base font-semibold text-neutral-900 mb-1">
                    Related paper
                  </p>

                  <p className="text-sm md:text-base text-neutral-800 leading-relaxed">
                    {active.paper_title}
                    {active.journal && (
                      <>
                        {', '}
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
                      className="inline-block mt-3 text-sm font-medium text-blue-700 hover:underline"
                    >
                      View paper
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

<div className="flex w-8 flex-col items-center gap-1">
  {items.map((item, idx) => {
    const isActive = idx === activeIndex;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => setActiveIndex(idx)}
        className={`h-8 w-8 min-h-8 min-w-8 max-h-8 max-w-8 shrink-0 rounded-none p-0 leading-none text-[11px] font-medium border border-neutral-500 transition-colors ${
          isActive
            ? 'bg-neutral-800 text-white'
            : 'bg-neutral-500 text-white hover:bg-neutral-700'
        }`}
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
