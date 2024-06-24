import {
  resetFormAction,
  selectFormSubmittingError,
  selectIsFormSubmittingStarted,
  selectIsFormSubmittingSucceeded,
  useFormName,
} from "@sb/form-new";
import { useActionWithBind, useParamSelector } from "@sb/utils";
import { type IError } from "@sb/network-bus/Model";
import { type IOptions } from "@sb/translator";
import { commonErrorFunction } from "../Model/CommonErrorFunction";
import { getCallSymbolError } from "../Utils/GetCallSymbolError";

type TExtractError = (formName: string, error: IError) => {
  error: string; // TODO Add TKeys type
  option?: IOptions;
} | undefined

const DEFAULT_EXTRACTOR: TExtractError = (formName, error) =>
  commonErrorFunction(formName)(error);

const useFormSubmitResult = (extractError: TExtractError = DEFAULT_EXTRACTOR) => {
  const formName = useFormName();
  const callError = useParamSelector(selectFormSubmittingError, [formName]);
  const submitSucceeded = useParamSelector(selectIsFormSubmittingSucceeded, [formName]);
  const reset = useActionWithBind(resetFormAction, formName);
  const loading = useParamSelector(selectIsFormSubmittingStarted, [formName]);

  return {
    submitErrors: callError ? extractError(formName, getCallSymbolError(callError)) : null,
    submitSucceeded,
    reset,
    loading,
  };
};

export type { TExtractError };
export { useFormSubmitResult };
