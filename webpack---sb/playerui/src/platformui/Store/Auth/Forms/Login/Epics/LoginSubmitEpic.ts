import { EMPTY, filter, merge, of, skip, switchMap, throwError, timer } from "rxjs";
import { catchError, distinctUntilChanged, map } from "rxjs/operators";
import {
  ifFormValid,
  isFormCreator,
  selectFormValue,
  submitFormAction,
  submitFormFailedAction,
  submitFormResetAction,
  submitFormSucceedAction,
} from "@sb/form-new";
import { awaitLoginSelector, lastLoginErrorSelector, loggedSelector, requestLoginAction } from "@sb/auth";
import { isArray, isNotNil, not } from "@sb/utils";
import { type IError } from "@sb/network-bus/Model";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { modalCloseAction } from "../../../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { platformLocalStorageKeys } from "../../../../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { pushLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { type TPlatformEpic } from "../../../../Root/Epic/TPlatformEpic";
import { formSentryCapture } from "../../../../Form/Utils/FormSentryCapture";
import { playerAuthDataSelector, twoFactorAuthSelectors } from "../../../../TwoFactorAuth/TwoFactorAuthSelectors";
import { finishTwoFactorAuthStepAction, startTwoFactorAuthStepAction } from "../../../../TwoFactorAuth/TwoFactorAuthActions";
import { type TWithOneTimePassword, TWO_FACTOR_AUTH_CONFIRM_FORM_NAME } from "../../../../TwoFactorAuth/SubmitForm/Model";
import { localeSelector } from "../../../../Locale/Selectors/localeSelector";
import { authInfoModalOpenAction, loginLockForTimeAction } from "../../../AuthActions";
import { loginLockTimeSelector } from "../../../AuthSelectors";
import { LOGIN_FORM_NAME, type TLoginForm } from "../Model";
import { type ILoginErrorContext, TOO_MANY_ATTEMPTS_CODE } from "../LoginErrorExtractor";

const lockForTimeEpic: TPlatformEpic = (action$, state$) => state$.pipe(
  map(loginLockTimeSelector),
  distinctUntilChanged(),
  filter(isNotNil),
  switchMap(
    (timeStamp) => {
      const timeToUnlock = timeStamp - Date.now();

      return timer(timeToUnlock).pipe(
        switchMap(
          () => merge(
            of(submitFormResetAction(LOGIN_FORM_NAME)),
            of(loginLockForTimeAction(null)),
          ),
        ),
      );
    },
  ),
);

const waitLoginEpic: TPlatformEpic = (_, state$) => state$.pipe(
  map(awaitLoginSelector),
  distinctUntilChanged(),
  skip(1),
  filter(not<boolean>),
  map(() => loggedSelector(state$.value)),
  switchMap((logged) => {
    if (logged) {
      const isTwoFactorAuthStep = twoFactorAuthSelectors.isTwoFactorAuthStep(state$.value);

      return merge(
        of(isTwoFactorAuthStep ? finishTwoFactorAuthStepAction() : modalCloseAction(EModal.auth)),
        of(isTwoFactorAuthStep ? submitFormSucceedAction(TWO_FACTOR_AUTH_CONFIRM_FORM_NAME) : submitFormSucceedAction(LOGIN_FORM_NAME)),
      );
    }

    return throwError(() => lastLoginErrorSelector(state$.value));
  }),
);

const TWO_FACTOR_AUTH_ERROR_CODE = "security.one_time_password_required";

const doLoginEpic: TPlatformEpic = (action$, state$, deps) => {
  const lock = loginLockTimeSelector(state$.value);
  const isTwoFactorAuthStep = twoFactorAuthSelectors.isTwoFactorAuthStep(state$.value);

  const currentFormName = isTwoFactorAuthStep ? TWO_FACTOR_AUTH_CONFIRM_FORM_NAME : LOGIN_FORM_NAME;

  if (lock) {
    return of(submitFormFailedAction(currentFormName));
  }

  const credentials: TLoginForm & Partial<TWithOneTimePassword> = isTwoFactorAuthStep
    ? playerAuthDataSelector(state$.value)
    : selectFormValue<TLoginForm>(state$.value, LOGIN_FORM_NAME);

  localStorage.removeItem(platformLocalStorageKeys.myDetailsAfterRegister);

  return merge(
    of(requestLoginAction(
      Object.entries(credentials).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value.trim() }),
        {},
      ),
    )),
    waitLoginEpic(action$, state$, deps),
  ).pipe(
    catchError((errors: IError<ILoginErrorContext>[]) => { //todo fix type
      const e = isArray(errors) ? errors : [errors];

      const isTwoFactorAuthError = e.find((it) => it.code === TWO_FACTOR_AUTH_ERROR_CODE);

      const locale = localeSelector(state$.value);
      // Start 2FA
      if (isTwoFactorAuthError) {
        return merge(
          of(startTwoFactorAuthStepAction(credentials)),
          of(IS_MOBILE_CLIENT_SIDE ? pushLocalized(locale, routeMap.root) : modalCloseAction(EModal.auth)),
        );
      }

      formSentryCapture(errors, currentFormName);

      const tooManyAttemptsError = e.find((it) => it.code === TOO_MANY_ATTEMPTS_CODE);

      const time = tooManyAttemptsError?.context.remainingTimeMilli;

      if (tooManyAttemptsError && time) {
        return merge(
          of(submitFormFailedAction(currentFormName, e)),
          isTwoFactorAuthStep ? EMPTY : of(authInfoModalOpenAction()),
          of(loginLockForTimeAction(Date.now() + time)),
        );
      }

      return merge(
        of(submitFormFailedAction(currentFormName, e)),
        isTwoFactorAuthStep ? EMPTY : of(authInfoModalOpenAction()),
      );
    }),
  );
};

const loginSubmitFormFactory = (formName: string): TPlatformEpic => (action$, state$, deps) => action$.pipe(
  isFormCreator(formName)(submitFormAction),
  ifFormValid(formName)(state$),
  switchMap(() => doLoginEpic(action$, state$, deps)),
);

const loginSubmitEpic = loginSubmitFormFactory(LOGIN_FORM_NAME);

const loginAfterTwoFactorAuthSubmitEpic = loginSubmitFormFactory(TWO_FACTOR_AUTH_CONFIRM_FORM_NAME);

export { loginSubmitEpic, lockForTimeEpic, loginAfterTwoFactorAuthSubmitEpic };
