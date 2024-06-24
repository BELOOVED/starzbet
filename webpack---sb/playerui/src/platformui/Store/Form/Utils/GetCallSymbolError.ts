import { type callManagerErrorSelector } from "@sb/call-manager";
import { clientError, isError, isResponseErrors } from "@sb/network-bus/Utils";
import { type IError } from "@sb/network-bus/Model";

const getError = (error: unknown) => {
  if (isResponseErrors(error)) {
    return error[0];
  }

  if (isError(error)) {
    return error;
  }

  return clientError("Unexpected error")[0] as IError;
};

function getCallSymbolError(callSymbolState: NonNullable<ReturnType<typeof callManagerErrorSelector>>): IError
function getCallSymbolError(callSymbolState: ReturnType<typeof callManagerErrorSelector>): IError | null
function getCallSymbolError(callSymbolState: ReturnType<typeof callManagerErrorSelector>) {
  if (callSymbolState) {
    return getError(callSymbolState.value);
  }

  return null;
}

export { getCallSymbolError };
