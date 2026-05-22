import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'routes' });
  return { title: `${t('title')} · 모두랑 파주` };
}

const ROUTES = [
  {
    id: 'r1',
    nameKo: '임진각 ↔ DMZ 평화공원',
    nameEn: 'Imjingak ↔ DMZ Peace Park',
    originKo: '임진각',
    originEn: 'Imjingak',
    destKo: 'DMZ 평화공원',
    destEn: 'DMZ Peace Park',
    km: 12,
    min: 25,
    price: 15000,
    waypointsKo: ['도라산역', '도라전망대'],
    waypointsEn: ['Dorasan Station', 'Dora Observatory'],
  },
  {
    id: 'r2',
    nameKo: '헤이리 ↔ 프로방스 마을',
    nameEn: 'Heyri ↔ Provence Village',
    originKo: '헤이리 예술마을',
    originEn: 'Heyri Art Valley',
    destKo: '프로방스 마을',
    destEn: 'Provence Village',
    km: 8,
    min: 18,
    price: 10000,
    waypointsKo: [],
    waypointsEn: [],
  },
  {
    id: 'r3',
    nameKo: '오두산 ↔ 파주출판도시',
    nameEn: 'Odusan ↔ Paju Book City',
    originKo: '오두산 통일전망대',
    originEn: 'Odusan Observatory',
    destKo: '파주출판도시',
    destEn: 'Paju Book City',
    km: 15,
    min: 30,
    price: 18000,
    waypointsKo: ['지혜의숲'],
    waypointsEn: ['Forest of Wisdom'],
  },
  {
    id: 'r4',
    nameKo: '문산역 ↔ 임진각',
    nameEn: 'Munsan Station ↔ Imjingak',
    originKo: '문산역',
    originEn: 'Munsan Station',
    destKo: '임진각',
    destEn: 'Imjingak',
    km: 10,
    min: 20,
    price: 12000,
    waypointsKo: [],
    waypointsEn: [],
  },
  {
    id: 'r5',
    nameKo: '파주시청 ↔ 헤이리',
    nameEn: 'Paju City Hall ↔ Heyri',
    originKo: '파주시청',
    originEn: 'Paju City Hall',
    destKo: '헤이리 예술마을',
    destEn: 'Heyri Art Valley',
    km: 7,
    min: 15,
    price: 9000,
    waypointsKo: [],
    waypointsEn: [],
  },
  {
    id: 'r6',
    nameKo: '파주출판도시 ↔ DMZ',
    nameEn: 'Paju Book City ↔ DMZ',
    originKo: '파주출판도시',
    originEn: 'Paju Book City',
    destKo: 'DMZ 평화공원',
    destEn: 'DMZ Peace Park',
    km: 18,
    min: 35,
    price: 20000,
    waypointsKo: ['헤이리 예술마을', '임진각'],
    waypointsEn: ['Heyri Art Valley', 'Imjingak'],
  },
];

export default async function RoutesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'routes' });
  const ko = locale === 'ko';

  return (
    <>
      <a href="#main" className="skip-link">{t('skip_to_main')}</a>
      <Header locale={locale} current="routes" />

      <main id="main" role="main" className="flex-1">
        <div className="border-b border-gray-200 bg-white px-4 py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-2 text-gray-500">{t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-10">
          <ul role="list" className="grid gap-6 sm:grid-cols-2">
            {ROUTES.map((r) => (
              <li key={r.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-base font-bold text-gray-900">
                  🗺️ {ko ? r.nameKo : r.nameEn}
                </h2>

                <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                  <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                    {t('origin')}
                  </span>
                  {ko ? r.originKo : r.originEn}
                  <span className="text-gray-400">→</span>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {t('destination')}
                  </span>
                  {ko ? r.destKo : r.destEn}
                </div>

                {(ko ? r.waypointsKo : r.waypointsEn).length > 0 && (
                  <p className="mb-3 text-xs text-gray-400">
                    ● {(ko ? r.waypointsKo : r.waypointsEn).join(' · ')}
                  </p>
                )}

                <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>🕐 {r.min} {t('min')}</span>
                  <span>📍 {r.km} {t('km')}</span>
                  <span>💰 {r.price.toLocaleString()}{ko ? '원~' : ' KRW~'}</span>
                </div>

                <Link
                  href={`/${locale}/book`}
                  className="block w-full rounded-xl border border-green-700 py-2 text-center text-sm font-semibold text-green-700 hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                >
                  {t('book_this_route')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
