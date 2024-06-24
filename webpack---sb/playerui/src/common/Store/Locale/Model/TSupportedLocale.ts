import { ELocale, isString, reverseMap } from "@sb/utils";
import { keys } from "@sb/utils/Keys";

type TSupportedPublicLocale =
  "en-us" |
  "tr-tr" |
  "el-el" |
  "es-es" |
  "pt-pt" |
  "ar-ar" |
  "it-it" |
  "fr-fr" |
  "ru-ru" |
  "hi-in"

// Common Locale Map
const BASE_INTERNAL_LOCALES_TO_NAME_MAP = {
  [ELocale.en_US]: "English",
  [ELocale.tr_TR]: "Türkçe",
  [ELocale.el_EL]: "Eλληνικά",
  [ELocale.es_ES]: "Española",
  [ELocale.pt_PT]: "Português",
  [ELocale.ar_AR]: "عربى",
  [ELocale.it_IT]: "Italiana",
  [ELocale.fr_FR]: "Française",
} satisfies Partial<Record<ELocale, string>>;

const TURKEY_INTERNAL_LOCALES_TO_NAME_MAP = {
  [ELocale.en_US]: "English",
  [ELocale.tr_TR]: "Türkçe",
} satisfies Partial<Record<ELocale, string>>;

const KYRGYZSTAN_INTERNAL_LOCALES_TO_NAME_MAP = {
  [ELocale.en_US]: "English",
  [ELocale.ru_RU]: "Русский",
} satisfies Partial<Record<ELocale, string>>;

const INDIA_INTERNAL_LOCALES_TO_NAME_MAP = {
  [ELocale.en_US]: "English",
  [ELocale.hi_IN]: "हिंदी",
} satisfies Partial<Record<ELocale, string>>;

// For usage on UI (Component), not for all themes
const BASE_INTERNAL_LOCALE_LIST = keys(BASE_INTERNAL_LOCALES_TO_NAME_MAP);
const TURKEY_INTERNAL_LOCALE_LIST = keys(TURKEY_INTERNAL_LOCALES_TO_NAME_MAP);
// Only for store
const SUPPORTED_INTERNAL_LOCALE_LIST = [...BASE_INTERNAL_LOCALE_LIST, ELocale.ru_RU, ELocale.hi_IN] satisfies ELocale[];

type TSupportedInternalLocale = (typeof SUPPORTED_INTERNAL_LOCALE_LIST)[number]

const SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP: Record<TSupportedInternalLocale, TSupportedPublicLocale> = {
  [ELocale.en_US]: "en-us",
  [ELocale.tr_TR]: "tr-tr",
  [ELocale.el_EL]: "el-el",
  [ELocale.es_ES]: "es-es",
  [ELocale.pt_PT]: "pt-pt",
  [ELocale.ar_AR]: "ar-ar",
  [ELocale.it_IT]: "it-it",
  [ELocale.fr_FR]: "fr-fr",
  [ELocale.ru_RU]: "ru-ru",
  [ELocale.hi_IN]: "hi-in",
};

const SUPPORTED_PUBLIC_TO_INTERNAL_LOCALE_MAP: Record<TSupportedPublicLocale, TSupportedInternalLocale> =
  reverseMap(SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP);

const SUPPORTED_INTERNAL_LOCALES_LIST = keys(SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP);

const isSupportedInternalLocale = (locale: unknown): locale is TSupportedInternalLocale =>
  SUPPORTED_INTERNAL_LOCALE_LIST.some((it) => it === locale);

const isSupportedPublicLocale = (locale: unknown): locale is TSupportedPublicLocale =>
  isString(locale) && locale in SUPPORTED_PUBLIC_TO_INTERNAL_LOCALE_MAP;

export type {
  TSupportedPublicLocale,
  TSupportedInternalLocale,
};
export {
  BASE_INTERNAL_LOCALES_TO_NAME_MAP,
  TURKEY_INTERNAL_LOCALES_TO_NAME_MAP,
  KYRGYZSTAN_INTERNAL_LOCALES_TO_NAME_MAP,
  INDIA_INTERNAL_LOCALES_TO_NAME_MAP,
  TURKEY_INTERNAL_LOCALE_LIST,
  SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP,
  SUPPORTED_PUBLIC_TO_INTERNAL_LOCALE_MAP,
  BASE_INTERNAL_LOCALE_LIST,
  SUPPORTED_INTERNAL_LOCALES_LIST,

  isSupportedInternalLocale,
  isSupportedPublicLocale,
};
