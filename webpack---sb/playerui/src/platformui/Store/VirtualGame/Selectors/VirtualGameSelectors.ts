import { createMemoSelector, createSimpleSelector, getNotNil, withParams } from "@sb/utils";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath, type TExtractRouteParams } from "@sb/react-router-compat";
import { loggedSelector } from "@sb/auth";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { tabsToGameProvider, type TGameProviderEnum } from "../../../../common/Store/Provider/ProviderModel";
import { routeMap } from "../../../RouteMap/RouteMap";
import {
  gameByIdNotNilSelectors,
  pageProviderToGameMapNotNilSelectors,
  providerGamesLoadingSucceededSelector,
  providersWithGamesByPageSelector,
} from "../../Games/Selectors/GamesSelectors";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { concatIdForLoadingSymbol } from "../../Games/GamesUtils";
import { virtualGameSportsbookProviderList } from "../Models/VirtualGameModel";

const EMPTY_ARRAY: TGameProviderEnum[] = [];

const virtualGameProviderListSelector = createMemoSelector(
  [withParams(providersWithGamesByPageSelector, EGamePage.VIRTUAL)],
  (providers) => EMPTY_ARRAY.concat(virtualGameSportsbookProviderList, providers),
);

const virtualGameFirstAvailableProviderSelector = createSimpleSelector(
  [virtualGameProviderListSelector],
  (providerList) => getNotNil(providerList[0], ["virtualGameFirstAvailableProviderSelector", "virtualGameProviderListSelector"], "providerList[0]"),
);

const isVirtualGameOpenLoginModalSelector = (state: TPlatformAppState) => {
  const pathName = routerLocationPathnameSelector(state);
  const match = matchPath<TExtractRouteParams<typeof routeMap.virtualGame, string>>(pathName, { path: routeMap.virtualGame });

  if (!match) {
    return false;
  }

  const { params: { provider: providerTab, id } } = match;
  const provider = tabsToGameProvider[providerTab];

  const loaded = provider && providerGamesLoadingSucceededSelector(state, concatIdForLoadingSymbol(provider, EGamePage.VIRTUAL));

  if (!loaded) {
    return false;
  }

  const isDemoAvailable = gameByIdNotNilSelectors.isDemoAvailable(state, id);

  if (isDemoAvailable) {
    return false;
  }
  const logged = loggedSelector(state);

  return !logged;
};

const virtualGameNameSelector = (state: TPlatformAppState) => {
  const pathName = routerLocationPathnameSelector(state);
  const match = matchPath<TExtractRouteParams<typeof routeMap.virtualGame, string>>(pathName, { path: routeMap.virtualGame });

  if (!match) {
    return null;
  }

  const { params: { provider: providerTab, id } } = match;
  const provider = tabsToGameProvider[providerTab];

  const loaded = provider && providerGamesLoadingSucceededSelector(state, concatIdForLoadingSymbol(provider, EGamePage.VIRTUAL));

  if (!loaded) {
    return null;
  }

  return gameByIdNotNilSelectors.name(state, id);
};

const virtualGameFirstAvailableGameSelector = createSimpleSelector(
  [pageProviderToGameMapNotNilSelectors.gameIds],
  (gameIds) => gameIds[0],
);

export {
  virtualGameProviderListSelector,
  virtualGameFirstAvailableProviderSelector,
  isVirtualGameOpenLoginModalSelector,
  virtualGameFirstAvailableGameSelector,
  virtualGameNameSelector,
};
