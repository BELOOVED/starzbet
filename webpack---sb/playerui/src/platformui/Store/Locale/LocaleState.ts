import {
  SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP,
  type TSupportedInternalLocale,
  type TSupportedPublicLocale,
} from "../../../common/Store/Locale/Model/TSupportedLocale";
import { getLocale } from "./GetLocale";

const locale = getLocale();

interface ILocaleState {
  locale: TSupportedInternalLocale;
  publicLocale: TSupportedPublicLocale;
}

type TLocalePreloadedState = {
  locale?: TSupportedInternalLocale;
}

const getLocaleState = (preloadedLocale?: TSupportedInternalLocale): ILocaleState => {
  const initialLocale = preloadedLocale ?? locale;

  return ({
    locale: initialLocale,
    publicLocale: SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP[initialLocale],
  });
};

export type { ILocaleState, TLocalePreloadedState };

export { getLocaleState };
