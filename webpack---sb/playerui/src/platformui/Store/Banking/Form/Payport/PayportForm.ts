import { of } from "rxjs";
import type { ActionCreator } from "redux";
import { call_PayPortGetAvailablePaymentMethodsQuery, call_PayPortMakeWithdrawalCommand } from "@sb/sdk/SDKClient/paymentintegration";
import {
  createForm,
  dropFormField,
  every,
  field,
  form,
  type IDecoratorDefinition,
  type IFormAction,
  isFormFieldPath,
  isFormName,
  type IWithFormsState,
  mountFormAction,
  onAction,
  oneOf,
  selectFieldValue,
  setFieldValueAction,
  submittingExtension,
  type TFieldDefs,
  type TFieldPath,
  type TResolver,
  validationExtension,
  whenIs,
  withValidation,
} from "@sb/form-new";
import { EPlatform_PayPortPaymentSystemType } from "@sb/graphql-client";
import { platformui_checkInput_warn_minLength } from "@sb/translates/platformui/CommonTKeys";
import { keys } from "@sb/utils/Keys";
import { formSubmitEpicFactory } from "../../../../Utils/FormSubmitEpicFactory";
import type { TPlatformAppState } from "../../../PlatformInitialState";
import {
  formEmailValidation,
  formMinWidthValidation,
  formPhoneNumberValidation,
  formRequiredValidation,
  formUpiIdValidation,
} from "../../../Form/Utils/FormValidations";
import { bankingFormReceiveResponseAction } from "../../BankingActions";
import { WITHDRAW_FORM } from "../../Utils/Variables";
import { WITHDRAW_BASE_AMOUNT_FIELD } from "../WithdrawFormConfig";
import { withdrawFormSubmitEpicFactory } from "../WithdrawFormSubmitEpicFactory";
import {
  payportActiveMethodTypeNonNullableSelector,
  payportMethodFormCallPayloadSelector,
  withdrawPayportFormCallPayloadSelector,
} from "./PayportFormSelectors";
import {
  EPayportPaytmFormType,
  type IPayPortBankDetails,
  type IPayPortCashDetails,
  type IPayPortClientAccountDetails,
  type IPayportPaytmFormDetails,
  PAYPORT_METHOD_FORM,
  type TPayportWithdrawForm,
} from "./PayportFormModel";

/**
 * 1st Step Form
 */
const PAYPORT_METHOD_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [submittingExtension, validationExtension],

  form: form({ fields: WITHDRAW_BASE_AMOUNT_FIELD }),

  epics: [
    formSubmitEpicFactory({
      formName: PAYPORT_METHOD_FORM,

      callPair: [call_PayPortGetAvailablePaymentMethodsQuery, payportMethodFormCallPayloadSelector],

      onSuccess: (value) => () => of(bankingFormReceiveResponseAction(value)),
    }),
  ],
});

const payportMethodFormEpic = () => of(mountFormAction(PAYPORT_METHOD_FORM, PAYPORT_METHOD_FORM_CONFIG));

/**
 * 2nd Step Form
 */
const payportMethodFormResolver: TResolver<EPlatform_PayPortPaymentSystemType, TPlatformAppState> = (_, __, ___, state) =>
  payportActiveMethodTypeNonNullableSelector(state);

const createFormDetailsFieldPaths = <K extends string, S extends IWithFormsState = IWithFormsState>(fields: TFieldDefs<K, S>) =>
  keys(fields)
    .reduce(
      (acc, cur) => {
        acc[cur] = ["details", cur];

        return acc;
      },
      {} as Record<K, TFieldPath>,
    );

const PAYPORT_UPI_FORM_FIELDS: TFieldDefs<keyof IPayPortClientAccountDetails> = {
  accountInfo: field({
    extensions: withValidation<string>(
      formRequiredValidation<string>(),
      formUpiIdValidation,
    ),
  }),
};

const PAYPORT_UPI_DETAILS_FORM = form({
  fields: PAYPORT_UPI_FORM_FIELDS,
});

const PAYPORT_UPI_FORM_FIELD_PATHS = createFormDetailsFieldPaths(PAYPORT_UPI_FORM_FIELDS);

const PAYPORT_BANK_DETAILS_FIELDS: TFieldDefs<keyof IPayPortBankDetails> = {
  accountNumber: field({ extensions: withValidation(formRequiredValidation()) }),
  beneficiaryName: field({
    extensions: withValidation(
      formRequiredValidation(),
      formMinWidthValidation(platformui_checkInput_warn_minLength, 3),
    ),
  }),
  branchName: field({
    extensions: withValidation(
      formRequiredValidation(),
      formMinWidthValidation(platformui_checkInput_warn_minLength, 3),
    ),
  }),
  ifscCode: field({
    extensions: withValidation(
      formRequiredValidation(),
      formMinWidthValidation(platformui_checkInput_warn_minLength, 3),
    ),
  }),
};

const PAYPORT_BANK_DETAILS_FORM = form({
  fields: PAYPORT_BANK_DETAILS_FIELDS,
});

const PAYPORT_BANK_DETAILS_FORM_FIELD_PATHS = createFormDetailsFieldPaths(PAYPORT_BANK_DETAILS_FIELDS);

const PAYPORT_CASH_DETAILS_FIELDS: TFieldDefs<keyof IPayPortCashDetails> = {
  customerName: field({ extensions: withValidation(formRequiredValidation()) }),
  email: field({
    extensions: withValidation(formRequiredValidation(), formEmailValidation()),
  }),
  phone: field({
    extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()),
  }),
};

const PAYPORT_CASH_FORM_FIELD_PATHS = createFormDetailsFieldPaths(PAYPORT_CASH_DETAILS_FIELDS);

const payportPaytmFormResolver: TResolver = (_, __, formName, state) =>
  selectFieldValue<EPayportPaytmFormType>(state, formName, PAYPORT_PAYTM_FORM_FIELD_PATHS.type);

const PAYPORT_PAYTM_FORM_FIELDS: TFieldDefs<keyof IPayportPaytmFormDetails> = {
  accountInfo: oneOf({
    fields: {
      [EPayportPaytmFormType.phone]: field({
        extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()),
      }),
      [EPayportPaytmFormType.upi]: field({
        extensions: withValidation(formRequiredValidation(), formUpiIdValidation),
      }),
    },
    resolver: payportPaytmFormResolver,
  }),
  type: field({ extensions: withValidation(formRequiredValidation()) }),
};

const PAYPORT_PAYTM_FORM_FIELD_PATHS = createFormDetailsFieldPaths(PAYPORT_PAYTM_FORM_FIELDS);

const PAYPORT_FORM_DECORATOR: IDecoratorDefinition<ActionCreator<IFormAction>, TPlatformAppState> =
  onAction(
    setFieldValueAction<EPayportPaytmFormType>,
    whenIs(
      every(
        isFormName(WITHDRAW_FORM),
        (state) => payportActiveMethodTypeNonNullableSelector(state) === EPlatform_PayPortPaymentSystemType.paytm,
        isFormFieldPath(PAYPORT_PAYTM_FORM_FIELD_PATHS.type),
      ),
      (state, action, next) => {
        const nextState = next(state, action);
        const formType = action.payload.value;

        if (!formType) {
          return nextState;
        }

        const formName = action.metadata.formName;

        return dropFormField(
          nextState,
          formName,
          PAYPORT_PAYTM_FORM_FIELD_PATHS.accountInfo,
        );
      },
    ),
  );

const PAYPORT_FORM_FIELDS: TFieldDefs<keyof TPayportWithdrawForm> = {
  details: oneOf({
    fields: {
      [EPlatform_PayPortPaymentSystemType.upi]: PAYPORT_UPI_DETAILS_FORM,
      [EPlatform_PayPortPaymentSystemType.phonepe]: PAYPORT_UPI_DETAILS_FORM,
      [EPlatform_PayPortPaymentSystemType.imps]: PAYPORT_BANK_DETAILS_FORM,
      [EPlatform_PayPortPaymentSystemType.neft]: PAYPORT_BANK_DETAILS_FORM,
      [EPlatform_PayPortPaymentSystemType.rtgs]: PAYPORT_BANK_DETAILS_FORM,
      [EPlatform_PayPortPaymentSystemType.paytm]: form({ fields: PAYPORT_PAYTM_FORM_FIELDS }),
      [EPlatform_PayPortPaymentSystemType.cash]: form({ fields: PAYPORT_CASH_DETAILS_FIELDS }),
    },
    // todo @HY support generic type State
    resolver: payportMethodFormResolver as TResolver,
  }),
};

const PAYPORT_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [submittingExtension, validationExtension],

  form: form({ fields: PAYPORT_FORM_FIELDS }),

  epics: [
    withdrawFormSubmitEpicFactory(
      WITHDRAW_FORM,
      call_PayPortMakeWithdrawalCommand,
      withdrawPayportFormCallPayloadSelector,
    ),
  ],

  decorators: [PAYPORT_FORM_DECORATOR],
});

export {
  PAYPORT_FORM_CONFIG,
  payportMethodFormEpic,
  PAYPORT_UPI_FORM_FIELD_PATHS,
  PAYPORT_BANK_DETAILS_FORM_FIELD_PATHS,
  PAYPORT_CASH_FORM_FIELD_PATHS,
  PAYPORT_PAYTM_FORM_FIELD_PATHS,
};
