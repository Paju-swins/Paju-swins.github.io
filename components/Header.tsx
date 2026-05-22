import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

type Page = 'home' | 'map' | 'timetable' | 'book' | 'fleet' | 'routes' | 'news' | 'about' | 'login';

type Props = {
  locale: string;
  current?: Page;
};

export async function Header({ locale, current }: Props) {
  const nav = await getTranslations({ locale, namespace: 'nav' });

  const linkClass = (page: Page) =>
    current === page
      ? 'font-semibold text-green-700 focus-visible:rounded focus-visible:outline'
      : 'text-gray-600 hover:text-green-700 focus-visible:rounded focus-visible:outline transition-colors';

  const aria = (page: Page) => (current === page ? ({ 'aria-current': 'page' } as const) : {});

  return (
    <header role="banner" className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href={`/${locale}`}
          className="shrink-0 text-lg font-bold text-green-700 focus-visible:rounded focus-visible:outline"
          aria-label="모두랑 파주 홈 · Modurang Paju Home"
        >
          모두랑 파주
        </Link>

        <nav aria-label={nav('home')} className="hidden md:block">
          <ul className="flex items-center gap-5 text-sm font-medium">
            {(
              [
                ['map', '/map'],
                ['timetable', '/timetable'],
                ['book', '/book'],
                ['fleet', '/fleet'],
                ['routes', '/routes'],
                ['news', '/news'],
                ['about', '/about'],
              ] as [Page, string][]
            ).map(([page, href]) => (
              <li key={page}>
                <Link href={`/${locale}${href}`} className={linkClass(page)} {...aria(page)}>
                  {nav(page)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/login`}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${
              current === 'login'
                ? 'bg-green-700 text-white'
                : 'bg-green-700 text-white hover:bg-green-800'
            }`}
          >
            {nav('login')}
          </Link>
        </div>
      </div>
    </header>
  );
}
