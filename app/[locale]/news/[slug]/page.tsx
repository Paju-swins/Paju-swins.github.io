import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = { params: Promise<{ locale: string; slug: string }> };

const ARTICLES = [
  {
    slug: 'launch',
    titleKo: '모두랑 파주 예약 플랫폼 정식 오픈',
    titleEn: 'Modurang Paju Booking Platform Officially Launches',
    bodyKo: `파주시 무장애 관광 예약 플랫폼 **"모두랑 파주"**가 2026년 5월 1일 정식 서비스를 시작합니다.

대형·중형 버스 및 밴 총 4대의 무장애 차량으로 운행을 시작하며, 파주시 주요 관광지를 연결하는 6개 노선을 운영합니다.

## 운영 차량

- **PJ-LB-01** 파주 대형 리무진 버스 (30석, 휠체어 4자리)
- **PJ-SB-01** 파주 중형 관광버스 1호 (15석, 휠체어 2자리)
- **PJ-SB-02** 파주 중형 관광버스 2호 (12석, 휠체어 2자리)
- **PJ-VC-01** 파주 밴 카니발 (6석, 휠체어 1자리)

## 예약 방법

홈페이지 예약 페이지에서 날짜와 인원을 선택하면 이용 가능한 차량과 노선을 확인할 수 있습니다. 예약 확정 후 운전기사가 지정 위치에서 탑승 안내를 도와드립니다.

파주시청 및 파주도시공사 관계자 여러분의 많은 관심과 이용 부탁드립니다.`,
    bodyEn: `**"Modurang Paju"**, Paju's barrier-free tourism booking platform, officially opens on May 1, 2026.

Operations begin with four accessible vehicles — including large buses, mid-size coaches, and a van — serving six routes connecting Paju's major tourist attractions.

## Fleet

- **PJ-LB-01** Paju Large Limousine Bus (30 seats, 4 wheelchair spaces)
- **PJ-SB-01** Paju Mid-Size Coach No.1 (15 seats, 2 wheelchair spaces)
- **PJ-SB-02** Paju Mid-Size Coach No.2 (12 seats, 2 wheelchair spaces)
- **PJ-VC-01** Paju Van Carnival (6 seats, 1 wheelchair space)

## How to Book

Visit the booking page, select your travel date and number of passengers, and browse available vehicles and routes. Once confirmed, your driver will meet you at the agreed pickup point.

We look forward to serving residents and visitors across Paju City.`,
    publishedAt: '2026-05-01',
    author: 'Paju Urban Development Corp.',
  },
  {
    slug: 'accessibility-features',
    titleKo: '7가지 접근성 유형으로 모든 여행자를 위한 정보 제공',
    titleEn: '7 Accessibility Types for Every Traveler',
    bodyKo: `모두랑 파주는 **7가지 접근성 유형 태그**를 제공합니다. 나에게 맞는 필터로 관광지를 찾아보세요.

## 7가지 접근성 유형

| 태그 | 설명 |
|---|---|
| ♿ 휠체어 | 전동·수동 휠체어 접근 가능 경사로·엘리베이터 완비 |
| 👁️ 시각 | 점자 블록, 음성 안내, 고대비 표시판 |
| 👂 청각 | 수화 통역, 자막 서비스, 문자 안내판 |
| 🅿️ 주차 | 장애인 전용 주차 공간 |
| 🚻 화장실 | 무장애 화장실 완비 |
| 🍼 유아 | 유모차 접근, 수유실, 어린이 시설 |
| 👴 고령자 | 단차 없는 바닥, 안전 손잡이, 저속 엘리베이터 |

## 지도 필터 사용법

지도 페이지 상단의 필터 버튼을 클릭하면 해당 접근성 유형을 갖춘 관광지만 표시됩니다. 복수 선택도 가능합니다.

더 많은 관광지 정보는 지도 페이지에서 확인하세요.`,
    bodyEn: `Modurang Paju provides **7 accessibility type tags**. Use filters to find attractions suited to your needs.

## 7 Accessibility Types

| Tag | Description |
|---|---|
| ♿ Wheelchair | Ramps and elevators for powered and manual wheelchairs |
| 👁️ Visual | Tactile blocks, audio guides, high-contrast signage |
| 👂 Hearing | Sign language interpretation, subtitles, text boards |
| 🅿️ Parking | Dedicated accessible parking spaces |
| 🚻 Restroom | Fully accessible restrooms |
| 🍼 Infant | Stroller access, nursing rooms, child facilities |
| 👴 Senior | Step-free floors, handrails, slow-speed elevators |

## Using the Map Filters

Click any filter button on the map page to show only attractions with that accessibility feature. Multiple filters can be selected at once.

Explore all accessible attractions on the map page.`,
    publishedAt: '2026-05-08',
    author: 'Paju Urban Development Corp.',
  },
  {
    slug: 'new-routes',
    titleKo: '6개 무장애 노선 신규 등록 완료',
    titleEn: '6 New Accessible Routes Added',
    bodyKo: `임진각↔DMZ, 헤이리↔프로방스 등 파주 핵심 관광지를 연결하는 **6개 무장애 노선**이 새롭게 등록되었습니다.

## 등록된 노선

| 노선 | 거리 | 소요시간 | 기준 요금 |
|---|---|---|---|
| 임진각 ↔ DMZ 평화공원 | 12 km | 25 분 | 15,000 원 |
| 헤이리 ↔ 프로방스 마을 | 8 km | 18 분 | 10,000 원 |
| 오두산 ↔ 파주출판도시 | 15 km | 30 분 | 18,000 원 |
| 문산역 ↔ 임진각 | 10 km | 20 분 | 12,000 원 |
| 파주시청 ↔ 헤이리 | 7 km | 15 분 | 9,000 원 |
| 파주출판도시 ↔ DMZ | 18 km | 35 분 | 20,000 원 |

모든 노선은 경유지 포함 완전 무장애 차량으로 운행됩니다. 시간표 페이지에서 날짜별 운행 일정을 확인하세요.

## 예약하기

노선 페이지 또는 예약 페이지에서 원하는 노선을 선택하고 예약하실 수 있습니다.`,
    bodyEn: `**Six new accessible routes** connecting Paju's key attractions are now available — including Imjingak↔DMZ and Heyri↔Provence.

## Registered Routes

| Route | Distance | Duration | Base Price |
|---|---|---|---|
| Imjingak ↔ DMZ Peace Park | 12 km | 25 min | 15,000 KRW |
| Heyri ↔ Provence Village | 8 km | 18 min | 10,000 KRW |
| Odusan ↔ Paju Book City | 15 km | 30 min | 18,000 KRW |
| Munsan Station ↔ Imjingak | 10 km | 20 min | 12,000 KRW |
| Paju City Hall ↔ Heyri | 7 km | 15 min | 9,000 KRW |
| Paju Book City ↔ DMZ | 18 km | 35 min | 20,000 KRW |

All routes operate with fully accessible vehicles including waypoints. Check the timetable page for schedules by date.

## Book Now

Select a route on the routes page or booking page to make a reservation.`,
    publishedAt: '2026-05-15',
    author: 'Paju Urban Development Corp.',
  },
];

const SLUGS = ARTICLES.map((a) => a.slug);

export async function generateStaticParams() {
  const locales = ['ko', 'en'];
  return locales.flatMap((locale) => SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  const t = await getTranslations({ locale, namespace: 'news' });
  const ko = locale === 'ko';
  return { title: `${ko ? article.titleKo : article.titleEn} · 모두랑 파주`, description: t('subtitle') };
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'news' });
  const ko = locale === 'ko';

  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const dateFmt = new Intl.DateTimeFormat(ko ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const bodyLines = (ko ? article.bodyKo : article.bodyEn).split('\n');

  return (
    <>
      <a href="#main" className="skip-link">{t('skip_to_main')}</a>
      <Header locale={locale} current="news" />

      <main id="main" role="main" className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <Link
            href={`/${locale}/news`}
            className="mb-6 inline-flex items-center gap-1 text-sm text-green-700 hover:underline focus-visible:rounded focus-visible:outline"
          >
            ← {t('back')}
          </Link>

          <article>
            <div className="mb-3 flex items-center gap-3 text-xs text-gray-400">
              <time dateTime={article.publishedAt}>
                {dateFmt.format(new Date(article.publishedAt))}
              </time>
              <span>·</span>
              <span>{article.author}</span>
            </div>

            <h1 className="mb-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              {ko ? article.titleKo : article.titleEn}
            </h1>

            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4">
              {bodyLines.map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="mt-6 text-lg font-bold text-gray-900">{line.slice(3)}</h2>;
                }
                if (line.startsWith('| ')) {
                  return null;
                }
                if (line.startsWith('|---')) {
                  return null;
                }
                if (line.trim() === '') {
                  return <div key={i} className="h-2" />;
                }
                const html = line
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^- /, '• ');
                return (
                  <p key={i} className="text-sm text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              })}
            </div>
          </article>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
