// @ts-nocheck
import { type ComponentType, createElement, memo } from "react";
import { Route, Switch } from "react-router-dom";
import { type RouteProps } from "react-router";
import { objToComponent } from "@sb/utils";
import classes from "./MyAccount.module.css";
import {
  RedirectLocalized,
} from "../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { ExpandableNavigationMenu } from "../../../Components/ExpandableNavigationMenu/ExpandableNavigationMenu";
import { PageContainer } from "../../Components/PageContainer/PageContainer";

type TMyAccountProps = {
  routes?: never;
  child: ComponentType;
} | {
  routes: RouteProps[];
  child?: never;
}

const Content = memo<TMyAccountProps>(({ routes, child }) => (
  <div className={classes.content}>
    {
      child
        ? createElement(child)
        : (
          <Switch>
            {routes.map(objToComponent("path")(Route))}

            <RedirectLocalized to={routeMap.myDetailsRoute} />
          </Switch>
        )
    }
  </div>
));
Content.displayName = "Content";

const MyAccount = memo<TMyAccountProps>(({ routes, child }) => (
  <PageContainer>
    <div className={classes.myAccount}>
      <ExpandableNavigationMenu />

      <Content routes={routes} child={child} />
    </div>
  </PageContainer>
));
MyAccount.displayName = "MyAccount";

export { MyAccount };
