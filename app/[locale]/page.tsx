import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

const VEHICLES = [
  { code: 'PJ-LB-01', type: 'large', nameKo: '파주 대형 리무진 버스', nameEn: 'Paju Large Bus', capacity: 30, wheelchair: 4, amenities: ['ramp', 'lift', 'aircon', 'wifi', 'usb'] },
  { code: 'PJ-SB-01', type: 'mid', nameKo: '파주 중형 관광버스 1호', nameEn: 'Paju Mid-Size Coach No.1', capacity: 15, wheelchair: 2, amenities: ['ramp', 'aircon', 'usb'] },
  { code: 'PJ-VC-01', type: 'van', nameKo: '파주 밴 카니발', nameEn: 'Paju Van Carnival', capacity: 6, wheelchair: 1, amenities: ['ramp', 'aircon'] },
];

const ROUTES = [
  { id: 'r1', nameKo: '임진각 ↔ DMZ 평화공원', nameEn: 'Imjingak ↔ DMZ Peace Park', km: 12, min: 25, price: 15000 },
  { id: 'r2', nameKo: '헤이리 ↔ 프로방스 마을', nameEn: 'Heyri ↔ Provence Village', km: 8, min: 18, price: 10000 },
  { id: 'r3', nameKo: '오두산 ↔ 파주출판도시', nameEn: 'Odusan ↔ Paju Book City', km: 15, min: 30, price: 18000 },
];

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'landing' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const ko = locale === 'ko';

  return (
    <>
      <a href="#main" className="skip-link">
        {t('skip_to_main')}
      </a>

      <Header locale={locale} current="home" />

      <main id="main" role="main" className="flex-1">
        {/* Hero */}
        <section
          aria-labelledby="hero-heading"
          className="bg-gradient-to-b from-green-700 to-green-600 px-4 py-24 text-center text-white"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest opacity-80">
            {t('hero_subtitle')}
          </p>
          <h1 id="hero-heading" className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl">
            {t('hero_title')}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg opacity-90">{t('hero_description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/book`}
              className="rounded-full bg-white px-8 py-3 text-base font-semibold text-green-700 shadow hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('cta_book')}
            </Link>
            <Link
              href={`/${locale}/map`}
              className="rounded-full border border-white px-8 py-3 text-base font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('cta_map')}
            </Link>
          </div>
        </section>

        {/* Accessibility features */}
        <section aria-labelledby="a11y-heading" className="mx-auto max-w-5xl px-4 py-16">
          <h2 id="a11y-heading" className="mb-8 text-center text-2xl font-bold text-gray-900">
            {t('features_title')}
          </h2>
          <ul role="list" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {[
              { icon: '♿', ko: '휠체어', en: 'Wheelchair' },
              { icon: '👁️', ko: '시각', en: 'Visual' },
              { icon: '👂', ko: '청각', en: 'Hearing' },
              { icon: '🅿️', ko: '장애인 주차', en: 'Parking' },
              { icon: '🚻', ko: '장애인 화장실', en: 'Restroom' },
              { icon: '🍼', ko: '유아 동반', en: 'Infant' },
              { icon: '👴', ko: '고령자', en: 'Senior' },
            ].map(({ icon, ko: koLabel, en: enLabel }) => (
              <li
                key={enLabel}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm"
              >
                <span role="img" aria-hidden="true" className="text-3xl">{icon}</span>
                <span className="text-xs font-medium text-gray-700">{ko ? koLabel : enLabel}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-heading" className="bg-gray-50 px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 id="how-heading" className="mb-10 text-center text-2xl font-bold text-gray-900">
              {t('how_title')}
            </h2>
            <ol role="list" className="grid gap-6 sm:grid-cols-3">
              {[
                { num: 1, title: t('step1_title'), desc: t('step1_desc'), icon: '🔍' },
                { num: 2, title: t('step2_title'), desc: t('step2_desc'), icon: '📋' },
                { num: 3, title: t('step3_title'), desc: t('step3_desc'), icon: '🚌' },
              ].map(({ num, title, desc, icon }) => (
                <li key={num} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                      {num}
                    </span>
                    <span className="text-2xl">{icon}</span>
                  </div>
                  <h3 className="mb-1 font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Featured fleet */}
        <section aria-labelledby="fleet-heading" className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 id="fleet-heading" className="text-2xl font-bold text-gray-900">
              {t('fleet_title')}
            </h2>
            <Link
              href={`/${locale}/fleet`}
              className="text-sm font-semibold text-green-700 hover:underline focus-visible:rounded focus-visible:outline"
            >
              {t('view_all_fleet')} →
            </Link>
          </div>
          <ul role="list" className="grid gap-4 sm:grid-cols-3">
            {VEHICLES.map((v) => (
              <li key={v.code} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                    {locale === 'ko'
                      ? v.type === 'large' ? '대형 버스' : v.type === 'mid' ? '중형 버스' : '밴'
                      : v.type === 'large' ? 'Large Bus' : v.type === 'mid' ? 'Mid Bus' : 'Van'}
                  </span>
                  <span className="font-mono text-xs text-gray-400">{v.code}</span>
                </div>
                <h3 className="mb-3 font-semibold text-gray-900">
                  {ko ? v.nameKo : v.nameEn}
                </h3>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>💺 {v.capacity}{ko ? '석' : ' seats'}</span>
                  <span>♿ {v.wheelchair}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Featured routes */}
        <section aria-labelledby="routes-heading" className="bg-green-50 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 id="routes-heading" className="text-2xl font-bold text-gray-900">
                {t('routes_title')}
              </h2>
              <Link
                href={`/${locale}/routes`}
                className="text-sm font-semibold text-green-700 hover:underline focus-visible:rounded focus-visible:outline"
              >
                {t('view_all_routes')} →
              </Link>
            </div>
            <ul role="list" className="grid gap-4 sm:grid-cols-3">
              {ROUTES.map((r) => (
                <li key={r.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    {ko ? r.nameKo : r.nameEn}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <span>🕐 {r.min}{ko ? '분' : 'min'}</span>
                    <span>📍 {r.km}km</span>
                    <span>💰 {r.price.toLocaleString()}{ko ? '원~' : ' KRW~'}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            {ko ? '지금 바로 예약하세요' : 'Ready to book?'}
          </h2>
          <p className="mx-auto mb-8 max-w-md text-gray-500">
            {ko
              ? '무장애 차량으로 파주 DMZ 권역을 편리하게 여행하세요.'
              : 'Travel the Paju DMZ region comfortably with our accessible vehicles.'}
          </p>
          <Link
            href={`/${locale}/book`}
            className="inline-block rounded-full bg-green-700 px-10 py-3.5 font-semibold text-white shadow hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            {t('cta_book')}
          </Link>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
