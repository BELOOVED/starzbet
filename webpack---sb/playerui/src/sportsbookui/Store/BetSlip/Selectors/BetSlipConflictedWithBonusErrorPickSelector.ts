import { getNotNil } from "@sb/utils";
import {
  betSlipFreeBetErrorForParlayPickSelector,
  betSlipFreeBetErrorForSinglePickSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BetSlip/BetSlipFreeBetErrorSelectors";
import {
  betSlipBonusErrorForParlayPickSelector,
  betSlipBonusErrorForSinglePickSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BetSlip/BetSlipBonusBetErrorSelectors";
import { type TMixAppState } from "../../CreateMixInitialState";
import { singleStakeMoneyByIdSelector } from "../Hooks/UseSingleStakeByIdSelector";
import { betSlipLimitErrorByOutcomeIdSelectorFactory } from "../Hooks/UseBetSlipLimitErrorByOutcomeIdSelector";
import { isConflictedPick } from "../Model/ConlictedPick";
import { EBetGroup } from "../Model/BetGroup";
import { betSlipPicksSelector } from "./BetSlipPicksSelectors";
import { betGroupSelector, betSlipPickByOutcomeIdSelector } from "./BetSlipSelectors";

const betSlipConflictedWithBonusErrorPickSelector = (state: TMixAppState, outcomeId: string) => {
  const pick = betSlipPickByOutcomeIdSelector(state, outcomeId);

  if (getNotNil(pick, ["betSlipConflictedWithBonusErrorPickSelector"], "pick").disable) {
    return false;
  }

  const picks = betSlipPicksSelector(state);
  const conflicted = isConflictedPick(picks, outcomeId);

  if (conflicted) {
    return true;
  }

  const activeGroup = betGroupSelector(state);

  if (activeGroup === EBetGroup.single) {
    const stake = singleStakeMoneyByIdSelector(state, outcomeId);

    const limitError = !!betSlipLimitErrorByOutcomeIdSelectorFactory(state, outcomeId);

    if (limitError) {
      return true;
    }

    const freeBetError = !!betSlipFreeBetErrorForSinglePickSelector(state, outcomeId, stake);

    if (freeBetError) {
      return true;
    }

    const bonusError = !!betSlipBonusErrorForSinglePickSelector(state, outcomeId, stake);

    if (bonusError) {
      return true;
    }

    return false;
  }

  if (activeGroup === EBetGroup.multi) {
    const freeBetError = !!betSlipFreeBetErrorForParlayPickSelector(state, outcomeId);

    if (freeBetError) {
      return true;
    }

    const bonusError = !!betSlipBonusErrorForParlayPickSelector(state, outcomeId);

    if (bonusError) {
      return true;
    }

    return false;
  }

  return false;
};

export { betSlipConflictedWithBonusErrorPickSelector };
