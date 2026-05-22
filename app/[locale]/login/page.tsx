import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: `${t('login_title')} · 모두랑 파주` };
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'auth' });

  return (
    <>
      <a href="#main" className="skip-link">{t('skip_to_main')}</a>
      <Header locale={locale} current="login" />

      <main id="main" role="main" className="flex-1">
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm">
            <div className="mb-8 text-center">
              <span className="text-4xl" aria-hidden="true">♿</span>
              <h1 className="mt-3 text-2xl font-bold text-gray-900">{t('login_title')}</h1>
              <p className="mt-1 text-sm text-gray-500">모두랑 파주 · Re:DMZ</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <form aria-label={t('login_title')}>
                <div className="mb-4">
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    {t('login_email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="user@example.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                    {t('login_password')}
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-green-700 py-2.5 text-sm font-semibold text-white hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-700"
                >
                  {t('login_submit')}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-gray-500">
                {t('login_no_account')}{' '}
                <Link href={`/${locale}/login`} className="font-semibold text-green-700 hover:underline">
                  {t('login_signup')}
                </Link>
              </p>
            </div>

            <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-xs text-yellow-800 text-center">
              ⚠️ {t('login_demo')}
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
