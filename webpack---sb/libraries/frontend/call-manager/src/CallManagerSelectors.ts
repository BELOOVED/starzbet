import { getNotNil } from "@sb/utils";
import type { TCallManagerSymbol } from "./CallManagerSymbol";
import { NOOP_ID } from "./CallManagerSymbol";
import type { TError, TIdState, TIdStateValue, TSymbolState, TWithCallManagerState } from "./CallManagerState";
import { idListToList, symbolListToList, type TIdList, type TSymbolList, validateState } from "./CallManagerHelpers";
import { isErrorValue } from "./CallManagerUtils";

const symbolStateSelector = (
  state: TWithCallManagerState,
  symbol: TCallManagerSymbol,
): undefined | TSymbolState =>
  getNotNil(state.callManager, ["CallManagerSelectors"], "Call Manager State")[symbol];

const idStateSelector = (
  state: TWithCallManagerState,
  symbol: TCallManagerSymbol,
  id: string,
): undefined | TIdState =>
  symbolStateSelector(state, symbol)?.[id];

const idStateValueSelector = (
  state: TWithCallManagerState,
  symbol: TCallManagerSymbol,
  id: string,
): undefined | TIdStateValue =>
  idStateSelector(state, symbol, id)?.value;

/**
 * Returns true when some ID exists is some symbol
 */
const callManagerExistsSelector = (
  state: TWithCallManagerState,
  symbol: TSymbolList,
  id: TIdList = NOOP_ID,
): boolean => {
  validateState(state);

  const symbols = symbolListToList(symbol);
  const ids = idListToList(id);

  return symbols.some(
    (symbol) => ids.some(
      (id) => idStateSelector(state, symbol, id),
    ),
  );
};

/**
 * Returns true when some ID in some symbol started
 */
const callManagerStartedSelector = (
  state: TWithCallManagerState,
  symbol: TSymbolList,
  id: TIdList = NOOP_ID,
): boolean => {
  validateState(state);

  const symbols = symbolListToList(symbol);
  const ids = idListToList(id);

  return symbols.some(
    (symbol) => ids.some(
      (id) => idStateValueSelector(state, symbol, id) === "started",
    ),
  );
};

callManagerStartedSelector.with = {
  symbol: (symbol: TSymbolList) =>
    (state: TWithCallManagerState, id?: TIdList) =>
      callManagerStartedSelector(state, symbol, id),
};

/**
 * Returns true when every ID in every symbol succeeded
 */
const callManagerSucceededSelector = (
  state: TWithCallManagerState,
  symbol: TSymbolList,
  id: TIdList = NOOP_ID,
): boolean => {
  validateState(state);

  const symbols = symbolListToList(symbol);
  const ids = idListToList(id);

  return symbols.every(
    (symbol) => ids.every(
      (id) => idStateValueSelector(state, symbol, id) === "succeeded",
    ),
  );
};

callManagerSucceededSelector.with = {
  symbol: (symbol: TSymbolList) =>
    (state: TWithCallManagerState, id?: TIdList) =>
      callManagerSucceededSelector(state, symbol, id),
};

/**
 * Returns true when every ID in every symbol was succeeded
 */
const callManagerWasSucceededSelector = (
  state: TWithCallManagerState,
  symbol: TSymbolList,
  id: TIdList = NOOP_ID,
): boolean => {
  validateState(state);

  const symbols = symbolListToList(symbol);
  const ids = idListToList(id);

  return symbols.every(
    (symbol) => ids.every(
      (id) => idStateSelector(state, symbol, id)?.wasSucceeded,
    ),
  );
};

callManagerWasSucceededSelector.with = {
  symbol: (symbol: TSymbolList) =>
    (state: TWithCallManagerState, id?: TIdList) =>
      callManagerWasSucceededSelector(state, symbol, id),
};

/**
 * Returns true when some ID in some symbol was failed
 */
const callManagerFailedSelector = (
  state: TWithCallManagerState,
  symbol: TSymbolList,
  id: TIdList = NOOP_ID,
): boolean => {
  validateState(state);

  const symbols = symbolListToList(symbol);
  const ids = idListToList(id);

  return symbols.some(
    (symbol) => ids.some(
      (id) => isErrorValue(idStateValueSelector(state, symbol, id)),
    ),
  );
};

callManagerFailedSelector.with = {
  symbol: (symbol: TSymbolList) =>
    (state: TWithCallManagerState, id?: TIdList) =>
      callManagerFailedSelector(state, symbol, id),
};

const callManagerErrorSelector = (
  state: TWithCallManagerState,
  symbol: TCallManagerSymbol,
  id = NOOP_ID,
): null | TError => {
  validateState(state);

  const value = idStateValueSelector(state, symbol, id);

  if (!isErrorValue(value)) {
    return null;
  }

  return value;
};

callManagerErrorSelector.with = {
  symbol: (symbol: TCallManagerSymbol) =>
    (state: TWithCallManagerState, id?: string) =>
      callManagerErrorSelector(state, symbol, id),
};

export {
  callManagerExistsSelector,
  callManagerStartedSelector,
  callManagerSucceededSelector,
  callManagerWasSucceededSelector,
  callManagerFailedSelector,
  callManagerErrorSelector,
};
