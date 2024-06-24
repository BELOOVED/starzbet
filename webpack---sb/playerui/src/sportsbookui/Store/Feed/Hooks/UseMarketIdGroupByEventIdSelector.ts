// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { type IFlatMarket, type IFlatScope } from "@sb/betting-core/Feed/Types";
import { createMemoSelector, createSimpleSelector, useParamSelector } from "@sb/utils";
import { groupBy } from "../../../Utils/GroupBy";
import { sortWith } from "../../../Utils/SortWith";
import { ascend } from "../../../Utils/Ascend";
import { sortBy } from "../../../Utils/SortBy";
import {
  EVirtualRacingMarketTabEnum,
  virtualRacingCastGroupMarketType,
  virtualRacingGroupMarketType,
  virtualRacingMarketGroupWithAny,
  virtualRacingMarketPerTabMap,
} from "../../Virtual/Common/Model/VirtualRacingSport";
import { type TAppState } from "../../InitialState";
import { getOrderByMarketParameterNumber, groupMarketFn, sortMarketFn } from "../Model/Market/Market";
import { getOrderByScopeNumber, getOrderByScopeType } from "../Model/Scope";
import {
  marketIdListByEventIdSelector,
  marketsSelector,
  marketToOutcomeMapSelector,
  scopesSelector,
  sportIdByEventIdSelector,
} from "../Selectors/FeedSelectors";
import { marketTabEnum, marketTabMap, marketTabsBySport } from "../Model/Market/MarketTabMap";
import { type TMarketTab } from "../Model/TMarketTab";

const racingWinnerPlaceMarkets = [
  EMarketType.place_number_race_winner,
  EMarketType.place_number_race_place,
];

const racingCastMarkets = [
  EMarketType.place_number_race_swinger,
  EMarketType.place_number_race_forecast,
  EMarketType.place_number_race_reverse_forecast,
  EMarketType.place_number_race_tricast,
  EMarketType.place_number_race_reverse_tricast,
];

const racingMarkets = [
  ...racingWinnerPlaceMarkets,
  ...racingCastMarkets,
];

const marketIdPerTabListSelector = createMemoSelector(
  [
    marketIdListByEventIdSelector,
    marketsSelector,
    scopesSelector,
    (_, __, marketTab: keyof typeof marketTabEnum = marketTabEnum.all) => marketTab,
  ],
  (marketIdList, markets, scopes, marketTab) => {
    const tab = marketTabMap[marketTab];

    return marketIdList.filter((id) => {
      const market = markets[id];
      const scope = scopes[market.scopeId];

      return tab.filter(market, scope) && !racingMarkets.includes(market.type);
    });
  },
);

const marketIdGroupByEventIdSelectorFactory = createMemoSelector(
  [
    marketIdPerTabListSelector,
    marketsSelector,
    scopesSelector,
    sportIdByEventIdSelector,
    (_, __, marketTab) => marketTab,
  ],
  (idList, markets, scopes, sportId: string, marketTab) => {
    const getById = (id): [IFlatMarket, IFlatScope, string] => {
      const market = markets[id];
      const scope = scopes[market.scopeId];

      return [market, scope, sportId];
    };

    const tab = marketTabMap[marketTab];

    const groups = groupBy(
      (id) => groupMarketFn(...getById(id)),
      idList,
    );

    const list = [];

    Object.keys(groups).forEach((key) => {
      const group = groups[key];

      list.push(sortBy((id) => sortMarketFn(...getById(id)), group));
    });

    return sortWith(
      [
        ascend(([id]) => {
          const [market] = getById(id);

          return market.parameters.interval_from && market.parameters.interval_to
            ? market.parameters.interval_from + market.parameters.interval_to
            : 0;
        }),
        ascend(([id]) => {
          const [_, scope, sportId] = getById(id);

          return getOrderByScopeType(scope, sportId);
        }),
        ascend(([id]) => {
          const [_, scope] = getById(id);

          return getOrderByScopeNumber(scope);
        }),
        ascend(([id]) => {
          const [market] = getById(id);

          const index = tab.priority.indexOf(market.type);

          return index === -1 ? Infinity : index;
        }),
        ascend(([id]) => {
          const [market] = getById(id);

          return getOrderByMarketParameterNumber(market);
        }),
      ],
      list,
    );
  },
);

const racingMarketIdsGroupByMarketGroupSelector = createMemoSelector(
  [
    marketIdListByEventIdSelector,
    marketsSelector,
  ],
  (idList, markets) =>
    virtualRacingGroupMarketType
      .map((marketTypes) => marketTypes.reduce(
        (acc, marketType) => {
          if (virtualRacingMarketGroupWithAny.includes(marketType)) {
            return {
              ...acc,
              anyOrder: idList.find((id) => markets[id].type === marketType),
            };
          } else {
            return {
              ...acc,
              ordered: idList.find((id) => markets[id].type === marketType),
            };
          }
        },
        {},
      )),
);

const useRacingMarketIdsGroupByMarketGroupSelector = (eventId) => useParamSelector(
  racingMarketIdsGroupByMarketGroupSelector,
  [eventId],
);

const raceWinnerMarketIdGroupByEventIdSelector = createMemoSelector(
  [
    marketIdListByEventIdSelector,
    marketsSelector,
  ],
  (idList, markets) =>
    sortBy(
      (id) => racingMarkets.indexOf(markets[id].type),
      idList.filter((id) => racingMarkets.includes(markets[id].type)),
    ),
);

const totalOutcomesPerMarketTabSelector = createSimpleSelector(
  [
    marketIdPerTabListSelector,
    marketToOutcomeMapSelector,
  ],
  (marketIdList, marketToOutcomeMap) => marketIdList
    .reduce((acc, marketId) => acc + marketToOutcomeMap[marketId].length, 0),
);

const marketListWithoutEmptySelector = (state: TAppState, eventId: string, sportId: string) => {
  const tabs = marketTabsBySport[sportId] || [];

  return tabs.filter(({ id }) => {
    const total = totalOutcomesPerMarketTabSelector(state, eventId, id);

    return total > 0;
  });
};

const useMarketIdGroupByEventIdSelector = (eventId, marketTab: TMarketTab = marketTabEnum.all): string[][] => useParamSelector(
  marketIdGroupByEventIdSelectorFactory,
  [eventId, marketTab],
);

const useRaceWinnerMarketIdGroupByEventIdSelector = (eventId) => useParamSelector(
  raceWinnerMarketIdGroupByEventIdSelector,
  [eventId],
);

const raceMarketIdPerTabByEventIdSelector = createMemoSelector(
  [
    raceWinnerMarketIdGroupByEventIdSelector,
    marketsSelector,
    (_, __, marketTab) => marketTab,
  ],
  (idList, markets, marketTab) =>
    sortBy(
      (id) => Object.values(virtualRacingMarketPerTabMap).findIndex((typeList) => typeList.includes(markets[id].type)),
      idList.filter((id) => virtualRacingMarketPerTabMap[marketTab].includes(markets[id].type)),
    ),
);

const useRaceMarketIdPerTabByEventIdSelector = (eventId, marketTab = EVirtualRacingMarketTabEnum.winner) => useParamSelector(
  raceMarketIdPerTabByEventIdSelector,
  [eventId, marketTab],
);

const raceWinnerPlaceMarketsIdsSelector = createMemoSelector(
  [
    marketIdListByEventIdSelector,
    marketsSelector,
  ],
  (idList, markets) =>
    sortBy(
      (id) => racingWinnerPlaceMarkets.indexOf(markets[id].type),
      idList.filter((id) => racingWinnerPlaceMarkets.includes(markets[id].type)),
    ),
);

const useRaceWinnerPlaceMarketsIdsSelector = (eventId) => useParamSelector(
  raceWinnerPlaceMarketsIdsSelector,
  [eventId],
);

const raceCastMarketIdsSelector = createMemoSelector(
  [
    marketIdListByEventIdSelector,
    marketsSelector,
  ],
  (idList, markets) =>
    virtualRacingCastGroupMarketType
      .map((marketTypes) => marketTypes.reduce(
        (acc, marketType) => {
          if (virtualRacingMarketGroupWithAny.includes(marketType)) {
            return {
              ...acc,
              anyOrder: idList.find((id) => markets[id].type === marketType),
            };
          } else {
            return {
              ...acc,
              ordered: idList.find((id) => markets[id].type === marketType),
            };
          }
        },
        {},
      )),
);

const useRaceCastMarketIdsSelector = (eventId) => useParamSelector(
  raceCastMarketIdsSelector,
  [eventId],
);

export {
  useMarketIdGroupByEventIdSelector,
  useRaceWinnerMarketIdGroupByEventIdSelector,
  raceWinnerMarketIdGroupByEventIdSelector,
  useRaceMarketIdPerTabByEventIdSelector,
  useRaceWinnerPlaceMarketsIdsSelector,
  useRaceCastMarketIdsSelector,
  useRacingMarketIdsGroupByMarketGroupSelector,
  totalOutcomesPerMarketTabSelector,
  marketListWithoutEmptySelector,
};
