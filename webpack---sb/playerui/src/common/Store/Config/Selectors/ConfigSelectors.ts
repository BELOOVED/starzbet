import { createPropertySelector } from "@sb/utils";
import { type IWithConfigState } from "../ConfigInitialState";

const configSelector = ({ config }: IWithConfigState) => config;

const platformConfigSystemCurrencySelector = createPropertySelector(
  configSelector,
  "systemCurrency",
);

const platformConfigSystemLocaleSelector = createPropertySelector(
  configSelector,
  "systemDefaultLocale",
);

export { platformConfigSystemCurrencySelector, platformConfigSystemLocaleSelector };
