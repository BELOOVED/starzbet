import { createPropertySelector, createSimpleSelector, type ECurrencyCode, isNil, removeVoidProperties } from "@sb/utils";
import { type TCallPayload } from "@sb/sdk";
import { type call_MuchBetterMakeDepositCommand, type call_MuchBetterMakeWithdrawalCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { selectFieldValue } from "@sb/form-new";
import { phoneVerificationTokenSelectors } from "../../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { notNilPlayerProfileSelector } from "../../../../../common/Store/Player/Selectors/ProfileSelectors";
import { playerDetailsSelectors } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { formatDateStringToIsoString } from "../../../../Utils/ParseDateString";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { bankingMuchBetterPhoneNumberSelector, platformBankingSelector } from "../../Selectors/PlatformBankingSelectors";
import { muchBetterPhoneNumberLoadedSelector } from "../../Selectors/PlatformBankingLoaderSelectors";
import { isWithdrawMethodAvailableSelector, withdrawFormValueSelector } from "../WithdrawFormSelectors";
import { depositFormValueSelector, isDepositMethodAvailableSelector } from "../DepositFormSelectors";
import { MUCH_BETTER_FORM_FIELD_PATHS, type TMuchBetterFormModel } from "./MuchBetterForm";

const muchBetterTrackingCodeSelector = createPropertySelector(
  platformBankingSelector,
  ["muchBetterPhoneNumber", "trackingCode"],
);

interface IMuchBetterRequestParameter {
  trackingCode: string;
  currency: ECurrencyCode;
  email?: string;
  firstname: string;
  lastname: string;
  dobYYYYMMDD: string;
  address1: string;
  zipcode: string;
  phonenumber: string;
  city: string;
  country: string;
}

const MUCH_BETTER_SING_UP_LINK_URL = "https://a.api.muchbetter.com/merchant/user?";

const muchBetterSignUpUriSelector = (state: TPlatformAppState, formName: string) => {
  const trackingCode = muchBetterTrackingCodeSelector(state);

  if (isNil(trackingCode)) {
    return null;
  }
  const phoneNumber = selectFieldValue<string>(state, formName, MUCH_BETTER_FORM_FIELD_PATHS.phoneNumber);
  const profile = notNilPlayerProfileSelector(state);

  const dateOfBirth = formatDateStringToIsoString(
    profile.dateOfBirth,
    "yyyymmdd",
    "yyyy-mm-dd",
  );

  const parameters: Partial<IMuchBetterRequestParameter> = removeVoidProperties(
    {
      trackingCode,
      currency: profile.currency,
      firstname: profile.name,
      lastname: profile.surname,
      dobYYYYMMDD: dateOfBirth,
      address1: profile.address,
      zipcode: profile.postcode,
      phonenumber: phoneNumber,
      city: profile.townCity,
      country: profile.country.alpha2,
    },
  );

  const emailVerificationToken = playerDetailsSelectors.emailVerificationToken(state);

  if (emailVerificationToken) {
    parameters.email = emailVerificationToken.email;
  }

  const paramsString = new URLSearchParams({ ...parameters }).toString();

  return `${MUCH_BETTER_SING_UP_LINK_URL}${paramsString}`;
};

const muchBetterFormInitialValue = createSimpleSelector(
  [
    bankingMuchBetterPhoneNumberSelector,
    phoneVerificationTokenSelectors.phoneNumber,
  ],
  (lastUsedPhoneNumber, phoneNumber): TMuchBetterFormModel => ({
    phoneNumber: lastUsedPhoneNumber ?? phoneNumber,
  }),
);

const isWithdrawMuchBetterFormShouldRenderSelector = (state: TPlatformAppState) => {
  const methodLoaded = isWithdrawMethodAvailableSelector(state);

  if (!methodLoaded) {
    return methodLoaded;
  }

  return muchBetterPhoneNumberLoadedSelector(state);
};

const withdrawMuchBetterCallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TMuchBetterFormModel>,
    bankingMuchBetterPhoneNumberSelector,
  ],
  (formState, lastUsedPhoneNumber): TCallPayload<typeof call_MuchBetterMakeWithdrawalCommand> => ({
    sum: formState.amount,
    phoneNumber: lastUsedPhoneNumber ?? formState.phoneNumber,
  }),
);

const isDepositMuchBetterFormShouldRenderSelector = (state: TPlatformAppState) => {
  const methodLoaded = isDepositMethodAvailableSelector(state);

  if (!methodLoaded) {
    return methodLoaded;
  }

  return muchBetterPhoneNumberLoadedSelector(state);
};

const depositMuchBetterCallPayloadSelector = createSimpleSelector(
  [
    depositFormValueSelector<TMuchBetterFormModel>,
    bankingMuchBetterPhoneNumberSelector,
  ],
  (formState, lastUsedPhoneNumber): TCallPayload<typeof call_MuchBetterMakeDepositCommand> => ({
    sum: formState.amount,
    phoneNumber: lastUsedPhoneNumber ?? formState.phoneNumber,
    bonusIdToClaim: formState.depositPromotionBonusId,
  }),
);

export {
  muchBetterSignUpUriSelector,

  muchBetterFormInitialValue,

  isWithdrawMuchBetterFormShouldRenderSelector,
  withdrawMuchBetterCallPayloadSelector,

  isDepositMuchBetterFormShouldRenderSelector,
  depositMuchBetterCallPayloadSelector,
};

