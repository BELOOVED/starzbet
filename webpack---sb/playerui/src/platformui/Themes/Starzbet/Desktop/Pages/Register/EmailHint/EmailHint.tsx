import { memo } from "react";
import {
  platformui_starzbet_registration_emailHint_emailProviders,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./EmailHint.module.css";
import { listAllowedEmailProviders } from "../../../../../../../common/Constants/ListAllowedEmailProviders";
import { InfoIcon } from "../../../../Components/Icons/InfoIcon";

const EmailHint = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes["hint-container"]}>
      <InfoIcon color={"darkText"} />

      <div className={classes.hint}>
        {t(platformui_starzbet_registration_emailHint_emailProviders)}

        <br />

        {listAllowedEmailProviders.join(", ")}
      </div>
    </div>
  );
});
EmailHint.displayName = "EmailHint";

export { EmailHint };

