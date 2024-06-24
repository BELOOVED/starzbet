import { ECurrencyCode } from "@sb/utils";
import { isCurrencyCode } from "./IsCurrencyCode";
import { Logger } from "./Utils/Logger";

const castToCurrencyCode = (currency: unknown) => {
  if (isCurrencyCode(currency)) {
    return currency;
  }

  throw new Error("system currency is not defined");
};

const getSystemCurrency = () => {
  try {
    return castToCurrencyCode(process.env.SYSTEM_CURRENCY);
  } catch (e) {
    Logger.warn.app("getSystemCurrency", e);

    return ECurrencyCode.EUR;
  }
};

const systemCurrency = getSystemCurrency();

export { systemCurrency };
