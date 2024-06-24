import { createPropertySelector, createSimpleSelector, getNotNil, omit, withParams } from "@sb/utils";
import { type TCallPayload } from "@sb/sdk";
import {
  type call_PayPortGetAvailablePaymentMethodsQuery,
  type call_PayPortMakeDepositCommand,
  type call_PayPortMakeWithdrawalCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import { selectFormValue } from "@sb/form-new";
import { localeSelector } from "../../../Locale/Selectors/localeSelector";
import type { TPlatformAppState } from "../../../PlatformInitialState";
import {
  platformBankingDepositPaymentMethodNonNullableSelector,
  platformBankingSelector,
  platformBankingWithdrawPaymentMethodNonNullableSelector,
} from "../../Selectors/PlatformBankingSelectors";
import { WITHDRAW_FORM } from "../../Utils/Variables";
import { depositFormResponseSelectorFactory, depositFormValueSelector } from "../DepositFormSelectors";
import type { TWithAmountFormModel } from "../BaseFormModel";
import { isWithdrawMethodAvailableSelector } from "../WithdrawFormSelectors";
import { assertsPayportFormResponse } from "./PayportFormResponse";
import { getPayportMethod, type IPayportPaytmFormDetails, PAYPORT_METHOD_FORM, type TPayportWithdrawForm } from "./PayportFormModel";
import { getPayportPayloadKind } from "./GetPayportPayloadKind";

const depositPayportCallPayloadSelector = createSimpleSelector(
  [
    depositFormValueSelector,
    platformBankingDepositPaymentMethodNonNullableSelector,
    localeSelector,
  ],
  (formState, paymentMethodId, playerLocale): TCallPayload<typeof call_PayPortMakeDepositCommand> => ({
    sum: formState.amount,
    paymentMethodId: paymentMethodId,
    bonusIdToClaim: formState.depositPromotionBonusId,
    playerLocale,
  }),
);

const payportMethodFormStateSelector = withParams(selectFormValue<TWithAmountFormModel>, PAYPORT_METHOD_FORM);

const payportMethodFormCallPayloadSelector = createSimpleSelector(
  [
    payportMethodFormStateSelector,
    localeSelector,
  ],
  (formState, playerLocale): TCallPayload<typeof call_PayPortGetAvailablePaymentMethodsQuery> => ({
    withdrawalAmount: formState.amount,
    playerLocale: playerLocale,
  }),
);

const payportMethodFormResponseSelector = depositFormResponseSelectorFactory(
  assertsPayportFormResponse,
  "withdrawPayportFormResponseSelector",
);

const payportActiveMethodSelector = createPropertySelector(
  platformBankingSelector,
  ["form", "payportMethod"],
);

const payportActiveMethodNonNullableSelector = createSimpleSelector(
  [payportActiveMethodSelector],
  (selectedMethod) => getNotNil(
    selectedMethod,
    ["payportActiveMethodNonNullableSelector", "payportActiveMethodSelector"],
    "selectedMethod",
  ),
);

const payportActiveMethodTypeNonNullableSelector = createSimpleSelector(
  [payportActiveMethodNonNullableSelector],
  (selectedMethod) => getPayportMethod(selectedMethod.paymentSystemType),
);

const withdrawPayportFormShouldRenderSelector = (state: TPlatformAppState) => {
  const methodLoaded = isWithdrawMethodAvailableSelector(state);

  if (!methodLoaded) {
    return methodLoaded;
  }

  return !!payportActiveMethodSelector(state);
};

const isPayportPaytmForm = (formState: TPayportWithdrawForm["details"]): formState is IPayportPaytmFormDetails =>
  "type" in formState &&
  "accountInfo" in formState;

const withdrawPayportFormCallPayloadSelector = createSimpleSelector(
  [
    withParams(selectFormValue<TPayportWithdrawForm>, WITHDRAW_FORM),
    payportMethodFormStateSelector,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
    payportActiveMethodNonNullableSelector,
    payportActiveMethodTypeNonNullableSelector,
  ],
  (
    formState,
    payportMethodFormState,
    paymentMethodId,
    selectedMethod,
    selectedMethodType,
  ): TCallPayload<typeof call_PayPortMakeWithdrawalCommand> => {
    const __payloadKind = getPayportPayloadKind(selectedMethodType);
    const details = formState.details;
    const normalizedDetails = isPayportPaytmForm(details) ? omit(["type"], details) : details;

    return {
      withdrawalDetails: {
        __payloadKind,
        ...normalizedDetails,
      },
      sum: payportMethodFormState.amount,
      paymentMethodId: paymentMethodId,
      selectedMethod: selectedMethod,
    };
  },
);

export {
  depositPayportCallPayloadSelector,
  payportMethodFormCallPayloadSelector,
  payportMethodFormResponseSelector,
  payportActiveMethodSelector,
  payportActiveMethodTypeNonNullableSelector,
  withdrawPayportFormShouldRenderSelector,
  withdrawPayportFormCallPayloadSelector,
};
