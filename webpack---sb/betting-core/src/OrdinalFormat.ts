import { ELocale } from "@sb/utils/ELocale";
import { TOptionalRecord } from "@sb/utils/TOptionalRecord";
import { Logger } from "./Utils/Logger";

/**
 * more languages
 * https://github.com/BenjaminVanRyseghem/numbro/tree/develop/languages
 */

const default_OrdinalFn = () => ".";

const ptPT_itIT_OrdinalFn = () => "º";

const enUS_enGB_OrdinalFn = (number: number) => {
  const b = number % 10;

  if (~~(number % 100 / 10) === 1) {
    return "th";
  }

  if (b === 1) {
    return "st";
  }

  if (b === 2) {
    return "nd";
  }

  if (b === 3) {
    return "rd";
  }

  return "th";
};

const esES_OrdinalFormat = (number: number) => {
  const b = number % 10;

  if (b === 1 || b === 3) {
    return "er";
  }

  if (b === 2) {
    return "do";
  }

  if (b === 7 || b === 0) {
    return "mo";
  }

  if (b === 8) {
    return "vo";
  }

  if (b === 9) {
    return "no";
  }

  return "to";
};

const frFr_OrdinalFn = (number: number) => number === 1 ? "er" : "ème";

const faIr_OrdinalFn = () => "ام";

const localeToOrdinalFn: TOptionalRecord<ELocale, (number: number) => string> = {
  [ELocale.tr_TR]: default_OrdinalFn,
  [ELocale.el_EL]: default_OrdinalFn,
  [ELocale.ar_AR]: default_OrdinalFn,
  [ELocale.id_ID]: default_OrdinalFn,
  [ELocale.th_TH]: default_OrdinalFn,
  [ELocale.vi_VN]: default_OrdinalFn,
  [ELocale.zh_TW]: default_OrdinalFn,
  [ELocale.de_DE]: default_OrdinalFn,
  [ELocale.ru_RU]: default_OrdinalFn,
  [ELocale.hi_IN]: default_OrdinalFn,

  [ELocale.en_US]: enUS_enGB_OrdinalFn,
  [ELocale.en_GB]: enUS_enGB_OrdinalFn,

  [ELocale.es_ES]: esES_OrdinalFormat,

  [ELocale.pt_PT]: ptPT_itIT_OrdinalFn,
  [ELocale.pt_BR]: ptPT_itIT_OrdinalFn,
  [ELocale.it_IT]: ptPT_itIT_OrdinalFn,

  [ELocale.fr_FR]: frFr_OrdinalFn,

  [ELocale.fa_IR]: faIr_OrdinalFn,
};

const ordinalFormat = (locale: ELocale, number: number) => {
  const ordinalFn = localeToOrdinalFn[locale];

  if (!ordinalFn) {
    Logger.error.app("Unsupported locale in ordinalFormat:", locale);

    return number.toString();
  }

  return `${number}${ordinalFn(number)}`;
};

export { ordinalFormat };
