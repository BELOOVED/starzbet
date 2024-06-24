import { type FC, type PropsWithChildren } from "react";
import { Switch } from "react-router-dom";
import { RedirectLocalized } from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { routeMap } from "../../RouteMap/RouteMap";

const VipClubLeadersPeriodFallbackSwitch: FC<PropsWithChildren> = ({ children }) => (
  <Switch>
    {children}

    <RedirectLocalized to={routeMap.vipClubLeadersDailyPeriodRoute} />
  </Switch>
);
VipClubLeadersPeriodFallbackSwitch.displayName = "VipClubLeadersPeriodFallbackSwitch";

export { VipClubLeadersPeriodFallbackSwitch };
