import { actionTypeWithPrefix } from "@sb/utils";
import { type TFieldPath } from "../../Types";
import { formActionType } from "../../Store";

const touchedActionType = actionTypeWithPrefix(formActionType("TOUCHED_EXTENSION"));

const onFocusAction = (fieldPath: TFieldPath, formName: string) => ({
  type: touchedActionType("FOCUS"),
  payload: { fieldPath },
  metadata: { formName },
});

const onBlurAction = (fieldPath: TFieldPath, formName: string) => ({
  type: touchedActionType("BLUR"),
  payload: { fieldPath },
  metadata: { formName },
});

export { onFocusAction, onBlurAction };
