// @ts-nocheck
import { countCombinationsWithoutRepetitions, countGroupedCombinationWithoutRepetitions } from "@sb/betting-core/Combinatorics";
import { groupBy } from "../../../Utils/GroupBy";
import { extractBanker, isAccumulatorHash, isBanker, isFoldHash, isSingleHash, parseHash, toAccumulatorHash } from "./BetHash";

/**
 * @see .dot/docs/bets.md
 */

const computeForBanker = (hash, picks) => {
  const [simpleHash, bankersCount] = extractBanker(hash);

  const { list, total } = parseHash(simpleHash);

  if (isAccumulatorHash(simpleHash)) {
    return computeCountOfParlay(toAccumulatorHash(total + bankersCount), picks);
  }

  return list[0] === 1
    ? total
    : computeCountOfParlay(simpleHash, picks.filter((pick) => !pick.banker));
};

function computeCountOfParlay(hash, picks): number {
  if (isBanker(hash)) {
    return computeForBanker(hash, picks);
  }

  if (isSingleHash(hash)) {
    return picks.length;
  }

  if (isFoldHash(hash)) {
    const { list } = parseHash(hash);

    const groups = Object.values(groupBy(
      (pick) => pick.outrightId
        ? pick.outrightId
        : pick.eventId,
      picks,
    ));

    return countGroupedCombinationWithoutRepetitions(groups, list[0]);
  }

  const { list, total } = parseHash(hash);

  const accumulatorCount = computeCountOfParlay(toAccumulatorHash(total), picks);

  let totalCount = 0;

  list.forEach((fold) => {
    totalCount += countCombinationsWithoutRepetitions(fold, total);
  });

  return totalCount * accumulatorCount;
}

export { computeCountOfParlay };
