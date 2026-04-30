import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'landing' });

  return (
    <>
      <a href="#main" className="skip-link">
        {t('skip_to_main')}
      </a>

      <Header locale={locale} current="home" />

      <main id="main" role="main" className="flex-1">
        <section
          aria-labelledby="hero-heading"
          className="bg-gradient-to-b from-green-50 to-white px-4 py-24 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-600">
            {t('hero_subtitle')}
          </p>
          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl"
          >
            {t('hero_title')}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">{t('hero_description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/map`}
              className="rounded-full bg-green-700 px-8 py-3 text-base font-semibold text-white shadow hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              {t('cta_map')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="rounded-full border border-green-600 px-8 py-3 text-base font-semibold text-green-600 hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              {t('cta_about')}
            </Link>
          </div>
        </section>

        <section aria-labelledby="a11y-heading" className="mx-auto max-w-5xl px-4 py-16">
          <h2 id="a11y-heading" className="mb-8 text-center text-2xl font-bold text-gray-900">
            무장애 편의 정보 · Accessibility Features
          </h2>
          <ul role="list" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: '♿', ko: '휠체어 접근', en: 'Wheelchair' },
              { icon: '👁️', ko: '시각 장애', en: 'Visual' },
              { icon: '👂', ko: '청각 장애', en: 'Hearing' },
              { icon: '🅿️', ko: '장애인 주차', en: 'Parking' },
              { icon: '🚻', ko: '장애인 화장실', en: 'Restroom' },
            ].map(({ icon, ko, en }) => (
              <li
                key={en}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm"
              >
                <span role="img" aria-hidden="true" className="text-3xl">
                  {icon}
                </span>
                <span className="text-sm font-medium text-gray-800">{ko}</span>
                <span className="text-xs text-gray-500">{en}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
