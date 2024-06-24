import { ELocale } from "@sb/utils/ELocale";
import { queryStringParams } from "../../../common/Utils/QueryStringParams";
import { isSupportedInternalLocale, type TSupportedInternalLocale } from "../../../common/Store/Locale/Model/TSupportedLocale";
import { getLocalStorage, localStorageKeys } from "../../../common/Store/LocalStorage/localStorageKeys";

const queryStringLocale = queryStringParams.locale;

const initialLocale = (
  (isSupportedInternalLocale(queryStringLocale) ? queryStringLocale : undefined) ||
  getLocalStorage<TSupportedInternalLocale>(localStorageKeys.locale) ||
  process.env.SYSTEM_LOCALE ||
  ELocale.en_US
);

export { initialLocale };
