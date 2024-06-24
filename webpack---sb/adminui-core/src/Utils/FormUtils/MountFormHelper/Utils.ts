import { dissocPath } from "ramda";
import { KindService, type TFieldPath, type TFieldValue } from "@sb/form-new";

const deleteFieldByPath = <T>(path: TFieldPath, state: TFieldValue) => dissocPath<T>(path, state);

const tryToGetNumber = (value:string | number) => isNaN(+value) ? value : +value;

const localBlockContentPath = (path: TFieldPath) => KindService.getPathWithoutKinds(path).slice(path.indexOf("blockContent") + 1).map(tryToGetNumber);

export { deleteFieldByPath, localBlockContentPath };
