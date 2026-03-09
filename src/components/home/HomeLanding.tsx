'use client';

import ResearchHighlights, { HighlightItem } from '@/components/home/ResearchHighlights';

export default function HomeLanding() {
  const highlightItems: HighlightItem[] = [
    {
      id: 1,
      title: 'A 3D Printable Tissue Adhesive',
      image: '/highlights/highlight1.jpg',
      summary:
        'Tissue adhesives are promising alternatives to sutures and staples, but existing adhesives mostly take the forms of glues or hydrogels with limited versatility.',
      paper_title: 'A 3D Printable Tissue Adhesive',
      journal: 'Nature Communications',
      volume: '15',
      pages: '1215',
      year: '2024',
      link: 'https://doi.org/',
    },
    {
      id: 2,
      title: 'Wearable Electrochemical Biosensor Platform',
      image: '/highlights/highlight2.jpg',
      summary:
        'We developed a wearable electrochemical sensing platform for real-time biomarker monitoring with improved mechanical stability and signal reliability.',
      paper_title: 'Wearable Electrochemical Biosensor Platform',
      journal: 'Advanced Materials',
      year: '2025',
      link: 'https://doi.org/',
    },
    {
      id: 3,
      title: 'Microneedle-Based Biointerface System',
      image: '/highlights/highlight3.jpg',
      summary:
        'A microneedle-integrated bioelectronic system was designed for efficient biofluid access and sensitive biomarker detection.',
      paper_title: 'Microneedle-Based Biointerface System',
      journal: 'Biosensors and Bioelectronics',
      year: '2025',
      link: 'https://doi.org/',
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background min-h-screen">
      <ResearchHighlights items={highlightItems} />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        <div className="rounded-lg border border-neutral-200 bg-white p-6">
          <p className="text-neutral-600">
            Add your latest research news, awards, invited talks, and updates here.
          </p>
        </div>
      </section>
    </main>
  );
}
