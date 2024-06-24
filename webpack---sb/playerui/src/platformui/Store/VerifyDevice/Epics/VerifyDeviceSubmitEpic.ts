import { EMPTY, of } from "rxjs";
import { selectFormValue } from "@sb/form-new";
import { type IError } from "@sb/network-bus/Model";
import { DEVICE_INFO } from "@sb/utils";
import { type TCallResponsePayload } from "@sb/sdk";
import { type call_PlayerVerifyDeviceCommand } from "@sb/sdk/SDKClient/platformplayer";
import { EBaseVerifyDeviceCommandErrorCode } from "@sb/sdk/ErrorMapping/authprofile/VerifyDeviceCommandErrorMapping";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { formSubmitEpicFactory } from "../../../Utils/FormSubmitEpicFactory";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type IDepsWithPlatformHttpApi } from "../../Root/Epic/TPlatformEpic";
import { type TWithVerifyCode, VERIFY_DEVICE_FORM_NAME } from "../SubmitForm/Model";
import { receiveTokenAfterVerifyDeviceAction, unlockResendVerifyCodeAction } from "../VerifyDeviceActions";
import { deviceIdSelector } from "../VerifyDeviceSelectors";

const createCall = (state: TPlatformAppState, deps: IDepsWithPlatformHttpApi) => {
  const payload = selectFormValue<TWithVerifyCode>(state, VERIFY_DEVICE_FORM_NAME);
  const deviceId = deviceIdSelector(state);

  return callWithAbort(
    deps.platformHttpApi.callPlayerVerifyDevice,
    { verificationCode: payload.verifyCode, deviceInfo: DEVICE_INFO, deviceId },
  );
};

const onError = (error: IError[]) => () => {
  if (error.some(
    (el) =>
      el.code === EBaseVerifyDeviceCommandErrorCode.securityDeviceVerificationCodeExpired ||
      el.code === EBaseVerifyDeviceCommandErrorCode.securityDeviceVerificationAttemptsExceeded,
  )) {
    return of(unlockResendVerifyCodeAction());
  }

  return EMPTY;
};

const onSuccess = (token: TCallResponsePayload<typeof call_PlayerVerifyDeviceCommand>) =>
  () => of(receiveTokenAfterVerifyDeviceAction(token));

const verifyDeviceSubmitEpic = formSubmitEpicFactory({
  formName: VERIFY_DEVICE_FORM_NAME,
  createCall,
  onError,
  onSuccess,
});

export { verifyDeviceSubmitEpic };
