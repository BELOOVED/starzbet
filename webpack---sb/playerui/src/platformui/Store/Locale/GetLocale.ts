import { ELocale } from "@sb/utils";
import { getLocalStorage, localStorageKeys } from "../../../common/Store/LocalStorage/localStorageKeys";
import {
  INDIA_INTERNAL_LOCALES_TO_NAME_MAP,
  KYRGYZSTAN_INTERNAL_LOCALES_TO_NAME_MAP,
  type TSupportedInternalLocale,
  TURKEY_INTERNAL_LOCALES_TO_NAME_MAP,
} from "../../../common/Store/Locale/Model/TSupportedLocale";
import { IS_STARZBET_IN, IS_STARZBET_KG } from "../../../ServerEnvironment";

const DEFAULT_LOCALE = process.env.SYSTEM_LOCALE || ELocale.en_US;

const getLocalesList = (): Partial<Record<ELocale, string>> => {
  if (IS_STARZBET_KG) {
    return KYRGYZSTAN_INTERNAL_LOCALES_TO_NAME_MAP;
  }

  if (IS_STARZBET_IN) {
    return INDIA_INTERNAL_LOCALES_TO_NAME_MAP;
  }

  return TURKEY_INTERNAL_LOCALES_TO_NAME_MAP;
};

const getLocale = () => {
  const locale = getLocalStorage<TSupportedInternalLocale>(localStorageKeys.locale);

  if (!locale) {
    return DEFAULT_LOCALE;
  }

  const list = getLocalesList();

  return list[locale] ? locale : DEFAULT_LOCALE;
};

export { getLocale };
