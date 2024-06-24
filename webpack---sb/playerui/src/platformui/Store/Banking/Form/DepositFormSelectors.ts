import { selectFormValue } from "@sb/form-new";
import { createMemoSelector, createPropertySelector, createSimpleSelector, Money } from "@sb/utils";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { type TPlatformAppState } from "../../PlatformInitialState";
import {
  depositActiveBankAccountIdSelector,
  hasDataByPaymentMethodSelector,
  paymentMethodMaxPaymentAmountSelector,
  paymentMethodMinPaymentAmountSelector,
  platformBankingDepositPaymentMethodNonNullableSelector,
  platformBankingSelector,
} from "../Selectors/PlatformBankingSelectors";
import { paymentMethodsLoadedSelector } from "../Selectors/PlatformBankingLoaderSelectors";
import { DEPOSIT_FORM } from "../Utils/Variables";
import { PAYMENT_METHOD_ID_MAP } from "../Models/PaymentMethodIdModel";
import { getMoneyInputQuickValues } from "../Utils/MoneyInputFallback";
import { bankTransferAccountSelectors } from "./BankTransfer/BankTransferAccountSelectors";
import { kolayPayAccountActiveSelectors } from "./KolayPay/KolayPayAccountSelectors";
import { type TDepositBaseFormModel } from "./BaseFormModel";

const depositFormValueSelector = <T>(state: TPlatformAppState) => selectFormValue<T & TDepositBaseFormModel>(state, DEPOSIT_FORM);

const depositSimpleCallPayloadSelector = createSimpleSelector(
  [
    depositFormValueSelector,
    platformBankingDepositPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId) => ({
    sum: formState.amount,
    paymentMethodId: paymentMethodId,
    bonusIdToClaim: formState.depositPromotionBonusId,
  }),
);

const isDepositMethodAvailableSelector = (state: TPlatformAppState) => {
  const methodLoaded = paymentMethodsLoadedSelector(state);

  if (!methodLoaded) {
    return methodLoaded;
  }

  const paymentMethodId = platformBankingDepositPaymentMethodNonNullableSelector(state);

  return hasDataByPaymentMethodSelector(state, paymentMethodId);
};

const isDepositWithBankAccountFormShouldRenderSelector = (state: TPlatformAppState) => {
  const methodLoaded = isDepositMethodAvailableSelector(state);

  if (!methodLoaded) {
    return methodLoaded;
  }

  return !!depositActiveBankAccountIdSelector(state);
};

const depositFormResponseSelector = createPropertySelector(
  platformBankingSelector,
  "formResponse",
);

const depositFormResponseSelectorFactory = <R>(
  assertsType: (formResponse: unknown, context: string) => asserts formResponse is R,
  context: string,
) => createSimpleSelector(
    [depositFormResponseSelector],
    (formResponse) => {
      assertsType(formResponse, `${context} => depositFormResponseSelectorFactory`);

      return formResponse;
    },
  );

const depositMinAmountSelector = (state: TPlatformAppState) => {
  const paymentMethodId = platformBankingDepositPaymentMethodNonNullableSelector(state);

  if (paymentMethodId === PAYMENT_METHOD_ID_MAP.BANK_TRANSFER_DEPOSIT_ID) {
    const minDeposit = bankTransferAccountSelectors.minDeposit(state);

    if (minDeposit) {
      return minDeposit;
    }
  }

  if (paymentMethodId === PAYMENT_METHOD_ID_MAP.KOLAY_PAY_HAVALE_DEPOSIT_ID) {
    const minDeposit = kolayPayAccountActiveSelectors.min(state);

    if (minDeposit) {
      return minDeposit;
    }
  }

  const minDeposit = paymentMethodMinPaymentAmountSelector(state, paymentMethodId);
  const playerCurrency = playerCurrencySelector(state);

  if (minDeposit && Money.hasCurrency(minDeposit, playerCurrency)) {
    return minDeposit;
  }

  return null;
};

const depositMaxAmountSelector = (state: TPlatformAppState) => {
  const paymentMethodId = platformBankingDepositPaymentMethodNonNullableSelector(state);

  if (paymentMethodId === PAYMENT_METHOD_ID_MAP.BANK_TRANSFER_DEPOSIT_ID) {
    const maxDeposit = bankTransferAccountSelectors.maxDeposit(state);

    if (maxDeposit) {
      return maxDeposit;
    }
  }

  const maxDeposit = paymentMethodMaxPaymentAmountSelector(state, paymentMethodId);
  const playerCurrency = playerCurrencySelector(state);

  if (maxDeposit && Money.hasCurrency(maxDeposit, playerCurrency)) {
    return maxDeposit;
  }

  return null;
};

const depositAmountQuickButtonsSelector = createMemoSelector(
  [
    depositMinAmountSelector,
    depositMaxAmountSelector,
    playerCurrencySelector,
  ],
  getMoneyInputQuickValues,
);

export {
  depositFormValueSelector,
  depositSimpleCallPayloadSelector,

  isDepositMethodAvailableSelector,
  isDepositWithBankAccountFormShouldRenderSelector,

  depositFormResponseSelectorFactory,

  depositAmountQuickButtonsSelector,
};
