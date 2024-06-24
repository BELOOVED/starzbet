import { type ECurrencyCode } from "@sb/utils";

const envCurrencies = process.env.SUPPORTED_CURRENCIES;

const supportedCurrencies = (envCurrencies ? envCurrencies.split(",") : []) as ECurrencyCode[];

const isSupportedCurrency = (currency: ECurrencyCode) => supportedCurrencies.length !== 0 && supportedCurrencies.includes(currency);

export { isSupportedCurrency };
