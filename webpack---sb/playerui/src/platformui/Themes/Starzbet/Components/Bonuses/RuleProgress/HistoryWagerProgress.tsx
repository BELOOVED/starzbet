import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_historyBonusInfo_bonusGiven,
  platformui_starzbet_bonus_historyBonusInfo_wonGiven,
  platformui_starzbet_bonus_wageringRules_wageringProgress,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EMoneyFormat, isNil, Money, useParamSelector, withParamCondition } from "@sb/utils";
import classes from "./RuleProgress.module.css";
import {
  historyBonusByIdNotNilSelectors,
  historyWageringProgressSelector,
} from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { historyBonusIsCashbackType } from "../../../../../Store/Bonuses/Selectors/CashbackBonusesSelectors";
import { WagerRuleProgressSingle } from "./WagerRuleProgress";

const BonusGiven = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();
  const bonusGiven = useParamSelector(historyBonusByIdNotNilSelectors.bonusGiven, [id]);

  if (isNil(bonusGiven)) {
    throw new Error("[HistoryWagerProgress - BonusGiven], bonusGiven should exist in case currentWagering and totalWagering are exists too");
  }

  return (
    <div className={classes.winLoss}>
      <div>{t(platformui_starzbet_bonus_historyBonusInfo_bonusGiven)}</div>

      <div className={classes.winLossMoney}>{Money.toFormat(bonusGiven.external, EMoneyFormat.symbolLeft)}</div>
    </div>
  );
});
BonusGiven.displayName = "BonusGiven";

const WonGiven = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();
  const wonGiven = useParamSelector(historyBonusByIdNotNilSelectors.wonGiven, [id]);

  if (!wonGiven) {
    return null;
  }

  return (
    <div className={classes.winLoss}>
      <div>{t(platformui_starzbet_bonus_historyBonusInfo_wonGiven)}</div>

      <div className={classes.winLossMoney}>{Money.toFormat(wonGiven.external, EMoneyFormat.symbolLeft)}</div>
    </div>
  );
});
WonGiven.displayName = "WonGiven";

interface IHistoryWagerProgressProps extends IWithId {
  className?: string;
}

const HistoryWagerProgress = memo<IHistoryWagerProgressProps>(({ id, className }) => {
  const [t] = useTranslation();
  const progress = useParamSelector(historyWageringProgressSelector, [id]);

  if (isNil(progress)) {
    return null;
  }

  return (
    <div className={className}>
      <WagerRuleProgressSingle progress={progress} label={t(platformui_starzbet_bonus_wageringRules_wageringProgress)} />

      <BonusGiven id={id} />

      <WonGiven id={id} />
    </div>
  );
});
HistoryWagerProgress.displayName = "HistoryWagerProgress";

const HistoryCashbackGiven = withParamCondition(
  historyBonusIsCashbackType,
  ["id"],
  memo<IHistoryWagerProgressProps>(({ id, className }) => (
    <div className={className}>
      <WonGiven id={id} />
    </div>
  )),
);
HistoryCashbackGiven.displayName = "HistoryCashbackGiven";

export { HistoryWagerProgress, HistoryCashbackGiven };
