import { isArray, USE_STRICT_MODE } from "@sb/utils";
import { NOOP_ID, type TCallManagerSymbol } from "./CallManagerSymbol";
import { type TWithCallManagerState } from "./CallManagerState";

type TValueList<T> = T | T[];

type TSymbolList = TValueList<TCallManagerSymbol>;
type TIdList = TValueList<string>;

const valueListToListFactory = <T>() =>
  (value: TValueList<T>): T[] =>
    isArray(value)
      ? value
      : [value];

const symbolListToList = valueListToListFactory<TCallManagerSymbol>();
const idListToList = valueListToListFactory<string>();

const validateState = <S extends TWithCallManagerState>(state: S): void => {
  if (USE_STRICT_MODE) {
    Object.entries(state.callManager).forEach(([key, value]) => {
      const ids = Object.keys(value);

      if (ids.includes(NOOP_ID) && ids.length > 1) {
        throw new Error(`Symbol "${key}" used used without ID and with some ID. Only one behaviour per symbol allowed`);
      }
    });
  }
};

export {
  type TSymbolList,
  type TIdList,
  symbolListToList,
  idListToList,
  validateState,
};
