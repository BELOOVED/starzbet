import { createSimpleSelector, useParamSelector } from "@sb/utils";
import { outcomeIdListByMarketIdSelector, outcomesSelector } from "../Selectors/FeedSelectors";

const virtualRacingOutcomeSelector = createSimpleSelector(
  [
    outcomeIdListByMarketIdSelector,
    outcomesSelector,
    (_, __, shortId) => shortId,
  ],
  (outcomeIdList: string[], outcomes, shortId) => outcomeIdList.find((outcomeId) => outcomes[outcomeId]?.parameters.outcome === shortId),
);

const useVirtualRacingOutcomeSelector = (marketId: string, shortId: string) => useParamSelector(
  virtualRacingOutcomeSelector,
  [marketId, shortId],
);

export { useVirtualRacingOutcomeSelector };
