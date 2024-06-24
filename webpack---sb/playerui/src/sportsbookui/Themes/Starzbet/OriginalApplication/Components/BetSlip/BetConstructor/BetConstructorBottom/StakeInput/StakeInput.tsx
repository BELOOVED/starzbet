import { memo } from "react";
import { useSelector } from "react-redux";
import {
  sportsbookui_starzbet_betSlip_stakePerBet,
  sportsbookui_starzbet_betSlip_title_countCoupons,
  sportsbookui_starzbet_betSlip_title_oneCoupon,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./StakeInput.module.css";
import { CurrencyInput } from "../../../../../../../../../common/Components/Inputs/CurrencyInput";
import { type IStakeInputProps, stakeInputsFactory } from "../../../../../../../../../common/Components/Inputs/StakeInputsFactory";
import {
  countOfParlayByActiveBetGroupSelector,
} from "../../../../../../../../Store/BetSlip/Selectors/ViewSelectors/CountOfParlayViewSelectors";
import { BetConstructorTextBlock } from "../../BetConstructorTextBlock/BetConstructorTextBlock";

const StakeInput = memo<IStakeInputProps>(({
  onChange,
  decrementHandler,
  incrementHandler,
  value,
}) => (
  <div className={classes.stake}>
    <CurrencyInput className={classes.input} onChange={onChange} value={value} />

    <div className={classes.controls}>
      <div className={classes.minus} onClick={decrementHandler}>{"-"}</div>

      <div className={classes.plus} onClick={incrementHandler}>{"+"}</div>
    </div>
  </div>
));
StakeInput.displayName = "StakeInput";

const { StakeInputForSettings, StakeInputForSingle, StakeInputForGroup } = stakeInputsFactory(StakeInput);

const TITLE = [sportsbookui_starzbet_betSlip_stakePerBet] as const;

const StakeInputForGroupText = memo(() => {
  const count = useSelector(countOfParlayByActiveBetGroupSelector);

  const subtitle = [
    count === 1
      ? sportsbookui_starzbet_betSlip_title_oneCoupon
      : sportsbookui_starzbet_betSlip_title_countCoupons, { count }] as const;

  return <BetConstructorTextBlock title={TITLE} subtitle={subtitle} />;
});
StakeInputForGroupText.displayName = "StakeInputForGroupText";

const StakeInputForGroupBlock = memo(() => (
  <div className={classes.stakeInputForGroup}>
    <StakeInputForGroupText />

    <StakeInputForGroup />
  </div>
));
StakeInputForGroupBlock.displayName = "StakeInputForGroupBlock";

export { StakeInputForSettings, StakeInputForSingle, StakeInputForGroupBlock };
