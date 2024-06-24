import { type ESportCode } from "@sb/betting-core/ESportCode";
import { routeMap } from "../../../sportsbookui/RouteMap/RouteMap";
import { ESportPeriod } from "../../../sportsbookui/Store/SportMenu/Model/SportPeriod";
import { type TLocalizedRouteParams } from "../../Client/Core/Services/RouterService/Model/RoutesTypes";

const getSportPath = (sport: ESportCode, period: ESportPeriod = ESportPeriod.FORTY_EIGHT_HOURS): TLocalizedRouteParams<string> => (
  ({ to: routeMap.preLive.sport, params: { sportSlug: sport, period: period } })
);

export { getSportPath };
