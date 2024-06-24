import { type EPlatform_FixFinCryptoCurrency, EPlatform_Typename } from "@sb/graphql-client";
import {
  type TPlatform_BankAccountDetails_Fragment,
  type TPlatform_BankCardDetails_Fragment,
  type TPlatform_BtcWalletDetails_Fragment,
  type TPlatform_BttWalletDetails_Fragment,
  type TPlatform_DashWalletDetails_Fragment,
  type TPlatform_DogeWalletDetails_Fragment,
  type TPlatform_EthWalletDetails_Fragment,
  type TPlatform_LtcWalletDetails_Fragment,
  type TPlatform_PaparaAccountDetails_Fragment,
  type TPlatform_PaymentClipBankAccountDetails_Fragment,
  type TPlatform_PlayerPaymentAccountDetails_Fragment,
  type TPlatform_TrxWalletDetails_Fragment,
  type TPlatform_UsdcWalletDetails_Fragment,
  type TPlatform_UsdtWalletDetails_Fragment,
} from "@sb/graphql-client/PlayerUI";
import {
  type EPaymentAccountBankAccount,
  type EPaymentAccountEWallet,
  PAYMENT_ACCOUNT_BANK_ACCOUNT_KINDS,
  PAYMENT_ACCOUNT_CRYPTO_WALLET_KINDS,
  PAYMENT_ACCOUNT_E_WALLET_KINDS,
} from "../Models/PaymentAccountTypeModel";
import { type TPaymentAccountCryptoDetails } from "../Models/TPaymentAccountCryptoDetails";

const isPaymentAccountBankAccountKind = (value: string): value is EPaymentAccountBankAccount =>
  PAYMENT_ACCOUNT_BANK_ACCOUNT_KINDS.some((it) => it === value);

const isPaymentAccountCryptoWalletKind = (value: string): value is EPlatform_FixFinCryptoCurrency =>
  PAYMENT_ACCOUNT_CRYPTO_WALLET_KINDS.some((it) => it === value);

type TPaymentAccountCryptoWalletDetails =
  TPlatform_LtcWalletDetails_Fragment |
  TPlatform_DashWalletDetails_Fragment |
  TPlatform_BtcWalletDetails_Fragment |
  TPlatform_DogeWalletDetails_Fragment |
  TPlatform_UsdtWalletDetails_Fragment |
  TPlatform_UsdcWalletDetails_Fragment |
  TPlatform_BttWalletDetails_Fragment |
  TPlatform_EthWalletDetails_Fragment |
  TPlatform_TrxWalletDetails_Fragment

const PAYMENT_ACCOUNT_CRYPTO_WALLET_DETAILS: TPaymentAccountCryptoDetails["__typename"][] = [
  EPlatform_Typename.platformLtcWalletDetails,
  EPlatform_Typename.platformDashWalletDetails,
  EPlatform_Typename.platformBtcWalletDetails,
  EPlatform_Typename.platformDogeWalletDetails,
  EPlatform_Typename.platformUsdtWalletDetails,
  EPlatform_Typename.platformUsdcWalletDetails,
  EPlatform_Typename.platformBttWalletDetails,
  EPlatform_Typename.platformEthWalletDetails,
  EPlatform_Typename.platformTrxWalletDetails,
  EPlatform_Typename.platformBchWalletDetails,
  EPlatform_Typename.platformRvnWalletDetails,
  EPlatform_Typename.platformTonWalletDetails,
  EPlatform_Typename.platformXmrWalletDetails,
];

const isPaymentAccountCryptoWalletDetails = (
  details: TPlatform_PlayerPaymentAccountDetails_Fragment,
): details is TPaymentAccountCryptoWalletDetails =>
  PAYMENT_ACCOUNT_CRYPTO_WALLET_DETAILS.some((it) => it === details.__typename);

const isPaymentAccountEWalletKind = (value: string): value is EPaymentAccountEWallet =>
  PAYMENT_ACCOUNT_E_WALLET_KINDS.some((it) => it === value);

const isPaymentAccountEWalletDetails = (
  details: TPlatform_PlayerPaymentAccountDetails_Fragment,
): details is TPlatform_PaparaAccountDetails_Fragment =>
  details.__typename === EPlatform_Typename.platformPaparaAccountDetails;

const isPaymentAccountBankCardDetails = (
  details: TPlatform_PlayerPaymentAccountDetails_Fragment,
): details is TPlatform_BankCardDetails_Fragment =>
  details.__typename === EPlatform_Typename.platformBankCardDetails;

const isPaymentAccountPaymentClipDetails = (
  details: TPlatform_PlayerPaymentAccountDetails_Fragment,
): details is TPlatform_PaymentClipBankAccountDetails_Fragment =>
  details.__typename === EPlatform_Typename.platformPaymentClipBankAccountDetails;

const isPaymentAccountBankAccountDetails = (
  details: TPlatform_PlayerPaymentAccountDetails_Fragment,
): details is TPlatform_BankAccountDetails_Fragment =>
  details.__typename === EPlatform_Typename.platformBankAccountDetails;

export {
  isPaymentAccountBankAccountKind,
  isPaymentAccountCryptoWalletKind,
  isPaymentAccountEWalletKind,

  isPaymentAccountCryptoWalletDetails,
  isPaymentAccountEWalletDetails,
  isPaymentAccountBankCardDetails,
  isPaymentAccountPaymentClipDetails,
  isPaymentAccountBankAccountDetails,
  PAYMENT_ACCOUNT_CRYPTO_WALLET_DETAILS,
};
