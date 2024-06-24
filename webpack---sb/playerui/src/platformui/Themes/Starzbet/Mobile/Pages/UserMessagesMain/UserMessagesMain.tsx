import { type ComponentType, createElement, memo } from "react";
import { Route, Switch } from "react-router-dom";

interface IUserMessagesMainProps {
  routes: { path: string; component: ComponentType; }[];
}

const UserMessagesMain = memo<IUserMessagesMainProps>(({ routes }) => (
  <Switch>
    {
      routes.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
        >
          {createElement(component)}
        </Route>
      ))
    }
  </Switch>
));
UserMessagesMain.displayName = "UserMessagesMain";

export { UserMessagesMain };
