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
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `${t('title')} · 모두랑 파주`,
    description: t('subtitle'),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  const landing = await getTranslations({ locale, namespace: 'landing' });

  const isKo = locale === 'ko';

  return (
    <>
      <a href="#main" className="skip-link">
        {landing('skip_to_main')}
      </a>

      <Header locale={locale} current="about" />

      <main id="main" role="main" className="flex-1 bg-white">
        <div className="bg-gradient-to-b from-green-50 to-white px-4 pb-12 pt-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-600">
            {t('subtitle')}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t('title')}</h1>
        </div>

        <div className="mx-auto max-w-3xl px-4 pb-16">
          <section aria-labelledby="program-heading" className="mb-12">
            <h2 id="program-heading" className="mb-4 text-xl font-bold text-gray-900">
              {t('program_title')}
            </h2>
            <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm leading-relaxed text-gray-700">
              {isKo ? (
                <>
                  <p>
                    <strong>모두랑 파주 — Re:DMZ · Regeneration &amp; Relax</strong>는 파주 DMZ
                    권역을 중심으로, 휠체어 이용자·시각 장애인·청각 장애인·고령자·영유아 동반 가족
                    등 모든 방문객이 동등하게 관광을 즐길 수 있도록 무장애(Barrier-Free) 관광 정보를
                    통합 제공하는 플랫폼입니다.
                  </p>
                  <p>
                    파주시의 DMZ 접경 지역 활성화 및 관광 복지 증진을 목적으로 운영되며, VisitKorea
                    관광 데이터 및 경기도 무장애 관광 정보를 기반으로 지속 갱신됩니다.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Modurang Paju — Re:DMZ · Regeneration &amp; Relax</strong> is an
                    integrated platform providing barrier-free tourism information for the Paju DMZ
                    region, ensuring equal access for wheelchair users, visually and
                    hearing-impaired visitors, seniors, and families with young children.
                  </p>
                  <p>
                    The platform supports Paju City&apos;s initiatives to revitalize the DMZ border
                    area and improve tourism welfare, with data continuously updated from VisitKorea
                    and Gyeonggi Province barrier-free tourism sources.
                  </p>
                </>
              )}
            </div>
          </section>

          <section aria-labelledby="funding-heading" className="mb-12">
            <h2 id="funding-heading" className="mb-4 text-xl font-bold text-gray-900">
              {t('funding_title')}
            </h2>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th scope="col" className="px-4 py-3 font-semibold text-gray-700">
                      {isKo ? '구분' : 'Role'}
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-gray-700">
                      {isKo ? '기관' : 'Organization'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {isKo ? '주관 지원' : 'Primary Funder'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {isKo ? '경기도 (지원금 1억 5천만 원)' : 'Gyeonggi Province (₩150M grant)'}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {isKo ? '주관 지자체' : 'Host Municipality'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{isKo ? '파주시' : 'Paju City'}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {isKo ? '운영 기관' : 'Operating Body'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {isKo ? '파주도시관광공사' : 'Paju Urban Development & Tourism Corp.'}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {isKo ? '관광 파트너' : 'Tourism Partner'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {isKo ? '경기관광공사' : 'Gyeonggi Tourism Organization'}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {isKo ? '환경 파트너' : 'Environment Partner'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {isKo ? 'DMZ포레스트' : 'DMZ Forest'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="a11y-heading" className="mb-12">
            <h2 id="a11y-heading" className="mb-4 text-xl font-bold text-gray-900">
              {t('a11y_title')}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                {isKo
                  ? '본 플랫폼은 WCAG 2.1 AA 기준을 준수하여 모든 사용자가 동등하게 서비스를 이용할 수 있도록 설계되었습니다.'
                  : 'This platform is designed to meet WCAG 2.1 AA standards, ensuring equal access for all users.'}
              </p>
              <ul role="list" className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: '♿',
                    ko: '휠체어 접근 정보 제공',
                    en: 'Wheelchair accessibility information',
                  },
                  {
                    icon: '👁',
                    ko: '시각 장애인 보조 기기 호환',
                    en: 'Screen reader compatible',
                  },
                  {
                    icon: '👂',
                    ko: '청각 장애인 텍스트 대체 제공',
                    en: 'Text alternatives for audio content',
                  },
                  {
                    icon: '⌨️',
                    ko: '키보드만으로 완전 탐색 가능',
                    en: 'Fully keyboard navigable',
                  },
                  {
                    icon: '🎨',
                    ko: '색상 대비 AA 이상 준수',
                    en: 'Color contrast meets AA standard',
                  },
                  {
                    icon: '🌐',
                    ko: '한국어·영어 이중 언어 지원',
                    en: 'Bilingual Korean/English support',
                  },
                ].map(({ icon, ko, en }) => (
                  <li
                    key={en}
                    className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-xl">
                      {icon}
                    </span>
                    <span className="font-medium text-gray-800">{isKo ? ko : en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="data-heading" className="mb-12">
            <h2 id="data-heading" className="mb-4 text-xl font-bold text-gray-900">
              {isKo ? '데이터 출처' : 'Data Sources'}
            </h2>
            <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700">
              <p>
                {isKo
                  ? '관광지 정보는 다음 공공 데이터 출처를 기반으로 수집·가공됩니다:'
                  : 'Tourism data is collected and processed from the following public data sources:'}
              </p>
              <ul role="list" className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-green-600">
                    •
                  </span>
                  <span>
                    {isKo
                      ? 'VisitKorea 한국관광공사 TourAPI (data.go.kr)'
                      : 'VisitKorea Korea Tourism Organization TourAPI (data.go.kr)'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-green-600">
                    •
                  </span>
                  <span>
                    {isKo
                      ? '경기도 무장애 관광 정보 (GGTour Barrier-Free)'
                      : 'Gyeonggi Province Barrier-Free Tourism Information (GGTour)'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-green-600">
                    •
                  </span>
                  <span>
                    {isKo
                      ? '지도 서비스: 네이버 클라우드 플랫폼 Maps'
                      : 'Map service: Naver Cloud Platform Maps'}
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section aria-labelledby="contact-heading" className="mb-4">
            <h2 id="contact-heading" className="mb-4 text-xl font-bold text-gray-900">
              {t('contact_title')}
            </h2>
            <p className="mb-6 text-sm text-gray-700">
              {isKo
                ? '관광지 정보 오류 신고 또는 무장애 정보 추가 요청은 파주도시관광공사 또는 파주시 관광과로 문의해 주세요.'
                : 'To report incorrect information or request additions to accessibility data, please contact Paju Urban Development & Tourism Corp. or Paju City Tourism Division.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/map`}
                className="rounded-full bg-green-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                {isKo ? '지도로 탐색하기' : 'Explore the Map'}
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
