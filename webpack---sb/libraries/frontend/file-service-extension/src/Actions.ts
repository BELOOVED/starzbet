import { formActionType, type TFieldPath } from "@sb/form-new";
import { type TNullable } from "@sb/utils";
import { type TFileToUpload } from "./Model";

const setFileFieldValueAction = (
  formName: string,
  fieldPath: TFieldPath,
  value: TNullable<TFileToUpload[]>,
) => ({
  type: formActionType("SET_FILE_FIELD_VALUE_@SB_FILE_SERVICE"),
  payload: { fieldPath, value },
  metadata: { formName },
});

export {
  setFileFieldValueAction,
};
