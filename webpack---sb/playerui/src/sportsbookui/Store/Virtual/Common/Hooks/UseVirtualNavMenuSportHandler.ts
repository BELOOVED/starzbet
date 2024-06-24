import { useCallback } from "react";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import { useParamSelector } from "@sb/utils";
import { gameProviderTabs } from "../../../../../common/Store/Provider/ProviderModel";
import { useLocalizedPush } from "../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { isVirtualGame } from "../../../Feed/Model/Sport";
import { virtualFirstCategoryBySportIdSelector } from "../../../SportMenu/Selectors/SportMenuSelectors";

const useVirtualNavMenuSportHandler = (sportId: string) => {
  const firstCategory = useParamSelector(virtualFirstCategoryBySportIdSelector, [sportId]);
  const push = useLocalizedPush();

  return useCallback(
    () => {
      if (isVirtualGame(sportId)) {
        push(routeMap.virtual.roulette, { sportId: sportId, provider: gameProviderTabs[EProviderCode.KIRON] });
      } else if (firstCategory) {
        push(routeMap.virtual.category, { categoryId: firstCategory, provider: gameProviderTabs[EProviderCode.KIRON] });
      }
    },
    [sportId, firstCategory],
  );
};

export { useVirtualNavMenuSportHandler };
