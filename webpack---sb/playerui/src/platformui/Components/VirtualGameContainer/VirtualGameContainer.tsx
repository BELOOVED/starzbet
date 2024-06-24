import { type FC, memo, type PropsWithChildren, type ReactNode } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import { useParamSelector } from "@sb/utils";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import { gameProviderTabs, type TGameProviderEnum } from "../../../common/Store/Provider/ProviderModel";
import { RedirectLocalized } from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { generateLocalizedMatchPath } from "../../../common/Client/Core/Services/RouterService/Utils/GenerateLocalizedPathByRoute";
import { IS_STARZBET_KG } from "../../../ServerEnvironment";
import { baseRouteMap, routeMap } from "../../RouteMap/RouteMap";
import {
  virtualGameFirstAvailableGameSelector,
  virtualGameFirstAvailableProviderSelector,
} from "../../Store/VirtualGame/Selectors/VirtualGameSelectors";

interface IVirtualGameFirstGameProps {
  provider: TGameProviderEnum;
}

const VirtualGameFirstGame = memo<IVirtualGameFirstGameProps>(({ provider }) => {
  const firstGame = useParamSelector(virtualGameFirstAvailableGameSelector, [EGamePage.VIRTUAL, provider]);
  const isGamePage = useRouteMatch(routeMap.virtualGame);

  if (!isGamePage && firstGame) {
    const params = { provider: gameProviderTabs[provider], id: firstGame };

    return (
      <RedirectLocalized to={routeMap.virtualGame} params={params} />
    );
  }

  return null;
});
VirtualGameFirstGame.displayName = "VirtualGameFirstGame";

const virtualGameSportsbookRoute = generateLocalizedMatchPath(
  baseRouteMap.virtualProvider,
  { provider: gameProviderTabs[EProviderCode.KIRON] },
);

interface IVirtualGameContainerProps {
  sportsbookVirtual?: ReactNode;
}

const VirtualGameContainer: FC<PropsWithChildren<IVirtualGameContainerProps>> = ({ children, sportsbookVirtual }) => {
  const firstProvider = useSelector(virtualGameFirstAvailableProviderSelector);

  const params = { provider: gameProviderTabs[firstProvider] };

  return (
    <Switch>
      {IS_STARZBET_KG ? null : <Route path={virtualGameSportsbookRoute}>{sportsbookVirtual}</Route>}

      {children}

      <RedirectLocalized to={routeMap.virtualProvider} params={params} />
    </Switch>
  );
};
VirtualGameContainer.displayName = "VirtualGameContainer";

export { VirtualGameContainer, VirtualGameFirstGame };
