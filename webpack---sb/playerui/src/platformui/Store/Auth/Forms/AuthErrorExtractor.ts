import { type IError } from "@sb/network-bus/Model";
import { platformui_error_somethingWentWrong, type TCommonTKeys } from "@sb/translates/platformui/CommonTKeys";
import { errorMessages } from "../../Form/Model/ErrorMessages";
import { type VERIFY_DEVICE_FORM_NAME } from "../../VerifyDevice/SubmitForm/Model";
import { type VERIFY_CODE_FORM_NAME } from "../../VerifyCode/Model";
import { type CHAT_NAME_FORM_NAME } from "../../Chat/ChatNameForm/FormName";
import { type UPDATE_PASSWORD_FORM_NAME } from "./UpdatePasswordByEmail/Model";
import { type FORGOT_PASSWORD_FORM_NAME } from "./ForgetPassword/Model";
import { type LOGIN_FORM_NAME } from "./Login/Model";

type TAuthFormName = typeof VERIFY_DEVICE_FORM_NAME |
  typeof VERIFY_CODE_FORM_NAME |
  typeof UPDATE_PASSWORD_FORM_NAME |
  typeof FORGOT_PASSWORD_FORM_NAME |
  typeof LOGIN_FORM_NAME |
  typeof CHAT_NAME_FORM_NAME

const authErrorExtractor = (formName: string, error: IError): { error: TCommonTKeys; } => {
  const code = error.code;

  // Temp - migration in progress
  const messages = errorMessages[formName as TAuthFormName];

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

export { authErrorExtractor };
