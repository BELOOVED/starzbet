import { type ActionCreator } from "redux";
import {
  createFormFieldPaths,
  every,
  field,
  form,
  type IDecoratorDefinition,
  type IFormAction,
  type IFormDef,
  isFormFieldPath,
  isFormName,
  onAction,
  oneOf,
  selectFieldValue,
  setFieldValue,
  setFieldValueAction,
  type TFieldDefs,
  type TResolver,
  whenIs,
  withValidation,
} from "@sb/form-new";
import { isNil } from "@sb/utils";
import { FORM_IBAN_VALIDATION, formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { EPaymentAccountBankAccount } from "../../Models/PaymentAccountTypeModel";
import { PAYMENT_ACCOUNT_CREATE_FORM } from "../../Models/Variables";
import { PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS } from "../PaymentAccountBaseFormModel";
import { paymentAccountCreateKindFieldValueSelector } from "../PaymentAccountFormSelectors";
import { type TBankAccountBaseForm, type TBankAccountFormModel, type TBankAccountPaymentClipForm } from "./BankAccountFormModel";

const valueResolver: TResolver = (_, __, ___, state) =>
  paymentAccountCreateKindFieldValueSelector(state);

const BANK_ACCOUNT_BASE_FORM_FIELDS: TFieldDefs<keyof TBankAccountBaseForm["details"]> = {
  bank: field({
    extensions: withValidation(formRequiredValidation()),
  }),
  iban: field({ extensions: withValidation(formRequiredValidation(), FORM_IBAN_VALIDATION) }),
};

const BASE_FORM: IFormDef = form({ fields: BANK_ACCOUNT_BASE_FORM_FIELDS });

/**
 * Payment clip form fields
 */
const PAYMENT_CLIP_FORM_FIELDS: TFieldDefs<keyof TBankAccountPaymentClipForm["details"]> = {
  name: field({ extensions: withValidation(formRequiredValidation()) }),
  number: field({ extensions: withValidation(formRequiredValidation()) }),
  bankIfsc: field({ extensions: withValidation(formRequiredValidation()) }),
  transferType: field({ extensions: withValidation(formRequiredValidation()) }),
};

const PAYMENT_CLIP_FORM: IFormDef = form({ fields: PAYMENT_CLIP_FORM_FIELDS });

const BANK_ACCOUNT_FORM_FIELDS: TFieldDefs<keyof TBankAccountFormModel> = {
  details: oneOf({
    fields: {
      [EPaymentAccountBankAccount.bankTransfer]: BASE_FORM,
      [EPaymentAccountBankAccount.trHavaleEft]: BASE_FORM,
      [EPaymentAccountBankAccount.one]: BASE_FORM,
      [EPaymentAccountBankAccount.paymentClip]: PAYMENT_CLIP_FORM,
    },
    resolver: valueResolver,
  }),
};

const BANK_ACCOUNT_FORM_FIELD_PATHS = createFormFieldPaths(BANK_ACCOUNT_FORM_FIELDS);
const BANK_ACCOUNT_BASE_DETAILS_FIELD_PATHS = createFormFieldPaths(BANK_ACCOUNT_BASE_FORM_FIELDS);
/**
 * Base form fields
 */
const BANK_ACCOUNT_BANK_FIELD_PATH = BANK_ACCOUNT_FORM_FIELD_PATHS.details.concat(BANK_ACCOUNT_BASE_DETAILS_FIELD_PATHS.bank);

/**
 * Payment clip form fields
 */
const PAYMENT_CLIP_DETAILS_FIELD_PATHS = createFormFieldPaths(PAYMENT_CLIP_FORM_FIELDS);

const BANK_ACCOUNT_FORM_DECORATOR: IDecoratorDefinition<ActionCreator<IFormAction>, TPlatformAppState> =
  onAction(
    setFieldValueAction<EPaymentAccountBankAccount>,
    whenIs(
      every(
        isFormName(PAYMENT_ACCOUNT_CREATE_FORM),
        isFormFieldPath(PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS.accountKind),
      ),
      (state, action, next) => {
        const prevValue = paymentAccountCreateKindFieldValueSelector(state);
        const nextValue = action.payload.value;
        const nextState = next(state, action);

        if (nextValue === EPaymentAccountBankAccount.paymentClip) {
          return nextState;
        }

        const bankValue = selectFieldValue(
          state,
          PAYMENT_ACCOUNT_CREATE_FORM,
          BANK_ACCOUNT_BANK_FIELD_PATH,
        );

        if (nextValue === prevValue || isNil(bankValue)) {
          return nextState;
        }

        return setFieldValue(
          nextState,
          BANK_ACCOUNT_BANK_FIELD_PATH,
          undefined,
          PAYMENT_ACCOUNT_CREATE_FORM,
        );
      },
    ),
  );

export {
  BANK_ACCOUNT_FORM_FIELDS,
  BANK_ACCOUNT_FORM_FIELD_PATHS,

  BANK_ACCOUNT_BASE_DETAILS_FIELD_PATHS,
  PAYMENT_CLIP_DETAILS_FIELD_PATHS,

  BANK_ACCOUNT_BASE_FORM_FIELDS,
  PAYMENT_CLIP_FORM_FIELDS,

  BANK_ACCOUNT_FORM_DECORATOR,
};
