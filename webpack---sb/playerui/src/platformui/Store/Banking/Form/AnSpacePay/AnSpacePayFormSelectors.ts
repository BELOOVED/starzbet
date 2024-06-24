import { createSimpleSelector } from "@sb/utils";
import { type TCallPayload } from "@sb/sdk";
import { type call_AnSpacePayMakeWithdrawalCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { EPlatform_AnSpacePayPixKeyType } from "@sb/graphql-client";
import {
  emailFromTokenSelector,
  phoneVerificationTokenSelectors,
} from "../../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { profileSelectors } from "../../../../../common/Store/Player/Selectors/ProfileSelectors";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { platformBankingWithdrawPaymentMethodNonNullableSelector } from "../../Selectors/PlatformBankingSelectors";
import { withdrawFormValueSelector } from "../WithdrawFormSelectors";
import { depositFormResponseSelectorFactory } from "../DepositFormSelectors";
import { type TAnSpacePayFormModel } from "./AnSpacePayFormModel";
import { assertsAnSpacePayFormResponse } from "./AnSpacePayFormResponse";

const withdrawAnSpacePayCallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TAnSpacePayFormModel>,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_AnSpacePayMakeWithdrawalCommand> => ({
    paymentMethodId: paymentMethodId,
    sum: formState.amount,
    pixKey: formState.value,
    pixType: formState.type,
  }),
);

const withdrawAnSpacePayPixValueByTypeSelector = (state: TPlatformAppState, pixType: EPlatform_AnSpacePayPixKeyType) => {
  switch (pixType) {
    case EPlatform_AnSpacePayPixKeyType.telefone:
      return phoneVerificationTokenSelectors.phoneNumber(state);

    case EPlatform_AnSpacePayPixKeyType.cpfcnpj:
      return profileSelectors.identityNumber(state) ?? "";

    case EPlatform_AnSpacePayPixKeyType.email:
      return emailFromTokenSelector(state) ?? "";

    default:
      return "";
  }
};

const depositAnSpacePayFormResponseSelector = depositFormResponseSelectorFactory(
  assertsAnSpacePayFormResponse,
  "depositAnSpacePayFormResponseSelector",
);

export {
  withdrawAnSpacePayCallPayloadSelector,
  withdrawAnSpacePayPixValueByTypeSelector,

  depositAnSpacePayFormResponseSelector,
};
