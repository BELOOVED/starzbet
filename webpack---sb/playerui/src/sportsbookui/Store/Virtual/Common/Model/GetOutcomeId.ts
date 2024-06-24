import { sortBy } from "../../../../Utils/SortBy";

const outcomeParametersToString = (outcomeParameters: Record<string, string>) => sortBy(
  ([key]) => key,
  Object.entries(outcomeParameters),
).map(([key, value]) => `${key}::${value}`).join("__");

const virtualGameGetOutcomeId = (marketId: string, outcomeParameters: Record<string, string>) => `${marketId}->${outcomeParametersToString(outcomeParameters)}`;

const getVirtualGameMarketIdByOutcomeId = (outcomeId: string) => {
  const [firstPath] = outcomeId.split(/__predicate::/) as [string, ...string[]];

  const [marketId, ...outcome] = firstPath.split(/->outcome::|->first::|__second::|__third::/);

  return {
    marketId,
    outcome,
  };
};

export { virtualGameGetOutcomeId, getVirtualGameMarketIdByOutcomeId };

