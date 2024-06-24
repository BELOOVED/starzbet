// @ts-nocheck
import { EScopeType } from "@sb/betting-core/EScopeType";
import { EMarketType } from "@sb/betting-core/MarketType";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { createMemoSelector, useParamSelector } from "@sb/utils";
import {
  eventsSelector,
  marketIdListByEventIdSelector,
  marketsSelector,
  marketToOutcomeMapSelector,
  outcomesSelector,
  scopesSelector,
  sportIdByEventIdSelector,
} from "../Selectors/FeedSelectors";
import { hasSomeParentLocked } from "../Model/Outcome/HasLocked";
import { inMainLine, marketTypesWithHandicap, marketTypesWithTotal } from "../Model/Market/Market";

const subtract = (a, b) => Number(a) - Number(b);

const score1x2Or12 = (type) => [EMarketType.score_1x2, EMarketType.score_12].includes(type);

const sportIds1x2Or12 = [
  ESportCode.snooker,
  ESportCode.lol,
  ESportCode.dota2,
].map((it) => sportCodeToIdMap[it]);

const existMarket = (sportId: string, markets, scopes, type) => (id) => {
  const market = markets[id];
  const scope = scopes[market.scopeId];

  if (sportIds1x2Or12.includes(sportId) && score1x2Or12(type)) {
    return inMainLine(sportId, scope.type) && score1x2Or12(market.type);
  }

  return (scope.type === EScopeType.over_times || inMainLine(sportId, scope.type)) && type === market.type;
};

const kironMarkets = [
  EMarketType.winner_number_race_odd_even,
  EMarketType.winner_number_race_high_low,
  EMarketType.winner_number_race_odd_even_high_low,
];

const withFairOdds = [...marketTypesWithHandicap, ...marketTypesWithTotal, ...kironMarkets];

const marketIdByTypeSelectorFactory = createMemoSelector(
  [
    marketIdListByEventIdSelector,
    sportIdByEventIdSelector,
    marketsSelector,
    scopesSelector,
    eventsSelector,
    marketToOutcomeMapSelector,
    outcomesSelector,
    (_, __, type) => type,
  ],
  (marketIdList, sportId: string, markets, scopes, events, marketToOutcomeMap, outcomes, type) => {
    if (withFairOdds.includes(type)) {
      const ahIdList = marketIdList.filter(existMarket(sportId, markets, scopes, type));

      const diffMap = {};

      ahIdList.forEach((marketId) => {
        const market = markets[marketId];

        if (hasSomeParentLocked(events[market.eventId], scopes[market.scopeId], market)) {
          return;
        }

        const coefficients = (marketToOutcomeMap[marketId] || [])
          .map((outcomeId) => outcomes[outcomeId].coefficient);

        if (coefficients.length !== 0) {
          diffMap[marketId] = Number(Math.abs(subtract(...coefficients)).toFixed(2));
        }
      });

      const min = Math.min(...Object.values(diffMap));

      return ahIdList.find((id) => diffMap[id] === min);
    }

    const marketId = marketIdList.find(existMarket(sportId, markets, scopes, type));

    return (
      marketId
    );
  },
  {
    expensive: true,
  },
);

const useMarketIdByTypeSelector = (type, eventId): string => useParamSelector(
  marketIdByTypeSelectorFactory,
  [eventId, type],
);

export { useMarketIdByTypeSelector };
