import { createRootReducer, simpleReducer } from "@sb/utils";
import {
  liveSpinsAuthTokenAction,
  liveSpinsScriptLoadedAction,
  liveSpinsStreamersAction,
  liveSpinsStreamsAction,
} from "../Actions/LiveSpinsActions";

const liveSpinsStreamsReducer = simpleReducer(["streams"], ["liveSpins", "streams"]);

const liveSpinsStreamersReducer = simpleReducer([], ["liveSpins", "streamer"]);

const liveSpinsScriptLoadedReducer = simpleReducer(["loaded"], ["liveSpins", "scriptLoaded"]);

const liveSpinsAuthTokenReducer = simpleReducer(["token"], ["liveSpins", "authToken"]);

const liveStreamsRootReducer = createRootReducer([
  [liveSpinsStreamsReducer, liveSpinsStreamsAction],
  [liveSpinsScriptLoadedReducer, liveSpinsScriptLoadedAction],
  [liveSpinsStreamersReducer, liveSpinsStreamersAction],
  [liveSpinsAuthTokenReducer, liveSpinsAuthTokenAction],
]);

export { liveStreamsRootReducer };
