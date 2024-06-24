import { ELocale, getNotNil, TTranslateRecord } from "@sb/utils";
import { Logger } from "../Utils/Logger";

const getPredefinedName = (translateRecord: TTranslateRecord | null, locale: ELocale) => {
  const notTranslateRecord = getNotNil(translateRecord, ["getPredefinedName"], "translateRecord");

  const name = notTranslateRecord[locale];

  if (name) {
    return name;
  }

  const fallbackName = notTranslateRecord[ELocale.en_US];

  if (fallbackName) {
    Logger.warn.app("Name by locale en_US was used as fallback because there is no name for current locale:", locale);

    return fallbackName;
  }

  const firstAvailable = Object.values(notTranslateRecord)[0]

  if (firstAvailable) {
    // todo should throw in dev??
    Logger.warn.app("First available name was used as fallback because there is no name for en_US and current locale:", locale);

    return firstAvailable;
  }

  throw new Error(`Unable to get predefined name for current locale neither for en_US: ${JSON.stringify(translateRecord)}`);
};

export { getPredefinedName };
