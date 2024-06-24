// @ts-nocheck
import { createSelector } from "reselect";
import { type IBetSlipState } from "../BetSlipState";
import { betSlipPicksSelector } from "./BetSlipPicksSelectors";
import { betSlipSomeConflictSelector } from "./BetSlipSomeConflictSelector";

const isBanker = (pick) => pick.banker;

const isInvalidCount = (picks, bankers) => picks.length - bankers.length < 2;

const betSlipInvalidBankerCountSelector = createSelector(
  betSlipPicksSelector,
  (picks) => {
    const bankers = picks.filter(isBanker);

    const invalidBankerCount = isInvalidCount(picks, bankers);

    return bankers.length > 0 && invalidBankerCount;
  },
);

const betSlipInvalidBankerSelector = createSelector(
  betSlipPicksSelector,
  betSlipInvalidBankerCountSelector,
  betSlipSomeConflictSelector,
  (picks, invalidBankerCount, someConflict) => {
    const bankers = picks.filter(isBanker);

    if (bankers.length === 0) {
      return false;
    }

    return invalidBankerCount || someConflict;
  },
);

const betSlipNotInvalidBankerSelector = (state: IBetSlipState) => !betSlipInvalidBankerSelector(state);

export { betSlipInvalidBankerCountSelector, betSlipInvalidBankerSelector, betSlipNotInvalidBankerSelector };
