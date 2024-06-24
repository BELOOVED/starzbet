import { getNotNil, ELocale } from "@sb/utils";

const LocaleMap: Partial<Record<ELocale, string>> = {
  [ELocale.en_US]: "EN",
  [ELocale.tr_TR]: "TR",
  [ELocale.es_ES]: "ES",
  [ELocale.pt_PT]: "PT",
  [ELocale.pt_BR]: "PT",
  [ELocale.de_DE]: "DE",
};

const fallbackLocale = getNotNil(LocaleMap[ELocale.en_US], ["LiveSpinsEpic"], "fallbackLocale");

export { LocaleMap, fallbackLocale };
