import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fleet' });
  return { title: `${t('title')} · 모두랑 파주` };
}

const VEHICLES = [
  {
    code: 'PJ-LB-01',
    type: 'large',
    nameKo: '파주 대형 리무진 버스',
    nameEn: 'Paju Large Limousine Bus',
    capacity: 30,
    wheelchair: 4,
    amenities: ['wifi', 'usb', 'ramp', 'lift', 'aircon', 'belt'],
    emoji: '🚌',
  },
  {
    code: 'PJ-SB-01',
    type: 'mid',
    nameKo: '파주 중형 관광버스 1호',
    nameEn: 'Paju Mid-Size Coach No.1',
    capacity: 15,
    wheelchair: 2,
    amenities: ['ramp', 'aircon', 'usb', 'belt'],
    emoji: '🚐',
  },
  {
    code: 'PJ-SB-02',
    type: 'mid',
    nameKo: '파주 중형 관광버스 2호',
    nameEn: 'Paju Mid-Size Coach No.2',
    capacity: 12,
    wheelchair: 2,
    amenities: ['ramp', 'aircon', 'belt'],
    emoji: '🚐',
  },
  {
    code: 'PJ-VC-01',
    type: 'van',
    nameKo: '파주 밴 카니발',
    nameEn: 'Paju Van Carnival',
    capacity: 6,
    wheelchair: 1,
    amenities: ['ramp', 'aircon', 'usb'],
    emoji: '🚙',
  },
];

const AMENITY_ICONS: Record<string, string> = {
  wifi: '📶',
  usb: '🔌',
  ramp: '♿',
  lift: '🛗',
  aircon: '❄️',
  belt: '🔒',
};

export default async function FleetPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'fleet' });
  const ko = locale === 'ko';

  const typeLabel = (type: string) => {
    if (type === 'large') return ko ? '대형 버스' : 'Large Bus';
    if (type === 'mid') return ko ? '중형 버스' : 'Mid-Size Bus';
    return ko ? '밴' : 'Van';
  };

  return (
    <>
      <a href="#main" className="skip-link">{t('skip_to_main')}</a>
      <Header locale={locale} current="fleet" />

      <main id="main" role="main" className="flex-1">
        <div className="border-b border-gray-200 bg-white px-4 py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-2 text-gray-500">{t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-10">
          <ul role="list" className="grid gap-6 sm:grid-cols-2">
            {VEHICLES.map((v) => (
              <li key={v.code} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <span className="mb-1 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                      {typeLabel(v.type)}
                    </span>
                    <h2 className="mt-1 text-lg font-bold text-gray-900">
                      <span aria-hidden="true" className="mr-2">{v.emoji}</span>
                      {ko ? v.nameKo : v.nameEn}
                    </h2>
                    <p className="font-mono text-xs text-gray-400">{v.code}</p>
                  </div>
                  <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    {t('status_active')}
                  </span>
                </div>

                <div className="mb-4 flex gap-6 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">{t('capacity')}</p>
                    <p className="font-semibold text-gray-900">{v.capacity}{ko ? '석' : ' seats'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t('wheelchair_slots')}</p>
                    <p className="font-semibold text-gray-900">{v.wheelchair}{ko ? '자리' : ' slots'}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="mb-2 text-xs text-gray-500">{t('amenities')}</p>
                  <div className="flex flex-wrap gap-2">
                    {v.amenities.map((a) => (
                      <span key={a} className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                        {AMENITY_ICONS[a]} {t(`amenity_${a}` as Parameters<typeof t>[0])}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/${locale}/book`}
                  className="block w-full rounded-xl bg-green-700 py-2.5 text-center text-sm font-semibold text-white hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                >
                  {t('book_this')}
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
