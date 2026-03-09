import { getConfig } from '@/lib/config';
import { getMarkdownContent, getTomlContent } from '@/lib/content';
import HomePageClient, {
  type HomePageLocaleData,
} from '@/components/home/HomePageClient';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import { Publication } from '@/types/publication';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: { date: string; content: string }[];
}

interface AboutConfig {
  title: string;
  type: 'about';
  profile?: { research_interests?: string[] };
  sections?: SectionConfig[];
}

function loadAboutDataForLocale(locale: string | undefined): HomePageLocaleData {
  const localeConfig = getConfig(locale);
  const aboutConfig =
    getTomlContent<AboutConfig>('about.toml', locale) || ({} as AboutConfig);

  const sections =
    aboutConfig.sections?.map((section) => {
      if (section.type === 'markdown') {
        return {
          ...section,
          content: section.source
            ? getMarkdownContent(section.source, locale)
            : '',
        };
      }
      return section;
    }) || [];

  return {
    author: localeConfig.author,
    social: localeConfig.social,
    features: localeConfig.features,
    enableOnePageMode: false,
    researchInterests: aboutConfig.profile?.research_interests,
    pagesToShow: [
      {
        type: 'about',
        id: 'about',
        sections,
      },
    ],
  };
}

export default function AboutPage() {
  const baseConfig = getConfig();
  const runtimeI18n = getRuntimeI18nConfig(baseConfig.i18n);
  const targetLocales = runtimeI18n.enabled
    ? runtimeI18n.locales
    : [runtimeI18n.defaultLocale];

  const dataByLocale: Record<string, HomePageLocaleData> = {};

  for (const locale of targetLocales) {
    dataByLocale[locale] = loadAboutDataForLocale(locale);
  }

  if (!dataByLocale[runtimeI18n.defaultLocale]) {
    dataByLocale[runtimeI18n.defaultLocale] = loadAboutDataForLocale(undefined);
  }

  return (
    <HomePageClient
      dataByLocale={dataByLocale}
      defaultLocale={runtimeI18n.defaultLocale}
    />
  );
}
