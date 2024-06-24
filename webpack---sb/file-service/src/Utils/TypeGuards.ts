import { isString } from "@sb/utils";
import { EFileType } from "../Model";

const  isFileType = (value: unknown): value is EFileType  => isString(value) && Object.values(EFileType).includes(value);

export { isFileType };
