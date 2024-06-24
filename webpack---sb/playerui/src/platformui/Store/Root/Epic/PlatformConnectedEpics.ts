import { combineEpics } from "redux-observable";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { filter } from "rxjs";
import { type TMixAppEpic, type TMixConnectedAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { translatorConnectedEpic } from "../../../../sportsbookui/Store/Locale/Epics/TranslatorConnectedEpic";
import { whenLoggedAndWsAuthenticatedEpic } from "../../../../common/Store/WsAuth/WsAuthEpic";
import { isNotNilPlayerProfileSelector } from "../../../../common/Store/Player/Selectors/ProfileSelectors";
import { createConnectedByRouteEpic } from "../../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { routeMap } from "../../../../sportsbookui/RouteMap/RouteMap";
import { notOnPlayGameRoute } from "../../../Utils/NotOnPlayGameRoute";
import { pragmaticDgaConnectedByRouteEpic } from "../../PragmaticDga/Epics/PragmaticDgaConnectedByRouteEpic";
import { userMessageConnectedEpic } from "../../UserMessage/Epics/UserMessageConnectedEpic";
import { syncTicketEpic } from "../../Ticket/Epics/SyncTicketEpic";

const requireWSAuthEpic: TMixConnectedAppEpic = (action$, state$, dependencies) => state$.pipe(
  map(isNotNilPlayerProfileSelector),
  distinctUntilChanged(),
  filter(Boolean),
  switchMap(() => notOnPlayGameRoute(
    userMessageConnectedEpic,
  )(action$, state$, dependencies)),
);

const connectedEpic: TMixAppEpic = createConnectedByRouteEpic([routeMap.any], requireWSAuthEpic);

const platformConnectedEpics: TMixAppEpic = (...args) => combineEpics(
  translatorConnectedEpic,
  pragmaticDgaConnectedByRouteEpic,
  syncTicketEpic,
  whenLoggedAndWsAuthenticatedEpic(connectedEpic),
)(...args);

export { platformConnectedEpics };
