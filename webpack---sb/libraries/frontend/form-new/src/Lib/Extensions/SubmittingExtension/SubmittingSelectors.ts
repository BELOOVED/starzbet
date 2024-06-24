import {
  callManagerErrorSelector,
  callManagerFailedSelector,
  callManagerStartedSelector,
  callManagerSucceededSelector,
  callManagerWasSucceededSelector,
  type TWithCallManagerState,
} from "@sb/call-manager";
import { SUBMITTING_EXTENSION_CALL_SYMBOL } from "../../Model";

const selectIsFormSubmittingStarted = (state: TWithCallManagerState, formName: string) =>
  callManagerStartedSelector(state, SUBMITTING_EXTENSION_CALL_SYMBOL, formName);

const selectIsFormSubmittingSucceeded = (state: TWithCallManagerState, formName: string) =>
  callManagerSucceededSelector(state, SUBMITTING_EXTENSION_CALL_SYMBOL, formName);

const selectIsFormSubmittingWasSucceeded = (state: TWithCallManagerState, formName: string) =>
  callManagerWasSucceededSelector(state, SUBMITTING_EXTENSION_CALL_SYMBOL, formName);

const selectIsFormSubmittingFailed = (state: TWithCallManagerState, formName: string) =>
  callManagerFailedSelector(state, SUBMITTING_EXTENSION_CALL_SYMBOL, formName);

const selectFormSubmittingError = (state: TWithCallManagerState, formName: string) =>
  callManagerErrorSelector(state, SUBMITTING_EXTENSION_CALL_SYMBOL, formName);

export {
  selectIsFormSubmittingStarted,
  selectIsFormSubmittingSucceeded,
  selectIsFormSubmittingWasSucceeded,
  selectIsFormSubmittingFailed,
  selectFormSubmittingError,
};
