import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'map_placeholder' });
  return {
    title: `${t('title')} · 모두랑 파주`,
  };
}

export default async function MapPlaceholderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'map_placeholder' });
  const landing = await getTranslations({ locale, namespace: 'landing' });

  return (
    <>
      <a href="#main" className="skip-link">
        {landing('skip_to_main')}
      </a>

      <Header locale={locale} current="map" />

      <main id="main" role="main" className="flex flex-1 items-center bg-white px-4 py-24">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center">
          <span aria-hidden="true" className="mb-4 block text-5xl">
            🗺️
          </span>
          <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
          <p className="mb-8 text-sm leading-relaxed text-gray-600">{t('body')}</p>
          <Link
            href={`/${locale}`}
            className="inline-block rounded-full bg-green-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            {t('back')}
          </Link>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
