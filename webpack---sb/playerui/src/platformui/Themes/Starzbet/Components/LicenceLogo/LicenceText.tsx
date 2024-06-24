import { memo } from "react";
import { useSelector } from "react-redux";
import classes from "./LicenceLogo.module.css";
import { Space } from "../../../../../common/Components/Space/Space";
import { CMSFooterSectionWithLicenseReachTextSelector } from "../../../../Store/CMS/Selectors/CMSLicenceBlockSelectors";
import { MultiLangText } from "../../../../Components/CMSComponents/CMSText/MultiLangText/MultiLangText";
import { CMSFooterSectionWithLicenseTitleSelector } from "../../Store/CMS/Selectors/CMSFooterSelectors";

const LicenceText = memo(() => {
  const licenceText = useSelector(CMSFooterSectionWithLicenseReachTextSelector);

  const title = useSelector(CMSFooterSectionWithLicenseTitleSelector);

  return (
    <div className={classes.licenseText}>
      <Space vertical value={8}>
        <MultiLangText arr={title?.description} className={classes.text} />

        <MultiLangText arr={licenceText?.description} className={classes.text} />
      </Space>
    </div>
  );
});
LicenceText.displayName = "LicenceText";

export { LicenceText };
