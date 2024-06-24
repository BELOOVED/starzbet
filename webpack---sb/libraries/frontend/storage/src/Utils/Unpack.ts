import { type TExplicitAny } from "@sb/utils";
import { isPackedValue } from "./IsPackedValue";
import { Logger } from "./Logger";

const unpack = <Key extends string, Value extends TExplicitAny>(
  candidate: string,
  key: Key,
  version: number,
): Value | null => {
  try {
    const parsed = JSON.parse(candidate);

    if (!isPackedValue<Key, Value>(parsed)) {
      throw new Error(`Value type for key "${key}" is not supported`);
    }

    const { version: parsedVersion, value } = parsed;

    if (version !== parsedVersion) {
      Logger.warn.storage(`Value version for key "${key}" is outdated (v.${parsedVersion}), current version is v.${version}`);

      return null;
    }

    return value;
  } catch (err: unknown) {
    Logger.error.storage("Unpack > ", err);

    return null;
  }
};

export { unpack };
