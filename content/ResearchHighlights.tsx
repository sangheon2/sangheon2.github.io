'use client';

import Image from 'next/image';
import { useState } from 'react';

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

  if (!items.length) return null;

  const active = items[activeIndex];

return (
  <section className="w-full pt-0">
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
      <div className="mb-3 border-b border-neutral-300 pb-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-neutral-900">
          Research Highlights
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_32px] gap-2 items-start">
        <div className="border border-neutral-300 bg-[#f4efdc] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-[520px]">
            
            {/* Image area */}
            <div className="lg:col-span-5 relative h-[220px] sm:h-[300px] lg:h-[520px] overflow-hidden">
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

              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 bottom-3 z-20 bg-neutral-700/90 hover:bg-neutral-900 text-white p-2"
                aria-label="Previous highlight"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Text area */}
            <div className="lg:col-span-7 h-auto lg:h-[520px] p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col relative">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-neutral-900 mb-3">
                {active.title}
              </h3>

              <div className="h-px bg-neutral-500 mb-4" />

              <div className="text-neutral-900 lg:flex-1 lg:overflow-y-auto lg:pr-2">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  {active.summary}
                </p>
              </div>

              <div className="pt-4">
                <p className="text-sm sm:text-base font-semibold text-neutral-900 mb-1">
                  Related paper
                </p>

                <p className="text-xs sm:text-sm md:text-base text-neutral-800 leading-relaxed">
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

              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 bottom-3 lg:right-4 lg:top-1/2 lg:bottom-auto z-20 lg:-translate-y-1/2 bg-neutral-700/90 hover:bg-neutral-900 text-white p-2"
                aria-label="Next highlight"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Number buttons */}
        <div className="flex w-full lg:w-8 flex-row lg:flex-col items-center justify-center gap-1">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-7 w-7 min-h-7 min-w-7 lg:h-8 lg:w-8 lg:min-h-8 lg:min-w-8 shrink-0 rounded-none p-0 leading-none text-[10px] lg:text-[11px] font-medium border border-neutral-500 transition-colors ${
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
