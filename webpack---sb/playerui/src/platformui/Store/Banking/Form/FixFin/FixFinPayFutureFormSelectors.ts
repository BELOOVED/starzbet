import { createSimpleSelector, removeVoidProperties } from "@sb/utils";
import type { TCallPayload } from "@sb/sdk";
import {
  type call_FixFinMakePayfutureWithdrawalCommand,
  type call_FixFinPayfutureMakeFiatDepositCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import { EPlatform_FixFinPayfutureMethodType } from "@sb/graphql-client";
import { profileSelectors } from "../../../../../common/Store/Player/Selectors/ProfileSelectors";
import {
  emailFromTokenSelector,
  phoneVerificationTokenSelectors,
} from "../../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import {
  platformBankingDepositPaymentMethodNonNullableSelector,
  platformBankingWithdrawPaymentMethodNonNullableSelector,
} from "../../Selectors/PlatformBankingSelectors";
import { depositFormValueSelector } from "../DepositFormSelectors";
import { withdrawFormValueSelector } from "../WithdrawFormSelectors";
import { type TFixFinPayFutureDepositFormModel, type TFixFinPayFutureWithdrawFormModel } from "./FixFinPayFutureFormModel";

const depositFixFinPayFutureFormInitialStateSelector = createSimpleSelector(
  [
    profileSelectors.address,
    profileSelectors.townCity,
    emailFromTokenSelector,
    profileSelectors.postcode,
    phoneVerificationTokenSelectors.phoneNumber,
  ],
  (
    address,
    city,
    email,
    postCode,
    phoneNumber,
  ): Partial<TFixFinPayFutureDepositFormModel> => removeVoidProperties({
    address: address,
    city: city,
    email: email,
    phone: phoneNumber,
    postcode: postCode,
  }),
);

const depositFixFinPayFutureCallPayloadSelector = createSimpleSelector(
  [
    depositFormValueSelector<TFixFinPayFutureDepositFormModel>,
    platformBankingDepositPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_FixFinPayfutureMakeFiatDepositCommand> => ({
    address: formState.address,
    bonusIdToClaim: formState.depositPromotionBonusId,
    city: formState.city,
    email: formState.email,
    paymentMethodId: paymentMethodId,
    phone: formState.phone,
    postcode: formState.postcode,
    state: formState.state,
    sum: formState.amount,
  }),
);

const withdrawFixFinPayFutureFormInitialStateSelector = createSimpleSelector(
  [
    emailFromTokenSelector,
    phoneVerificationTokenSelectors.phoneNumber,
  ],
  (
    email,
    phoneNumber,
  ): Partial<TFixFinPayFutureWithdrawFormModel> => removeVoidProperties({
    methodType: EPlatform_FixFinPayfutureMethodType.netbanking,
    email: email,
    phone: phoneNumber,
  }),
);

const withdrawFixFinPayFutureCallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TFixFinPayFutureWithdrawFormModel>,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_FixFinMakePayfutureWithdrawalCommand> => {
    const payload: TCallPayload<typeof call_FixFinMakePayfutureWithdrawalCommand> = {
      accountHolderName: formState.accountHolderName,
      accountNumber: formState.details.accountNumber,
      bankCode: formState.bankCode,
      email: formState.email,
      methodType: formState.methodType,
      phone: formState.phone,
      sum: formState.amount,
      paymentMethodId: paymentMethodId,
    };

    if (formState.methodType === EPlatform_FixFinPayfutureMethodType.netbanking) {
      payload.bankBranch = formState.details.bankBranch;
      payload.bankName = formState.details.bankName;
    }

    return payload;
  },
);

export {
  depositFixFinPayFutureFormInitialStateSelector,
  depositFixFinPayFutureCallPayloadSelector,

  withdrawFixFinPayFutureFormInitialStateSelector,
  withdrawFixFinPayFutureCallPayloadSelector,
};
