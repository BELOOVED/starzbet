import { isNotNil } from "@sb/utils";
import type { IWithFormsState } from "../Types";
import { selectFieldDefExtension } from "../Store";
import { getFormFieldPaths } from "./ExtensionsUtils";

const getFormFieldsPathsByExtensionKey = (state: IWithFormsState, formName: string, extensionKey: string) => {
  const fieldPaths = getFormFieldPaths(state, formName);

  return fieldPaths.filter((fieldPath) => isNotNil(selectFieldDefExtension(state, formName, fieldPath, extensionKey)));
};

export { getFormFieldsPathsByExtensionKey };
