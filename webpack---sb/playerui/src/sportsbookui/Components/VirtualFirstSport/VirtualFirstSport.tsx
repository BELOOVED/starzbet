import { memo } from "react";
import { useSelector } from "react-redux";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import { isNil, useParamSelector } from "@sb/utils";
import { gameProviderTabs } from "../../../common/Store/Provider/ProviderModel";
import { RedirectLocalized } from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import {
  sortedVirtualSportIdListSelector,
  virtualFirstCategoryBySportIdSelector,
} from "../../Store/SportMenu/Selectors/SportMenuSelectors";
import { routeMap } from "../../RouteMap/RouteMap";
import { isVirtualGame } from "../../Store/Feed/Model/Sport";

interface IFirstCategoryProps {
  sportId: string;
}

const FirstCategory = memo<IFirstCategoryProps>(({ sportId }) => {
  const firstCategory = useParamSelector(virtualFirstCategoryBySportIdSelector, [sportId]);

  if (!firstCategory) {
    return null;
  }

  const params = { categoryId: firstCategory, provider: gameProviderTabs[EProviderCode.KIRON] };

  return (
    <RedirectLocalized
      to={routeMap.virtual.category}
      params={params}
    />
  );
});
FirstCategory.displayName = "FirstCategory";

const VirtualFirstSport = memo(() => {
  const sports = useSelector(sortedVirtualSportIdListSelector);

  const firstSportId = sports[0];

  if (isNil(firstSportId)) {
    return null;
  }

  if (sports.includes(sportCodeToIdMap[ESportCode.kiron_soccer])) {
    return <FirstCategory sportId={sportCodeToIdMap[ESportCode.kiron_soccer]} />;
  }

  const params = { sportId: firstSportId, provider: gameProviderTabs[EProviderCode.KIRON] };

  if (isVirtualGame(firstSportId)) {
    return (
      <RedirectLocalized
        to={routeMap.virtual.roulette}
        params={params}
      />
    );
  }

  return <FirstCategory sportId={firstSportId} />;
});
VirtualFirstSport.displayName = "VirtualFirstSport";

export { VirtualFirstSport };
