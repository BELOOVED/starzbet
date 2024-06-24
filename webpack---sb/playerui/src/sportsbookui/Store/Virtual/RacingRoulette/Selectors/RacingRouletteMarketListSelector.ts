// @ts-nocheck
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { EMarketType } from "@sb/betting-core/MarketType";
import { virtualGameMarketListSelector } from "../../Common/Selectors/VirtualGameMarketListSelector";

const sortMarketList = [
  EMarketType.place_number_racing_roulette_first,
  EMarketType.place_number_racing_roulette_first_second,
  EMarketType.place_number_racing_roulette_first_second_third,
  EMarketType.place_number_racing_roulette_in_first_three,
  EMarketType.place_number_racing_roulette_two_from_three,
];

const racingRouletteMarketListSelector = virtualGameMarketListSelector(
  sportCodeToIdMap[ESportCode.kiron_racing_roulette],
  sortMarketList,
);

export { racingRouletteMarketListSelector };
