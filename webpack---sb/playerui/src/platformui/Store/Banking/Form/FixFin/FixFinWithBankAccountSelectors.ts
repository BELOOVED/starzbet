import { createPropertySelector, createSimpleSelector, getNotNil } from "@sb/utils";
import type { TPlatform_FixFinBank_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import {
  bankingSystemBankAccountsSelector,
  depositActiveBankAccountIdNotNilSelector,
  depositActiveBankAccountIdSelector,
  platformBankingWithdrawPaymentMethodNonNullableSelector,
} from "../../Selectors/PlatformBankingSelectors";
import { type TPlatformSystemBankAccountType } from "../../PlatformBankingInitialState";
import { isWithdrawMethodAvailableSelector, withdrawFormValueSelector } from "../WithdrawFormSelectors";
import { depositSimpleCallPayloadSelector } from "../DepositFormSelectors";
import { type TFixFinFiatFormModel } from "./FixFinFiatFormModel";

const withdrawFixFinWithBankFormShouldRenderSelector = (state: TPlatformAppState) => {
  const methodLoaded = isWithdrawMethodAvailableSelector(state);

  if (!methodLoaded) {
    return methodLoaded;
  }

  return !!depositActiveBankAccountIdSelector(state);
};

// FixFin bank account
const isFixFinBankAccount = (bankAccount: TPlatformSystemBankAccountType[]): bankAccount is TPlatform_FixFinBank_Fragment[] =>
  bankAccount.every(({ __typename }) => __typename === "Platform_FixFinBank");

const fixFinAccountActiveSelector = createSimpleSelector(
  [
    bankingSystemBankAccountsSelector,
    depositActiveBankAccountIdNotNilSelector,
  ],
  (bankAccounts, bankId) => {
    if (!isFixFinBankAccount(bankAccounts)) {
      throw new Error("Unexpected bank account data selected");
    }

    return getNotNil(
      bankAccounts.find(({ id }) => id === bankId),
      ["fixFinAccountActiveSelector"],
      `activeFixFinBankAccountId: ${bankId}`,
    );
  },
);

const withdrawFixFinWithBankCallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TFixFinFiatFormModel>,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
    fixFinAccountActiveSelector,
  ],
  (formState, paymentMethodId, bank) => ({
    accountNumber: formState.accountNumber,
    paymentMethodId: paymentMethodId,
    sum: formState.amount,
    bank: bank,
  }),
);

const fixFinBankAccountNameSelector = createPropertySelector(
  fixFinAccountActiveSelector,
  "name",
);

const depositFixFinWithBankAccountCallPayloadSelector = createSimpleSelector(
  [
    depositSimpleCallPayloadSelector,
    depositActiveBankAccountIdNotNilSelector,
  ],
  (payload, bankAccountId) => ({
    ...payload,
    bankId: bankAccountId,
  }),
);

export {
  withdrawFixFinWithBankCallPayloadSelector,
  withdrawFixFinWithBankFormShouldRenderSelector,

  depositFixFinWithBankAccountCallPayloadSelector,

  fixFinBankAccountNameSelector,
  fixFinAccountActiveSelector,
};
