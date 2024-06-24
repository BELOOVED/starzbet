// @ts-nocheck
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { EMarketType } from "@sb/betting-core/MarketType";
import { virtualGameMarketListSelector } from "../../Common/Selectors/VirtualGameMarketListSelector";

const sortMarketList = [
  EMarketType.score_roulette_numbers,
  EMarketType.score_roulette_odd_even,
  EMarketType.score_roulette_red_black,
];

const spinAndWinMarketListSelector = virtualGameMarketListSelector(
  sportCodeToIdMap[ESportCode.kiron_roulette],
  sortMarketList,
);

export { spinAndWinMarketListSelector };
