import type { TPlatform_PlayerPaymentAccountDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TPaymentAccountCryptoDetails } from "../Models/TPaymentAccountCryptoDetails";
import { PAYMENT_ACCOUNT_CRYPTO_WALLET_DETAILS } from "./PaymentAccountTypeGuards";

const getPaymentAccountCryptoDetails = (typeName: TPlatform_PlayerPaymentAccountDetails_Fragment["__typename"]) =>
  PAYMENT_ACCOUNT_CRYPTO_WALLET_DETAILS.find((it) => it === typeName);

const getPaymentAccountCryptoMap = <V>(value: V) =>
  PAYMENT_ACCOUNT_CRYPTO_WALLET_DETAILS.reduce(
    (acc, walletDetails) => ({
      ...acc,
      [walletDetails]: value,
    }),
    {} as Record<TPaymentAccountCryptoDetails["__typename"], V>,
  );

export { getPaymentAccountCryptoDetails, getPaymentAccountCryptoMap };
