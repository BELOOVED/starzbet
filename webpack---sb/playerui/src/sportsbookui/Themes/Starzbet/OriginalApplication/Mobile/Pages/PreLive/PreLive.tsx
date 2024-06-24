// @ts-nocheck
import { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { objToComponent } from "@sb/utils";
import { ESportsbook_CouponView } from "@sb/graphql-client";
import classes from "./PreLive.module.css";
import {
  RedirectLocalized,
} from "../../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { PreLiveRootRoute } from "../../../../../../Components/PreLiveRootRoute/PreLiveRootRoute";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { ESportPeriod } from "../../../../../../Store/SportMenu/Model/SportPeriod";
import { MobilePreLiveNavMenu } from "../../../Desktop/Components/NavMenu/NavMenu";
import { SearchInput } from "../../../Components/SearchInput/SearchInput";
import { TopLeagues } from "../../Components/TopLeagues/TopLeagues";

const withMenu = [
  routeMap.preLive.period,
  routeMap.preLive.sport,
  routeMap.preLive.favourite,
  routeMap.preLive.coupon,
];

const searchInputRoutes = [
  {
    matchRoute: routeMap.preLive.root,
    searchRoute: routeMap.preLive.search,
    resultRoute: routeMap.preLive.searchResult,
  },
  {
    matchRoute: routeMap.tournament,
    searchRoute: routeMap.preLive.search,
    resultRoute: routeMap.preLive.searchResult,
  },
  {
    matchRoute: routeMap.category,
    searchRoute: routeMap.preLive.search,
    resultRoute: routeMap.preLive.searchResult,
  },
];

const path = {
  to: routeMap.preLive.period,
  params: { period: ESportPeriod.FORTY_EIGHT_HOURS },
};

const PreLive = memo(({ routes }) => (
  <div className={classes.wrapper}>
    <Route path={withMenu} exact>
      <TopLeagues viewType={ESportsbook_CouponView.topLeaguesMenu} />

      <MobilePreLiveNavMenu />
    </Route>

    <Switch>
      {
        searchInputRoutes.map(({ matchRoute, searchRoute, resultRoute }) => (
          <Route path={matchRoute} key={matchRoute}>
            <SearchInput
              backRoute={matchRoute}
              searchRoute={searchRoute}
              resultRoute={resultRoute}
              eventRoute={routeMap.preLive.event}
            />
          </Route>
        ))
      }
    </Switch>

    <div className={classes.container}>
      <Switch>
        {routes.map(objToComponent("path")(Route))}

        <RedirectLocalized {...path} />
      </Switch>

      <PreLiveRootRoute {...path} />
    </div>
  </div>
));
PreLive.displayName = "PreLive";

export { PreLive };
