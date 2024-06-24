import { isObject } from "@sb/utils";
import { type IKeepAliveUpdate } from "../Types/AuthTypes";

const keepAliveUpdateFields: (keyof IKeepAliveUpdate)[] = [
  "keepAliveInMs",
  "keepAliveUntil",
];

const isKeepAliveUpdate = (candidate: unknown): candidate is IKeepAliveUpdate => {
  if (!isObject(candidate)) {
    return false;
  }

  return keepAliveUpdateFields.every((key) => Object.hasOwn(candidate, key));
};

export { isKeepAliveUpdate };
