import { combineEpics } from "redux-observable";
import { of } from "rxjs";
import { routerEpic } from "@sb/router";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { callRequestMatchOptions } from "../../PlatformMatchOptions";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import {
  CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL,
  CALL_REQUESTS_LOADING_SYMBOL,
  CALL_REQUESTS_SLOTS_LOADING_SYMBOL,
} from "../CallRequestVariables";
import { cancelCallRequestEpic } from "./CancelCallRequestEpic";
import { createCallRequestFormEpic } from "./CreateCallRequestFormEpic";
import { callRequestsCallOptionsLoadEpic, callRequestsLoadActiveActualSlotsEpic, callRequestsLoadEpic } from "./CallRequestsLoadEpics";
import { callRequestsPaginatorEpic } from "./CallRequestsPaginatorEpic";

const callRequestsRootEpic = routerEpic({
  name: "callRequests",
  match: getMatch(callRequestMatchOptions),
  onStart: (): TPlatformEpic => combineEpics(
    cancelCallRequestEpic,
    callRequestsPaginatorEpic,
    callRequestsLoadEpic,
    createCallRequestFormEpic,
    callRequestsCallOptionsLoadEpic,
    callRequestsLoadActiveActualSlotsEpic,
  ),
  onStop: () => () =>
    of(callManagerRemoveSymbolAction(
      [
        CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL,
        CALL_REQUESTS_LOADING_SYMBOL,
        CALL_REQUESTS_SLOTS_LOADING_SYMBOL,
      ],
    )),
});

export { callRequestsRootEpic };
