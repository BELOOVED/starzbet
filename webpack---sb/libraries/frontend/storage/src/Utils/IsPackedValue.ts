import { hasOwnProperty, isUnknownObject } from "@sb/utils";
import { type TPackedValue } from "../Model/TPackedValue";

const isPackedValue = <Key extends string, Value>(candidate: unknown): candidate is TPackedValue<Key, Value> =>
  isUnknownObject(candidate) && hasOwnProperty(candidate, "version") && hasOwnProperty(candidate, "key") && hasOwnProperty(candidate, "value");

export { isPackedValue };
