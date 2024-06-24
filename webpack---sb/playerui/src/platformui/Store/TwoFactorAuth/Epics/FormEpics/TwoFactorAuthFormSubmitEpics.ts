import { of } from "rxjs";
import {
  call_PlayerDisableTwoFactorAuthenticationCommand,
  call_PlayerEnableTwoFactorAuthenticationCommand,
} from "@sb/sdk/SDKClient/platformplayer";
import { withParams } from "@sb/utils";
import { selectFormValue } from "@sb/form-new";
import { formSubmitEpicFactory } from "../../../../Utils/FormSubmitEpicFactory";
import {
  type TWithOneTimePassword,
  TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME,
} from "../../SubmitForm/Model";
import { backupCodesReceivedAction } from "../../TwoFactorAuthActions";

const twoFactorAuthEnableFormSubmitEpic = formSubmitEpicFactory({
  formName: TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME,
  callPair: [
    call_PlayerEnableTwoFactorAuthenticationCommand,
    withParams(selectFormValue<TWithOneTimePassword>, TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME),
  ],
  onSuccess: ({ backupCodes }) => () => of(backupCodesReceivedAction(backupCodes)),
});

const twoFactorAuthDisableFormSubmitEpic = formSubmitEpicFactory({
  formName: TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME,
  callPair: [
    call_PlayerDisableTwoFactorAuthenticationCommand,
    withParams(selectFormValue<TWithOneTimePassword>, TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME),
  ],
});

export { twoFactorAuthEnableFormSubmitEpic, twoFactorAuthDisableFormSubmitEpic };
