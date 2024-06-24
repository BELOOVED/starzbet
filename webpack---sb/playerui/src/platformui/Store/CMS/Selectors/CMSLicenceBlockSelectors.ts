import { createOptionalPropertySelector } from "@sb/utils";
import { type ICmsWrapperState, type TContent } from "../Model/CmsModel";

const CMSFooterBlockSelector = (state: ICmsWrapperState<TContent>) => state.CMS.content.blockContent.footer;

const CMSFooterSectionWithLicenseSelector = createOptionalPropertySelector(
  CMSFooterBlockSelector,
  "sectionWithLicense",
);
const CMSFooterSectionWithLicenseReachTextSelector = createOptionalPropertySelector(
  CMSFooterSectionWithLicenseSelector,
  "richText",
);
const CMSFooterSectionWithLicenseLicenseBlockSelector = createOptionalPropertySelector(
  CMSFooterSectionWithLicenseSelector,
  "licenceBlock",
);
const CMSFooterSectionWithLicenseLicenseBlockDivSelector = createOptionalPropertySelector(
  CMSFooterSectionWithLicenseLicenseBlockSelector,
  "licenceDiv",
);
const CMSFooterSectionWithLicenseLicenseBlockScriptSelector = createOptionalPropertySelector(
  CMSFooterSectionWithLicenseLicenseBlockSelector,
  "licenceScript",
);
export {
  CMSFooterSectionWithLicenseSelector,
  CMSFooterSectionWithLicenseLicenseBlockScriptSelector,
  CMSFooterSectionWithLicenseLicenseBlockDivSelector,
  CMSFooterSectionWithLicenseReachTextSelector,
};
