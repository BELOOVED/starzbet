import { combineEpics } from "redux-observable";
import { routerEpic } from "@sb/router";
import { extractExport } from "@sb/utils";
import { getMatch } from "../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { routeMap } from "../../RouteMap/RouteMap";

const virtualGameProviderRoutEpic = routerEpic({
  name: "virtualGameProviderRouteEpic",
  match: getMatch({ path: routeMap.virtualProvider }),
  onStart: () => import("./Epics/VirtualGamesLoadEpic").then(extractExport("virtualGamesLoadEpic")),
  shouldRestart: restartOnParamsChanged,
});

const virtualGameRoutEpic = routerEpic({
  name: "virtualGameRouteEpic",
  match: getMatch({ path: routeMap.virtualGame }),
  onStart: () => import("./Epics/VirtualGameLoadEpic").then(extractExport("virtualGameLoadEpic")),
  shouldRestart: restartOnParamsChanged,
});

const virtualGameRootEpic = combineEpics(
  virtualGameProviderRoutEpic,
  virtualGameRoutEpic,
);

export { virtualGameRootEpic };
