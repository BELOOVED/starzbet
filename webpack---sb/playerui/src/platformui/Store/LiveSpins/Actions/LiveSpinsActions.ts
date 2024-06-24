import { type IStreamer, type TStream } from "../Model/Types";

const liveSpinsStreamsAction = (streams: TStream[]) => ({
  type: "@LIVE_SPINS/STREAMS_ACTION",
  payload: { streams },
});

const liveSpinsStreamersAction = (streamers: IStreamer[]) => ({
  type: "@LIVE_SPINS/STREAMERS_ACTION",
  payload: { streamers },
});

const liveSpinsScriptLoadedAction = (loaded: boolean) => ({
  type: "@LIVE_SPINS/SCRIPT_LOADED_ACTION",
  payload: { loaded },
});

const liveSpinsAuthTokenAction = (token: string) => ({
  type: "@LIVE_SPINS/AUTH_TOKEN_ACTION",
  payload: { token },
});

export {
  liveSpinsStreamersAction,
  liveSpinsStreamsAction,
  liveSpinsScriptLoadedAction,
  liveSpinsAuthTokenAction,
};
