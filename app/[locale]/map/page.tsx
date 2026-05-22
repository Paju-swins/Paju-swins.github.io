import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'map_page' });
  return { title: `${t('title')} · 모두랑 파주` };
}

const POIS = [
  { code: 'POI-IMJ', nameKo: '임진각 평화누리공원', nameEn: 'Imjingak Peace Park', tags: ['♿', '🅿️', '🚻'] },
  { code: 'POI-DRSN', nameKo: '도라산역', nameEn: 'Dorasan Station', tags: ['♿', '🚻', '👁️'] },
  { code: 'POI-DORA', nameKo: '도라전망대', nameEn: 'Dora Observatory', tags: ['♿', '🅿️'] },
  { code: 'POI-ODUS', nameKo: '오두산 통일전망대', nameEn: 'Odusan Observatory', tags: ['♿', '🚻', '♿'] },
  { code: 'POI-HEYR', nameKo: '헤이리 예술마을', nameEn: 'Heyri Art Valley', tags: ['♿', '🍼'] },
  { code: 'POI-WISD', nameKo: '지혜의숲', nameEn: 'Forest of Wisdom', tags: ['♿', '🚻', '🍼'] },
  { code: 'POI-PBKC', nameKo: '파주출판도시', nameEn: 'Paju Book City', tags: ['♿', '🅿️'] },
  { code: 'POI-PPOU', nameKo: '파주 프리미엄 아울렛', nameEn: 'Paju Premium Outlets', tags: ['♿', '🚻', '🍼', '🅿️'] },
  { code: 'POI-PROV', nameKo: '프로방스 마을', nameEn: 'Provence Village', tags: ['♿'] },
  { code: 'POI-MJLK', nameKo: '마장호수 출렁다리', nameEn: 'Majang Lake Bridge', tags: ['♿'] },
  { code: 'POI-PMRC', nameKo: '파주 시립 미술관', nameEn: 'Paju Art Museum', tags: ['♿', '🚻', '👁️'] },
  { code: 'POI-VLY1', nameKo: '율곡습지공원', nameEn: 'Yulgok Wetland Park', tags: ['♿'] },
  { code: 'POI-PYRT', nameKo: '평화누리길 파주 구간', nameEn: 'Peace Trail Paju', tags: ['♿', '👴'] },
  { code: 'POI-RIDA', nameKo: '리닥파크', nameEn: 'Rida Park', tags: ['♿', '🅿️', '🚻'] },
];

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'map_page' });
  const landing = await getTranslations({ locale, namespace: 'landing' });
  const ko = locale === 'ko';

  return (
    <>
      <a href="#main" className="skip-link">
        {t('skip_to_main')}
      </a>

      <Header locale={locale} current="map" />

      <main id="main" role="main" className="flex-1">
        <div className="border-b border-gray-200 bg-white px-4 py-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-6">
          {/* Accessibility filter chips */}
          <div aria-label={t('filter_title')} className="mb-4 flex flex-wrap gap-2">
            {[
              ['♿', t('filter_wheelchair')],
              ['👁️', t('filter_blind')],
              ['👂', t('filter_deaf')],
              ['🅿️', t('filter_parking')],
              ['🚻', t('filter_restroom')],
              ['🍼', t('filter_infant')],
              ['👴', t('filter_senior')],
            ].map(([icon, label]) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
              >
                {icon} {label}
              </span>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Map embed */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <iframe
                title={ko ? '파주 무장애 관광지 지도' : 'Paju Accessible Attractions Map'}
                src="https://www.openstreetmap.org/export/embed.html?bbox=126.62%2C37.72%2C126.90%2C37.96&layer=mapnik"
                className="h-[480px] w-full"
                loading="lazy"
              />
              <div className="border-t border-gray-100 bg-gray-50 px-3 py-2 text-right text-xs text-gray-400">
                © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a> contributors
              </div>
            </div>

            {/* POI list */}
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                {t('poi_list_title')} ({POIS.length})
              </h2>
              <ul role="list" className="space-y-2 overflow-y-auto" style={{ maxHeight: '520px' }}>
                {POIS.map((poi) => (
                  <li
                    key={poi.code}
                    className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm hover:border-green-200 hover:bg-green-50 transition-colors"
                  >
                    <p className="mb-1 font-medium text-gray-900 text-sm">
                      {ko ? poi.nameKo : poi.nameEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex gap-1 text-base">{poi.tags.map((t, i) => <span key={i} aria-hidden="true">{t}</span>)}</span>
                      <span className="font-mono text-xs text-gray-400">{poi.code}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
