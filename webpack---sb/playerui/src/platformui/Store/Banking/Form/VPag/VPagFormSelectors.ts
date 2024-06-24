import { createSimpleSelector } from "@sb/utils";
import { type TCallPayload } from "@sb/sdk";
import { type call_VpagMakeWithdrawalCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { EPlatform_VpagPixType } from "@sb/graphql-client";
import {
  emailFromTokenSelector,
  phoneVerificationTokenSelectors,
} from "../../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { profileSelectors } from "../../../../../common/Store/Player/Selectors/ProfileSelectors";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { platformBankingWithdrawPaymentMethodNonNullableSelector } from "../../Selectors/PlatformBankingSelectors";
import { withdrawFormValueSelector } from "../WithdrawFormSelectors";
import { type TVPagFormModel } from "./VPagFormModel";

const withdrawVPagCallPayloadSelector = createSimpleSelector(
  [
    withdrawFormValueSelector<TVPagFormModel>,
    platformBankingWithdrawPaymentMethodNonNullableSelector,
  ],
  (formState, paymentMethodId): TCallPayload<typeof call_VpagMakeWithdrawalCommand> => ({
    paymentMethodId: paymentMethodId,
    sum: formState.amount,
    pixKey: formState.value,
    pixType: formState.type,
  }),
);

const withdrawVpagPixValueByTypeSelector = (state: TPlatformAppState, pixType: EPlatform_VpagPixType) => {
  switch (pixType) {
    case EPlatform_VpagPixType.phone:
      return phoneVerificationTokenSelectors.phoneNumber(state);

    case EPlatform_VpagPixType.cpf:
      return profileSelectors.identityNumber(state) ?? "";

    case EPlatform_VpagPixType.email:
      return emailFromTokenSelector(state) ?? "";

    default:
      return "";
  }
};

export {
  withdrawVPagCallPayloadSelector,
  withdrawVpagPixValueByTypeSelector,
};
