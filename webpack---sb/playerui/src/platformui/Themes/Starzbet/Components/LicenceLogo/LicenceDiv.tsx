import { memo } from "react";
import { useSelector } from "react-redux";
import { isNil } from "@sb/utils";
import classes from "./LicenceLogo.module.css";
import { CMSFooterSectionWithLicenseLicenseBlockDivSelector } from "../../../../Store/CMS/Selectors/CMSLicenceBlockSelectors";

const LicenceDiv = memo(() => {
  const licenceDiv = useSelector(CMSFooterSectionWithLicenseLicenseBlockDivSelector);
  if (isNil(licenceDiv)) {
    return null;
  }

  const div = { __html: licenceDiv };

  return <div className={classes.licenseImg} dangerouslySetInnerHTML={div} />;
});
LicenceDiv.displayName = "LicenceDiv";

export { LicenceDiv };
