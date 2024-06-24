import { EGamePage } from "@sb/betting-core/EGamePage";
import { routeMap } from "../../../RouteMap/RouteMap";

const ROUTE_PER_LABEL_AND_PROVIDER_MAP: Record<string, EGamePage> = {
  [routeMap.casinoLabel]: EGamePage.CASINO,
  [routeMap.liveCasinoLabel]: EGamePage.LIVE_CASINO,
  [routeMap.gamesLabel]: EGamePage.GAMES,
  [routeMap.casinoProvider]: EGamePage.CASINO,
  [routeMap.liveCasinoProvider]: EGamePage.LIVE_CASINO,
  [routeMap.gamesProvider]: EGamePage.GAMES,
};

export { ROUTE_PER_LABEL_AND_PROVIDER_MAP };
