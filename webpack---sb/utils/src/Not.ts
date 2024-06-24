import { isFunction } from "./IsTypeOf";
import { TExplicitAny } from "./TAny";
import { TNonFunction } from "./UtilityTypes/TNonFunction";

/** @internal not for export */
const notV = <Value extends TExplicitAny>(value: Value) => !value;

/** @internal not for export */
const notF = <Value extends TExplicitAny, Args extends TExplicitAny[]>(func: (...args: Args) => Value) => (...args: Args) => !func(...args);


function not(value: boolean): boolean;
function not<Value extends TExplicitAny>(value: TNonFunction<Value>): boolean;
function not<Value extends TExplicitAny, Args extends TExplicitAny[]>(func: (...args: Args) => Value): (...args: Args) => boolean;
function not<Value extends TExplicitAny, Args extends TExplicitAny[]>(candidate: TNonFunction<Value> | ((...args: Args) => Value)): boolean | ((...args: Args) => boolean) {
  return isFunction(candidate) ? notF(candidate) : notV(candidate)
}


export { not }
