'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import type { SiteConfig } from '@/lib/config';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { useMessages } from '@/lib/i18n/useMessages';
import type { I18nRuntimeConfig } from '@/types/i18n';

interface NavigationProps {
  items: SiteConfig['navigation'];
  siteTitle: string;
  enableOnePageMode?: boolean;
  i18n: I18nRuntimeConfig;
  itemsByLocale?: Record<string, SiteConfig['navigation']>;
  siteTitleByLocale?: Record<string, string>;
}

export default function Navigation({
  items,
  siteTitle,
  enableOnePageMode,
  i18n,
  itemsByLocale,
  siteTitleByLocale,
}: NavigationProps) {
  const pathname = usePathname();
  const locale = useLocaleStore((state) => state.locale);
  const messages = useMessages();

  const effectiveItems = useMemo(() => {
    if (!i18n.enabled) return items;
    return itemsByLocale?.[locale] || itemsByLocale?.[i18n.defaultLocale] || items;
  }, [i18n.defaultLocale, i18n.enabled, items, itemsByLocale, locale]);

  const effectiveSiteTitle = useMemo(() => {
    if (!i18n.enabled) return siteTitle;
    return siteTitleByLocale?.[locale] || siteTitleByLocale?.[i18n.defaultLocale] || siteTitle;
  }, [i18n.defaultLocale, i18n.enabled, locale, siteTitle, siteTitleByLocale]);

  const isItemActive = (item: SiteConfig['navigation'][number]) => {
    if (enableOnePageMode) {
      return item.href === '/' ? pathname === '/' : pathname === item.href;
    }
    return item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  };

  const getItemHref = (item: SiteConfig['navigation'][number]) =>
    enableOnePageMode ? `/#${item.target}` : item.href;

  return (
    <Disclosure as="header" className="w-full border-b border-neutral-200 bg-white">
      {({ open }) => (
        <>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link
                href="/"
                className="shrink-0 text-3xl font-extrabold tracking-tight text-neutral-900"
              >
                {effectiveSiteTitle}
              </Link>

              <div className="hidden lg:flex items-center gap-10">
                <nav className="flex items-center gap-8">
                  {effectiveItems.map((item) => {
                    const isActive = isItemActive(item);
                    const href = getItemHref(item);

                    return (
                      <Link
                        key={item.target}
                        href={href}
                        className={cn(
                          'text-[15px] tracking-wide uppercase transition-colors duration-150',
                          isActive
                            ? 'text-neutral-900 font-medium'
                            : 'text-neutral-600 hover:text-neutral-900'
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex items-center gap-3">
                  <LanguageToggle i18n={i18n} />
                  <ThemeToggle />
                </div>
              </div>

              <div className="lg:hidden flex items-center gap-2">
                <LanguageToggle i18n={i18n} />
                <ThemeToggle />
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:bg-neutral-100">
                  <span className="sr-only">{messages.navigation.openMainMenu}</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden border-t border-neutral-200 bg-white">
            <div className="px-6 py-4 space-y-3">
              {effectiveItems.map((item) => {
                const isActive = isItemActive(item);
                const href = getItemHref(item);

                return (
                  <Disclosure.Button
                    key={item.target}
                    as={Link}
                    href={href}
                    className={cn(
                      'block text-sm uppercase tracking-wide',
                      isActive
                        ? 'text-neutral-900 font-medium'
                        : 'text-neutral-600 hover:text-neutral-900'
                    )}
                  >
                    {item.title}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
