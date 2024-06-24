import { useSelector } from "react-redux";
import { memo } from "react";
import { sportsbookui_starzbet_betSlip_bet_title_theEditBetFeatureWillBeUsedFromTheBetOffsetValueOfThisBet } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./BetTotalTitle.module.css";
import { editingByBetIdSelector } from "../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";

const BetTotalTitle = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();
  const editing = useSelector(editingByBetIdSelector(id));

  if (!editing) {
    return null;
  }

  return (
    <div className={classes.editBetInfo}>
      {t(sportsbookui_starzbet_betSlip_bet_title_theEditBetFeatureWillBeUsedFromTheBetOffsetValueOfThisBet)}
    </div>
  );
});
BetTotalTitle.displayName = "BetTotalTitle";

export { BetTotalTitle };
