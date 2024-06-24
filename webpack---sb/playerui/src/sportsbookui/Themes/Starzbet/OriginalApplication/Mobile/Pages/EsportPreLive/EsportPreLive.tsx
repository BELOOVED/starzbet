// @ts-nocheck
import { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { objToComponent } from "@sb/utils";
import { ESportsbook_CouponView } from "@sb/graphql-client";
import classes from "./EsportPreLive.module.css";
import {
  RedirectLocalized,
} from "../../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { PreLiveRootRoute } from "../../../../../../Components/PreLiveRootRoute/PreLiveRootRoute";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { ESportPeriod } from "../../../../../../Store/SportMenu/Model/SportPeriod";
import { MobileEsportPreLiveNavMenu } from "../../../Desktop/Components/NavMenu/NavMenu";
import { SearchInput } from "../../../Components/SearchInput/SearchInput";
import { TopLeagues } from "../../Components/TopLeagues/TopLeagues";

const path = {
  to: routeMap.esport.preLive.period,
  params: { period: ESportPeriod.FORTY_EIGHT_HOURS },
};

const withMenu = [
  routeMap.esport.preLive.period,
  routeMap.esport.preLive.sport,
  routeMap.esport.preLive.favourite,
  routeMap.esport.preLive.coupon,
];

const EsportPreLive = memo(({ routes }) => (
  <div className={classes.wrapper}>
    <Route path={withMenu} exact>
      <TopLeagues viewType={ESportsbook_CouponView.topLeaguesMenuEsports} esport />

      <MobileEsportPreLiveNavMenu />
    </Route>

    <SearchInput
      backRoute={routeMap.esport.preLive.root}
      searchRoute={routeMap.esport.preLive.search}
      resultRoute={routeMap.esport.preLive.searchResult}
      eventRoute={routeMap.esport.preLive.event}
    />

    <div className={classes.container}>
      <Switch>
        {routes.map(objToComponent("path")(Route))}

        <RedirectLocalized {...path} />
      </Switch>

      <PreLiveRootRoute {...path} />
    </div>
  </div>
));
EsportPreLive.displayName = "EsportPreLive";

export { EsportPreLive };
