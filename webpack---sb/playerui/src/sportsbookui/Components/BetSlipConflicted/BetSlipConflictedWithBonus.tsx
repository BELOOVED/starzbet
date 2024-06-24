import { type FC, type ReactElement } from "react";
import { useSelector } from "react-redux";
import { type TTFuncParameters } from "@sb/translator";
import {
  betSlipSomeConflictedWithBonusSelector,
  betSlipSomeConflictSelector,
} from "../../Store/BetSlip/Selectors/BetSlipSomeConflictSelector";

interface IBetSlipConflictedWithBonusProps {
  children: (tKey: TTFuncParameters) => ReactElement;
  conflictedTKey: TTFuncParameters;
}

const BetSlipConflictedWithBonus: FC<IBetSlipConflictedWithBonusProps> = ({ children, conflictedTKey }) => {
  const conflicted = useSelector(betSlipSomeConflictSelector);
  const bonusError = useSelector(betSlipSomeConflictedWithBonusSelector);

  if (bonusError) {
    return children(bonusError);
  }

  if (conflicted) {
    return children(conflictedTKey);
  }

  return null;
};
BetSlipConflictedWithBonus.displayName = "BetSlipConflictedWithBonus";

export { BetSlipConflictedWithBonus };
