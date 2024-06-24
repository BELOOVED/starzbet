// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { createMemoSelector, useParamSelector } from "@sb/utils";
import { sortBy } from "../../../../Utils/SortBy";
import { marketsSelector } from "../../../Feed/Selectors/FeedSelectors";
import { ERacingRouletteTypeFieldEnum, racingRouletteFilterValueByElement, racingRouletteSimpleKeyMap } from "../Model/RacingRoulettte";

const marketListOrder = [
  EMarketType.place_number_racing_roulette_first,
  EMarketType.place_number_racing_roulette_first_second,
  EMarketType.place_number_racing_roulette_first_second_third,
  EMarketType.place_number_racing_roulette_two_from_three,
  EMarketType.place_number_racing_roulette_in_first_three,
];

const marketIdsSelector = createMemoSelector(
  [
    marketsSelector,
    (_, marketIds) => marketIds,
    (_, __, keyList) => keyList,
    (_, __, ___, type) => type,
  ],
  (markets, marketIds, keyList, type) => {
    let result = [];

    if (!keyList) {
      return result;
    }

    const filterList = racingRouletteFilterValueByElement(keyList, racingRouletteSimpleKeyMap[type]);
    const length = filterList.length;
    const marketFirstThreeId = marketIds.find(
      (id) =>
        markets[id].type === EMarketType.place_number_racing_roulette_in_first_three,
    );

    if (length > 0) {
      result = [
        ...result,
        {
          marketId: marketIds.find(
            (id) =>
              markets[id].type === EMarketType.place_number_racing_roulette_first,
          ),
          filterList,
        },
      ];

      if (type === ERacingRouletteTypeFieldEnum.numbers) {
        result = [
          ...result,
          {
            marketId: marketFirstThreeId,
            filterList: filterList.slice(0, 1),
          },
        ];
      }
    }
    if (length > 1) {
      result = [...result,
        {
          marketId: marketIds.find(
            (id) =>
              markets[id].type === EMarketType.place_number_racing_roulette_first_second,
          ),
          filterList,
        },
      ];
      if (type === ERacingRouletteTypeFieldEnum.numbers) {
        result = [...result,
          {
            marketId: marketFirstThreeId,
            filterList: filterList.slice(0, 2),
          },
        ];
      }
    }
    if (length > 2) {
      if (type === ERacingRouletteTypeFieldEnum.numbers) {
        result = [...result,
          {
            marketId: marketFirstThreeId,
            filterList,
          },
          {
            marketId: marketIds.find(
              (id) =>
                markets[id].type === EMarketType.place_number_racing_roulette_two_from_three,
            ),
            filterList,
          },
        ];
      } else {
        result = [...result,
          {
            marketId: marketIds.find(
              (id) =>
                markets[id].type === EMarketType.place_number_racing_roulette_first_second_third,
            ),
            filterList,
          },
        ];
      }
    }

    return sortBy(({ marketId }) => marketListOrder.indexOf(markets[marketId].type), result);
  },
);

const useRacingRouletteFilterSelector = (marketIds, keyList, type) => useParamSelector(
  marketIdsSelector,
  [marketIds, keyList, type],
);

export { useRacingRouletteFilterSelector };
