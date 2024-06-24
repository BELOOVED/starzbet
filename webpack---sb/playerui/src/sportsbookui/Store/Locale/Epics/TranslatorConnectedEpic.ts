import { type Epic } from "redux-observable";
import { type Action } from "redux";
import { EMPTY } from "rxjs";
import { type IWithRouterState } from "@sb/router";
import {
  createConnectedByRouteEpic,
  type IDepsWithConnection,
} from "../../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { type TDepsWithTranslator } from "../../../../common/Utils/EpicUtils/Dependencies";
import { routeMap } from "../../../RouteMap/RouteMap";

type TEpicWithTranslator<D = unknown> = Epic<Action, Action, IWithRouterState, D & TDepsWithTranslator>;

const sportsbookRoutes = [
  routeMap.share,
  routeMap.statistics.root,
  routeMap.preLive.root,
  routeMap.live.root,
  routeMap.virtual.root,
  routeMap.search.root,
  routeMap.betSlip,
  routeMap.esport.root,
  routeMap.tournament,
  routeMap.category,
  routeMap.sport,
  routeMap.sportsHistory,
  routeMap.myAccount.bonuses.root,
];

const translatorEpic: TEpicWithTranslator<IDepsWithConnection> = (action$, state$, dependencies) => {
  const lineTranslates = dependencies.translateControl.providers.lineTranslates;

  if (lineTranslates) {
    lineTranslates.setConnection(dependencies.connection);
  }

  return EMPTY;
};

const translatorConnectedEpic: TEpicWithTranslator = createConnectedByRouteEpic(sportsbookRoutes, translatorEpic);

export { translatorConnectedEpic };

