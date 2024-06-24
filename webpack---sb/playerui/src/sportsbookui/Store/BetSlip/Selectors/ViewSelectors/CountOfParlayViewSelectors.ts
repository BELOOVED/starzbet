// @ts-nocheck
import { createSelector } from "reselect";
import { computeCountOfParlay } from "../../Model/ComputeCountOfParlay";
import { EBetGroup } from "../../Model/BetGroup";
import { type IWithBetSlipState } from "../../BetSlipState";
import { betGroupSelector } from "../BetSlipSelectors";
import { betHashForMultiViewSelector } from "./BetSlipViewSelectors";
import { uniqNotDisabledPicksViewSelector, validPicksViewSelector } from "./ValidPicksViewSelector";
import { currentSystemHashViewSelector, systemsViewSelector } from "./SystemsViewSelectors";

const countOfParlayForMultiViewSelector = createSelector(
  betHashForMultiViewSelector,
  uniqNotDisabledPicksViewSelector,
  computeCountOfParlay,
);

const parlaysForSystemViewSelector = createSelector(
  systemsViewSelector,
  validPicksViewSelector,
  (systems, picks) => {
    const parlays = {};

    systems.forEach((hash) => {
      parlays[hash] = computeCountOfParlay(hash, picks);
    });

    return parlays;
  },
);

const countOfParlayForSystemByHashViewSelector = (hash) => createSelector(
  parlaysForSystemViewSelector,
  (parlays) => parlays[hash],
);

const countOfParlayForSystemViewSelector = createSelector(
  parlaysForSystemViewSelector,
  currentSystemHashViewSelector,
  (parlays, currentSystem) => parlays[currentSystem],
);

const countOfParlayByActiveBetGroupSelector = (state: IWithBetSlipState) => {
  const activeGroup = betGroupSelector(state);

  if (activeGroup === EBetGroup.multi) {
    return countOfParlayForMultiViewSelector(state);
  }
  if (activeGroup === EBetGroup.system) {
    return countOfParlayForSystemViewSelector(state);
  }

  throw new Error("countOfParlayByActiveBetGroupSelector -> try to get count of parlay for single bet group");
};

export {
  countOfParlayForMultiViewSelector,
  countOfParlayForSystemByHashViewSelector,
  countOfParlayForSystemViewSelector,
  countOfParlayByActiveBetGroupSelector,
};
