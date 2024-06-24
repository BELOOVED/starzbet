import { type ComponentType, type FC, type PropsWithChildren } from "react";
import { Route, Switch } from "react-router-dom";
import { withProps } from "@sb/utils";
import { routeMap } from "../../RouteMap/RouteMap";
import { type IPlayGamePageProps } from "./PlayGamePageFactory";

interface ISwitchWithPlayGameRoutesFactoryProps extends PropsWithChildren {
  playGamePage: ComponentType<IPlayGamePageProps>;
}

const SwitchWithPlayGameRoutesFactory: FC<ISwitchWithPlayGameRoutesFactoryProps> = ({ playGamePage, children }) => (
  <Switch>
    <Route path={routeMap.play} component={playGamePage} exact />

    <Route path={routeMap.playDemo} component={withProps(playGamePage)({ isDemo: true })} exact />

    <Route>
      {children}
    </Route>
  </Switch>
);
SwitchWithPlayGameRoutesFactory.displayName = "SwitchWithPlayGameRoutesFactory";

export { SwitchWithPlayGameRoutesFactory };
