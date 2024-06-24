import { EPlatform_FixFinCryptoCurrency, EPlatform_PlayerPaymentAccountType } from "@sb/graphql-client";
import {
  platformui_paymentAccount_accountKind_bankTransfer,
  platformui_paymentAccount_accountKind_paymentClip,
  platformui_paymentAccount_accountKind_sepa_swift,
  platformui_paymentAccount_accountKind_trHavaleEft,
  platformui_paymentAccount_accountsList_bankAccounts,
  platformui_paymentAccount_accountsList_bankCards,
  platformui_paymentAccount_accountsList_cryptoWallets,
  platformui_paymentAccount_accountsList_eWallets,
  platformui_paymentAccount_accountType_bankAccount,
  platformui_paymentAccount_accountType_bankCard,
  platformui_paymentAccount_accountType_cryptoWallet,
  platformui_paymentAccount_accountType_eWallet,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { getSelectOptions } from "../../../../common/Components/Field/SelectModel";

enum EPaymentAccountEWallet {
  papara = "papara",
}

enum EPaymentAccountBankAccount {
  /**
   * Bank Transfer, Kolay Pay
   */
  bankTransfer = "bank_transfer",
  /**
   * Tr Havale Eft
   */
  trHavaleEft = "tr_havale_eft",
  /**
   * One IO
   */
  one = "one",
  /**
   * PaymentClip
   */
  paymentClip = "payment_clip"
}

const paymentAccountTypeTranslateMap: Record<EPlatform_PlayerPaymentAccountType, string> = {
  [EPlatform_PlayerPaymentAccountType.bankAccount]: platformui_paymentAccount_accountType_bankAccount,
  [EPlatform_PlayerPaymentAccountType.bankCard]: platformui_paymentAccount_accountType_bankCard,
  [EPlatform_PlayerPaymentAccountType.eWallet]: platformui_paymentAccount_accountType_eWallet,
  [EPlatform_PlayerPaymentAccountType.cryptoWallet]: platformui_paymentAccount_accountType_cryptoWallet,
};
const paymentAccountListTranslateMap: Record<EPlatform_PlayerPaymentAccountType, string> = {
  [EPlatform_PlayerPaymentAccountType.bankAccount]: platformui_paymentAccount_accountsList_bankAccounts,
  [EPlatform_PlayerPaymentAccountType.bankCard]: platformui_paymentAccount_accountsList_bankCards,
  [EPlatform_PlayerPaymentAccountType.eWallet]: platformui_paymentAccount_accountsList_eWallets,
  [EPlatform_PlayerPaymentAccountType.cryptoWallet]: platformui_paymentAccount_accountsList_cryptoWallets,
};

const paymentAccountBankAccountTranslateMap: Record<EPaymentAccountBankAccount, TCommonTKeys> = {
  [EPaymentAccountBankAccount.bankTransfer]: platformui_paymentAccount_accountKind_bankTransfer,
  [EPaymentAccountBankAccount.trHavaleEft]: platformui_paymentAccount_accountKind_trHavaleEft,
  [EPaymentAccountBankAccount.one]: platformui_paymentAccount_accountKind_sepa_swift,
  [EPaymentAccountBankAccount.paymentClip]: platformui_paymentAccount_accountKind_paymentClip,
};

const PAYMENT_ACCOUNT_BANK_ACCOUNT_KINDS = Object.values(EPaymentAccountBankAccount);

const paymentAccountBankAccountKindOptions = getSelectOptions(PAYMENT_ACCOUNT_BANK_ACCOUNT_KINDS);

interface IWithPaymentAccountKind<K> {
  accountKind: K;
}

type TWithPaymentAccountBankAccountProps = IWithPaymentAccountKind<EPaymentAccountBankAccount>

const PAYMENT_ACCOUNT_BANK_ACCOUNT = [EPaymentAccountBankAccount.bankTransfer, EPaymentAccountBankAccount.trHavaleEft] as const;

type TPaymentAccountBankAccountDefaultForm = (typeof PAYMENT_ACCOUNT_BANK_ACCOUNT)[number]

type TPaymentAccountBankAccountExtraForm = Exclude<EPaymentAccountBankAccount, TPaymentAccountBankAccountDefaultForm>

const isPaymentAccountBankAccountBaseForm = (
  accountKind: string,
): accountKind is TPaymentAccountBankAccountExtraForm =>
  !PAYMENT_ACCOUNT_BANK_ACCOUNT.find((it) => it === accountKind);

type TWithPaymentAccountBankAccountSelectProps = IWithPaymentAccountKind<TPaymentAccountBankAccountDefaultForm>
type TWithPaymentAccountEWalletKindProps = IWithPaymentAccountKind<EPaymentAccountEWallet>

const PAYMENT_ACCOUNT_CRYPTO_WALLET_KINDS = Object.values(EPlatform_FixFinCryptoCurrency);
const PAYMENT_ACCOUNT_CRYPTO_WALLET_OPTIONS = getSelectOptions(PAYMENT_ACCOUNT_CRYPTO_WALLET_KINDS);

const PAYMENT_ACCOUNT_E_WALLET_KINDS = Object.values(EPaymentAccountEWallet);
const PAYMENT_ACCOUNT_E_WALLET_OPTIONS = getSelectOptions(PAYMENT_ACCOUNT_E_WALLET_KINDS);

export type {
  TWithPaymentAccountBankAccountProps,
  TWithPaymentAccountBankAccountSelectProps,
  TPaymentAccountBankAccountDefaultForm,
  TPaymentAccountBankAccountExtraForm,
  TWithPaymentAccountEWalletKindProps,
};
export {
  paymentAccountTypeTranslateMap,
  paymentAccountListTranslateMap,
  paymentAccountBankAccountTranslateMap,
  EPaymentAccountEWallet,
  EPaymentAccountBankAccount,
  PAYMENT_ACCOUNT_BANK_ACCOUNT_KINDS,
  paymentAccountBankAccountKindOptions,
  isPaymentAccountBankAccountBaseForm,
  PAYMENT_ACCOUNT_CRYPTO_WALLET_KINDS,
  PAYMENT_ACCOUNT_CRYPTO_WALLET_OPTIONS,

  PAYMENT_ACCOUNT_E_WALLET_KINDS,
  PAYMENT_ACCOUNT_E_WALLET_OPTIONS,
};
