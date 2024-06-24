import { type TFieldPath } from "../../../Types/Types";

const createFormFieldID = (formName: string, fieldPath: TFieldPath): string => `${formName}.${fieldPath.join(".")}`;

export { createFormFieldID };
