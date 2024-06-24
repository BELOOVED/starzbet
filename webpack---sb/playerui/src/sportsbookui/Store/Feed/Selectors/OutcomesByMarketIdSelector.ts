import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { createMemoSelector, getNotNil } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { outcomeSortFnByMarketMap } from "../Model/Outcome/OutcomeSortFnByMarketMap";
import {
  marketByIdSelector,
  outcomeIdListByMarketIdSelector,
  outcomesSelector,
  participantsByMarketIdSelector,
} from "./FeedSelectors";

const outcomesByMarketIdSelector = createMemoSelector(
  [
    marketByIdSelector,
    participantsByMarketIdSelector,
    outcomeIdListByMarketIdSelector,
    outcomesSelector,
  ],
  (market, participants, outcomeIdList, outcomes): string[] => {
    const notNilMarket = getNotNil(market, ["outcomesByMarketIdSelector"], "Market");
    if (!marketTypeToMarketGroupMap[notNilMarket.type] || !outcomeSortFnByMarketMap[marketTypeToMarketGroupMap[notNilMarket.type]]) {
      Logger.warn.selector("[outcomesByMarketIdSelector]", `Outcome sorting for market ${notNilMarket.type} is not define`);

      return outcomeIdList;
    }

    return outcomeSortFnByMarketMap[marketTypeToMarketGroupMap[notNilMarket.type]](
      outcomes,
      outcomeIdList,
      participants,
    );
  },
);

export { outcomesByMarketIdSelector };
