import { TSelector } from "./TSelector";
import { TArrayNotEmpty } from "../TArrayMinLength";
import { getNotNil } from "../IsNil";

const createNotNilSelector = <S, R>(selector: TSelector<S, R>, context: TArrayNotEmpty<string>, entity: string) =>
  (state: S) => getNotNil(selector(state), context, entity)

export { createNotNilSelector }
