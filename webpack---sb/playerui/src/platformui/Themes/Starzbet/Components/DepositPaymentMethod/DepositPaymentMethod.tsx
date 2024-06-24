import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { isNil, isNotNil } from "@sb/utils";
import { platformBankingDepositPaymentMethodSelector } from "../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../../../../Store/Banking/Models/PaymentMethodIdModel";
import { DepositForm } from "../DepositForm/DepositForm";
import { DepositBankAccountMethod } from "./DepositBankAccountMethod/DepositBankAccountMethod";
import { FinFixCryptoMethod } from "./FinFixCryptoMethod/FinFixCryptoMethod";

const depositFormExtraContent: Partial<Record<TPaymentMethodId, ComponentType>> = {
  [PAYMENT_METHOD_ID_MAP.BANK_TRANSFER_DEPOSIT_ID]: DepositBankAccountMethod,
  [PAYMENT_METHOD_ID_MAP.KOLAY_PAY_HAVALE_DEPOSIT_ID]: DepositBankAccountMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_FASTLINE_QR]: DepositBankAccountMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_FASTLINE_CEPBANK]: DepositBankAccountMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_SISTEMNAKIT_HAVALE]: DepositBankAccountMethod,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_COMMON_ID]: FinFixCryptoMethod,
};

const DepositFormContent = memo(() => {
  const paymentMethodId = useSelector(platformBankingDepositPaymentMethodSelector);

  // todo^Bondarenko investigate after router update
  if (isNil(paymentMethodId)) {
    return null;
  }
  const extraContent = depositFormExtraContent[paymentMethodId];

  if (isNotNil(extraContent)) {
    return createElement(extraContent);
  }

  return (
    <DepositForm />
  );
});
DepositFormContent.displayName = "DepositFormContent";

export { DepositFormContent };
