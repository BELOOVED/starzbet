import { type TFieldValue } from "../Types";

const isFromValueArray = (v: TFieldValue): v is TFieldValue[] => Array.isArray(v);

export { isFromValueArray };
