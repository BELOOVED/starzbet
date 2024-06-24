import { mergeRight } from "./MergeRight";
import { TPath } from "./Path";
import { TExplicitAny } from "./TAny";
import { isArrayMinLength } from "./TArrayMinLength";
import { TAnyObject } from "./UtilityTypes/TAnyObject";

const assocPath = <Object extends TAnyObject, Value extends TExplicitAny = unknown>(path: TPath, value: Value, object: Object): Object => {
  if (!isArrayMinLength(path, 1)) {
    return mergeRight(object, value)
  }

  const [head, ...tail] = path;

  const nextObj = object[head as keyof Object];

  return {
    ...object,
    [head]: tail.length > 0 ? assocPath(tail, value, nextObj ?? {}) : value,
  } satisfies Object;
};


export { assocPath };
