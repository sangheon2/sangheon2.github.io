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
          <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <Link
                href="/"
                className="shrink-0 text-3xl font-extrabold tracking-tight text-neutral-900"
              >
                {effectiveSiteTitle}
              </Link>

              <div className="hidden items-center gap-10 lg:flex">
                <nav className="flex items-center gap-8">
                  {effectiveItems.map((item) => {
                    const isActive = isItemActive(item);
                    const href = getItemHref(item);

                    return (
                      <Link
                        key={item.target}
                        href={href}
                        className={cn(
                          'text-[15px] uppercase tracking-wide transition-colors duration-150',
                          isActive
                            ? 'font-medium text-neutral-900'
                            : 'text-neutral-600 hover:text-neutral-900'
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100">
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

          <Disclosure.Panel className="border-t border-neutral-200 bg-white lg:hidden">
            <div className="space-y-3 px-6 py-4">
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
                        ? 'font-medium text-neutral-900'
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
