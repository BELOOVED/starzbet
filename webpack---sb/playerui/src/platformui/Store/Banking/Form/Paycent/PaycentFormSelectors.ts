import { createSimpleSelector } from "@sb/utils";
import { type TCallPayload } from "@sb/sdk";
import { type call_PaycentMakeFiatDepositCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { platformBankingDepositPaymentMethodNonNullableSelector } from "../../Selectors/PlatformBankingSelectors";
import { depositFormValueSelector } from "../DepositFormSelectors";
import { type TPaycentFormModel } from "./PaycentFormModel";

const depositPaycentCallPayloadSelector = createSimpleSelector(
  [
    depositFormValueSelector<TPaycentFormModel>,
    platformBankingDepositPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_PaycentMakeFiatDepositCommand> => ({
    sum: formState.amount,
    paymentMethodId: paymentMethodId,
    bonusIdToClaim: formState.depositPromotionBonusId,
    details: {
      bic: formState.bic,
    },
  }),
);

export { depositPaycentCallPayloadSelector };
