import { actionTypeWithPrefix } from "@sb/utils";
import { formActionType } from "../../Store";
import { type TFieldPath } from "../../Types";

const validationActionType = actionTypeWithPrefix(formActionType("VALIDATION_EXTENSION"));

const validateFormFieldsAction = (formName: string) => ({
  type: validationActionType("VALIDATE_FORM"),
  metadata: { formName },
});

const validateFormFieldAction = (formName: string, fieldPath: TFieldPath) => ({
  type: validationActionType("VALIDATE_FIELD"),
  payload: { fieldPath },
  metadata: { formName },
});

export {
  validateFormFieldsAction,
  validateFormFieldAction,
};
