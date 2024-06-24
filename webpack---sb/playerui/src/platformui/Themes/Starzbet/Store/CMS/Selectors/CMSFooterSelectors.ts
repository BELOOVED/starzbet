import { createOptionalPropertySelector } from "@sb/utils";
import { EPlatformBlockMap } from "@sb/cms-core";
import { type TPlatformAppState } from "../../../../../Store/PlatformInitialState";
import { getListByPageId } from "../../../../../Store/CMS/Utils/Helpers";
import { CMSBlocksSelector } from "./CMSSelectors";

const CMSFooterBlockSelector = createOptionalPropertySelector(
  CMSBlocksSelector,
  [EPlatformBlockMap.FOOTER],
);

const CMSFooterUpdatedAtSelector = createOptionalPropertySelector(
  CMSFooterBlockSelector,
  "updatedAt",
);

const CMSFooterResponsibleGamblingContentSelector = createOptionalPropertySelector(
  CMSFooterBlockSelector,
  ["responsibleGambling", "content"],
);

const CMSFooterLinkListSelector = createOptionalPropertySelector(
  CMSFooterBlockSelector,
  ["linkListMap", "content"],
);

const CMSFooterSectionWithLogoAndSocialSelector = createOptionalPropertySelector(
  CMSFooterBlockSelector,
  "logoWithSocialLinks",
);

const CMSFooterLogoSelector = createOptionalPropertySelector(
  CMSFooterSectionWithLogoAndSocialSelector,
  "logoImage",
);

const CMSFooterSocialLinkListSelector = createOptionalPropertySelector(
  CMSFooterSectionWithLogoAndSocialSelector,
  ["socialLinksList", "content"],
);

const CMSFooterProviderListSelector = createOptionalPropertySelector(
  CMSFooterBlockSelector,
  ["providers", "content"],
);

const CMSFooterSectionWithLicenseTitleSelector = createOptionalPropertySelector(
  CMSFooterBlockSelector,
  ["sectionWithLicense", "title"],
);

const CMSFooterPaymentMethodsListSelector = createOptionalPropertySelector(
  CMSFooterBlockSelector,
  ["paymentMethodsList", "content"],
);

const CMSSimplePageLinksSelector = (state: TPlatformAppState, id: string) => {
  const linkList = CMSFooterLinkListSelector(state);

  return getListByPageId(linkList, id);
};

export {
  CMSSimplePageLinksSelector,
  CMSFooterResponsibleGamblingContentSelector,
  CMSFooterBlockSelector,
  CMSFooterUpdatedAtSelector,
  CMSFooterSectionWithLicenseTitleSelector,
  CMSFooterSocialLinkListSelector,
  CMSFooterLogoSelector,
  CMSFooterPaymentMethodsListSelector,
  CMSFooterProviderListSelector,
  CMSFooterLinkListSelector,
};
