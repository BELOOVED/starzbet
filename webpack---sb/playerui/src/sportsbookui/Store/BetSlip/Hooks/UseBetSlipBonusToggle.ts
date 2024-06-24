import { useCallback } from "react";
import { type TVoidFn, useAction, useParamSelector } from "@sb/utils";
import { betSlipIsUseBonusBalanceCheckedSelector, betSlipIsUseFreeBetCheckedSelector } from "../Selectors/BetSlipSelectors";
import { betSlipSetFreeBetAction, betSlipSetUseBonusBalanceAction } from "../BetSlipActions";
import { singleHash } from "../Model/BetHash";

const useBetSlipBonusToggle = (outcomeId: string): [boolean, TVoidFn] => {
  const bonusBalanceChecked = useParamSelector(betSlipIsUseBonusBalanceCheckedSelector, [outcomeId]);
  const setUseBonusBalance = useAction(betSlipSetUseBonusBalanceAction);

  const toggleBonusBalance = useCallback(
    () => {
      setUseBonusBalance(outcomeId, !bonusBalanceChecked, singleHash);
    },
    [bonusBalanceChecked, outcomeId],
  );

  return [bonusBalanceChecked, toggleBonusBalance];
};

const useBetSlipFreeBetToggle = (outcomeId: string): [boolean, TVoidFn] => {
  const isFreeBetChecked = useParamSelector(betSlipIsUseFreeBetCheckedSelector, [outcomeId]);
  const betSlipSetFreeBet = useAction(betSlipSetFreeBetAction);

  const toggleFreeBet = useCallback(() => betSlipSetFreeBet(outcomeId, !isFreeBetChecked), [outcomeId, isFreeBetChecked]);

  return [isFreeBetChecked, toggleFreeBet];
};

export { useBetSlipBonusToggle, useBetSlipFreeBetToggle };
