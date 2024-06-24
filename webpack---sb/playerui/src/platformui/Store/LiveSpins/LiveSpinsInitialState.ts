import { type ILiveSpinsState } from "./Model/Types";

const liveSpinsInitialState: ILiveSpinsState = {
  liveSpins: {
    streams: null,
    streamer: null,
    scriptLoaded: false,
    authToken: null,
  },
};

export { liveSpinsInitialState };
