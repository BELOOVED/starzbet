import clsx from "clsx";
import { memo } from "react";
import classes from "./LicenceLogo.module.css";
import { useAddLicenceScript } from "../../../../Hooks/UseAddLicenceScript";
import { LicenceText } from "./LicenceText";
import { LicenceDiv } from "./LicenceDiv";

const LicenceLogo = memo(() => {
  useAddLicenceScript();

  const className = clsx(classes.sectionWithLicense);

  return (
    <div className={className}>
      <LicenceDiv />

      <LicenceText />
    </div>
  );
});
LicenceLogo.displayName = "LicenceLogo";

export { LicenceLogo };
