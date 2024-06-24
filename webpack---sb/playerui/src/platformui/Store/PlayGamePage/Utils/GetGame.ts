import { matchPath } from "@sb/react-router-compat";
import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IWithGameId } from "../../../../common/IWith";
import { routeMap } from "../../../RouteMap/RouteMap";

const GAME_ROUTES = [routeMap.playGame, routeMap.gamePreview, routeMap.playDemoGame];

const getGameId = (pathname: string) => {
  const match = matchPath<IWithGameId>(pathname, GAME_ROUTES);

  return match?.params.gameId;
};

const getGame = (pathname: string, games: TPlatform_Game_Fragment[]) => {
  const gameId = getGameId(pathname);

  if (!gameId) {
    return undefined;
  }

  return games.find((it) => it.id === gameId);
};

export { getGame, getGameId };
