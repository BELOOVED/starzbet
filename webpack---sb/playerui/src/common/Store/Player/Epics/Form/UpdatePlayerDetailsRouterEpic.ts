import { combineEpics } from "redux-observable";
import { routerEpic } from "@sb/router";
import { extractExport } from "@sb/utils";
import { routeMap } from "../../../../../platformui/RouteMap/RouteMap";
import { getMatch } from "../../../../Utils/RouterUtils/GetMatch";

const importAllEpics = () => Promise.all([
  import("./UpdatePlayerDetailsFormEpic").then(extractExport("updatePlayerDetailsFormEpic")),
  import("./UpdatePlayerPhoneNumberFormEpic").then(extractExport("updatePlayerPhoneNumberFormEpic")),
  import("./UpdatePlayerEmailFormEpic").then(extractExport("updatePlayerEmailFormEpic")),
  import("./UpdatePlayerEmailRequestEpic").then(extractExport("updatePlayerEmailRequestEpic")),
  import("./UpdatePlayerPhoneNumberRequestEpic").then(extractExport("updatePlayerPhoneNumberRequestEpic")),
]);

const updatePlayerDetailsRouterEpic = routerEpic({
  match: getMatch({ path: routeMap.myDetailsRoute, exact: true }),
  onStart: () => importAllEpics().then((res) => () => combineEpics(...res.map((epic) => epic()))),
});

export { updatePlayerDetailsRouterEpic };
