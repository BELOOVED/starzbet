import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, Money, useParamSelector } from "@sb/utils";
import { platformui_starzbet_bonus_activation_bonusBalanceToReach } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./RuleProgress.module.css";
import { playerBonusBonusBalanceToReachSelector } from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { useBonusItemContext } from "../BonusItemContext";

/**
 * only for active playerBonuses
 */
const BonusBalanceToReach = memo(() => {
  const [t] = useTranslation();
  const { bonusId } = useBonusItemContext();

  const bonusBalanceToReach = useParamSelector(playerBonusBonusBalanceToReachSelector, [bonusId]);

  if (!bonusBalanceToReach) {
    return null;
  }

  return (
    <div className={classes.winLoss}>
      <div>{t(platformui_starzbet_bonus_activation_bonusBalanceToReach)}</div>

      <div className={classes.winLossMoney}>{Money.toFormat(bonusBalanceToReach, EMoneyFormat.symbolLeft)}</div>
    </div>
  );
});
BonusBalanceToReach.displayName = "BonusBalanceToReach";

export { BonusBalanceToReach };
