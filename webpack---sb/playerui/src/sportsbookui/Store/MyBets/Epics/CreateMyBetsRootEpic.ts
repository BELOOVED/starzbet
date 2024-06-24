import { combineEpics } from "redux-observable";
import { routerEpic } from "@sb/router";
import { whenPlayerIdExist } from "../../../../common/Store/Player/Epics/WhenPlayerIdExist";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { requestMyBetsAndUpdatePerIntervalEpic } from "./RequetsMyBetsEpic";
import { updateMyBetsIfEffectedEpic } from "./UpdateMyBetsEpic";
import { watchCountPlayerBetsEpic } from "./WatchCountPlayerBetsEpic";
import { editBetHistoryEpic } from "./EditBetHistoryEpic";
import { editBetEpic } from "./EditBetEpic";
import { requestBetByIdEpic } from "./RequestBetByIdEpic";
import { requestBetStatesEpic } from "./RequestBetStatesEpic";

const createMyBetsRootEpic = (routes: string[]) => routerEpic({
  name: "myBets",
  match: getMatch(routes),
  onStart: (): TAppEpic => combineEpics(
    whenPlayerIdExist(
      requestMyBetsAndUpdatePerIntervalEpic,
      updateMyBetsIfEffectedEpic,
      watchCountPlayerBetsEpic,
      editBetHistoryEpic,
      editBetEpic,
    ),
    requestBetByIdEpic,
    requestBetStatesEpic,
  ),
});

export { createMyBetsRootEpic };
