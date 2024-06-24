import { type TSupportedInternalLocale, type TSupportedPublicLocale } from "./Store/Locale/Model/TSupportedLocale";

const localeChangeAction = (locale: TSupportedInternalLocale) => ({
  type: "@LOCALE/CHANGE",
  payload: { locale } as const,
});

const publicLocaleChangeAction = (locale: TSupportedPublicLocale) => ({
  type: "@PUBLIC_LOCALE/CHANGE",
  payload: { locale } as const,
});

export { localeChangeAction, publicLocaleChangeAction };
