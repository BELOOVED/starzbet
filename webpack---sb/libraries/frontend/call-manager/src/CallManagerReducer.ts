import { createRootReducer } from "@sb/utils";
import type { TWithCallManagerState } from "./CallManagerState";
import {
  callManagerFailedAction,
  callManagerRemoveSymbolAction,
  callManagerStartAction,
  callManagerSucceededAction,
} from "./CallManagerActions";
import { callManagerFailed, callManagerRemoveSymbols, callManagerStart, callManagerSucceeded } from "./CallManagerUtils";

const startReducer = (
  state: TWithCallManagerState,
  { payload: { symbol, id } }: ReturnType<typeof callManagerStartAction>,
): TWithCallManagerState => callManagerStart(state, symbol, id);

const succeededReducer = (
  state: TWithCallManagerState,
  { payload: { symbol, id } }: ReturnType<typeof callManagerSucceededAction>,
): TWithCallManagerState => callManagerSucceeded(state, symbol, id);

const failedReducer = (
  state: TWithCallManagerState,
  { payload: { symbol, error, id } }: ReturnType<typeof callManagerFailedAction>,
): TWithCallManagerState => callManagerFailed(state, symbol, error, id);

const removeSymbolsReducer = (
  state: TWithCallManagerState,
  { payload: { symbol, id } }: ReturnType<typeof callManagerRemoveSymbolAction>,
): TWithCallManagerState => callManagerRemoveSymbols(state, symbol, id);

const callManagerRootReducer = createRootReducer([
  [startReducer, callManagerStartAction],
  [succeededReducer, callManagerSucceededAction],
  [failedReducer, callManagerFailedAction],
  [removeSymbolsReducer, callManagerRemoveSymbolAction],
]);

export {
  startReducer,
  succeededReducer,
  failedReducer,
  removeSymbolsReducer,
  callManagerRootReducer,
};

