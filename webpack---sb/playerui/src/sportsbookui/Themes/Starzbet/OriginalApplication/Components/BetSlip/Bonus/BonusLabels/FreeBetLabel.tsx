import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_betSlip_freeBet } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./BonusLabels.module.css";
import { PresentIcon } from "../../../Icons/PresentIcon";

const FreeBetLabel = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={clsx(classes.label, classes.freeBetLabel)}>
      <PresentIcon className={classes.presentIcon} />

      <div className={classes.labelText}>
        {t(sportsbookui_starzbet_betSlip_freeBet)}
      </div>
    </div>
  );
});
FreeBetLabel.displayName = "FreeBetLabel";

export { FreeBetLabel };
