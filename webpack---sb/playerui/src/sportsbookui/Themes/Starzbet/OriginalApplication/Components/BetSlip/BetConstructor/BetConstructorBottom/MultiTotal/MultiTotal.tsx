import { memo } from "react";
import { useSelector } from "react-redux";
import { sportsbookui_starzbet_betSlip_title_totalOdds } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./MultiTotal.module.css";
import { coefficientFormat } from "../../../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import {
  totalCoefficientForMultiViewSelector,
} from "../../../../../../../../Store/BetSlip/Selectors/ViewSelectors/TotalCoefficientViewSelectors";
import { PromotionBonusSelect } from "../../../PromotionBonusSelect/PromotionBonusSelect";
import { BetConstructorTextBlock } from "../../BetConstructorTextBlock/BetConstructorTextBlock";
import { StakeInputForGroupBlock } from "../StakeInput/StakeInput";
import { TotalStakeAndReturn } from "../TotalStakeAndReturn/TotalStakeAndReturn";

const TotalCoefficient = memo(() => {
  const totalCoefficient = useSelector(totalCoefficientForMultiViewSelector);
  const props = {
    title: [sportsbookui_starzbet_betSlip_title_totalOdds] as const,
    subtitle: [coefficientFormat(totalCoefficient)] as const,
  };

  return (
    <div className={classes.totalCoefficient}>
      <BetConstructorTextBlock {...props} />
    </div>
  );
});
TotalCoefficient.displayName = "TotalCoefficient";

const MultiTotal = memo(() => (
  <>
    <TotalCoefficient />

    <PromotionBonusSelect />

    <StakeInputForGroupBlock />

    <TotalStakeAndReturn />
  </>
));
MultiTotal.displayName = "MultiTotal";

export { MultiTotal };
