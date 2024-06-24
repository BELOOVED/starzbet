import { useEffect, useState } from "react";
import { useParamSelector } from "@sb/utils";
import { marketTabEnum, marketTabsBySport } from "../Model/Market/MarketTabMap";
import { type TMarketTab } from "../Model/TMarketTab";
import { marketListWithoutEmptySelector } from "./UseMarketIdGroupByEventIdSelector";

const selectInitialTab = (sportId: string, tab: TMarketTab) =>
  (marketTabsBySport[sportId] || []).some((it) => it.id === tab) ? tab : marketTabEnum.all;

const useMarketTabs = (sportId: string, eventId: string, defaultTab: TMarketTab = marketTabEnum.all) => {
  const [marketTab, setMarketTab] = useState(selectInitialTab(sportId, defaultTab));

  useEffect(() => setMarketTab(selectInitialTab(sportId, defaultTab)), [sportId]);

  const list = useParamSelector(marketListWithoutEmptySelector, [eventId, sportId]);

  return [
    list,
    marketTab,
    setMarketTab,
  ] as const;
};

export { useMarketTabs };
