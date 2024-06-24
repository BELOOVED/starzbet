import { TExplicitAny } from "./TAny";
import { isUnknownObject } from "./IsObject";
import { isString } from "./IsTypeOf";

type TRecordOfString = Record<string, string>
const isRecordOfString = (obj: TExplicitAny): obj is TRecordOfString => isUnknownObject(obj) && Object.values(obj).every(isString);

export { isRecordOfString }

export type { TRecordOfString }
