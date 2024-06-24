import { createSelector } from "reselect";
import { EBetGroup } from "../../Model/BetGroup";
import { betSlipPicksSelector } from "../BetSlipPicksSelectors";
import { betGroupSelector, betSlipPicksViewValidSelector } from "../BetSlipSelectors";

//todo
const uniqNotDisabledPicksViewSelector = createSelector(
  betSlipPicksSelector,
  (a) => betSlipPicksViewValidSelector(a),
);

const minPickCount = {
  [EBetGroup.single]: 1,
  [EBetGroup.multi]: 2,
  [EBetGroup.system]: 3,
};

const invalidPickCountViewSelector = createSelector(
  uniqNotDisabledPicksViewSelector,
  betGroupSelector,
  (picks, group) => picks.length < minPickCount[group],
);

const validPicksViewSelector = createSelector(
  betSlipPicksSelector,
  uniqNotDisabledPicksViewSelector,
  invalidPickCountViewSelector,
  (picks, uniqNotDisabledPicks, invalidPickCount) => invalidPickCount
    ? picks
    : uniqNotDisabledPicks,
);

export { uniqNotDisabledPicksViewSelector, invalidPickCountViewSelector, validPicksViewSelector };
