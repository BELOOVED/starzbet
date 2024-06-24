import { isString } from "@sb/utils/IsTypeOf";
import { isJsError } from "@sb/utils/IsJsError";
import { isNotEmpty } from "@sb/utils/IsEmpty";
import { isClientError, isResponseErrors } from "./ErrorUtil";

const extractErrorMessage = (error: unknown, maxLength = Number.MAX_SAFE_INTEGER): string => {
  let errorMessage = "unknown";

  if (error) {
    if (isString(error)) {
      errorMessage = error;
    } else {


      const content = (isResponseErrors(error) && error[0].message) ||
        (isClientError(error) && error.message) ||
        (isJsError(error) && error.message);

      if (isString(content) && isNotEmpty(content)) {
        errorMessage = content
      }
    }
  }

  if (errorMessage.length > maxLength) {
    errorMessage = `${errorMessage.substring(0, maxLength)}...`;
  }

  return errorMessage;
};

export { extractErrorMessage };
