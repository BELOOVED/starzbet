// @ts-nocheck
import { createSelector } from "reselect";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { EMarketType } from "@sb/betting-core/MarketType";
import { withParams } from "@sb/utils";
import { sortBy } from "../../../../Utils/SortBy";
import { eventToMarketMapSelector, marketsSelector, nextEventBySportIdSelector } from "../../../Feed/Selectors/FeedSelectors";

const sortByParameters = (markets) => (marketId) => markets[marketId].parameters.number;

const sortVoid = () => () => void 0;

const luckyLootMarketsByMarketTypeSelector = (marketType, sortFn = sortVoid) => createSelector(
  withParams(nextEventBySportIdSelector, sportCodeToIdMap[ESportCode.kiron_lucky_loot]),
  eventToMarketMapSelector,
  marketsSelector,
  (eventId, eventToMarketMap, markets) => {
    if (!eventId) {
      return void 0;
    }

    return sortBy(
      sortFn(markets),
      eventToMarketMap[eventId]
        .filter((marketId) => markets[marketId].type === marketType),
    );
  },
);

const luckyLootMarketByMarketTypeSelector = (marketType) => createSelector(
  luckyLootMarketsByMarketTypeSelector(marketType),
  (marketIds) => !marketIds || marketIds.length === 0 ? void 0 : marketIds[0],
);

const luckyLootFirstBallsMarketSelector = luckyLootMarketByMarketTypeSelector(EMarketType.score_lucky_loot_first_balls);
const luckyLootFirstColorMarketSelector = luckyLootMarketByMarketTypeSelector(EMarketType.score_lucky_loot_first_color);
const luckyLootHighLowMarketSelector = luckyLootMarketByMarketTypeSelector(EMarketType.score_lucky_loot_sum_high_low);
const luckyLootOddEvenMarketSelector = luckyLootMarketByMarketTypeSelector(EMarketType.score_lucky_loot_sum_odd_even);

const luckyLootColorCountMarketSelector = luckyLootMarketsByMarketTypeSelector(EMarketType.score_lucky_loot_colors_count);
const luckyLootSubsetInSetMarketSelector = luckyLootMarketsByMarketTypeSelector(
  EMarketType.score_lucky_loot_subset_in_set_strict,
  sortByParameters,
);

export {
  luckyLootFirstBallsMarketSelector,
  luckyLootFirstColorMarketSelector,
  luckyLootColorCountMarketSelector,
  luckyLootHighLowMarketSelector,
  luckyLootOddEvenMarketSelector,
  luckyLootSubsetInSetMarketSelector,
};
