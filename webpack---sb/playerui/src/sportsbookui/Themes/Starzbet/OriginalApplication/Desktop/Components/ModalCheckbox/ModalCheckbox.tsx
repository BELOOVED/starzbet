// @ts-nocheck
import { memo } from "react";
import { sportsbookui_starzbet_modal_checkbox_dontShowThisMessageAgain } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./ModalCheckbox.module.css";
import { Checkbox } from "../../../Components/Arrow/Checkbox/Checkbox";

const ModalCheckbox = memo(({ checked, toggleHandler }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.checkboxGroup} onClick={toggleHandler}>
      <Checkbox active={checked} />

      <div className={classes.message}>{t(sportsbookui_starzbet_modal_checkbox_dontShowThisMessageAgain)}</div>
    </div>
  );
});
ModalCheckbox.displayName = "ModalCheckbox";

export { ModalCheckbox };
