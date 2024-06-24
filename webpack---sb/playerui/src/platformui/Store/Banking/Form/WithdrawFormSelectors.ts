import { selectFormValue } from "@sb/form-new";
import { createSimpleSelector } from "@sb/utils";
import { emailFromTokenSelector } from "../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { playerPaymentAccountsLoadedSelector } from "../../PaymentAccount/Selectors/PaymentAccountLoaderSelectors";
import {
  bankingAvailablePaymentAccountsSelector,
  hasDataByPaymentMethodSelector,
  platformBankingWithdrawPaymentMethodNonNullableSelector,
} from "../Selectors/PlatformBankingSelectors";
import { paymentMethodsLoadedSelector } from "../Selectors/PlatformBankingLoaderSelectors";
import { PAYMENT_METHODS_WITH_PAYMENT_ACCOUNTS } from "../Models/PaymentMethodWithPaymentAccounts";
import { WITHDRAW_FORM } from "../Utils/Variables";
import { type TWithAmountFormModel, type TWithEmailFormModel, type TWithPlayerPaymentAccountFormModel } from "./BaseFormModel";

const isWithdrawMethodAvailableSelector = (state: TPlatformAppState) => {
  const methodLoaded = paymentMethodsLoadedSelector(state);

  if (!methodLoaded) {
    return methodLoaded;
  }

  const paymentMethodId = platformBankingWithdrawPaymentMethodNonNullableSelector(state);

  const hasData = hasDataByPaymentMethodSelector(state, paymentMethodId);

  if (!hasData) {
    return hasData;
  }

  if (PAYMENT_METHODS_WITH_PAYMENT_ACCOUNTS.includes(paymentMethodId)) {
    const paymentAccountsLoaded = playerPaymentAccountsLoadedSelector(state);

    if (!paymentAccountsLoaded) {
      return paymentAccountsLoaded;
    }
  }

  return true;
};

const withdrawFormValueSelector = <T>(state: TPlatformAppState) => selectFormValue<T & TWithAmountFormModel>(state, WITHDRAW_FORM);

const withdrawPaymentAccountFormInitialValueSelector = createSimpleSelector(
  [bankingAvailablePaymentAccountsSelector],
  (accounts): Partial<TWithPlayerPaymentAccountFormModel> => {
    const [firstAccount] = accounts;

    if (firstAccount && accounts.length === 1) {
      return {
        playerPaymentAccountId: firstAccount.id,
      };
    }

    return {};
  },
);

const withdrawEmailFormInitialValue = createSimpleSelector(
  [
    emailFromTokenSelector,
  ],
  (email): Partial<TWithEmailFormModel> => ({
    email: email ?? undefined,
  }),
);

const withdrawEmailCallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TWithEmailFormModel>,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId) => ({
    sum: formState.amount,
    email: formState.email,
    paymentMethodId: paymentMethodId,
  }),
);

export {
  isWithdrawMethodAvailableSelector,
  withdrawFormValueSelector,
  withdrawPaymentAccountFormInitialValueSelector,
  withdrawEmailCallPayloadSelector,
  withdrawEmailFormInitialValue,
};
