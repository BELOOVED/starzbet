import { type IError } from "@sb/network-bus/Model";
import {
  platformui_error_somethingWentWrong,
  platformui_login_error_tooManyRequests,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { errorMessages } from "../../../Form/Model/ErrorMessages";
import { LOGIN_FORM_NAME } from "./Model";

const TOO_MANY_ATTEMPTS_CODE = "security.too_many_login_requests";

interface ILoginErrorContext {
  remainingTimeMilli: number;
}

type TLoginErrorExtractorType = { error: TCommonTKeys; option?: { time: number; }; }

const loginErrorExtractor = (formName: string, error: IError): TLoginErrorExtractorType => {
  const code = error.code;

  if (code === TOO_MANY_ATTEMPTS_CODE) {
    const time = Math.round((error.context as ILoginErrorContext).remainingTimeMilli / 1000); // Temp - Need to add types for form hook

    return {
      error: platformui_login_error_tooManyRequests,
      option: { time },
    };
  }

  const messages = errorMessages[LOGIN_FORM_NAME];

  if (!messages) {
    return {
      error: platformui_error_somethingWentWrong,
    };
  }

  const errorMessage = messages[code];

  return {
    error: !code || !errorMessage ? platformui_error_somethingWentWrong : errorMessage,
  };
};

export { loginErrorExtractor, TOO_MANY_ATTEMPTS_CODE };
export type { ILoginErrorContext };
