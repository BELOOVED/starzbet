import { EPlatform_FixFinCryptoCurrency, EPlatform_PaymentMethodType } from "@sb/graphql-client";
import { entries } from "@sb/utils";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodDepositId, type TPaymentMethodWithdrawalId } from "./PaymentMethodIdModel";

const CRYPTO_DEPOSIT_LIST = [
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_LTC_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_DASH_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_BTC_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_DOGE_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_USDC_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_BTT_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_USDT_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_ETH_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_TRX_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_BCH_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_RVN_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_TON_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_XMR_ID,
] satisfies TPaymentMethodDepositId[];

const CRYPTO_WITHDRAW_LIST = [
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_LTC_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_DASH_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_BTC_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_DOGE_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_USDC_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_BTT_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_USDT_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_ETH_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_TRX_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_BCH_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_RVN_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_TON_ID,
  PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_XMR_ID,
] satisfies TPaymentMethodWithdrawalId[];

type TCryptoDepositMethod = (typeof CRYPTO_DEPOSIT_LIST)[number]
type TCryptoWithdrawMethod = (typeof CRYPTO_WITHDRAW_LIST)[number]

const FIX_FIN_CRYPTO_SUB_PROVIDER_ID_MAP = {
  [EPlatform_PaymentMethodType.deposit]: {
    [EPlatform_FixFinCryptoCurrency.ltc]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_LTC_ID,
    [EPlatform_FixFinCryptoCurrency.dash]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_DASH_ID,
    [EPlatform_FixFinCryptoCurrency.btc]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_BTC_ID,
    [EPlatform_FixFinCryptoCurrency.doge]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_DOGE_ID,
    [EPlatform_FixFinCryptoCurrency.usdc]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_USDC_ID,
    [EPlatform_FixFinCryptoCurrency.btt]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_BTT_ID,
    [EPlatform_FixFinCryptoCurrency.usdt]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_USDT_ID,
    [EPlatform_FixFinCryptoCurrency.eth]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_ETH_ID,
    [EPlatform_FixFinCryptoCurrency.trx]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_TRX_ID,
    [EPlatform_FixFinCryptoCurrency.bch]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_BCH_ID,
    [EPlatform_FixFinCryptoCurrency.rvn]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_RVN_ID,
    [EPlatform_FixFinCryptoCurrency.ton]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_TON_ID,
    [EPlatform_FixFinCryptoCurrency.xmr]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_DEPOSIT_XMR_ID,
  },
  [EPlatform_PaymentMethodType.withdrawal]: {
    [EPlatform_FixFinCryptoCurrency.ltc]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_LTC_ID,
    [EPlatform_FixFinCryptoCurrency.dash]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_DASH_ID,
    [EPlatform_FixFinCryptoCurrency.btc]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_BTC_ID,
    [EPlatform_FixFinCryptoCurrency.doge]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_DOGE_ID,
    [EPlatform_FixFinCryptoCurrency.usdc]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_USDC_ID,
    [EPlatform_FixFinCryptoCurrency.btt]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_BTT_ID,
    [EPlatform_FixFinCryptoCurrency.usdt]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_USDT_ID,
    [EPlatform_FixFinCryptoCurrency.eth]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_ETH_ID,
    [EPlatform_FixFinCryptoCurrency.trx]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_TRX_ID,
    [EPlatform_FixFinCryptoCurrency.bch]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_BCH_ID,
    [EPlatform_FixFinCryptoCurrency.rvn]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_RVN_ID,
    [EPlatform_FixFinCryptoCurrency.ton]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_TON_ID,
    [EPlatform_FixFinCryptoCurrency.xmr]: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_WITHDRAWAL_XMR_ID,
  },
} satisfies {
  [EPlatform_PaymentMethodType.deposit]: Record<EPlatform_FixFinCryptoCurrency, TCryptoDepositMethod>;
  [EPlatform_PaymentMethodType.withdrawal]: Record<EPlatform_FixFinCryptoCurrency, TCryptoWithdrawMethod>;
};

const FIX_FIN_CRYPTO_SUB_PROVIDER_ID_TO_CURRENCY_MAP: Record<string, EPlatform_FixFinCryptoCurrency> =
  Object.values(FIX_FIN_CRYPTO_SUB_PROVIDER_ID_MAP)
    .flatMap(entries)
    .reduce(
      (acc, [currency, providerId]) => ({
        ...acc,
        [providerId]: currency,
      }),
      {},
    );

const FIX_FIN_CRYPTO_CURRENCY_TO_NETWORK_MAP: Record<EPlatform_FixFinCryptoCurrency, string> = {
  [EPlatform_FixFinCryptoCurrency.ltc]: "LTC",
  [EPlatform_FixFinCryptoCurrency.dash]: "DASH",
  [EPlatform_FixFinCryptoCurrency.btc]: "BTC",
  [EPlatform_FixFinCryptoCurrency.doge]: "DOGE",
  [EPlatform_FixFinCryptoCurrency.usdc]: "TRC20",
  [EPlatform_FixFinCryptoCurrency.btt]: "TRC20",
  [EPlatform_FixFinCryptoCurrency.usdt]: "TRC20",
  [EPlatform_FixFinCryptoCurrency.eth]: "TRC20",
  [EPlatform_FixFinCryptoCurrency.trx]: "TRC10",
  [EPlatform_FixFinCryptoCurrency.bch]: "BCH",
  [EPlatform_FixFinCryptoCurrency.rvn]: "RVN",
  [EPlatform_FixFinCryptoCurrency.ton]: "TON",
  [EPlatform_FixFinCryptoCurrency.xmr]: "MONERO",
};

type TCryptoMethodMap = {
  [EPlatform_PaymentMethodType.deposit]: TCryptoDepositMethod[];
  [EPlatform_PaymentMethodType.withdrawal]: TCryptoWithdrawMethod[];
}

const FIX_FIN_CRYPTO_METHODS_MAP: TCryptoMethodMap = {
  [EPlatform_PaymentMethodType.deposit]: CRYPTO_DEPOSIT_LIST,
  [EPlatform_PaymentMethodType.withdrawal]: CRYPTO_WITHDRAW_LIST,
};

const getCryptoMethodsMap = <V, M extends EPlatform_PaymentMethodType>(methodType: M, value: V) =>
  FIX_FIN_CRYPTO_METHODS_MAP[methodType].reduce(
    (acc, methodId) => ({
      ...acc,
      [methodId]: value,
    }),
    {} as Record<TCryptoMethodMap[M][number], V>,
  );

export {
  FIX_FIN_CRYPTO_SUB_PROVIDER_ID_TO_CURRENCY_MAP,
  FIX_FIN_CRYPTO_CURRENCY_TO_NETWORK_MAP,
  FIX_FIN_CRYPTO_METHODS_MAP,
  getCryptoMethodsMap,
};
