import { isNil, isNotNil } from "./IsNil";
import { TExplicitAny } from "./TAny";
import { TNil } from "./TNil";
import { isEmpty, isNotEmpty } from "./IsEmpty";
import { TArrayMinLength } from "./TArrayMinLength";

function isVoid(value: TExplicitAny): value is TNil {
  return isNil(value) || isEmpty(value);
}

// @ts-ignore
function isNotVoid<T>(value: T): value is T extends Array<TExplicitAny> ? TArrayMinLength<T[number], 1> : Exclude<T, TNil> {
  return isNotNil(value) && isNotEmpty(value);
}

export { isVoid, isNotVoid };
