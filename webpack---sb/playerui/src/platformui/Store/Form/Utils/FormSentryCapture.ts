import { type TExplicitAny } from "@sb/utils";
import { isError } from "@sb/network-bus/Utils";
import { logArrayError, Logger } from "../../../../common/Utils/Logger";
import { type EFormTypes } from "../Model/EFormTypes";
import { isExpectedErrorCode } from "../Model/ErrorMessages";

const formSentryCapture = (error: TExplicitAny, form: EFormTypes | string, ...extraInfo: unknown[]) => {
  logArrayError(
    error,
    (e) => {
      if (isError(e) && isExpectedErrorCode(e.code)) {
        return;
      }

      Logger.error.rpc(`Form "${form}"`, e, ...extraInfo);
    },
  );
};

export { formSentryCapture };
