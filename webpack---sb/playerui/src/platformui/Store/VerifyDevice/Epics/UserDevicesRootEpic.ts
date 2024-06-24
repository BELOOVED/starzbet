import { combineEpics } from "redux-observable";
import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { devicesRoute } from "../../PlatformMatchOptions";
import { loadUserDeviceEpic, updateUserDevicesEpic } from "./LoadUserDeviceEpic";

const devicesRouterEpic = routerEpic(
  {
    name: "devices",
    match: getMatch(devicesRoute),
    onStart: () => loadUserDeviceEpic,
  },
);

const userDevicesRootEpic = combineEpics(
  devicesRouterEpic,
  updateUserDevicesEpic,
);

export { userDevicesRootEpic };
