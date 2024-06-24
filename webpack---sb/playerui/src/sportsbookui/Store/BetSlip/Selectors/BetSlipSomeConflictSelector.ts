import { createSelector } from "reselect";
import { type TTFuncParameters } from "@sb/translator";
import { isNotNil } from "@sb/utils";
import {
  betSlipBonusErrorForParlayPickSelector,
  betSlipBonusErrorForParlayTotalSelector,
  betSlipBonusErrorForSinglePickSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BetSlip/BetSlipBonusBetErrorSelectors";
import {
  betSlipFreeBetErrorForParlayPickSelector,
  betSlipFreeBetErrorForParlayTotalSelector,
  betSlipFreeBetErrorForSinglePickSelector,
  betSlipFreeBetErrorForSingleTotalSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BetSlip/BetSlipFreeBetErrorSelectors";
import { type TMixAppState } from "../../CreateMixInitialState";
import { EBetGroup, notSingleBetGroup } from "../Model/BetGroup";
import { isConflictedPick } from "../Model/ConlictedPick";
import { singleStakeMoneyByIdSelector } from "../Hooks/UseSingleStakeByIdSelector";
import { betSlipLimitErrorByOutcomeIdSelectorFactory } from "../Hooks/UseBetSlipLimitErrorByOutcomeIdSelector";
import { betSlipPicksSelector } from "./BetSlipPicksSelectors";
import { betGroupSelector } from "./BetSlipSelectors";

const betSlipSomeConflictSelector = createSelector(
  betSlipPicksSelector,
  (picks) => picks.some((pick) => isConflictedPick(picks, pick.outcomeId)),
);

const notSingleConflictSelector = createSelector(
  betSlipSomeConflictSelector,
  betGroupSelector,
  (conflict, betGroup) => conflict && notSingleBetGroup(betGroup),
);

const betSlipSomeConflictedWithBonusSelector = (state: TMixAppState): TTFuncParameters | null => {
  const group = betGroupSelector(state);

  if (group === EBetGroup.system) {
    return null;
  }

  const picks = betSlipPicksSelector(state);

  for (const pick of picks) {
    if (pick.disable) {
      continue;
    }

    const outcomeId = pick.outcomeId;

    switch (group) {
      case EBetGroup.single: {
        const stake = singleStakeMoneyByIdSelector(state, outcomeId);

        const freeBetPickError = betSlipFreeBetErrorForSinglePickSelector(state, outcomeId, stake);

        if (isNotNil(freeBetPickError)) {
          return freeBetPickError;
        }

        const freeBetTotalError = betSlipFreeBetErrorForSingleTotalSelector(state);

        if (isNotNil(freeBetTotalError)) {
          return freeBetTotalError;
        }

        const bonusError = betSlipBonusErrorForSinglePickSelector(state, outcomeId, stake);

        if (isNotNil(bonusError)) {
          return bonusError;
        }

        const limitError = betSlipLimitErrorByOutcomeIdSelectorFactory(state, outcomeId);

        if (isNotNil(limitError)) {
          return limitError;
        }

        break;
      }

      case EBetGroup.multi: {
        const freeBetPickError = betSlipFreeBetErrorForParlayPickSelector(state, outcomeId);

        if (isNotNil(freeBetPickError)) {
          return freeBetPickError;
        }

        const freeBetTotalError = betSlipFreeBetErrorForParlayTotalSelector(state);

        if (isNotNil(freeBetTotalError)) {
          return freeBetTotalError;
        }

        const bonusPickError = betSlipBonusErrorForParlayPickSelector(state, outcomeId);

        if (isNotNil(bonusPickError)) {
          return bonusPickError;
        }

        const bonusTotalError = betSlipBonusErrorForParlayTotalSelector(state);

        if (isNotNil(bonusTotalError)) {
          return bonusTotalError;
        }

        break;
      }
    }
  }

  return null;
};

export { betSlipSomeConflictSelector, notSingleConflictSelector, betSlipSomeConflictedWithBonusSelector };
