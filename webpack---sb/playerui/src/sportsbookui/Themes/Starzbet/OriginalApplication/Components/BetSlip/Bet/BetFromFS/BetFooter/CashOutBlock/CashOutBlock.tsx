import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, type IMoney, Money } from "@sb/utils";
import {
  sportsbookui_starzbet_betSlip_cashout_cashedOut,
  sportsbookui_starzbet_betSlip_cashout_notAvailableToCashOut,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./CashOutBlock.module.css";
import { useCanCashOutBetSelector } from "../../../../../../../../../Store/MyBets/Hooks/UseCanCashOutBetSelector";
import { useSettledBetByIdSelector } from "../../../../../../../../../Store/MyBets/Hooks/UseSettledBetByIdSelector";
import { isAvailableForCashOutFilterSelector } from "../../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { CashOut } from "./CashOut/CashOut";

interface ICashOutBlockProps {
  betId: string;
  cashOutAt: number | null;
  payout: IMoney;
  cashOut: IMoney;
}

const CashOutBlock = memo<ICashOutBlockProps>(({
  betId,
  cashOutAt,
  payout,
  cashOut,
}) => {
  const [t] = useTranslation();
  const canCashOut = useCanCashOutBetSelector(betId);
  const settled = useSettledBetByIdSelector(betId);
  const cashOutBetType = useSelector(isAvailableForCashOutFilterSelector);

  if (cashOutAt) {
    return (
      <div className={classes.cashedOut}>
        {`${Money.toFormat(payout, EMoneyFormat.codeRight)} `}

        {t(sportsbookui_starzbet_betSlip_cashout_cashedOut)}
      </div>
    );
  }

  if (settled || !cashOutBetType) {
    return null;
  }

  if (!canCashOut) {
    return (
      <div className={classes.cashedOut}>
        {t(sportsbookui_starzbet_betSlip_cashout_notAvailableToCashOut)}
      </div>
    );
  }

  return <CashOut betId={betId} cashOut={cashOut} />;
});
CashOutBlock.displayName = "CashOutBlock";

export { CashOutBlock };
