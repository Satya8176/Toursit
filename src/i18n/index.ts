import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en.json';
import hiTranslation from './locales/hi.json';
import mrTranslation from './locales/mr.json';
import guTranslation from './locales/gu.json';
import bnTranslation from './locales/bn.json';
import taTranslation from './locales/ta.json';
import teTranslation from './locales/te.json';
import knTranslation from './locales/kn.json';
import mlTranslation from './locales/ml.json';
import paTranslation from './locales/pa.json';
import asTranslation from './locales/as.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
      mr: { translation: mrTranslation },
      gu: { translation: guTranslation },
      bn: { translation: bnTranslation },
      ta: { translation: taTranslation },
      te: { translation: teTranslation },
      kn: { translation: knTranslation },
      ml: { translation: mlTranslation },
      pa: { translation: paTranslation },
      as: { translation: asTranslation },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;