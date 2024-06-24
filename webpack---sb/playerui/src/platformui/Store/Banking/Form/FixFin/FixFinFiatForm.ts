import { of } from "rxjs";
import { createFormFieldPaths, field, type TFieldDefs, type TSyncValidator, withValidation } from "@sb/form-new";
import {
  call_FixFinMakeFiatDepositCommand,
  call_FixFinMakeFiatWithdrawalCommand,
  call_FixFinMakeTurkpayWithdrawalCommand,
  call_FixFinTurkpayMakeFiatDepositCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import { platformui_validate_error_numberOfDigits } from "@sb/translates/platformui/CommonTKeys";
import { type TCallResponsePayload } from "@sb/sdk";
import { FORM_IBAN_VALIDATION, FORM_STRING_SIZE_VALIDATION, formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { bankingFormReceiveResponseAction, depositLinkReceiveAction } from "../../BankingActions";
import {
  assertsFixFinFiatSistemnakitResponse,
  assertsFixFinFiatWithBankAccountResponse,
  assertsFixFinFiatWithBanksResponse,
  isFixFinFiatWithUrl,
} from "../../Models/FixFinFiatModel";
import { DepositFormResponseError } from "../../Utils/DepositFormResponseError";
import { getWithdrawFormConfig } from "../WithdrawFormConfig";
import { getDepositFormConfig } from "../DepositFormConfig";
import { depositSimpleCallPayloadSelector } from "../DepositFormSelectors";
import { type TFixFinFiatFormModel } from "./FixFinFiatFormModel";
import { withdrawFixFinFiatCallPayloadSelector } from "./FixFinFiatFormSelectors";

const getFixFinFiatWithdrawFormFields = (validator: TSyncValidator<string> = () => undefined): TFieldDefs<keyof TFixFinFiatFormModel> => ({
  accountNumber: field({
    extensions: withValidation(
      formRequiredValidation<string>(),
      validator,
    ),
  }),
});

const FIX_FIN_FIAT_WITHDRAW_FORM_FIELD_PATHS = createFormFieldPaths(getFixFinFiatWithdrawFormFields());

const getFixFinFiatWithdrawFormConfig = (validator: TSyncValidator<string> = () => undefined) =>
  getWithdrawFormConfig(
    getFixFinFiatWithdrawFormFields(validator),
    call_FixFinMakeFiatWithdrawalCommand,
    withdrawFixFinFiatCallPayloadSelector,
  );

const FIX_FIN_FIAT_WITHDRAW_BASE_FORM_CONFIG = getFixFinFiatWithdrawFormConfig();
const getFixFinFiatStringSizeWithdrawFormConfig = (size: number = 10) =>
  getFixFinFiatWithdrawFormConfig(FORM_STRING_SIZE_VALIDATION(platformui_validate_error_numberOfDigits, size, true));

const FIX_FIN_FIAT_WITHDRAW_IBAN_FORM_CONFIG = getFixFinFiatWithdrawFormConfig(FORM_IBAN_VALIDATION);

const getFixFinFiatTurkpayWithdrawFormConfig = (validator: TSyncValidator<string> = () => undefined) =>
  getWithdrawFormConfig(
    getFixFinFiatWithdrawFormFields(validator),
    call_FixFinMakeTurkpayWithdrawalCommand,
    withdrawFixFinFiatCallPayloadSelector,
  );

const FIX_FIN_FIAT_TURKPAY_WITHDRAW_FORM_CONFIG = getFixFinFiatTurkpayWithdrawFormConfig();

const FIX_FIN_FIAT_TURKPAY_WITHDRAW_IBAN_FORM_CONFIG = getFixFinFiatTurkpayWithdrawFormConfig(FORM_IBAN_VALIDATION);

/** Deposit Form **/
const fixFinFiatStoreUrl = (context: string) =>
  (response: TCallResponsePayload<typeof call_FixFinMakeFiatDepositCommand>) => () => {
    if (!isFixFinFiatWithUrl(response.info)) {
      throw new DepositFormResponseError(response, `${context}:onSuccess`);
    }

    return of(depositLinkReceiveAction(response.info.url));
  };

const FIX_FIN_FIAT_DEPOSIT_FORM_WITH_REDIRECT_CONFIG = getDepositFormConfig({
  callPair: [call_FixFinMakeFiatDepositCommand, depositSimpleCallPayloadSelector],

  onSuccess: fixFinFiatStoreUrl("FIX_FIN_FIAT_DEPOSIT_FORM_WITH_REDIRECT_CONFIG"),
});

const FIX_FIN_FIAT_DEPOSIT_FORM_WITH_BANK_ACCOUNT_CONFIG = getDepositFormConfig({
  callPair: [call_FixFinMakeFiatDepositCommand, depositSimpleCallPayloadSelector],

  onSuccess: (response) => () => {
    assertsFixFinFiatWithBankAccountResponse(response, "FIX_FIN_FIAT_DEPOSIT_FORM_WITH_BANK_ACCOUNT_CONFIG:onSuccess");

    return of(bankingFormReceiveResponseAction(response));
  },
});

const FIX_FIN_FIAT_DEPOSIT_FORM_SISTEMNAKIT_CONFIG = getDepositFormConfig({
  callPair: [call_FixFinMakeFiatDepositCommand, depositSimpleCallPayloadSelector],

  onSuccess: (response) => () => {
    assertsFixFinFiatSistemnakitResponse(response, "FIX_FIN_FIAT_DEPOSIT_FORM_SISTEMNAKIT_CONFIG:onSuccess");

    return of(bankingFormReceiveResponseAction(response));
  },
});

const FIX_FIN_FIAT_DEPOSIT_FORM_WITH_BANK_CONFIG = getDepositFormConfig({
  callPair: [call_FixFinMakeFiatDepositCommand, depositSimpleCallPayloadSelector],

  onSuccess: (response) => () => {
    assertsFixFinFiatWithBanksResponse(response, "FIX_FIN_FIAT_DEPOSIT_FORM_WITH_BANK_CONFIG:onSuccess");

    return of(bankingFormReceiveResponseAction(response));
  },
});

const FIX_FIN_FIAT_TURKPAY_DEPOSIT_FORM_CONFIG = getDepositFormConfig({
  callPair: [call_FixFinTurkpayMakeFiatDepositCommand, depositSimpleCallPayloadSelector],

  onSuccess: fixFinFiatStoreUrl("FIX_FIN_FIAT_TURKPAY_DEPOSIT_FORM_CONFIG"),
});

export {
  getFixFinFiatWithdrawFormFields,
  FIX_FIN_FIAT_WITHDRAW_FORM_FIELD_PATHS,

  FIX_FIN_FIAT_WITHDRAW_BASE_FORM_CONFIG,
  FIX_FIN_FIAT_WITHDRAW_IBAN_FORM_CONFIG,
  getFixFinFiatStringSizeWithdrawFormConfig,
  fixFinFiatStoreUrl,
  FIX_FIN_FIAT_TURKPAY_WITHDRAW_FORM_CONFIG,
  FIX_FIN_FIAT_TURKPAY_WITHDRAW_IBAN_FORM_CONFIG,

  FIX_FIN_FIAT_DEPOSIT_FORM_WITH_REDIRECT_CONFIG,
  FIX_FIN_FIAT_DEPOSIT_FORM_WITH_BANK_ACCOUNT_CONFIG,
  FIX_FIN_FIAT_DEPOSIT_FORM_SISTEMNAKIT_CONFIG,
  FIX_FIN_FIAT_DEPOSIT_FORM_WITH_BANK_CONFIG,
  FIX_FIN_FIAT_TURKPAY_DEPOSIT_FORM_CONFIG,
};
