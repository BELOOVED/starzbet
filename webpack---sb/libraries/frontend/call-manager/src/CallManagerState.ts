import { type TCallManagerSymbol } from "./CallManagerSymbol";

type TError = {
  when: number;
  value: unknown;
};

type TIdStateValue = "started" | "succeeded" | TError;

type TSymbolState = Record<string, TIdState>;

type TIdState = {
  wasSucceeded?: true;
  value: TIdStateValue;
};

type TCallManagerState = Record<TCallManagerSymbol, TSymbolState>;

type TWithCallManagerState = {
  callManager: TCallManagerState;
}

const withCallManagerDefaultState: TWithCallManagerState = {
  callManager: {},
};

export {
  type TError,
  type TSymbolState,
  type TIdState,
  type TIdStateValue,
  type TWithCallManagerState,
  withCallManagerDefaultState,
};
