import { memo } from "react";
import { Route, type RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { EGamePage } from "@sb/betting-core/EGamePage";
import classes from "./VirtualGameProvider.module.css";
import { ResetedNavLink } from "../../../../../sportsbookui/Components/ResetedLink/ResetedLink";
import { NativeHorizontalScroll } from "../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { gameProviderTabs, tabsToGameProvider, type TGameProviderEnum } from "../../../../../common/Store/Provider/ProviderModel";
import { RedirectLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { type TVirtualGameProviderParams } from "../../../../Store/VirtualGame/Models/VirtualGameProviderParams";
import {
  gameByIdNotNilSelectors,
  pageProviderToGameMapNotNilSelectors,
  providerGamesLoadingSucceededSelector,
} from "../../../../Store/Games/Selectors/GamesSelectors";
import { concatIdForLoadingSymbol } from "../../../../Store/Games/GamesUtils";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { virtualGameFirstAvailableProviderSelector } from "../../../../Store/VirtualGame/Selectors/VirtualGameSelectors";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { TranslateRecord } from "../../../../Components/TranslateRecord/TranslateRecord";
import { VirtualGameFirstGame } from "../../../../Components/VirtualGameContainer/VirtualGameContainer";
import { VirtualGame } from "../VirtualGame/VirtualGame";

const Game = memo<IWithId & IProviderGamesProps>(({ id, provider }) => {
  const name = useParamSelector(gameByIdNotNilSelectors.name, [id]);

  const params = { provider: gameProviderTabs[provider], id };

  return (
    <ResetedNavLink
      to={routeMap.virtualGame}
      params={params}
      className={classes.game}
      activeClassName={classes.active}
    >
      <Ellipsis>
        <TranslateRecord record={name} />
      </Ellipsis>
    </ResetedNavLink>
  );
});
Game.displayName = "Game";

interface IProviderGamesProps {
  provider: TGameProviderEnum;
}

const ProviderGames = memo<IProviderGamesProps>(({ provider }) => {
  const gameIds = useParamSelector(pageProviderToGameMapNotNilSelectors.gameIds, [EGamePage.VIRTUAL, provider]);

  return (
    <NativeHorizontalScroll className={classes.list}>
      {gameIds.map((id) => <Game id={id} key={id} provider={provider} />)}
    </NativeHorizontalScroll>
  );
});
ProviderGames.displayName = "ProviderGames";

const VirtualGameProviderContent = memo<IProviderGamesProps>(({ provider }) => {
  const loaded = useParamSelector(providerGamesLoadingSucceededSelector, [concatIdForLoadingSymbol(provider, EGamePage.VIRTUAL)]);

  if (!loaded) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <ProviderGames provider={provider} />

      <Route path={routeMap.virtualGame} component={VirtualGame} />

      <VirtualGameFirstGame provider={provider} />
    </>
  );
});
VirtualGameProviderContent.displayName = "VirtualGameProviderContent";

const VirtualGameProvider = memo<RouteComponentProps<TVirtualGameProviderParams>>(({ match: { params: { provider: providerTab } } }) => {
  const firstAvailableProvider = useSelector(virtualGameFirstAvailableProviderSelector);
  const provider = tabsToGameProvider[providerTab];

  if (!provider) {
    const params = { provider: gameProviderTabs[firstAvailableProvider] };

    return <RedirectLocalized to={routeMap.virtualProvider} params={params} />;
  }

  return (
    <VirtualGameProviderContent provider={provider} />
  );
});
VirtualGameProvider.displayName = "VirtualGameProvider";

export { VirtualGameProvider };
