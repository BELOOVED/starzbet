// @ts-nocheck
import { createSelector } from "reselect";
import { withParams } from "@sb/utils";
import { sortBy } from "../../../../Utils/SortBy";
import { eventToMarketMapSelector, marketsSelector, nextEventBySportIdSelector } from "../../../Feed/Selectors/FeedSelectors";

const virtualGameMarketListSelector = (sportId, sortMarketOrder = []) => createSelector(
  withParams(nextEventBySportIdSelector, sportId),
  eventToMarketMapSelector,
  marketsSelector,
  (eventId, eventToMarketMap, markets) => {
    if (!eventId) {
      return [];
    }

    return sortBy(
      (marketId) => sortMarketOrder.indexOf(markets[marketId].type),
      eventToMarketMap[eventId],
    );
  },
);

export { virtualGameMarketListSelector };
