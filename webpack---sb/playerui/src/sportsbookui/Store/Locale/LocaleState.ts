import {
  SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP,
  type TSupportedInternalLocale,
  type TSupportedPublicLocale,
} from "../../../common/Store/Locale/Model/TSupportedLocale";
import { initialLocale } from "./InitialLocale";

interface IWithLocaleState {
  locale: TSupportedInternalLocale;
  publicLocale: TSupportedPublicLocale;
}

const localeState: IWithLocaleState = {
  locale: initialLocale,
  publicLocale: SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP[initialLocale],
};

export { localeState, type IWithLocaleState };
