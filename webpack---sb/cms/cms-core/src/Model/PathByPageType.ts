import { EPageType, ERootPages } from "../EnumTypes";

const PathPageTypeMap = {
  [ERootPages.infoPageName]: EPageType.infoPage,
  [ERootPages.privacyPolicyPageName]: EPageType.privacyPage,
  [ERootPages.termsConditionsPageName]: EPageType.termsPage,
  [ERootPages.landingPageName]: EPageType.landingPage,
  [ERootPages.promotionsPageName]: EPageType.promoPage,
};

export { PathPageTypeMap };
