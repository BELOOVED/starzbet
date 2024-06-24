import { selectFormValue } from "@sb/form-new";
import { call_ResetPasswordByEmailCommand } from "@sb/sdk/SDKClient/platformplayer";
import { withParams } from "@sb/utils";
import { formSubmitEpicFactory } from "../../../../../Utils/FormSubmitEpicFactory";
import { FORGOT_PASSWORD_FORM_NAME, type TWithEmail } from "../Model";

const forgotPasswordSubmitEpic = formSubmitEpicFactory({
  formName: FORGOT_PASSWORD_FORM_NAME,
  callPair: [call_ResetPasswordByEmailCommand, withParams(selectFormValue<TWithEmail>, FORGOT_PASSWORD_FORM_NAME)],
});

export { forgotPasswordSubmitEpic };
