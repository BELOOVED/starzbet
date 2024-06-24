import { memo } from "react";
import { useSelector } from "react-redux";
import {
  sportsbookui_starzbet_betSlip_bet_estimatedReturns,
  sportsbookui_starzbet_betSlip_bet_oddsBoost,
  sportsbookui_starzbet_betSlip_title_totalStake,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { Money, withFalsyCondition } from "@sb/utils";
import classes from "./TotalStakeAndReturn.module.css";
import {
  totalOddBoostOfBetGroupSelector,
  totalPayoutOfBetGroupSelector,
  totalStakeOfBetGroupSelector,
} from "../../../../../../../../Store/BetSlip/Selectors/TotalStakeAndReturnByBetGroupSelector";
import { isMultiOrSystemBonusActiveSelector } from "../../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { MoneyTextBlock } from "../../BetConstructorTextBlock/BetConstructorTextBlock";

const TotalStake = memo(() => {
  const totalStake = useSelector(totalStakeOfBetGroupSelector);

  return (
    <MoneyTextBlock
      title={sportsbookui_starzbet_betSlip_title_totalStake}
      money={totalStake}
    />
  );
});
TotalStake.displayName = "TotalStake";

const TotalOddBoost = withFalsyCondition(
  isMultiOrSystemBonusActiveSelector,
  memo(() => {
    const totalOddBoost = useSelector(totalOddBoostOfBetGroupSelector);

    return Money.isMoney(totalOddBoost)
      ? (
        <MoneyTextBlock
          title={sportsbookui_starzbet_betSlip_bet_oddsBoost}
          money={totalOddBoost}
        />
      )
      : null;
  }),
);
TotalOddBoost.displayName = "TotalOddBoost";

const TotalPayout = memo(() => {
  const totalPayout = useSelector(totalPayoutOfBetGroupSelector);

  return (
    <MoneyTextBlock
      title={sportsbookui_starzbet_betSlip_bet_estimatedReturns}
      money={totalPayout}
    />
  );
});
TotalPayout.displayName = "TotalPayout";

const TotalStakeAndReturn = memo(() => (
  <div className={classes.totalStakeAndReturn}>
    <TotalStake />

    <TotalOddBoost />

    <TotalPayout />
  </div>
));
TotalStakeAndReturn.displayName = "TotalStakeAndReturn";

export { TotalStakeAndReturn };
