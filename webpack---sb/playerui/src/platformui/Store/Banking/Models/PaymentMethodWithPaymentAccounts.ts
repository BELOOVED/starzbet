import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodWithdrawalId } from "./PaymentMethodIdModel";

const PAYMENT_METHODS_WITH_PAYMENT_ACCOUNTS: TPaymentMethodWithdrawalId[] = [
  PAYMENT_METHOD_ID_MAP.BANK_TRANSFER_WITHDRAWAL_ID,
  PAYMENT_METHOD_ID_MAP.KOLAY_PAY_HAVALE_WITHDRAWAL_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TR_HAVALE_EFT,
  PAYMENT_METHOD_ID_MAP.ONE_SWIFT_WITHDRAWAL_ID,
  PAYMENT_METHOD_ID_MAP.ONE_SEPA_WITHDRAWAL_ID,
  PAYMENT_METHOD_ID_MAP.PAYMENT_CLIP_UPI_WITHDRAWAL_ID,
];

export { PAYMENT_METHODS_WITH_PAYMENT_ACCOUNTS };
