import type { ActionCreator } from "redux";
import {
  createFormFieldPaths,
  dropFormField,
  every,
  field,
  form,
  type IDecoratorDefinition,
  type IFormAction,
  isFormFieldPath,
  isFormName,
  type IWithFormsState,
  onAction,
  oneOf,
  runFormFieldsDisableCheck,
  selectFieldValue,
  setFieldValueAction,
  type TFieldDefs,
  type TFieldValue,
  type TResolver,
  type TSyncValidator,
  whenIs,
  withValidation,
} from "@sb/form-new";
import {
  call_FixFinMakePayfutureWithdrawalCommand,
  call_FixFinPayfutureMakeFiatDepositCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import { EPlatform_FixFinPayfutureMethodType } from "@sb/graphql-client";
import { platformui_validate_error_numberOfDigits } from "@sb/translates/platformui/CommonTKeys";
import {
  FORM_IBAN_VALIDATION,
  FORM_STRING_SIZE_VALIDATION,
  formEmailValidation,
  formMaxWidthValidation,
  formPhoneNumberValidation,
  formRequiredValidation,
} from "../../../Form/Utils/FormValidations";
import type { TPlatformAppState } from "../../../PlatformInitialState";
import { WITHDRAW_FORM } from "../../Utils/Variables";
import { getDepositFormConfig } from "../DepositFormConfig";
import { getWithdrawFormConfig } from "../WithdrawFormConfig";
import {
  type TFixFinPayFutureDepositFormModel,
  type TFixFinPayFutureWithdrawBankTransferFormModel,
  type TFixFinPayFutureWithdrawFormModel,
  type TFixFinPayFutureWithdrawNetBankingFormModel,
} from "./FixFinPayFutureFormModel";
import { depositFixFinPayFutureCallPayloadSelector, withdrawFixFinPayFutureCallPayloadSelector } from "./FixFinPayFutureFormSelectors";
import { fixFinFiatStoreUrl } from "./FixFinFiatForm";

const getRequiredField = <V extends TFieldValue, S extends IWithFormsState = IWithFormsState>(...validators: TSyncValidator<V, S>[]) =>
  field({
    extensions: withValidation(formRequiredValidation(), ...validators),
  });

const getWithMaxLengthField = (length: number) => getRequiredField(formMaxWidthValidation(undefined, length));

/**
 * Deposit
 */
const FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELDS: TFieldDefs<keyof TFixFinPayFutureDepositFormModel> = {
  address: getWithMaxLengthField(100),
  city: getWithMaxLengthField(100),
  email: getRequiredField(formEmailValidation()),
  phone: getRequiredField(formPhoneNumberValidation()),
  postcode: getWithMaxLengthField(6),
  state: getWithMaxLengthField(2),
};

const FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELD_PATHS = createFormFieldPaths(FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELDS);

const FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_CONFIG = getDepositFormConfig({
  fields: FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELDS,

  callPair: [call_FixFinPayfutureMakeFiatDepositCommand, depositFixFinPayFutureCallPayloadSelector],

  onSuccess: fixFinFiatStoreUrl("FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_CONFIG"),
});

/**
 * Withdraw
 */
const resolver: TResolver = (_, __, formName, state) =>
  selectFieldValue<EPlatform_FixFinPayfutureMethodType>(state, formName, FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.methodType);

const FIX_FIN_PAY_FUTURE_WITHDRAW_NET_BANKING_FORM_FIELDS: TFieldDefs<keyof TFixFinPayFutureWithdrawNetBankingFormModel["details"]> = {
  bankBranch: getWithMaxLengthField(100),
  bankName: getWithMaxLengthField(100),
  accountNumber: getRequiredField<string>(FORM_STRING_SIZE_VALIDATION(platformui_validate_error_numberOfDigits, 10, true)),
};

const FIX_FIN_PAY_FUTURE_WITHDRAW_BANK_TRANSFER_FORM_FIELDS: TFieldDefs<keyof TFixFinPayFutureWithdrawBankTransferFormModel["details"]> = {
  accountNumber: getRequiredField(FORM_IBAN_VALIDATION),
};

const FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELDS: TFieldDefs<keyof TFixFinPayFutureWithdrawFormModel> = {
  accountHolderName: getRequiredField(),
  email: getRequiredField(formEmailValidation()),
  phone: getRequiredField(formPhoneNumberValidation()),
  bankCode: getWithMaxLengthField(20),
  methodType: getRequiredField(),

  details: oneOf({
    fields: {
      [EPlatform_FixFinPayfutureMethodType.banktransfer]: form({
        fields: FIX_FIN_PAY_FUTURE_WITHDRAW_BANK_TRANSFER_FORM_FIELDS,
      }),
      [EPlatform_FixFinPayfutureMethodType.netbanking]: form({
        fields: FIX_FIN_PAY_FUTURE_WITHDRAW_NET_BANKING_FORM_FIELDS,
      }),
    },
    resolver: resolver,
  }),
};

const FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS = createFormFieldPaths(FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELDS);
const FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_BANK_BRANCH_FIELD_PATH = FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.details.concat(["bankBranch"]);
const FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_BANK_NAME_FIELD_PATH = FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.details.concat(["bankName"]);
const FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_ACCOUNT_NUMBER_FIELD_PATH = FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.details.concat(["accountNumber"]);

const FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_DECORATOR: IDecoratorDefinition<ActionCreator<IFormAction>, TPlatformAppState> =
  onAction(
    setFieldValueAction<EPlatform_FixFinPayfutureMethodType>,
    whenIs(
      every(
        isFormName(WITHDRAW_FORM),
        isFormFieldPath(FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.methodType),
      ),
      (state, action, next) => {
        let nextState = next(state, action);
        const methodType = action.payload.value;

        if (!methodType) {
          return nextState;
        }

        const formName = action.metadata.formName;

        nextState = dropFormField(
          nextState,
          formName,
          FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_ACCOUNT_NUMBER_FIELD_PATH,
        );

        return runFormFieldsDisableCheck(nextState, formName);
      },
    ),
  );

const FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_CONFIG = getWithdrawFormConfig(
  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELDS,
  call_FixFinMakePayfutureWithdrawalCommand,
  withdrawFixFinPayFutureCallPayloadSelector,
  undefined,
  [FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_DECORATOR],
);

export {
  FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_FIELD_PATHS,
  FIX_FIN_PAY_FUTURE_DEPOSIT_FORM_CONFIG,

  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_CONFIG,
  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS,
  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_BANK_BRANCH_FIELD_PATH,
  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_BANK_NAME_FIELD_PATH,
  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_ACCOUNT_NUMBER_FIELD_PATH,
};
