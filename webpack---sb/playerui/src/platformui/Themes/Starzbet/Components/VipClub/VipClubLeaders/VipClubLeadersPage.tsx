import { memo } from "react";
import { Route } from "react-router-dom";
import classes from "./VipClubLeadersPage.module.css";
import { VipClubLeadersPeriodFallbackSwitch } from "../../../../../Components/VipClub/VipClubLeadersPeriodFallbackSwitch";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { VipClubLeadersPeriodPageFallbackSwitch } from "../../../../../Components/VipClub/VipClubLeadersPeriodPageFallbackSwitch";
import { VipClubLeadersTabs } from "../VipClubTabs/VipClubTabs";
import { VipClubLeaderBoard } from "../VipClubLeaderBoard/VipClubLeaderBoard";

const VipClubLeadersPeriod = memo(() => (
  <VipClubLeadersPeriodPageFallbackSwitch>
    <Route path={routeMap.vipClubLeadersPeriodPageRoute} component={VipClubLeaderBoard} />
  </VipClubLeadersPeriodPageFallbackSwitch>
));
VipClubLeadersPeriod.displayName = "VipClubLeadersPeriod";

const VipClubLeadersPage = memo(() => (
  <div className={classes.vipClubLeadersPage}>
    <VipClubLeadersTabs />

    <VipClubLeadersPeriodFallbackSwitch>
      <Route path={routeMap.vipClubLeadersPeriodRoute} component={VipClubLeadersPeriod} />
    </VipClubLeadersPeriodFallbackSwitch>
  </div>
));
VipClubLeadersPage.displayName = "VipClubLeadersPage";

export { VipClubLeadersPage };
