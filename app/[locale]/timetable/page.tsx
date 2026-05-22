import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'timetable' });
  return { title: `${t('title')} · 모두랑 파주` };
}

const VEHICLES = [
  { code: 'PJ-LB-01', type: 'large', nameKo: '파주 대형 리무진 버스', nameEn: 'Paju Large Bus', capacity: 30, wheelchair: 4 },
  { code: 'PJ-SB-01', type: 'mid', nameKo: '파주 중형 관광버스 1호', nameEn: 'Paju Coach No.1', capacity: 15, wheelchair: 2 },
  { code: 'PJ-SB-02', type: 'mid', nameKo: '파주 중형 관광버스 2호', nameEn: 'Paju Coach No.2', capacity: 12, wheelchair: 2 },
  { code: 'PJ-VC-01', type: 'van', nameKo: '파주 밴 카니발', nameEn: 'Paju Van Carnival', capacity: 6, wheelchair: 1 },
];

const ROUTES = [
  { id: 'r1', nameKo: '임진각 ↔ DMZ 평화공원', nameEn: 'Imjingak ↔ DMZ Peace Park', km: 12, min: 25, price: 15000 },
  { id: 'r2', nameKo: '헤이리 ↔ 프로방스 마을', nameEn: 'Heyri ↔ Provence Village', km: 8, min: 18, price: 10000 },
  { id: 'r3', nameKo: '오두산 ↔ 파주출판도시', nameEn: 'Odusan ↔ Paju Book City', km: 15, min: 30, price: 18000 },
  { id: 'r4', nameKo: '문산역 ↔ 임진각', nameEn: 'Munsan Station ↔ Imjingak', km: 10, min: 20, price: 12000 },
  { id: 'r5', nameKo: '파주시청 ↔ 헤이리', nameEn: 'Paju City Hall ↔ Heyri', km: 7, min: 15, price: 9000 },
  { id: 'r6', nameKo: '파주출판도시 ↔ DMZ', nameEn: 'Paju Book City ↔ DMZ', km: 18, min: 35, price: 20000 },
];

function next14Days() {
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
}

export default async function TimetablePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'timetable' });
  const ko = locale === 'ko';
  const days = next14Days();
  const today = days[0]!;

  const weekdayFmt = new Intl.DateTimeFormat(ko ? 'ko-KR' : 'en-US', { weekday: 'short' });
  const monthDayFmt = new Intl.DateTimeFormat(ko ? 'ko-KR' : 'en-US', { month: 'short', day: 'numeric' });

  return (
    <>
      <a href="#main" className="skip-link">{t('skip_to_main')}</a>
      <Header locale={locale} current="timetable" />

      <main id="main" role="main" className="flex-1">
        <div className="border-b border-gray-200 bg-white px-4 py-6">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
          </div>
        </div>

        {/* Date strip */}
        <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
          <div className="mx-auto max-w-5xl overflow-x-auto">
            <div className="flex gap-2 pb-1">
              {days.map((d, i) => (
                <div
                  key={i}
                  className={`shrink-0 rounded-xl border px-4 py-2 text-center text-sm ${
                    i === 0
                      ? 'border-green-700 bg-green-700 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-green-500'
                  }`}
                >
                  <div className="text-xs opacity-70">{weekdayFmt.format(d)}</div>
                  <div className="font-semibold">{monthDayFmt.format(d)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 space-y-10">
          {/* Available vehicles */}
          <section aria-labelledby="vehicles-heading">
            <h2 id="vehicles-heading" className="mb-4 text-lg font-semibold text-gray-800">
              {t('available_title')} — {monthDayFmt.format(today)}
            </h2>
            <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {VEHICLES.map((v) => (
                <li key={v.code} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                      {t('available_badge')}
                    </span>
                    <span className="font-mono text-xs text-gray-400">{v.code}</span>
                  </div>
                  <h3 className="my-2 font-semibold text-gray-900 text-sm">
                    {ko ? v.nameKo : v.nameEn}
                  </h3>
                  <div className="mb-3 flex gap-3 text-xs text-gray-500">
                    <span>💺 {v.capacity} {t('seats')}</span>
                    <span>♿ {v.wheelchair} {t('wheelchair_slots')}</span>
                  </div>
                  <Link
                    href={`/${locale}/book`}
                    className="block w-full rounded-lg bg-green-700 py-2 text-center text-xs font-semibold text-white hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                  >
                    {t('book_this')}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Routes */}
          <section aria-labelledby="routes-heading">
            <h2 id="routes-heading" className="mb-4 text-lg font-semibold text-gray-800">
              {t('routes_title')}
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-medium text-gray-700">{ko ? '노선' : 'Route'}</th>
                    <th scope="col" className="px-4 py-3 text-left font-medium text-gray-700">{t('duration')}</th>
                    <th scope="col" className="px-4 py-3 text-left font-medium text-gray-700">{t('distance')}</th>
                    <th scope="col" className="px-4 py-3 text-left font-medium text-gray-700">{t('base_price')}</th>
                    <th scope="col" className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ROUTES.map((r) => (
                    <tr key={r.id}>
                      <td className="px-4 py-3 font-medium text-gray-900">{ko ? r.nameKo : r.nameEn}</td>
                      <td className="px-4 py-3 text-gray-500">{r.min} {t('min')}</td>
                      <td className="px-4 py-3 text-gray-500">{r.km} {t('km')}</td>
                      <td className="px-4 py-3 text-gray-500">{r.price.toLocaleString()}{ko ? '원' : ' KRW'}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/${locale}/book`}
                          className="rounded-lg bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 hover:bg-green-200"
                        >
                          {t('book_this')}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
