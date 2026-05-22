import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  return { title: `${t('title')} · 모두랑 파주` };
}

const FAQ = [
  {
    category: 'booking',
    items: [
      {
        qKo: '예약은 어떻게 하나요?',
        qEn: 'How do I make a booking?',
        aKo: '홈페이지 상단의 "예약" 메뉴를 클릭하여 날짜, 인원, 접근성 요구사항을 입력한 후 가능한 차량을 선택하시면 됩니다. 예약 접수 후 운영자가 확인하면 확정 알림을 드립니다.',
        aEn: 'Click the "Book" menu at the top of the homepage, enter your date, number of passengers, and accessibility needs, then select an available vehicle. Once submitted, the operator will confirm your booking.',
      },
      {
        qKo: '예약을 취소하거나 변경할 수 있나요?',
        qEn: 'Can I cancel or change my booking?',
        aKo: '예약 확정 전에는 마이페이지에서 직접 취소하실 수 있습니다. 확정 후 취소 또는 변경은 고객센터(031-940-XXXX)로 연락 주시기 바랍니다.',
        aEn: 'You can cancel directly from My Page before the booking is confirmed. For cancellations or changes after confirmation, please contact our customer service (031-940-XXXX).',
      },
      {
        qKo: '단체 예약도 가능한가요?',
        qEn: 'Can I make a group booking?',
        aKo: '네, 가능합니다. 예약 시 "단체 예약" 옵션을 선택하시면 됩니다. 20명 이상의 단체는 운영자에게 별도 문의해 주세요.',
        aEn: 'Yes. Select the "Group Booking" option when reserving. For groups of 20 or more, please contact the operator directly.',
      },
    ],
  },
  {
    category: 'accessibility',
    items: [
      {
        qKo: '전동 휠체어도 탑승 가능한가요?',
        qEn: 'Can I board with a power wheelchair?',
        aKo: '네, 모든 차량에 경사로 또는 리프트가 설치되어 있습니다. 예약 시 전동 휠체어 사용 여부를 체크해 주시면 적합한 차량을 배정해 드립니다.',
        aEn: 'Yes, all vehicles are equipped with ramps or lifts. Please indicate power wheelchair use during booking so we can assign the most suitable vehicle.',
      },
      {
        qKo: '시각장애인 동반자가 없어도 혼자 이용할 수 있나요?',
        qEn: 'Can visually impaired travelers use the service without a companion?',
        aKo: '운전기사가 탑승 안내를 도와드립니다. 예약 시 시각 접근성 지원이 필요하다고 체크해 주시면 추가 지원을 제공합니다.',
        aEn: 'The driver will assist with boarding. Please check the visual accessibility support option when booking for additional assistance.',
      },
      {
        qKo: '유아용 카시트는 제공되나요?',
        qEn: 'Are infant car seats provided?',
        aKo: '일부 차량에 유아용 카시트가 준비되어 있습니다. 예약 시 유아 동반 여부와 연령을 기재해 주시면 알맞게 준비해 드립니다.',
        aEn: 'Some vehicles are equipped with infant car seats. Please specify the infant\'s age when booking so we can prepare appropriately.',
      },
    ],
  },
  {
    category: 'vehicle',
    items: [
      {
        qKo: '차량 내 Wi-Fi가 제공되나요?',
        qEn: 'Is Wi-Fi available on board?',
        aKo: '대형 버스(PJ-LB-01)에는 Wi-Fi가 제공됩니다. 중형 버스와 밴에는 USB 충전 포트가 설치되어 있습니다.',
        aEn: 'The large bus (PJ-LB-01) provides Wi-Fi. Mid-size coaches and the van offer USB charging ports.',
      },
      {
        qKo: '반려동물을 동반할 수 있나요?',
        qEn: 'Can I bring my pet?',
        aKo: '안내견(service dog)은 탑승 가능합니다. 그 외 반려동물은 별도의 이동장(carrier)에 넣어 탑승 가능하며, 예약 시 반드시 사전 고지해 주세요.',
        aEn: 'Service dogs are welcome. Other pets must be in a secure carrier; please disclose this when booking.',
      },
    ],
  },
  {
    category: 'account',
    items: [
      {
        qKo: '회원가입 없이도 예약할 수 있나요?',
        qEn: 'Can I book without creating an account?',
        aKo: '정식 서비스에서는 예약 확인 및 관리를 위해 회원가입이 필요합니다. 회원 가입은 이메일 주소만 있으면 무료로 가능합니다.',
        aEn: 'An account is required for booking management. Registration is free and requires only an email address.',
      },
      {
        qKo: '비밀번호를 잊어버렸어요.',
        qEn: 'I forgot my password.',
        aKo: '로그인 페이지의 "비밀번호 찾기" 링크를 클릭하면 가입 이메일로 재설정 링크를 보내드립니다.',
        aEn: 'Click the "Forgot password" link on the login page to receive a reset link at your registered email address.',
      },
    ],
  },
];

const CAT_ICONS: Record<string, string> = {
  booking: '📋',
  accessibility: '♿',
  vehicle: '🚌',
  account: '👤',
};

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'faq' });
  const ko = locale === 'ko';

  return (
    <>
      <a href="#main" className="skip-link">{t('skip_to_main')}</a>
      <Header locale={locale} current="about" />

      <main id="main" role="main" className="flex-1">
        <div className="border-b border-gray-200 bg-white px-4 py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-2 text-gray-500">{t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
          {FAQ.map((section) => (
            <section key={section.category} aria-labelledby={`faq-${section.category}`}>
              <h2
                id={`faq-${section.category}`}
                className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800"
              >
                <span aria-hidden="true">{CAT_ICONS[section.category]}</span>
                {t(`cat_${section.category}` as Parameters<typeof t>[0])}
              </h2>

              <dl className="space-y-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <dt className="mb-2 font-semibold text-gray-900">
                      Q. {ko ? item.qKo : item.qEn}
                    </dt>
                    <dd className="text-sm text-gray-600 leading-relaxed">
                      {ko ? item.aKo : item.aEn}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
