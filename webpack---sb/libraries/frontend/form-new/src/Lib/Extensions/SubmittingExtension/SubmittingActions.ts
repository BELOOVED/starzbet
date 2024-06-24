import { actionTypeWithPrefix, type TExplicitAny } from "@sb/utils";
import { formActionType } from "../../Store";

const submittingExtensionActionType = actionTypeWithPrefix(formActionType("SUBMITTING_EXTENSION"));

const submitFormFailedAction = <Error extends TExplicitAny>(formName: string, error?: Error) => ({
  type: submittingExtensionActionType("SUBMIT_FORM_FAILED"),
  payload: { error: error ?? "unknown" },
  metadata: { formName },
});

const submitFormSucceedAction = (formName: string) => ({
  type: submittingExtensionActionType("SUBMIT_FORM_SUCCEED"),
  metadata: { formName },
});

const submitFormResetAction = (formName: string) => ({
  type: submittingExtensionActionType("SUBMIT_FORM_RESET"),
  metadata: { formName },
});

export {
  submitFormResetAction,
  submitFormFailedAction,
  submitFormSucceedAction,
};
