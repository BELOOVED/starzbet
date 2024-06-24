import { EMPTY, ignoreElements, merge, of, switchMap } from "rxjs";
import { catchError } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { resetFormAction } from "@sb/form-new";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { lockResendVerifyCodeAction, resendVerifyCodeAction } from "../VerifyDeviceActions";
import { deviceIdSelector, resendSelectOptionsSelector } from "../VerifyDeviceSelectors";
import { VERIFY_DEVICE_FORM_NAME } from "../SubmitForm/Model";

const resendVerifyCodeEpic: TPlatformEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(resendVerifyCodeAction),
  switchMap(({ payload: { type } }) => {
    const deviceId = deviceIdSelector(state$.value);

    // We don't need type if we have only one option
    const options = resendSelectOptionsSelector(state$.value);
    const strategy = options.length > 1 ? type : undefined;

    return merge(
      of(resetFormAction(VERIFY_DEVICE_FORM_NAME)),
      of(lockResendVerifyCodeAction()),
      callWithAbort(dependencies.platformHttpApi.callResendVerifyCodeDevice, { deviceId, strategy }).pipe(
        catchError((e) => {
          Logger.error.rpc("resendVerifyCodeEpic: ", e);

          return EMPTY;
        }),
        ignoreElements(),
      ),
    );
  }),
);

export { resendVerifyCodeEpic };
