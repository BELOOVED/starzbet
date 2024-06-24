enum EGroup {
  allTranslations = "allTranslations",
  markets = "markets",
}

const isAllTranslations = (group: EGroup) => group === EGroup.allTranslations;

export { EGroup, isAllTranslations };
