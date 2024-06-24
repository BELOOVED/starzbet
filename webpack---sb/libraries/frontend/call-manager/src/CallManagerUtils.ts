import { entries, isEmpty, isNil, isObject, type TExplicitAny } from "@sb/utils";
import { NOOP_ID, type TCallManagerSymbol } from "./CallManagerSymbol";
import { type TError, type TIdState, type TIdStateValue, type TWithCallManagerState } from "./CallManagerState";
import { idListToList, symbolListToList, type TIdList, type TSymbolList, validateState } from "./CallManagerHelpers";

const startCore = <State extends TWithCallManagerState>(
  state: State,
  symbol: TCallManagerSymbol,
  id: string,
): State => ({
    ...state,
    callManager: {
      ...state.callManager,
      [symbol]: {
        ...state.callManager[symbol],
        [id]: {
          ...state.callManager[symbol]?.[id],
          value: "started",
        },
      },
    },
  });

const succeededCore = <State extends TWithCallManagerState>(
  state: State,
  symbol: TCallManagerSymbol,
  id = NOOP_ID,
): State => ({
    ...state,
    callManager: {
      ...state.callManager,
      [symbol]: {
        ...state.callManager[symbol],
        [id]: {
          ...state.callManager[symbol]?.[id],
          wasSucceeded: true,
          value: "succeeded",
        },
      },
    },
  });

const failedCore = <State extends TWithCallManagerState>(
  state: State,
  symbol: TCallManagerSymbol,
  error: TExplicitAny,
  id = NOOP_ID,
): State => ({
    ...state,
    callManager: {
      ...state.callManager,
      [symbol]: {
        ...state.callManager[symbol],
        [id]: {
          ...state.callManager[symbol]?.[id],
          value: {
            when: Date.now(),
            value: error,
          },
        },
      },
    },
  });

const callManagerStart = <State extends TWithCallManagerState>(
  state: State,
  symbol: TSymbolList,
  id: TIdList = NOOP_ID,
): State => {
  const symbols = symbolListToList(symbol);
  const ids = idListToList(id);

  const nextState = symbols.reduce<State>(
    (symbolAcc, symbol) => ids.reduce<State>(
      (idAcc, id) => startCore(idAcc, symbol, id),
      symbolAcc,
    ),
    state,
  );

  validateState(nextState);

  return nextState;
};

const callManagerSucceeded = <State extends TWithCallManagerState>(
  state: State,
  symbol: TSymbolList,
  id: TIdList = NOOP_ID,
): State => {
  const symbols = symbolListToList(symbol);
  const ids = idListToList(id);

  const nextState = symbols.reduce<State>(
    (symbolAcc, symbol) => ids.reduce<State>(
      (idAcc, id) => succeededCore(idAcc, symbol, id),
      symbolAcc,
    ),
    state,
  );

  validateState(nextState);

  return nextState;
};

const callManagerFailed = <State extends TWithCallManagerState>(
  state: State,
  symbol: TSymbolList,
  error: TExplicitAny,
  id: TIdList = NOOP_ID,
): State => {
  const symbols = symbolListToList(symbol);
  const ids = idListToList(id);

  const nextState = symbols.reduce<State>(
    (symbolAcc, symbol) => ids.reduce<State>(
      (idAcc, id) => failedCore(idAcc, symbol, error, id),
      symbolAcc,
    ),
    state,
  );

  validateState(nextState);

  return nextState;
};

const callManagerRemoveSymbols = <State extends TWithCallManagerState>(
  state: State,
  symbol: TSymbolList,
  id: TIdList = [],
): State => {
  const symbols = symbolListToList(symbol);
  const ids = idListToList(id);

  const callManagerState = { ...state.callManager };

  const idsEmpty = isEmpty(ids);

  symbols.forEach((symbol) => {
    if (idsEmpty) {
      delete callManagerState[symbol];
    }

    const symbolState = callManagerState[symbol];

    if (isNil(symbolState)) {
      return;
    }

    let nextSymbolStateEmpty = true;

    const nextSymbolState = entries(symbolState).reduce<Record<string, TIdState>>(
      (acc, [id, idState]) => {
        if (!ids.includes(id)) {
          acc[id] = idState;

          nextSymbolStateEmpty = false;
        }

        return acc;
      },
      {},
    );

    if (nextSymbolStateEmpty) {
      delete callManagerState[symbol];

      return;
    }

    callManagerState[symbol] = nextSymbolState;
  });

  const nextState: State = {
    ...state,
    callManager: callManagerState,
  };

  validateState(nextState);

  return nextState;
};

const isErrorValue = (value: TIdStateValue | undefined): value is TError => isObject(value);

export {
  callManagerStart,
  callManagerSucceeded,
  callManagerFailed,
  callManagerRemoveSymbols,
  isErrorValue,
};
