import { memo } from "react";
import { withCondition } from "@sb/utils";
import classes from "../BetConstructorBottom.module.css";
import { isMultiGroupSelector } from "../../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { MatchNotActiveBonusLabelForParlay } from "../../../Bonus/MatchNotActiveBonusLabel/MatchNotActiveBonusLabel";
import { FreeBetCheckBoxForParlay } from "../../../Bonus/FreeBetCheckbox/FreeBetCheckbox";
import { BonusCheckBoxForParlay } from "../../../Bonus/BonusBetCheckBox/BonusBetCheckBox";

const BonusContent = withCondition(
  isMultiGroupSelector,
  memo(() => (
    <>
      <MatchNotActiveBonusLabelForParlay className={classes.matchNotActiveBonus} />

      <FreeBetCheckBoxForParlay />

      <BonusCheckBoxForParlay />
    </>
  )),
);
BonusContent.displayName = "BonusContent";

export { BonusContent };
