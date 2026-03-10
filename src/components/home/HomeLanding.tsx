'use client';

import ResearchHighlights from './ResearchHighlights';

const highlightItems = [
  {
    id: 1,
    title: 'Flexible Bioelectronic Interface',
    image: '/tes 2.png',
    summary:
      'A flexible printed circuit board designed for wearable bioelectronic systems. The compact architecture enables seamless integration with biosensors and wireless modules for real-time physiological monitoring.',
    paper_title:
      'A Wearable Electrochemical Biosensor for Salivary Detection of Periodontal Inflammation Biomarkers: Molecularly Imprinted Polymer Sensor with Deep Learning Integration',
    journal: 'Advanced Science',
    year: '2025',
    link: 'https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202509658',
  },
  {
    id: 2,
    title: 'Portable MIP-Based POCT Biosensing System',
    image: '/POCT.png',
    summary:
      'A portable point-of-care testing system integrating molecularly imprinted polymer biosensors, disposable sensing cartridges, and smartphone-based electrochemical analysis for rapid salivary biomarker detection.',
    paper_title:
      'A Wearable Electrochemical Biosensor for Salivary Detection of Periodontal Inflammation Biomarkers: Molecularly Imprinted Polymer Sensor with Deep Learning Integration',
    journal: 'Advanced Science',
    year: '2025',
    link: 'https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202509658',
  },

  {
    id: 3,
    title: 'Flexible Bioelectronic Interface',
    image: '/Graphene.png',
    summary:
      'A flexible printed circuit board designed for wearable bioelectronic systems. The compact architecture enables seamless integration with biosensors and wireless modules for real-time physiological monitoring.',
    paper_title:
      'A Wearable Electrochemical Biosensor for Salivary Detection of Periodontal Inflammation Biomarkers: Molecularly Imprinted Polymer Sensor with Deep Learning Integration',
    journal: 'Advanced Science',
    year: '2025',
    link: 'https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202509658',
  },
   {
    id: 4,
    title: 'Flexible Bioelectronic Interface',
    image: '/IMP.png',
    summary:
      'A flexible printed circuit board designed for wearable bioelectronic systems. The compact architecture enables seamless integration with biosensors and wireless modules for real-time physiological monitoring.',
    paper_title:
      'A Wearable Electrochemical Biosensor for Salivary Detection of Periodontal Inflammation Biomarkers: Molecularly Imprinted Polymer Sensor with Deep Learning Integration',
    journal: 'Advanced Science',
    year: '2025',
    link: 'https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202509658',
  },
  {
    id: 5,
    title: 'Flexible Bioelectronic Interface',
    image: '/MICRO.png',
    summary:
      'A flexible printed circuit board designed for wearable bioelectronic systems. The compact architecture enables seamless integration with biosensors and wireless modules for real-time physiological monitoring.',
    paper_title:
      'A Wearable Electrochemical Biosensor for Salivary Detection of Periodontal Inflammation Biomarkers: Molecularly Imprinted Polymer Sensor with Deep Learning Integration',
    journal: 'Advanced Science',
    year: '2025',
    link: 'https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202509658',
  },
  
  
];

export default function HomeLanding() {
  return <ResearchHighlights items={highlightItems} />;
}
