import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isNotVoid } from "@sb/utils";
import { CMSFooterSectionWithLicenseLicenseBlockScriptSelector } from "../Store/CMS/Selectors/CMSLicenceBlockSelectors";

const useAddLicenceScript = () => {
  const licenceScript = useSelector(CMSFooterSectionWithLicenseLicenseBlockScriptSelector)?.trim();

  return useEffect(
    () => {
      if (isNotVoid(licenceScript)) {
        const script = document.createElement("script");

        script.src = licenceScript;

        document.head.appendChild(script);
      }
    },
    [],
  );
};

export { useAddLicenceScript };
