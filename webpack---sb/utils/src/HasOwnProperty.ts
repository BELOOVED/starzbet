import { TAnyObject } from "./UtilityTypes/TAnyObject";

type TExtractResult<
  Value extends TAnyObject | Function,
  Key extends keyof Value | PropertyKey,
> = Value extends TAnyObject ?
  Key extends keyof Value
    ? Value & Required<Pick<Value, Key>>
    : Value & Record<Key, unknown>
  : Value & Record<Key, unknown>

const hasOwnProperty = <
  Value extends TAnyObject | Function,
  Key extends keyof Value | PropertyKey
>(value: Value, key: Key): value is TExtractResult<Value, Key> =>
  value.hasOwnProperty(key);

export { hasOwnProperty }
