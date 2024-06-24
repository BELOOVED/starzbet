import { TExplicitAny } from "./TAny";
import { TNil } from "./TNil";
import { TArrayNotEmpty } from "./TArrayMinLength";

const isNil = (value: TExplicitAny): value is TNil => {
  return value === null || value === undefined;
}

const isNotNil = <T>(value: T): value is Exclude<T, TNil> => {
  return !isNil(value);
}

/**
 * @deprecated
 *
 * Use `getNotNil` from `@sb/utils` instead.
 */
const deprecatedGetNotNil = <T = TExplicitAny>(value: T, name: string = "unknown"): Exclude<T, TNil> => {
  if (isNotNil<T>(value)) {
    return value;
  }

  throw new Error(`Value "${name}" is nil.`)
}

const getNotNil = <T = TExplicitAny>(
  value: T,
  context: TArrayNotEmpty<string>,
  entity: string,
): Exclude<T, TNil> => {
  if (isNotNil<T>(value)) {
    return value;
  }

  throw new Error(`[GetNotNil] Context: [${context.join(" › ")}]; Entity: [${entity}].`)
}

export {
  isNil,
  isNotNil,
  getNotNil,
  deprecatedGetNotNil,
}
