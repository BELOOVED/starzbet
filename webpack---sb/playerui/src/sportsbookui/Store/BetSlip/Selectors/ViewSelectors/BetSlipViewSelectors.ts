// @ts-nocheck
import { createSimpleSelector, getNotNil } from "@sb/utils";
import { generateFoldHashes, isAccumulatorHash, singleHash } from "../../Model/BetHash";
import { EBetGroup } from "../../Model/BetGroup";
import { betGroupSelector } from "../BetSlipSelectors";
import { validPicksViewSelector } from "./ValidPicksViewSelector";
import { currentSystemHashViewSelector } from "./SystemsViewSelectors";

const betHashForMultiViewSelector = createSimpleSelector(
  [validPicksViewSelector],
  (picks) => getNotNil(generateFoldHashes(picks).find(isAccumulatorHash), ["betHashForMultiViewSelector"], "hash"),
);

const currentBetHashViewSelector = (state) => {
  const group = betGroupSelector(state);

  if (group === EBetGroup.multi) {
    return betHashForMultiViewSelector(state);
  }

  if (group === EBetGroup.system) {
    return currentSystemHashViewSelector(state);
  }

  return singleHash;
};

export { betHashForMultiViewSelector, currentBetHashViewSelector };
