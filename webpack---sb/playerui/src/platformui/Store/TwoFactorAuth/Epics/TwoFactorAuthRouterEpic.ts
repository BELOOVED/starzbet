import { routerEpic } from "@sb/router";
import { extractExport } from "@sb/utils";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { routeMap } from "../../../RouteMap/RouteMap";

const twoFactorAuthRouterEpic = routerEpic(
  {
    name: "twoFactorAuthRouterEpic",
    match: getMatch({ path: routeMap.twoFactorAuthenticationRoute }),
    onStart: () => import("./TwoFactorAuthRootEpic").then(extractExport("twoFactorAuthRootEpic")),
  },
);

export { twoFactorAuthRouterEpic };
