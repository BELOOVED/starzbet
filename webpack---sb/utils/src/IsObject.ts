import { isArray, isObject } from "./IsTypeOf";
import { TUnknownObject } from "./UtilityTypes/TUnknownObject";
import { TAnyObject } from "./UtilityTypes/TAnyObject";

const isJavascriptObject = (candidate: unknown) => isObject(candidate) && !isArray(candidate);

const isAnyObject = (candidate: unknown): candidate is TAnyObject => isJavascriptObject(candidate);

const isUnknownObject = (candidate: unknown): candidate is TUnknownObject => isJavascriptObject(candidate);

export { isAnyObject, isUnknownObject }
