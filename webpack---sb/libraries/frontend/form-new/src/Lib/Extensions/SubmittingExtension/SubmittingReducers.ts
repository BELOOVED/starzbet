import {
  callManagerFailed,
  callManagerRemoveSymbols,
  callManagerStart,
  callManagerSucceeded,
  type TWithCallManagerState,
} from "@sb/call-manager";
import { type IWithFormsState, type THandler } from "../../Types";
import { SUBMITTING_EXTENSION_CALL_SYMBOL } from "../../Model";
import { type resetFormAction, type submitFormAction, type unmountFormAction } from "../../Store";
import { selectIsFormValid } from "../MixedSelectors";
import { type submitFormFailedAction, type submitFormResetAction, type submitFormSucceedAction } from "./SubmittingActions";

const submitFormHandler: THandler<
  typeof submitFormAction, IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  const nextState = next(state, action);
  const { metadata: { formName } } = action;

  const isFormValid = selectIsFormValid(state, formName);

  return isFormValid
    ? callManagerStart(nextState, SUBMITTING_EXTENSION_CALL_SYMBOL, formName)
    : nextState;
};

const submitFormResetHandler: THandler<
  typeof resetFormAction | typeof submitFormResetAction | typeof unmountFormAction,
  IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  const nextState = next(state, action);
  const { metadata: { formName } } = action;

  return callManagerRemoveSymbols(nextState, [SUBMITTING_EXTENSION_CALL_SYMBOL], [formName]);
};

const submitFormFailedHandler: THandler<
  typeof submitFormFailedAction,
  IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  const nextState = next(state, action);
  const { payload: { error }, metadata: { formName } } = action;

  return callManagerFailed(nextState, SUBMITTING_EXTENSION_CALL_SYMBOL, error, formName);
};

const submitFormSucceedHandler: THandler<
  typeof submitFormSucceedAction,
  IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  const nextState = next(state, action);
  const { metadata: { formName } } = action;

  return callManagerSucceeded(nextState, SUBMITTING_EXTENSION_CALL_SYMBOL, formName);
};

export {
  submitFormHandler,
  submitFormResetHandler,
  submitFormFailedHandler,
  submitFormSucceedHandler,
};
