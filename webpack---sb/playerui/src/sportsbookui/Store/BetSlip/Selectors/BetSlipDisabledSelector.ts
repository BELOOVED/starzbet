import { createSelector } from "reselect";
import {
  haveIncorrectPickRelatedToBonusSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BetSlip/BetSlipBonusBetErrorSelectors";
import {
  haveIncorrectPickRelatedToFreeBetSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BetSlip/BetSlipFreeBetErrorSelectors";
import { betSlipInvalidBankerSelector } from "./BetSlipInvalidBankerSelector";
import { notSingleConflictSelector } from "./BetSlipSomeConflictSelector";

const betSlipDisabledSelector = createSelector(
  betSlipInvalidBankerSelector,
  notSingleConflictSelector,
  haveIncorrectPickRelatedToBonusSelector,
  haveIncorrectPickRelatedToFreeBetSelector,
  (invalidBanker, conflict, haveIncorrectPickRelatedToBonus, haveIncorrectPickRelatedToFreeBet) =>
    invalidBanker || conflict || haveIncorrectPickRelatedToBonus || haveIncorrectPickRelatedToFreeBet,
);

export { betSlipDisabledSelector };
