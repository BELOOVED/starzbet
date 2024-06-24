// @ts-nocheck
import { createSelector } from "reselect";
import { EBetGroup } from "../Model/BetGroup";
import { betSlipPicksSelector } from "./BetSlipPicksSelectors";
import { betGroupSelector } from "./BetSlipSelectors";

const invalidSelection = (count, group) => {
  if (group === EBetGroup.single && count < 1) {
    return true;
  }

  if (group === EBetGroup.multi && count < 2) {
    return true;
  }

  if (group === EBetGroup.system && count < 3) {
    return true;
  }

  return false;
};

const betSlipInvalidSelectionSelector = createSelector(
  betSlipPicksSelector,
  betGroupSelector,
  (currentPicks, group) => {
    const notDisabled = currentPicks.filter(({ disable }) => !disable);

    return invalidSelection(notDisabled.length, group);
  },
);

export { betSlipInvalidSelectionSelector };
