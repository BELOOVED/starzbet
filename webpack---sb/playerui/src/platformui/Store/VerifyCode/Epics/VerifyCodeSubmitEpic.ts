import { EMPTY, merge, of } from "rxjs";
import { selectFormValue } from "@sb/form-new";
import { type IError } from "@sb/network-bus/Model";
import { call_VerifyPhoneCommand } from "@sb/sdk/SDKClient/platformplayer";
import { withParams } from "@sb/utils";
import { EBaseVerifyPhoneCommandErrorCode } from "@sb/sdk/ErrorMapping/authprofile/VerifyPhoneCommandErrorMapping";
import { loadPlayerAllEpic } from "../../../../common/Store/Player/Epics/LoadPlayerAllEpic";
import { optimisticVerifyPhoneAction } from "../../../../common/Store/Player/PlayerActions";
import { formSubmitEpicFactory } from "../../../Utils/FormSubmitEpicFactory";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { type TWithVerifyCode, VERIFY_CODE_FORM_NAME } from "../Model";

const onError = (errors: IError[]): TPlatformEpic => (action$, state$, deps) => {
  if (errors.some(({ code }) => code === EBaseVerifyPhoneCommandErrorCode.securityPhoneAlreadyVerified)) {
    return loadPlayerAllEpic(action$, state$, deps);
  }

  return EMPTY;
};

const onSuccess = (): TPlatformEpic => (action$, state$, deps) => merge(
  loadPlayerAllEpic(action$, state$, deps),
  of(optimisticVerifyPhoneAction(true)),
);

const verifyCodeSubmitEpic = formSubmitEpicFactory({
  formName: VERIFY_CODE_FORM_NAME,
  onError,
  onSuccess,
  callPair: [call_VerifyPhoneCommand, withParams(selectFormValue<TWithVerifyCode>, VERIFY_CODE_FORM_NAME)],
});

export { verifyCodeSubmitEpic };
