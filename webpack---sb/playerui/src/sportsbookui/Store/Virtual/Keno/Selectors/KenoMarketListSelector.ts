// @ts-nocheck
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { EMarketType } from "@sb/betting-core/MarketType";
import { virtualGameMarketListSelector } from "../../Common/Selectors/VirtualGameMarketListSelector";

const sortMarketList = [EMarketType.score_keno_heads_tails, EMarketType.score_keno_subset_in_set];

const kenoMarketListSelector = virtualGameMarketListSelector(
  sportCodeToIdMap[ESportCode.kiron_keno],
  sortMarketList,
);

export { kenoMarketListSelector };
