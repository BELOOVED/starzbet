import { createMemoSelector, createSimpleSelector, getNotNil, removeVoidProperties } from "@sb/utils";
import { type TCallPayload } from "@sb/sdk";
import {
  type call_ExxogateMakeBankWithdrawalCommand,
  type call_ExxogateMakeImpsWithdrawalCommand,
  type call_ExxogateMakeTestDepositCommand,
  type call_ExxogateMakeTestWithdrawalCommand,
  type call_ExxogateMakeUpiDepositCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import type { TPlatform_ExxogateBank_Fragment } from "@sb/graphql-client/PlayerUI";
import { profileSelectors } from "../../../../../common/Store/Player/Selectors/ProfileSelectors";
import { phoneVerificationTokenSelectors } from "../../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { toSelectOption } from "../../../../../common/Components/Field/SelectModel";
import { localeSelector } from "../../../Locale/Selectors/localeSelector";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import {
  bankingSystemBankAccountsSelector,
  platformBankingDepositPaymentMethodNonNullableSelector,
  platformBankingWithdrawPaymentMethodNonNullableSelector,
} from "../../Selectors/PlatformBankingSelectors";
import type { TPlatformSystemBankAccountType } from "../../PlatformBankingInitialState";
import { depositFormValueSelector } from "../DepositFormSelectors";
import { withdrawFormValueSelector } from "../WithdrawFormSelectors";
import {
  type TExxogateImps29FormModel,
  type TExxogateImps41FormModel,
  type TExxogateImps43FormModel,
  type TExxogateImps9FormModel,
  type TExxogateTestDepositFormModel,
  type TExxogateTestWithdrawalFormModel,
  type TExxogateUpi41DepositFormModel,
  type TExxogateUpi43DepositFormModel,
  type TExxogateUpiBaseDepositFormModel,
} from "./ExxogateFormModel";

/**
 * Exxogate Test Deposit Form
 */
const depositExxogateTestFormInitialValueSelector = createSimpleSelector(
  [
    profileSelectors.name,
    profileSelectors.surname,
    profileSelectors.address,
    profileSelectors.townCity,
    phoneVerificationTokenSelectors.phoneNumber,
  ],
  (
    name,
    surname,
    address,
    townCity,
    phoneNumber,
  ): Partial<TExxogateTestDepositFormModel> => removeVoidProperties({
    firstName: name,
    lastName: surname,
    address,
    city: townCity,
    phone: phoneNumber,
  }),
);

const depositExxogateTestCallPayloadSelector = createSimpleSelector(
  [
    depositFormValueSelector<TExxogateTestDepositFormModel>,
    platformBankingDepositPaymentMethodNonNullableSelector,
    localeSelector,
  ],
  (formState, paymentMethodId, locale): TCallPayload<typeof call_ExxogateMakeTestDepositCommand> => ({
    address: formState.address,
    city: formState.city,
    countryCode: formState.countryCode,
    firstName: formState.firstName,
    lastName: formState.lastName,
    personId: formState.personId,
    phone: formState.phone,
    sum: formState.amount,
    bonusIdToClaim: formState.depositPromotionBonusId,
    paymentMethodId,
    locale,
  }),
);

const getExxogatePayloadKind = (method: string) => `Exxogate${method}Data`;

/**
 * Exxogate Deposit Form
 */
type TDepositCallPayload = TCallPayload<typeof call_ExxogateMakeUpiDepositCommand>

const depositExxogateUpiCallPayloadSelectorFactory = <F>(normalize: (v: F) => TDepositCallPayload["upiData"]) =>
  (state: TPlatformAppState): TDepositCallPayload => {
    const formState = depositFormValueSelector<F>(state);
    const paymentMethodId = platformBankingDepositPaymentMethodNonNullableSelector(state);
    const locale = localeSelector(state);

    return {
      upiData: normalize(formState),
      locale,
      sum: formState.amount,
      bonusIdToClaim: formState.depositPromotionBonusId,
      paymentMethodId: paymentMethodId,
    };
  };

const depositExxogateUpiBaseFormInitialValueSelector = createSimpleSelector(
  [
    profileSelectors.name,
    profileSelectors.surname,
    profileSelectors.address,
    phoneVerificationTokenSelectors.phoneNumber,
  ],
  (
    name,
    surname,
    address,
    phoneNumber,
  ): Partial<TExxogateUpiBaseDepositFormModel> => removeVoidProperties({
    firstName: name,
    lastName: surname,
    address,
    phone: phoneNumber,
  }),
);

/**
 * Exxogate UPI 9 Deposit Form
 */
const getUpi9DepositUpiData = (formState: TExxogateUpiBaseDepositFormModel) => ({
  __payloadKind: getExxogatePayloadKind("Upi9"),
  address: formState.address,
  firstName: formState.firstName,
  lastName: formState.lastName,
  personId: formState.personId,
  phone: formState.phone,
});

const depositExxogateUpi9CallPayloadSelector = depositExxogateUpiCallPayloadSelectorFactory(getUpi9DepositUpiData);

/**
 * Exxogate UPI 29 Deposit Form
 */
const getUpi29DepositUpiData = (formState: TExxogateUpiBaseDepositFormModel) => ({
  __payloadKind: getExxogatePayloadKind("Upi29"),
  address: formState.address,
  firstName: formState.firstName,
  lastName: formState.lastName,
  personId: formState.personId,
  phone: formState.phone,
});

const depositExxogateUpi29CallPayloadSelector = depositExxogateUpiCallPayloadSelectorFactory(getUpi29DepositUpiData);

/**
 * Exxogate UPI 41 Deposit Form
 */
const depositExxogateUpi41FormInitialValueSelector = createSimpleSelector(
  [phoneVerificationTokenSelectors.phoneNumber],
  (phoneNumber): Partial<TExxogateUpi41DepositFormModel> => ({ phone: phoneNumber }),
);

const getUpi41DepositUpiData = (formState: TExxogateUpi41DepositFormModel) => ({
  __payloadKind: getExxogatePayloadKind("Upi41"),
  phone: formState.phone,
});

const depositExxogateUpi41CallPayloadSelector = depositExxogateUpiCallPayloadSelectorFactory(getUpi41DepositUpiData);

/**
 * Exxogate UPI 43 Deposit Form
 */
const depositExxogateUpi43FormInitialValueSelector = createSimpleSelector(
  [
    profileSelectors.name,
    profileSelectors.surname,
    phoneVerificationTokenSelectors.phoneNumber,
  ],
  (
    name,
    surname,
    phoneNumber,
  ): Partial<TExxogateUpi43DepositFormModel> => ({
    firstName: name,
    lastName: surname,
    phone: phoneNumber,
  }),
);

const getUpi43DepositUpiData = (formState: TExxogateUpi43DepositFormModel) => ({
  __payloadKind: getExxogatePayloadKind("Upi43"),
  firstName: formState.firstName,
  lastName: formState.lastName,
  phone: formState.phone,
});

const depositExxogateUpi43CallPayloadSelector = depositExxogateUpiCallPayloadSelectorFactory(getUpi43DepositUpiData);

/**
 * Withdraw Form
 */
const withdrawExxogateFormInitialValueSelector = createSimpleSelector(
  [
    profileSelectors.address,
    phoneVerificationTokenSelectors.phoneNumber,
  ],
  (address, phoneNumber) => removeVoidProperties({
    address,
    phone: phoneNumber,
  }),
);

const withdrawExxogateTestCallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TExxogateTestWithdrawalFormModel>,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_ExxogateMakeTestWithdrawalCommand> => ({
    address: formState.address,
    personId: formState.personId,
    phone: formState.phone,
    sum: formState.amount,
    paymentMethodId,
  }),
);

type TWithdrawCallPayload = TCallPayload<typeof call_ExxogateMakeImpsWithdrawalCommand>

const withdrawExxogateImpsCallPayloadSelectorFactory = <F>(normalize: (v: F) => TWithdrawCallPayload["impsData"]) =>
  (state: TPlatformAppState): TWithdrawCallPayload => {
    const formState = withdrawFormValueSelector<F>(state);
    const paymentMethodId = platformBankingWithdrawPaymentMethodNonNullableSelector(state);

    return {
      impsData: normalize(formState),
      sum: formState.amount,
      paymentMethodId: paymentMethodId,
    };
  };

/**
 * Exxogate IMPS 9 Withdraw Form
 */
const getImps9WithdrawUpiData = (formState: TExxogateImps9FormModel): TWithdrawCallPayload["impsData"] => ({
  __payloadKind: getExxogatePayloadKind("Imps9"),
  address: formState.address,
  ifsc: formState.ifsc,
  personId: formState.personId,
  phone: formState.phone,
});

const withdrawExxogateImps9CallPayloadSelector = withdrawExxogateImpsCallPayloadSelectorFactory(getImps9WithdrawUpiData);

/**
 * Exxogate IMPS 29 Withdraw Form
 */
const getImps29WithdrawUpiData = (formState: TExxogateImps29FormModel): TWithdrawCallPayload["impsData"] => ({
  __payloadKind: getExxogatePayloadKind("Imps29"),
  address: formState.address,
  bankAccountNumber: formState.bankAccountNumber,
  ifsc: formState.ifsc,
  phone: formState.phone,
});

const withdrawExxogateImps29CallPayloadSelector = withdrawExxogateImpsCallPayloadSelectorFactory(getImps29WithdrawUpiData);

/**
 * Exxogate IMPS 41 Withdraw Form
 */
const getImps41WithdrawUpiData = (formState: TExxogateImps41FormModel): TWithdrawCallPayload["impsData"] => ({
  __payloadKind: getExxogatePayloadKind("Imps41"),
  bankAccountNumber: formState.bankAccountNumber,
  ifsc: formState.ifsc,
});

const withdrawExxogateImps41CallPayloadSelector = withdrawExxogateImpsCallPayloadSelectorFactory(getImps41WithdrawUpiData);

/**
 * Exxogate IMPS 43 Withdraw Form
 */
const withdrawExxogateImps43CallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TExxogateImps43FormModel>,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_ExxogateMakeBankWithdrawalCommand> => ({
    bankId: +formState.bankId,
    bankAccountNumber: formState.bankAccountNumber,
    ifsc: formState.ifsc,
    sum: formState.amount,
    paymentMethodId: paymentMethodId,
  }),
);

const isExxogateBank = (bankAccount: TPlatformSystemBankAccountType[]): bankAccount is TPlatform_ExxogateBank_Fragment[] =>
  bankAccount.every(({ __typename }) => __typename === "Platform_ExxogateBank");

const exxogateBanksSelector = createSimpleSelector(
  [bankingSystemBankAccountsSelector],
  (list) => {
    if (!isExxogateBank(list)) {
      throw new Error("[exxogateBankOptionsSelector]: Unexpected bank list");
    }

    return list;
  },
);

const exxogateBankOptionsSelector = createMemoSelector(
  [exxogateBanksSelector],
  (list) => list.map(({ id }) => toSelectOption(id)),
);

const exxogateBankNameByIdSelector = createSimpleSelector(
  [
    exxogateBanksSelector,
    (_, id: string) => id,
  ],
  (bankIds, bankId) => getNotNil(
    bankIds.find(({ id }) => id === bankId),
    ["exxogateBankByIdSelector", "bankIds.find(({id}) => id === bankId)"],
    bankId,
  ).name,
);

export {
  depositExxogateTestFormInitialValueSelector,
  depositExxogateTestCallPayloadSelector,

  depositExxogateUpiBaseFormInitialValueSelector,
  depositExxogateUpi9CallPayloadSelector,
  depositExxogateUpi29CallPayloadSelector,
  depositExxogateUpi41FormInitialValueSelector,
  depositExxogateUpi41CallPayloadSelector,
  depositExxogateUpi43FormInitialValueSelector,
  depositExxogateUpi43CallPayloadSelector,

  withdrawExxogateFormInitialValueSelector,

  withdrawExxogateTestCallPayloadSelector,

  withdrawExxogateImps9CallPayloadSelector,
  withdrawExxogateImps29CallPayloadSelector,
  withdrawExxogateImps41CallPayloadSelector,
  withdrawExxogateImps43CallPayloadSelector,
  exxogateBankOptionsSelector,
  exxogateBankNameByIdSelector,
};
