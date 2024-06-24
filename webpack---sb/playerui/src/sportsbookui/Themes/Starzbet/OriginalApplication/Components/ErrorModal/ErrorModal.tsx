// @ts-nocheck
import React, { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_editBet_addSelectionTip_gotIt,
  platformui_subTitle_wrong,
  platformui_title_wrong,
} from "@sb/translates/platformui/CommonTKeys";
import classes from "./ErrorModal.module.css";
import { CloseIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { ErrorIcon } from "../Icons/ErrorIcon/ErrorIcon";

const ErrorModal = memo(({
  handleClick,
  subtitle = platformui_subTitle_wrong,
}) => {
  const [t] = useTranslation();

  const onClick = (e) => e.stopPropagation();

  return (
    <div className={classes.error} onClick={onClick}>
      <CloseIcon className={classes.close} onClick={handleClick} />

      <ErrorIcon
        className={classes.errorIcon}
        width={90}
        height={90}
        color={"error"}
      />

      <div className={classes.title}>
        {t(platformui_title_wrong)}
      </div>

      <div className={classes.subtitle}>
        {t(subtitle)}
      </div>

      <div className={classes.gotItButton} onClick={handleClick}>
        {t(platformui_editBet_addSelectionTip_gotIt)}
      </div>
    </div>
  );
});
ErrorModal.displayName = "ErrorModal";

export { ErrorModal };
