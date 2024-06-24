import { ELocale } from "@sb/utils/ELocale";
import { type ECurrencyCode } from "@sb/utils";
import { queryStringParams } from "../../Utils/QueryStringParams";
import { systemCurrency } from "../../SystemCurrency";
import { isCurrencyCode } from "../../IsCurrencyCode";

interface IConfig {
  systemCurrency: ECurrencyCode;
  supportedCurrencies: ECurrencyCode[];
  systemDefaultLocale: ELocale;
  supportedLocales: ELocale[];
}

interface IWithConfigState {
  config: IConfig;
}

const defaultCurrency = isCurrencyCode(queryStringParams.defaultCurrency)
  ? queryStringParams.defaultCurrency
  : systemCurrency;

const configInitialState: IWithConfigState = {
  config: {
    systemCurrency: defaultCurrency,
    supportedCurrencies: [],
    systemDefaultLocale: ELocale.en_US,
    supportedLocales: [],
  },
};

export type {
  IWithConfigState,
};

export { configInitialState };
