import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Explicit static imports — required for Vercel bundling
const messageLoaders = {
  en: () => import('../../messages/en.json'),
  fr: () => import('../../messages/fr.json'),
  de: () => import('../../messages/de.json'),
  ru: () => import('../../messages/ru.json'),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'en' | 'fr' | 'de' | 'ru')) {
    locale = routing.defaultLocale;
  }

  const loader = messageLoaders[locale as keyof typeof messageLoaders];
  const messages = (await loader()).default;

  return { locale, messages };
});
