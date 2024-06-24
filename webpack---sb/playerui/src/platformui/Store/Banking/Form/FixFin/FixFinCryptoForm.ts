import { of } from "rxjs";
import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { call_FixFinMakeCryptoDepositCommand, call_FixFinMakeCryptoWithdrawalCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { bankingFormReceiveResponseAction } from "../../BankingActions";
import { getWithdrawFormConfig } from "../WithdrawFormConfig";
import { getDepositFormConfig } from "../DepositFormConfig";
import { depositFixFinCryptoCallPayloadSelector, withdrawFixFinCryptoCallPayloadSelector } from "./FixFinCryptoFormSelectors";
import { type TFixFinCryptoFormModel } from "./FixFinCryptoFormModel";
import { assertsFixFinCryptoCallResponse } from "./FixFinCryptoFormResponse";

const FIX_FIN_CRYPTO_WITHDRAW_FORM_FIELDS: TFieldDefs<keyof TFixFinCryptoFormModel> = ({
  address: field({
    extensions: withValidation(formRequiredValidation()),
  }),
});

const FIX_FIN_CRYPTO_WITHDRAW_FORM_FIELD_PATHS = createFormFieldPaths(FIX_FIN_CRYPTO_WITHDRAW_FORM_FIELDS);

const FIX_FIN_CRYPTO_WITHDRAW_FORM_CONFIG = getWithdrawFormConfig(
  FIX_FIN_CRYPTO_WITHDRAW_FORM_FIELDS,
  call_FixFinMakeCryptoWithdrawalCommand,
  withdrawFixFinCryptoCallPayloadSelector,
);

const FIX_FIN_CRYPTO_DEPOSIT_FORM_CONFIG = getDepositFormConfig({
  callPair: [call_FixFinMakeCryptoDepositCommand, depositFixFinCryptoCallPayloadSelector],
  onSuccess: (response) => () => {
    assertsFixFinCryptoCallResponse(response, "FIX_FIN_CRYPTO_DEPOSIT_FORM_CONFIG:onSuccess");

    return of(bankingFormReceiveResponseAction(response));
  },
});

export {
  FIX_FIN_CRYPTO_WITHDRAW_FORM_FIELD_PATHS,
  FIX_FIN_CRYPTO_WITHDRAW_FORM_CONFIG,

  FIX_FIN_CRYPTO_DEPOSIT_FORM_CONFIG,
};
