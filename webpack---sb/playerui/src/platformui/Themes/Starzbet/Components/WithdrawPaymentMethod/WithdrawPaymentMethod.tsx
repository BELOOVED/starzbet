import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { isNil, isNotNil } from "@sb/utils";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../../../../Store/Banking/Models/PaymentMethodIdModel";
import { platformBankingWithdrawPaymentMethodSelector } from "../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { WithdrawForm } from "../WithdrawForm/WithdrawForm";
import { FinFixCryptoMethod } from "./FinFixCryptoMethod/FinFixCryptoMethod";
import { FixFinHavaleMethod } from "./FixFinHavaleMethod/FixFinHavaleMethod";
import { PayportMethodForm } from "./PayportMethodForm/PayportMethodForm";

const withdrawFormExtraContent: Partial<Record<TPaymentMethodId, ComponentType>> = {
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_COMMON_ID]: FinFixCryptoMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_VEGAPAY_HAVALE]: FixFinHavaleMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_ULTRAPAY_HAVALE]: FixFinHavaleMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_KOLAYPAY_HAVALE]: FixFinHavaleMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_SISTEMNAKIT_HAVALE]: FixFinHavaleMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_FINPAY_HAVALE]: FixFinHavaleMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_FIN2]: FixFinHavaleMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_SERIPAY1]: FixFinHavaleMethod,
  [PAYMENT_METHOD_ID_MAP.PAY_PORT_WITHDRAWAL_ID]: PayportMethodForm,
};

const WithdrawFormContent = memo(() => {
  const paymentMethodId = useSelector(platformBankingWithdrawPaymentMethodSelector);

  // todo^Bondarenko investigate after router update
  if (isNil(paymentMethodId)) {
    return null;
  }

  const extraContent = withdrawFormExtraContent[paymentMethodId];

  if (isNotNil(extraContent)) {
    return createElement(extraContent);
  }

  return (
    <WithdrawForm />
  );
});
WithdrawFormContent.displayName = "WithdrawFormContent";

export { WithdrawFormContent };
