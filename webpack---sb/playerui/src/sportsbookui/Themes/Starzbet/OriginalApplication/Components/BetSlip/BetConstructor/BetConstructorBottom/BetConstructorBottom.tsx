import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import classes from "./BetConstructorBottom.module.css";
import { EBetGroup } from "../../../../../../../Store/BetSlip/Model/BetGroup";
import { betGroupSelector } from "../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { Warnings } from "./Warnings/Warnings";
import { PlaceBetButton } from "./PlaceBetButton/PlaceBetButton";
import { SystemTotal } from "./SystemTotal/SystemTotal";
import { BonusContent } from "./BonusContent/BonusContent";
import { MultiTotal } from "./MultiTotal/MultiTotal";
import { TotalStakeAndReturn } from "./TotalStakeAndReturn/TotalStakeAndReturn";

const totalView = {
  [EBetGroup.single]: TotalStakeAndReturn,
  [EBetGroup.multi]: MultiTotal,
  [EBetGroup.system]: SystemTotal,
};

const TotalByBetGroup = memo(() => {
  const activeGroup = useSelector(betGroupSelector);

  return createElement(totalView[activeGroup]);
});
TotalByBetGroup.displayName = "TotalByBetGroup";

const BetConstructorBottom = memo(() => (
  <div className={classes.betConstructorBottom}>
    <TotalByBetGroup />

    <BonusContent />

    <Warnings />

    <PlaceBetButton />
  </div>
));
BetConstructorBottom.displayName = "BetConstructorBottom";

export { BetConstructorBottom };
