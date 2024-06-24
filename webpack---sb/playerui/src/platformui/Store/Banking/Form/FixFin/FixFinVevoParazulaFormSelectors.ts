import { createPropertySelector, createSimpleSelector, withParams } from "@sb/utils";
import { type TCallPayload } from "@sb/sdk";
import {
  type call_FixFinVevoParazulaMakeFiatDepositCommand,
  type call_FixFinVevoParazulaSmsPhaseCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import { selectFormValue } from "@sb/form-new";
import { platformBankingDepositPaymentMethodNonNullableSelector } from "../../Selectors/PlatformBankingSelectors";
import { assertsFixFinFiatVevoParazulaResponse } from "../../Models/FixFinFiatModel";
import { depositFormResponseSelectorFactory, depositFormValueSelector } from "../DepositFormSelectors";
import { type TFixFinVevoParazulaFormModel } from "./FixFinVevoParazulaFormModel";
import { FIX_FIN_VEVO_PARAZULA_SMS_FORM, type TFixFinVevoParazulaSmsFormModel } from "./FixFInVevoParazulaSmsFormModel";

const depositFixFinVevoParazulaCallPayloadSelector = createSimpleSelector(
  [
    depositFormValueSelector<TFixFinVevoParazulaFormModel>,
    platformBankingDepositPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_FixFinVevoParazulaMakeFiatDepositCommand> => ({
    accountPassword: formState.accountPassword,
    playerGovId: formState.playerGovId,
    paymentMethodId,
    sum: formState.amount,
    bonusIdToClaim: formState.depositPromotionBonusId,
  }),
);

const depositFixFinFiatVevoParazulaFormResponseSelector = depositFormResponseSelectorFactory(
  assertsFixFinFiatVevoParazulaResponse,
  "depositFixFinFiatVevoParazulaFormResponseSelector",
);

const depositFixFinFiatVevoParazulaFormResponseMessageSelector = createPropertySelector(
  depositFixFinFiatVevoParazulaFormResponseSelector,
  ["info", "message"],
);

const depositFixFinVevoParazulaSmsCallPayloadSelector = createSimpleSelector(
  [
    withParams(selectFormValue<TFixFinVevoParazulaSmsFormModel>, FIX_FIN_VEVO_PARAZULA_SMS_FORM),
    depositFixFinFiatVevoParazulaFormResponseSelector,
  ],
  (formState, formResponse): TCallPayload<typeof call_FixFinVevoParazulaSmsPhaseCommand> => ({
    sms: formState.sms,
    txRequestId: formResponse.requestId,
  }),
);

export {
  depositFixFinVevoParazulaCallPayloadSelector,
  depositFixFinVevoParazulaSmsCallPayloadSelector,
  depositFixFinFiatVevoParazulaFormResponseMessageSelector,
};
