import { actionTypeWithPrefix } from "@sb/utils";
import { type TFieldPath } from "../../Types";
import { formActionType } from "../../Store";

const disableActionType = actionTypeWithPrefix(formActionType("DISABLE_EXTENSION"));

const runFormFieldsDisableCheckAction = (formName: string) => ({
  type: disableActionType("RUN_FORM_FIELDS_DISABLE_CHECK"),
  metadata: { formName },
});

/**
 * @deprecated DO NOT USE!
 * Disabled or not must be selector logic
 */
const setFieldDisableAction = (fieldPath: TFieldPath, formName: string, isDisable: boolean) => ({
  type: disableActionType("SET_FIELD_DISABLE"),
  payload: { fieldPath, isDisable },
  metadata: { formName },
});

export {
  runFormFieldsDisableCheckAction,
  setFieldDisableAction,
};
