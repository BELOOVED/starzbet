import type { TPlatform_PlayerPaymentAccountDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import { EPlatform_FixFinCryptoCurrency } from "@sb/graphql-client";
import { PAYMENT_METHOD_ID_MAP } from "../../Banking/Models/PaymentMethodIdModel";
import { EPaymentAccountBankAccount, EPaymentAccountEWallet } from "./PaymentAccountTypeModel";

const paymentAccountKindPerTypeName: Partial<Record<TPlatform_PlayerPaymentAccountDetails_Fragment["__typename"], string>> = {
  Platform_PaymentClipBankAccountDetails: EPaymentAccountBankAccount.paymentClip,
  Platform_PaparaAccountDetails: EPaymentAccountEWallet.papara,
  Platform_LtcWalletDetails: EPlatform_FixFinCryptoCurrency.ltc,
  Platform_DashWalletDetails: EPlatform_FixFinCryptoCurrency.dash,
  Platform_BtcWalletDetails: EPlatform_FixFinCryptoCurrency.btc,
  Platform_DogeWalletDetails: EPlatform_FixFinCryptoCurrency.doge,
  Platform_UsdtWalletDetails: EPlatform_FixFinCryptoCurrency.usdt,
  Platform_UsdcWalletDetails: EPlatform_FixFinCryptoCurrency.usdc,
  Platform_BttWalletDetails: EPlatform_FixFinCryptoCurrency.btt,
  Platform_EthWalletDetails: EPlatform_FixFinCryptoCurrency.eth,
  Platform_TrxWalletDetails: EPlatform_FixFinCryptoCurrency.trx,
  Platform_BchWalletDetails: EPlatform_FixFinCryptoCurrency.bch,
  Platform_RvnWalletDetails: EPlatform_FixFinCryptoCurrency.rvn,
  Platform_TonWalletDetails: EPlatform_FixFinCryptoCurrency.ton,
  Platform_XmrWalletDetails: EPlatform_FixFinCryptoCurrency.xmr,
};

const paymentAccountKindPerPaymentMethodId: Partial<Record<string, EPaymentAccountBankAccount>> = {
  [PAYMENT_METHOD_ID_MAP.KOLAY_PAY_HAVALE_WITHDRAWAL_ID]: EPaymentAccountBankAccount.bankTransfer,
  [PAYMENT_METHOD_ID_MAP.BANK_TRANSFER_WITHDRAWAL_ID]: EPaymentAccountBankAccount.bankTransfer,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TR_HAVALE_EFT]: EPaymentAccountBankAccount.trHavaleEft,
  [PAYMENT_METHOD_ID_MAP.ONE_SEPA_WITHDRAWAL_ID]: EPaymentAccountBankAccount.one,
  [PAYMENT_METHOD_ID_MAP.ONE_SWIFT_WITHDRAWAL_ID]: EPaymentAccountBankAccount.one,
  [PAYMENT_METHOD_ID_MAP.PAYMENT_CLIP_UPI_WITHDRAWAL_ID]: EPaymentAccountBankAccount.paymentClip,
};

const getPaymentAccountKind = (details: TPlatform_PlayerPaymentAccountDetails_Fragment) => {
  if (details.__typename === "Platform_BankAccountDetails") {
    const paymentMethodInfo = details.paymentMethodInfo;

    for (const { paymentMethod } of paymentMethodInfo) {
      if (!paymentMethod) {
        continue;
      }

      const kind = paymentAccountKindPerPaymentMethodId[paymentMethod.id];

      if (kind) {
        return kind;
      }
    }
  }

  return paymentAccountKindPerTypeName[details.__typename];
};

export { paymentAccountKindPerPaymentMethodId, getPaymentAccountKind };
