// @ts-nocheck
import { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { objToComponent } from "@sb/utils";
import classes from "./EsportLive.module.css";
import {
  RedirectLocalized,
} from "../../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { MobileEsportLiveNavMenu } from "../../../Desktop/Components/NavMenu/NavMenu";
import { SearchInput } from "../../../Components/SearchInput/SearchInput";

const withMenu = [
  routeMap.esport.live.root,
  routeMap.esport.live.sport,
  routeMap.esport.live.favourite,
];

const EsportLive = memo(({ routes }) => (
  <div className={classes.wrapper}>
    <Route path={withMenu} exact>
      <MobileEsportLiveNavMenu />
    </Route>

    <SearchInput
      backRoute={routeMap.esport.live.root}
      searchRoute={routeMap.esport.live.search}
      resultRoute={routeMap.esport.live.searchResult}
      eventRoute={routeMap.esport.live.event}

    />

    <div className={classes.container}>
      <Switch>
        {routes.map(objToComponent("path")(Route))}

        <RedirectLocalized to={routeMap.esport.live.root} />
      </Switch>
    </div>
  </div>
));
EsportLive.displayName = "EsportLive";

export { EsportLive };
