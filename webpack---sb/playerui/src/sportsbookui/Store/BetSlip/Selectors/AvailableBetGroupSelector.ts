// @ts-nocheck
import { createSelector } from "reselect";
import { partition } from "../../../Utils/Partition";
import { EBetGroup } from "../Model/BetGroup";
import { generateFoldAndSystemHashes, isAccumulatorHash } from "../Model/BetHash";
import { betSlipPicksSelector } from "./BetSlipPicksSelectors";

const availableBetGroupSelector = createSelector(
  betSlipPicksSelector,
  (picks) => {
    const groups: EBetGroup[] = [];

    if (picks.length > 0) {
      groups.push(EBetGroup.single);
    }

    if (picks.some((pick) => pick.outrightId)) {
      return groups;
    }

    const [accumulators, systems] = partition(isAccumulatorHash, generateFoldAndSystemHashes(picks));

    if (accumulators.length > 0) {
      groups.push(EBetGroup.multi);
    }

    if (systems.length > 0) {
      groups.push(EBetGroup.system);
    }

    return groups;
  },
);

export { availableBetGroupSelector };
