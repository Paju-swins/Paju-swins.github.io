import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

type Props = {
  locale: string;
  current?: 'home' | 'map' | 'about';
};

export async function Header({ locale, current }: Props) {
  const nav = await getTranslations({ locale, namespace: 'nav' });

  const linkClass = (page: 'map' | 'about') =>
    current === page
      ? 'font-semibold text-green-700 focus-visible:rounded focus-visible:outline'
      : 'hover:text-green-700 focus-visible:rounded focus-visible:outline';

  const linkAria = (page: 'map' | 'about') =>
    current === page ? ({ 'aria-current': 'page' } as const) : {};

  return (
    <header role="banner" className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href={`/${locale}`}
          className="text-lg font-bold text-green-700 focus-visible:rounded focus-visible:outline"
          aria-label="모두랑 파주 홈 · Modurang Paju Home"
        >
          모두랑 파주
        </Link>

        <nav aria-label={nav('home')}>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href={`/${locale}/map`} className={linkClass('map')} {...linkAria('map')}>
                {nav('map')}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/about`} className={linkClass('about')} {...linkAria('about')}>
                {nav('about')}
              </Link>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
