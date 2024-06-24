// @ts-nocheck
import { treeToFlat } from "@sb/betting-core/Feed/TreeToFlat";
import { type IFlatFeed } from "@sb/betting-core/Feed/Types";
import { EPostfix } from "@sb/sdk";
import { IS_SERVER } from "@sb/utils";

//TODO
interface IWithFeed {
  feed: {
    version: number;
    mainLine: IFlatFeed;
    retriedNumber: number;
    lineReady: Record<EPostfix, boolean>;
    eventSub: {
      subscribers: Record<string, unknown>;
      subscriptions: Record<string, unknown>;
      fetched: Record<string, unknown>;
    };
  };
}

const preloadedState = {};

if (!IS_SERVER && window.__PRELOADED_STATE__?.common) {
  // Grab the state from a global variable injected into the server-generated HTML
  preloadedState.common = window.__PRELOADED_STATE__.common;

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__.common;
}

const defaultCommon = {
  versions: [0],
};

const createFeedState = ({ common = defaultCommon } = preloadedState) => ({
  version: common.versions[0],
  mainLine: treeToFlat(common),
  lineReady: {
    [EPostfix.erisgaming]: common !== defaultCommon,
    [EPostfix.kiron]: false,
  },
  retriedNumber: common === defaultCommon ? -1 : 0, // preloaded state -> 0, normal mode -> -1
  eventSub: {
    subscribers: {},
    subscriptions: {},
    fetched: {},
  },
});

const feedState = {
  feed: createFeedState(preloadedState),
};

export { createFeedState, feedState };
export type { IWithFeed };
