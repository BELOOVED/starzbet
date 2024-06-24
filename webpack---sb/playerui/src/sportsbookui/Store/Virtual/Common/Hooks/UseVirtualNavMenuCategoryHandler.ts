import { EProviderCode } from "@sb/betting-core/EProviderCode";
import { gameProviderTabs } from "../../../../../common/Store/Provider/ProviderModel";
import { useLocalizedPushPath } from "../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../RouteMap/RouteMap";

const useVirtualNavMenuCategoryHandler = (categoryId: string) => useLocalizedPushPath(
  routeMap.virtual.category,
  {
    categoryId,
    provider: gameProviderTabs[EProviderCode.KIRON],
  },
);

export { useVirtualNavMenuCategoryHandler };
