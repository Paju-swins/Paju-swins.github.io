import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'book' });
  return { title: `${t('title')} · 모두랑 파주` };
}

const VEHICLES = [
  { code: 'PJ-LB-01', type: 'large', nameKo: '파주 대형 리무진 버스', nameEn: 'Paju Large Bus', capacity: 30, wheelchair: 4, priceFrom: 15000 },
  { code: 'PJ-SB-01', type: 'mid', nameKo: '파주 중형 관광버스 1호', nameEn: 'Paju Coach No.1', capacity: 15, wheelchair: 2, priceFrom: 10000 },
  { code: 'PJ-SB-02', type: 'mid', nameKo: '파주 중형 관광버스 2호', nameEn: 'Paju Coach No.2', capacity: 12, wheelchair: 2, priceFrom: 10000 },
  { code: 'PJ-VC-01', type: 'van', nameKo: '파주 밴 카니발', nameEn: 'Paju Van Carnival', capacity: 6, wheelchair: 1, priceFrom: 9000 },
];

export default async function BookPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'book' });
  const ko = locale === 'ko';

  const today = new Date().toISOString().slice(0, 10);

  const typeLabel = (type: string) => {
    if (type === 'large') return ko ? '대형 버스' : 'Large Bus';
    if (type === 'mid') return ko ? '중형 버스' : 'Mid-Size Bus';
    return ko ? '밴' : 'Van';
  };

  return (
    <>
      <a href="#main" className="skip-link">{t('skip_to_main')}</a>
      <Header locale={locale} current="book" />

      <main id="main" role="main" className="flex-1">
        <div className="border-b border-gray-200 bg-white px-4 py-8">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
          </div>
        </div>

        {/* Demo notice */}
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <p className="mx-auto max-w-5xl text-center text-sm text-yellow-800">
            ⚠️ {t('demo_notice')}
          </p>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8">
          {/* Search form */}
          <form
            aria-label={ko ? '차량 검색' : 'Vehicle search'}
            className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="date" className="mb-1 block text-xs font-medium text-gray-700">
                  {t('search_date')}
                </label>
                <input
                  id="date"
                  type="date"
                  defaultValue={today}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                />
              </div>
              <div>
                <label htmlFor="passengers" className="mb-1 block text-xs font-medium text-gray-700">
                  {t('search_passengers')}
                </label>
                <input
                  id="passengers"
                  type="number"
                  defaultValue={4}
                  min={1}
                  max={30}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                />
              </div>
              <div>
                <label htmlFor="wheelchair" className="mb-1 block text-xs font-medium text-gray-700">
                  {t('search_wheelchair')}
                </label>
                <input
                  id="wheelchair"
                  type="number"
                  defaultValue={0}
                  min={0}
                  max={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                />
              </div>
              <div>
                <label htmlFor="type" className="mb-1 block text-xs font-medium text-gray-700">
                  {t('search_type')}
                </label>
                <select
                  id="type"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                >
                  <option value="">{t('search_all_types')}</option>
                  <option value="large">{t('type_large')}</option>
                  <option value="mid">{t('type_mid')}</option>
                  <option value="van">{t('type_van')}</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex gap-4 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="trip" defaultChecked className="accent-green-700" />
                  {t('search_one_way')}
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="trip" className="accent-green-700" />
                  {t('search_round_trip')}
                </label>
              </div>
              <button
                type="submit"
                className="ml-auto rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
              >
                {t('search_submit')}
              </button>
            </div>
          </form>

          {/* Results */}
          <h2 className="mb-4 text-lg font-semibold text-gray-800">{t('results_title')}</h2>
          <ul role="list" className="space-y-4">
            {VEHICLES.map((v) => (
              <li key={v.code} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-green-300 transition-colors">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        {typeLabel(v.type)}
                      </span>
                      <span className="font-mono text-xs text-gray-400">{v.code}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{ko ? v.nameKo : v.nameEn}</h3>
                    <div className="mt-1 flex gap-4 text-sm text-gray-500">
                      <span>💺 {v.capacity} {t('results_seats')}</span>
                      <span>♿ {v.wheelchair} {t('results_wheelchair')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{ko ? '기준 요금부터' : 'from'}</p>
                      <p className="text-lg font-bold text-green-700">
                        {v.priceFrom.toLocaleString()}{ko ? '원' : ' KRW'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-xl bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                      aria-label={`${ko ? v.nameKo : v.nameEn} ${t('book_this')}`}
                    >
                      {t('book_this')}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
