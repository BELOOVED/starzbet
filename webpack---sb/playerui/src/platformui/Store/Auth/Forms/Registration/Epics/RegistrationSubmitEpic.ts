import { catchError, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { EMPTY, filter, merge, of, take } from "rxjs";
import type { AnyAction } from "redux";
import { ifFormValid, isFormCreator, selectFormValue, submitFormAction, submitFormFailedAction } from "@sb/form-new";
import type { IControl } from "@sb/translator";
import { EAlpha3Code, getCountryByAlpha3, getNotNil, isCreator, isNil, Time } from "@sb/utils";
import { authorizedAction } from "@sb/auth";
import { type IRegisterPlayerCommand } from "@sb/sdk/platform/player/api/command/player/RegisterPlayerCommand";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { securityQuestions } from "../../../../../../common/Store/Player/Model/SecurityQuestions";
import { EHonorific } from "../../../../../../common/Store/Player/Model/EHonorific";
import {
  playerMinimalReceivedAction,
  showVerifyPhoneModalAction,
} from "../../../../../../common/Store/Player/PlayerActions";
import { normalizePlayerMinimal } from "../../../../../../common/Store/Player/Model/IPlayerMinimal";
import { hasProfileAndWalletSelector } from "../../../../../../common/Store/Player/Selectors/ProfileSelectors";
import {
  verifiedPhoneVerificationTokenSelector,
} from "../../../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { safeRequestPayload } from "../../../../../../common/Utils/SafeRequestPayload";
import { systemCurrency } from "../../../../../../common/SystemCurrency";
import { modalCloseAction } from "../../../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { phoneValueToString } from "../../../../../../common/Utils/PhoneValueToString";
import { callWithAbort } from "../../../../../../common/Utils/EpicUtils/CallWithAbort";
import {
  replaceLocalized,
} from "../../../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { formatDateStringToIsoString } from "../../../../../Utils/ParseDateString";
import { getCookie } from "../../../../../Utils/Cookie";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { clearCPF } from "../../../../../Utils/TransformInputs";
import { type TPlatformEpic } from "../../../../Root/Epic/TPlatformEpic";
import { REFERRAL_LINK } from "../../../../Reference/ReferenceRootEpic";
import { parseReferralLink } from "../../../../Reference/GetReferralLink";
import { formSentryCapture } from "../../../../Form/Utils/FormSentryCapture";
import { localeSelector } from "../../../../Locale/Selectors/localeSelector";
import { registerSuccessAction } from "../../../AuthActions";
import { checkLoginWithPlayer } from "../../../WasLoginWithPlayerSubject";
import { type TBrazilRegistrationForm, type TRegistrationForm } from "../Fields";
import { BRAZIL_REGISTRATION_FORM_NAME, PRIVATE_REGISTRATION_FORM_NAME, REGISTRATION_FORM_NAME } from "../Model";

const getCustomerReferralLink = () => {
  const referralLink = getCookie(REFERRAL_LINK);

  if (isNil(referralLink)) {
    return null;
  }

  return parseReferralLink(referralLink);
};

const DEFAULT_REGISTER = {
  securityQuestionAnswer: "Pizza",
  address: "",
  townCity: "",
  currency: systemCurrency,
  honorific: EHonorific.MR,
  timeZone: Time.getClientTimezoneName(),
  selfProtectionBags: [],
};

const getPayload = (
  {
    dateOfBirth: date,
    mobilePhone,
    promoRegistration,
    country,
    ...rest
  }: TRegistrationForm,
  translateControl: IControl,
): IRegisterPlayerCommand => {
  const dateOfBirth = formatDateStringToIsoString(date);

  const customerReferralLink = getCustomerReferralLink();

  const key: string = securityQuestions[1];

  const securityQuestion = translateControl.plain(key);

  return {
    ...DEFAULT_REGISTER,
    ...rest,
    phoneNumber: phoneValueToString(mobilePhone),
    dateOfBirth,
    securityQuestion,
    customerReferralLink,
    bonusId: promoRegistration,
    countryId: country,
  };
};

const endRegistrationEpic: TPlatformEpic = (action$, state$) => state$.pipe(
  map(hasProfileAndWalletSelector),
  distinctUntilChanged(),
  filter(Boolean),
  take(1),
  switchMap(() => {
    const verifiedPhone = verifiedPhoneVerificationTokenSelector(state$.value);
    const locale = localeSelector(state$.value);

    const actions: AnyAction[] = [
      replaceLocalized(locale, routeMap.myDetailsRoute),
    ];

    if (!IS_MOBILE_CLIENT_SIDE) {
      actions.push(modalCloseAction(EModal.auth));
    }

    if (!verifiedPhone) {
      actions.push(showVerifyPhoneModalAction());
    }

    return merge(...actions.map((a) => of(a)));
  }),
);

// TODO - Add dynamic store when @sb/router will support reducers
const doAuthorizeEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(registerSuccessAction),
  switchMap(({ payload: { response } }) => {
    checkLoginWithPlayer(response);

    return merge(
      of(authorizedAction(response.token)),
      of(playerMinimalReceivedAction(normalizePlayerMinimal(response.player))),
      endRegistrationEpic(action$, state$, deps),
    );
  }),
);

const registrationSubmitEpic: TPlatformEpic = (action$, state$, deps) =>
  action$.pipe(
    isFormCreator(REGISTRATION_FORM_NAME)(submitFormAction),
    ifFormValid(REGISTRATION_FORM_NAME)(state$),
    switchMap(() => {
      const credentials = selectFormValue<TRegistrationForm>(state$.value, REGISTRATION_FORM_NAME);

      const payload = getPayload(credentials, deps.translateControl);

      return callWithAbort(deps.platformHttpApi.callPlatformRegister, safeRequestPayload(payload))
        .pipe(
          switchMap((response) => {
            const token = response.token;

            if (!token) {
              return EMPTY;
            }

            return of(registerSuccessAction(response));
          }),
          catchError((errors) => {
            formSentryCapture(errors, REGISTRATION_FORM_NAME);

            return of(submitFormFailedAction(REGISTRATION_FORM_NAME, errors));
          }),
        );
    }),
  );

const privateRegistrationSubmitEpic: TPlatformEpic = (action$, state$, deps) =>
  action$.pipe(
    isFormCreator(PRIVATE_REGISTRATION_FORM_NAME)(submitFormAction),
    ifFormValid(PRIVATE_REGISTRATION_FORM_NAME)(state$),
    switchMap(() => {
      const credentials = selectFormValue<TRegistrationForm>(state$.value, PRIVATE_REGISTRATION_FORM_NAME);

      const customerReferralLink = getCustomerReferralLink();

      return callWithAbort(
        deps.platformHttpApi.callPlatformPrivateRegister,
        safeRequestPayload({ ...credentials, customerReferralLink }),
      ).pipe(
        switchMap((response) => {
          const token = response.token;

          if (!token) {
            return EMPTY;
          }

          return of(registerSuccessAction(response));
        }),
        catchError((errors) => {
          formSentryCapture(errors, PRIVATE_REGISTRATION_FORM_NAME);

          return of(submitFormFailedAction(PRIVATE_REGISTRATION_FORM_NAME, errors));
        }),
      );
    }),
  );

const getBrazilPayload = (credentials: TBrazilRegistrationForm) => {
  const customerReferralLink = getCustomerReferralLink();

  const clearID = clearCPF(credentials.CPF);

  const { id } = getNotNil(getCountryByAlpha3(EAlpha3Code.BRA), ["PlatformPlayerBrazilRegisterEpic"], "Brazil ID");

  return {
    ...credentials,
    phoneNumber: phoneValueToString(credentials.mobilePhone),
    customerReferralLink,
    countryId: id,
    identityNumber: clearID,
    surname: credentials.name, // Temp - BE need name & surname
  };
};

const brazilRegistrationSubmitEpic: TPlatformEpic = (action$, state$, deps) =>
  action$.pipe(
    isFormCreator(BRAZIL_REGISTRATION_FORM_NAME)(submitFormAction),
    ifFormValid(BRAZIL_REGISTRATION_FORM_NAME)(state$),
    switchMap(() => {
      const credentials = selectFormValue<TBrazilRegistrationForm>(state$.value, BRAZIL_REGISTRATION_FORM_NAME);

      const payload = getBrazilPayload(credentials);

      return callWithAbort(deps.platformHttpApi.callPlatformPrivateRegister, safeRequestPayload(payload))
        .pipe(
          switchMap((response) => {
            const token = response.token;

            if (!token) {
              return EMPTY;
            }

            return of(registerSuccessAction(response));
          }),
          catchError((errors) => {
            formSentryCapture(errors, BRAZIL_REGISTRATION_FORM_NAME);

            return of(submitFormFailedAction(BRAZIL_REGISTRATION_FORM_NAME, errors));
          }),
        );
    }),
  );

export {
  registrationSubmitEpic,
  privateRegistrationSubmitEpic,
  brazilRegistrationSubmitEpic,
  doAuthorizeEpic,
};
