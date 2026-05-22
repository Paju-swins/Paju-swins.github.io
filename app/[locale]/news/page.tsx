import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  return { title: `${t('title')} · 모두랑 파주` };
}

const ARTICLES = [
  {
    slug: 'launch',
    titleKo: '모두랑 파주 예약 플랫폼 정식 오픈',
    titleEn: 'Modurang Paju Booking Platform Officially Launches',
    summaryKo: '파주시 무장애 관광 예약 플랫폼 "모두랑 파주"가 정식 서비스를 시작합니다. 대형·중형 버스 및 밴 총 4대의 무장애 차량으로 운행을 시작합니다.',
    summaryEn: "Paju's barrier-free tourism booking platform \"Modurang Paju\" officially opens, operating four accessible vehicles including large buses, mid-size coaches, and a van.",
    publishedAt: '2026-05-01',
    author: 'Paju Urban Development Corp.',
  },
  {
    slug: 'accessibility-features',
    titleKo: '7가지 접근성 유형으로 모든 여행자를 위한 정보 제공',
    titleEn: '7 Accessibility Types for Every Traveler',
    summaryKo: '모두랑 파주는 휠체어, 시각, 청각, 주차, 화장실, 유아, 고령자 등 7가지 접근성 유형 태그를 제공합니다. 나에게 맞는 필터로 관광지를 찾아보세요.',
    summaryEn: 'Modurang Paju provides 7 accessibility type tags: wheelchair, visual, hearing, parking, restroom, infant, and senior. Use filters to find attractions suited to your needs.',
    publishedAt: '2026-05-08',
    author: 'Paju Urban Development Corp.',
  },
  {
    slug: 'new-routes',
    titleKo: '6개 무장애 노선 신규 등록 완료',
    titleEn: '6 New Accessible Routes Added',
    summaryKo: '임진각↔DMZ, 헤이리↔프로방스 등 파주 핵심 관광지를 연결하는 6개 무장애 노선이 새롭게 등록되었습니다. 시간표 페이지에서 확인하세요.',
    summaryEn: "Six new accessible routes connecting Paju's key attractions — including Imjingak↔DMZ and Heyri↔Provence — are now available. Check the timetable for details.",
    publishedAt: '2026-05-15',
    author: 'Paju Urban Development Corp.',
  },
];

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'news' });
  const ko = locale === 'ko';

  const dateFmt = new Intl.DateTimeFormat(ko ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <a href="#main" className="skip-link">{t('skip_to_main')}</a>
      <Header locale={locale} current="news" />

      <main id="main" role="main" className="flex-1">
        <div className="border-b border-gray-200 bg-white px-4 py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-2 text-gray-500">{t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10">
          <ul role="list" className="space-y-6">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-2 flex items-center gap-3 text-xs text-gray-400">
                    <time dateTime={a.publishedAt}>
                      {dateFmt.format(new Date(a.publishedAt))}
                    </time>
                    <span>·</span>
                    <span>{a.author}</span>
                  </div>
                  <h2 className="mb-2 text-lg font-bold text-gray-900">
                    {ko ? a.titleKo : a.titleEn}
                  </h2>
                  <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                    {ko ? a.summaryKo : a.summaryEn}
                  </p>
                  <Link
                    href={`/${locale}/news/${a.slug}`}
                    className="text-sm font-semibold text-green-700 hover:underline focus-visible:rounded focus-visible:outline"
                  >
                    {t('read_more')} →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
