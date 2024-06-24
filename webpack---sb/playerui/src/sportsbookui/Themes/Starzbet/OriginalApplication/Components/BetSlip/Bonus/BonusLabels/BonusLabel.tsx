import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_betSlip_bonus } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./BonusLabels.module.css";
import { PigIcon } from "../../../Icons/PigIcon";

const BonusLabel = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={clsx(classes.label, classes.bonusLabel)}>
      <PigIcon className={classes.presentIcon} />

      <div className={classes.labelText}>
        {t(sportsbookui_starzbet_betSlip_bonus)}
      </div>
    </div>
  );
});
BonusLabel.displayName = "BonusLabel";

export { BonusLabel };
