import { type TSyncValidator, type TSyncValidatorError } from "@sb/form-new";
import { isEmpty, isNil } from "@sb/utils";
import { fileServiceSucceededUploadSelector } from "@sb/file-service";
import { type TFileFieldValue, type TFileServiceExtensionState } from "./Model";

const filesUploadingSucceededValidator = <
  Error extends TSyncValidatorError,
  State extends TFileServiceExtensionState
>(error: Error | string = "Files in loading"): TSyncValidator<TFileFieldValue, State, Error | string> =>
    (value, _, __, state) => {
      if (isNil(value) || isNil(value.files)) {
        return undefined;
      }

      const filtered = value.files.filter(
        (val) => val.type === "temporary",
      );

      if(isEmpty(filtered)){
        return undefined;
      }

      const succeeded = fileServiceSucceededUploadSelector(
        state,
        filtered.map(({ id }) => id),
      );

      if (succeeded) {
        return undefined;
      }

      return error;
    };

export { filesUploadingSucceededValidator };
