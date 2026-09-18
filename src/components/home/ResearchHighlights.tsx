'use client';

import { useEffect, useState } from 'react';
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

/*
 * HomeLanding.tsx에
 * image: 'IMP.png'
 * image: '/SUPER.png'
 *
 * 처럼 /가 있거나 없어도 정상 처리
 */
function normalizeImagePath(src: string) {
  return src.startsWith('/') ? src : `/${src}`;
}

/*
 * 원본 이미지 이름
