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
    <section className="w-full pt-10">
      <h2 className="text-4xl font-light mb-6">Research Highlights</h2>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-11 border border-neutral-300 bg-[#f5f0dd]">
          <div className="grid grid-cols-12 min-h-[560px]">
            <div className="col-span-5 relative min-h-[560px] bg-white overflow-hidden">
           <Image
  src={active.image}
  alt={active.title}
  fill
  className="object-cover"
  sizes="(max-width: 1024px) 100vw, 42vw"
  priority
/>
            </div>

            <div className="col-span-7 p-10 flex flex-col">
              <h3 className="text-4xl font-bold leading-tight mb-6">
                {active.title}
              </h3>

              <div className="h-px bg-neutral-500 mb-8" />

              <p className="text-lg leading-relaxed text-neutral-800 mb-8">
                {active.summary}
              </p>

              <div className="mt-auto">
                <p className="text-xl font-semibold mb-1">Related paper</p>
                <p className="text-lg text-neutral-800">
                  {active.paper_title}
                  {active.journal && (
                    <>
                      {' '}
                      , <span className="italic">{active.journal}</span>
                    </>
                  )}
                  {active.volume && <> {active.volume}</>}
                  {active.pages && <> , {active.pages}</>}
                  {active.year && <> ({active.year})</>}
                </p>

                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-700 hover:underline"
                  >
                    View paper
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-12 border text-sm font-medium ${
                idx === activeIndex
                  ? 'bg-neutral-800 text-white'
                  : 'bg-neutral-500 text-white hover:bg-neutral-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
