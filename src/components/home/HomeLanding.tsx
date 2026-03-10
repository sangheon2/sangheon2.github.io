'use client';

import ResearchHighlights from './ResearchHighlights';

const highlightItems = [
  {
    id: 1,
    title: 'Flexible Bioelectronic Interface for Wearable Biosensing',
    image: '/tes 2.png',
    summary:
      'A miniaturized flexible bioelectronic interface designed for seamless integration with wearable electrochemical biosensors. The flexible PCB architecture integrates biosensors, signal conditioning circuits, and wireless communication modules, enabling stable signal acquisition and low-noise electrochemical impedance measurements for real-time physiological monitoring. This platform provides a scalable hardware interface for portable and wearable biochemical sensing systems.',
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
      'A portable point-of-care biosensing system for rapid detection of salivary biomarkers. The platform integrates molecularly imprinted polymer (MIP) sensors, disposable cartridges, and smartphone-based electrochemical analysis into a compact diagnostic device. Through selective molecular recognition and impedance-based sensing, the system enables label-free detection of periodontal inflammation biomarkers in saliva, providing a practical solution for non-invasive and real-time health monitoring.',
    paper_title:
      'A Wearable Electrochemical Biosensor for Salivary Detection of Periodontal Inflammation Biomarkers: Molecularly Imprinted Polymer Sensor with Deep Learning Integration',
    journal: 'Advanced Science',
    year: '2025',
    link: 'https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202509658',
  },

  {
    id: 3,
    title: 'Multistacked Graphene Device Platform',
    image: '/Graphene.png',
    summary:
      'A multistacked graphene platform engineered for high-performance electronic device integration. The structure combines selectively patterned bilayer graphene with monolayer graphene electrodes, enabling stable charge transport and scalable device fabrication. Structural and morphological analyses confirm controlled layer stacking and high interfacial quality, providing a robust platform for next-generation graphene electronics and sensing devices.',
    paper_title:
      'Multistacked graphene grown by copper-pocket-assisted chemical vapor deposition for versatile device integration',
    journal: 'ACS Applied Nano Materials ',
    year: '2024',
    link: 'https://pubs.acs.org/doi/10.1021/acsanm.4c03913',
  },

   
    {
    id: 4,
    title: 'Hierarchically Structured Nanoporous Gold Platform',
    image: '/SERS.png',
    summary:
      'A hierarchically structured nanoporous gold platform engineered for high-performance plasmonic sensing. The wrinkled nanoporous architecture introduces dense micro- and nanoscale features that generate abundant electromagnetic “hot spots,” significantly enhancing surface-enhanced Raman scattering (SERS) signals. This scalable nanostructured metal platform enables ultrasensitive molecular detection for chemical and biological sensing applications.',
    paper_title:
      'Guided wrinkling of hierarchically structured nanoporous gold films for improved surface-enhanced Raman scattering performance',
    journal: 'Advanced Materials Interfaces',
    year: '2023',
    link: 'https://advanced.onlinelibrary.wiley.com/doi/10.1002/admi.202300212',
  }
    {
    id: 5,
    title: 'Wrinkled Graphene Nanostructure Platform',
    image: '/go w.png',
    summary:
      'A wrinkled graphene nanostructure engineered for high-surface-area electronic and sensing applications. The crumpled graphene morphology introduces abundant nanoscale edges and defects that enhance charge transfer and molecular interaction at the surface. This hierarchical graphene architecture provides an effective platform for high-sensitivity chemical and biological sensing devices.',
    paper_title:
      'Improved antibacterial activity of 3D wrinkled graphene oxide films implemented with irreversibly shrinkable shape-memory polymer substrate',
    journal: 'Environmental Science: Nano',
    year: '2025',
    link: 'https://pubs.rsc.org/en/content/articlelanding/2023/en/d2en01075e',
  },

    {
    id: 6,
    title: 'Microstructured Dome Array Platform',
    image: '/MICRO.png',
    summary:
      'A microstructured dome array engineered to enhance optical and interfacial interactions at the microscale. The highly ordered hemispherical architecture enables precise control of light propagation and surface interactions, providing improved performance for optical sensing and microdevice integration. Such three-dimensional microstructured platforms offer scalable design strategies for advanced sensing and optoelectronic systems.',
    paper_title:
      'A Wearable Electrochemical Biosensor for Salivary Detection of Periodontal Inflammation Biomarkers: Molecularly Imprinted Polymer Sensor with Deep Learning Integration',
    journal: 'Microsystems & Nanoengineering',
    year: '2022',
    link: 'https://www.nature.com/articles/s41378-022-00399-7',
  },


    {
    id: 7,
    title: 'Nanowire Photonic Platform for Nonlinear Optical Devices',
    image: '/SE.png',
    summary:
      'A scalable fabrication strategy for patterned thin-film arrays of selenium nanowires enabling nonlinear photonic devices. Micron-scale pixel architectures are created through controlled nanowire deposition on patterned substrates, forming ordered nanowire arrays for efficient optical interaction. The resulting structures support strong second-harmonic generation (SHG), enabling wavelength conversion and full-color laser display technologies.',
    paper_title:
      'Full-color laser displays based on optical second-harmonic generation from the thin film arrays of Selenium nanowires',
    journal: 'ACS Photonics',
    year: '2022',
    link: 'https://pubs.acs.org/doi/10.1021/acsphotonics.1c01435',
  },
  
   {
    id: 8,
    title: 'Micro/Nanopatterned MIP Filtration Platform',
    image: 'IMP.png',
    summary:
      'A rotating cylinder-assisted nanoimprint lithography technique enabling continuous fabrication of micro- and nanoscale surface architectures. The patterned structures are integrated with molecularly imprinted polymer (MIP) layers to create selective molecular recognition sites. This engineered platform enables chemisorptive filtration of target molecules such as formaldehyde, offering scalable solutions for advanced separation and environmental sensing technologies.',
    paper_title:
      'Rotating cylinder-assisted nanoimprint lithography for enhanced chemisorbable filtration complemented by molecularly imprinted polymers',
    journal: 'Small',
    year: '2021',
    link: 'https://onlinelibrary.wiley.com/doi/10.1002/smll.202105733',
  },


 
];

export default function HomeLanding() {
  return <ResearchHighlights items={highlightItems} />;
}
