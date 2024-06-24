import { ELocale } from "../ELocale";
import { ar, de, el, enGB, enUS, es, faIR, fr, id, it, pt, ru, th, tr, vi, zhTW } from "date-fns/locale"
import { Locale } from "date-fns"
import { TWithRequired } from "../TWithRequired";

const localeToDateFnsLocaleMap: TWithRequired<Partial<Record<ELocale, Locale>>, ELocale.en_US> = {
  [ELocale.en_US]: enUS,
  [ELocale.en_GB]: enGB,
  [ELocale.tr_TR]: tr,
  [ELocale.el_EL]: el,
  [ELocale.es_ES]: es,
  [ELocale.pt_PT]: pt,
  [ELocale.pt_BR]: pt,
  [ELocale.ar_AR]: ar,
  [ELocale.it_IT]: it,
  [ELocale.fr_FR]: fr,
  [ELocale.de_DE]: de,
  [ELocale.fa_IR]: faIR,
  [ELocale.th_TH]: th,
  [ELocale.id_ID]: id,
  [ELocale.zh_TW]: zhTW,
  [ELocale.vi_VN]: vi,
  [ELocale.ru_RU]: ru,
};

export { localeToDateFnsLocaleMap };
