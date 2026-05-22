import { getTranslations } from 'next-intl/server';

type Props = {
  locale: string;
};

export async function Footer({ locale }: Props) {
  const footer = await getTranslations({ locale, namespace: 'footer' });

  return (
    <footer
      role="contentinfo"
      className="border-t border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500"
    >
      <p className="mb-1">{footer('partnership')}</p>
      <p className="text-xs text-gray-400">{footer('design')}</p>
    </footer>
  );
}
