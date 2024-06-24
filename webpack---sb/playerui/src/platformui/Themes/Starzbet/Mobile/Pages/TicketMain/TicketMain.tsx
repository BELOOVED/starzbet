// @ts-nocheck
import { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { objToComponent } from "@sb/utils";

const TicketMain = memo(({ routes }) => (
  <Switch>
    {routes.map(objToComponent("path")(Route))}
  </Switch>
));
TicketMain.displayName = "TicketMain";

export { TicketMain };
