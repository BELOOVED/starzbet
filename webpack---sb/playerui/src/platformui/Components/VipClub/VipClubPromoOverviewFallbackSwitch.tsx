import { Switch } from "react-router-dom";
import { type FC, type PropsWithChildren } from "react";
import { RedirectLocalized } from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { routeMap } from "../../RouteMap/RouteMap";

const VipClubPromoOverviewFallbackSwitch: FC<PropsWithChildren> = ({ children }) => (
  <Switch>
    {children}

    <RedirectLocalized to={routeMap.vipClubOverviewLevelRulesRoute} />
  </Switch>
);
VipClubPromoOverviewFallbackSwitch.displayName = "VipClubPromoOverviewFallbackSwitch";

export { VipClubPromoOverviewFallbackSwitch };
