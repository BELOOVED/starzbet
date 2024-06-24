import { EErrorType, IError } from "../Model";
import { isJsError } from "@sb/utils";
import { clientError } from "./ErrorUtil";
import { extractErrorReason } from "./ExtractErrorReason";

export function handleError(e: Error | IError[], uri: string): void {
  if (isJsError(e)) {
    throw clientError(`Failed uri "${uri}": ${extractErrorReason(e)}`);
  }

  throw e.map((error) => ({
    ...error,
    message: error.type === EErrorType.SHOWABLE ? extractErrorReason(error) : `Failed uri "${uri}": ${extractErrorReason(error)}`,
  }));
}
