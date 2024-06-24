import { createOptionalPropertySelector, createPropertySelector, isNotVoid } from "@sb/utils";
import { callManagerWasSucceededSelector } from "@sb/call-manager";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ILiveSpinsState } from "../Model/Types";
import { LIVE_SPINS_LOADED_SYMBOL } from "../Model/Symbols";

const liveSpinsContentSelector = (state: ILiveSpinsState) => state.liveSpins;

const liveSpinsStreamsSelector = createOptionalPropertySelector(
  liveSpinsContentSelector,
  "streams",
);

const liveSpinsScriptLoadedSelector = createPropertySelector(
  liveSpinsContentSelector,
  "scriptLoaded",
);

const liveSpinsAuthTokenSelector = createPropertySelector(
  liveSpinsContentSelector,
  "authToken",
);

const isRenderLiveSpinsSelector = (state: TPlatformAppState) => {
  const wasSucceeded = callManagerWasSucceededSelector(state, LIVE_SPINS_LOADED_SYMBOL);

  const isScriptLoaded = liveSpinsScriptLoadedSelector(state);

  const streams = liveSpinsStreamsSelector(state);

  return wasSucceeded && isScriptLoaded && isNotVoid(streams);
};

export {
  liveSpinsStreamsSelector,
  liveSpinsScriptLoadedSelector,
  liveSpinsAuthTokenSelector,
  isRenderLiveSpinsSelector,
};
