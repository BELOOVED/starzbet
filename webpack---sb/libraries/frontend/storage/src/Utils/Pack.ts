import { type TPackedValue } from "../Model/TPackedValue";

const pack = <Key extends string, Value>(
  key: Key,
  value: Value,
  version: number,
): string => JSON.stringify({ key, value, version } satisfies TPackedValue<Key, Value>);

export { pack };
