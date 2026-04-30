'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const LOCALES = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('a11y');

  function handleChange(next: string) {
    startTransition(() => {
      const segments = pathname.split('/');
      segments[1] = next;
      router.replace(segments.join('/'));
    });
  }

  return (
    <label className="flex items-center gap-1 text-sm">
      <span className="sr-only">{t('lang_select')}</span>
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isPending}
        aria-label={t('lang_select')}
        className="cursor-pointer rounded border border-gray-300 bg-white px-2 py-1 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-600"
      >
        {LOCALES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
