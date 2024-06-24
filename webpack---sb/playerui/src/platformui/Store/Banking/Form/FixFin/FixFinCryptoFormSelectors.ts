import { createSimpleSelector, getNotNil } from "@sb/utils";
import { type TCallPayload } from "@sb/sdk";
import { type call_FixFinMakeCryptoDepositCommand, type call_FixFinMakeCryptoWithdrawalCommand } from "@sb/sdk/SDKClient/paymentintegration";
import {
  platformBankingDepositPaymentMethodNonNullableSelector,
  platformBankingWithdrawPaymentMethodNonNullableSelector,
} from "../../Selectors/PlatformBankingSelectors";
import { FIX_FIN_CRYPTO_SUB_PROVIDER_ID_TO_CURRENCY_MAP } from "../../Models/FixFinCryptoModel";
import { type TPaymentMethodId } from "../../Models/PaymentMethodIdModel";
import { withdrawFormValueSelector } from "../WithdrawFormSelectors";
import { depositFormResponseSelectorFactory, depositFormValueSelector } from "../DepositFormSelectors";
import { type TFixFinCryptoFormModel } from "./FixFinCryptoFormModel";
import { assertsFixFinCryptoCallResponse } from "./FixFinCryptoFormResponse";

const getCryptoCurrency = (paymentMethodId: TPaymentMethodId, context: string) => getNotNil(
  FIX_FIN_CRYPTO_SUB_PROVIDER_ID_TO_CURRENCY_MAP[paymentMethodId],
  [context, "FIX_FIN_CRYPTO_SUB_PROVIDER_ID_TO_CURRENCY_MAP"],
  paymentMethodId,
);

const withdrawFixFinCryptoCallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TFixFinCryptoFormModel>,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_FixFinMakeCryptoWithdrawalCommand> => ({
    currency: getCryptoCurrency(paymentMethodId, "withdrawFixFinCryptoCallPayloadSelector"),
    sum: formState.amount,
    address: formState.address,
  }),
);

const depositFixFinCryptoCallPayloadSelector = createSimpleSelector(
  [
    depositFormValueSelector,
    platformBankingDepositPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_FixFinMakeCryptoDepositCommand> => ({
    currency: getCryptoCurrency(paymentMethodId, "depositFixFinCryptoCallPayloadSelector"),
    sum: formState.amount,
    bonusIdToClaim: formState.depositPromotionBonusId,
  }),
);

const depositFixFinCryptoFormResponseSelector = depositFormResponseSelectorFactory(
  assertsFixFinCryptoCallResponse,
  "depositFixFinCryptoFormResponseSelector",
);

export { withdrawFixFinCryptoCallPayloadSelector, depositFixFinCryptoCallPayloadSelector, depositFixFinCryptoFormResponseSelector };
