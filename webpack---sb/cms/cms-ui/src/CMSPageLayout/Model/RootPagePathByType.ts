import { EPageType, ERootPages } from "@sb/cms-core";

const RootPagePathMap = {
  [EPageType.infoPage]: [ERootPages.infoPageName],
  [EPageType.privacyPage]: [ERootPages.privacyPolicyPageName],
  [EPageType.termsPage]: [ERootPages.termsConditionsPageName],
  [EPageType.landingPage]: [ERootPages.landingPageName],
  [EPageType.promoPage]: [ERootPages.promotionsPageName],
  [EPageType.childInfoPage]: [ERootPages.infoPageName],
};

export { RootPagePathMap };
