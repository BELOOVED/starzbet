import { type TPageInfo_Fragment } from "@sb/graphql-client";
import type { TPlatform_PlayerTransaction_Fragment } from "@sb/graphql-client/PlayerUI";
import { type EHistoryProduct } from "./Model/EHistoryProduct";

const historyReceivedAction = (nodes: TPlatform_PlayerTransaction_Fragment[], pageInfo: TPageInfo_Fragment, product: EHistoryProduct) => ({
  type: "@HISTORY/RECEIVED",
  payload: { nodes, pageInfo, product },
});

const historyChangeDurationAction = (duration: number) => ({
  type: "@HISTORY/CHANGE_DURATION",
  payload: { duration },
});

const historyChangeIntervalAction = (from: number, to: number) => ({
  type: "@HISTORY/CHANGE_INTERVAL",
  payload: { from, to },
});

const historyNextPageAction = () => ({
  type: "@HISTORY/NEXT_PAGE",
});

const historyPrevPageAction = () => ({
  type: "@HISTORY/PREV_PAGE",
});

const historyClearAction = () => ({
  type: "@HISTORY/CLEAR",
});

export {
  historyReceivedAction,
  historyChangeDurationAction,
  historyChangeIntervalAction,
  historyNextPageAction,
  historyPrevPageAction,
  historyClearAction,
};

