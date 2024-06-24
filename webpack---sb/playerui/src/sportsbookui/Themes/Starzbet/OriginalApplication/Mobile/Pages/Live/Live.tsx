// @ts-nocheck
import { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { objToComponent } from "@sb/utils";
import classes from "./Live.module.css";
import {
  RedirectLocalized,
} from "../../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { MobileLiveNavMenu } from "../../../Desktop/Components/NavMenu/NavMenu";
import { SearchInput } from "../../../Components/SearchInput/SearchInput";

const withMenu = [
  routeMap.live.root,
  routeMap.live.sport,
  routeMap.live.favourite,
];

const Live = memo(({ routes }) => (
  <div className={classes.wrapper}>
    <Route path={withMenu} exact>
      <MobileLiveNavMenu />
    </Route>

    <SearchInput
      backRoute={routeMap.live.root}
      searchRoute={routeMap.live.search}
      resultRoute={routeMap.live.searchResult}
      eventRoute={routeMap.live.event}
    />

    <div className={classes.container}>
      <Switch>
        {routes.map(objToComponent("path")(Route))}

        <RedirectLocalized to={routeMap.live.root} />
      </Switch>
    </div>
  </div>
));
Live.displayName = "Live";

export { Live };
