import type { IAnyAction, TExplicitAny } from "@sb/utils";
import { type TIdList, type TSymbolList } from "./CallManagerHelpers";

const callManagerStartAction = (symbol: TSymbolList, id?: TIdList) => ({
  type: "@CALL_MANAGER/START",
  payload: {
    symbol,
    id,
  },
}) satisfies IAnyAction;

const callManagerSucceededAction = (symbol: TSymbolList, id?: TIdList) => ({
  type: "@CALL_MANAGER/SUCCEEDED",
  payload: {
    symbol,
    id,
  },
}) satisfies IAnyAction;

const callManagerFailedAction = (symbol: TSymbolList, error: TExplicitAny, id?: TIdList) => ({
  type: "@CALL_MANAGER/FAILED",
  payload: {
    symbol,
    error,
    id,
  },
});

const callManagerRemoveSymbolAction = (symbol: TSymbolList, id?: TIdList) => ({
  type: "@CALL_MANAGER/REMOVE_SYMBOL",
  payload: {
    symbol,
    id,
  },
}) satisfies IAnyAction;

export {
  callManagerStartAction,
  callManagerSucceededAction,
  callManagerFailedAction,
  callManagerRemoveSymbolAction,
};
