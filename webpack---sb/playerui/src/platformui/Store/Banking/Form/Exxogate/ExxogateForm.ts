import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formPhoneNumberValidation, formRequiredValidation } from "../../../Form/Utils/FormValidations";
import {
  type TExxogateImps29FormModel,
  type TExxogateImps41FormModel,
  type TExxogateImps43FormModel,
  type TExxogateImps9FormModel,
  type TExxogateTestDepositFormModel,
  type TExxogateTestWithdrawalFormModel,
  type TExxogateUpi41DepositFormModel,
  type TExxogateUpi43DepositFormModel,
  type TExxogateUpiBaseDepositFormModel,
} from "./ExxogateFormModel";

const EXXOGATE_TEST_DEPOSIT_FORM_FIELDS: TFieldDefs<keyof TExxogateTestDepositFormModel> = ({
  address: field({ extensions: withValidation(formRequiredValidation()) }),
  city: field({ extensions: withValidation(formRequiredValidation()) }),
  countryCode: field({ extensions: withValidation(formRequiredValidation()) }),
  firstName: field({ extensions: withValidation(formRequiredValidation()) }),
  lastName: field({ extensions: withValidation(formRequiredValidation()) }),
  personId: field({ extensions: withValidation(formRequiredValidation()) }),
  phone: field({ extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()) }),
});

const EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS = createFormFieldPaths(EXXOGATE_TEST_DEPOSIT_FORM_FIELDS);

const EXXOGATE_UPI_BASE_DEPOSIT_FORM_FIELDS: TFieldDefs<keyof TExxogateUpiBaseDepositFormModel> = ({
  address: field({ extensions: withValidation(formRequiredValidation()) }),
  firstName: field({ extensions: withValidation(formRequiredValidation()) }),
  lastName: field({ extensions: withValidation(formRequiredValidation()) }),
  phone: field({ extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()) }),

  personId: field(),
});

const EXXOGATE_UPI_BASE_DEPOSIT_FORM_FIELD_PATHS = createFormFieldPaths(EXXOGATE_UPI_BASE_DEPOSIT_FORM_FIELDS);

const EXXOGATE_UPI_9_DEPOSIT_FORM_FIELDS: TFieldDefs<keyof TExxogateUpiBaseDepositFormModel> = ({
  ...EXXOGATE_UPI_BASE_DEPOSIT_FORM_FIELDS,
  personId: field({ extensions: withValidation(formRequiredValidation()) }),
});

const EXXOGATE_UPI_41_DEPOSIT_FORM_FIELDS: TFieldDefs<keyof TExxogateUpi41DepositFormModel> = ({
  phone: field({ extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()) }),
});

const EXXOGATE_UPI_41_DEPOSIT_FORM_FIELD_PATHS = createFormFieldPaths(EXXOGATE_UPI_41_DEPOSIT_FORM_FIELDS);

const EXXOGATE_UPI_43_DEPOSIT_FORM_FIELDS: TFieldDefs<keyof TExxogateUpi43DepositFormModel> = ({
  firstName: field({ extensions: withValidation(formRequiredValidation()) }),
  lastName: field({ extensions: withValidation(formRequiredValidation()) }),
  phone: field({ extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()) }),
});

const EXXOGATE_UPI_43_DEPOSIT_FORM_FIELD_PATHS = createFormFieldPaths(EXXOGATE_UPI_43_DEPOSIT_FORM_FIELDS);

/**
 * Withdraw Form
 */

const EXXOGATE_TEST_WITHDRAWAL_FORM_FIELDS: TFieldDefs<keyof TExxogateTestWithdrawalFormModel> = ({
  address: field({ extensions: withValidation(formRequiredValidation()) }),
  personId: field({ extensions: withValidation(formRequiredValidation()) }),
  phone: field({ extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()) }),
});

const EXXOGATE_TEST_WITHDRAWAL_FORM_FIELD_PATHS = createFormFieldPaths(EXXOGATE_TEST_WITHDRAWAL_FORM_FIELDS);

const EXXOGATE_IMPS_9_WITHDRAWAL_FORM_FIELDS: TFieldDefs<keyof TExxogateImps9FormModel> = ({
  address: field({ extensions: withValidation(formRequiredValidation()) }),
  ifsc: field({ extensions: withValidation(formRequiredValidation()) }),
  personId: field({ extensions: withValidation(formRequiredValidation()) }),
  phone: field({ extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()) }),
});

const EXXOGATE_IMPS_9_WITHDRAWAL_FORM_FIELD_PATHS = createFormFieldPaths(EXXOGATE_IMPS_9_WITHDRAWAL_FORM_FIELDS);

const EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELDS: TFieldDefs<keyof TExxogateImps29FormModel> = ({
  address: field({ extensions: withValidation(formRequiredValidation()) }),
  bankAccountNumber: field({ extensions: withValidation(formRequiredValidation()) }),
  ifsc: field({ extensions: withValidation(formRequiredValidation()) }),
  phone: field({ extensions: withValidation(formRequiredValidation(), formPhoneNumberValidation()) }),
});

const EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELD_PATHS = createFormFieldPaths(EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELDS);

const EXXOGATE_IMPS_41_WITHDRAWAL_FORM_FIELDS: TFieldDefs<keyof TExxogateImps41FormModel> = ({
  bankAccountNumber: field({ extensions: withValidation(formRequiredValidation()) }),
  ifsc: field({ extensions: withValidation(formRequiredValidation()) }),
});

const EXXOGATE_IMPS_41_WITHDRAWAL_FORM_FIELD_PATHS = createFormFieldPaths(EXXOGATE_IMPS_41_WITHDRAWAL_FORM_FIELDS);

const EXXOGATE_IMPS_43_WITHDRAWAL_FORM_FIELDS: TFieldDefs<keyof TExxogateImps43FormModel> = ({
  bankId: field({ extensions: withValidation(formRequiredValidation()) }),
  bankAccountNumber: field({ extensions: withValidation(formRequiredValidation()) }),
  ifsc: field({ extensions: withValidation(formRequiredValidation()) }),
});

const EXXOGATE_IMPS_43_WITHDRAWAL_FORM_FIELD_PATHS = createFormFieldPaths(EXXOGATE_IMPS_43_WITHDRAWAL_FORM_FIELDS);

export {
  EXXOGATE_TEST_DEPOSIT_FORM_FIELDS,
  EXXOGATE_TEST_DEPOSIT_FORM_FIELD_PATHS,

  EXXOGATE_UPI_BASE_DEPOSIT_FORM_FIELDS,
  EXXOGATE_UPI_9_DEPOSIT_FORM_FIELDS,
  EXXOGATE_UPI_BASE_DEPOSIT_FORM_FIELD_PATHS,

  EXXOGATE_UPI_41_DEPOSIT_FORM_FIELDS,
  EXXOGATE_UPI_41_DEPOSIT_FORM_FIELD_PATHS,

  EXXOGATE_UPI_43_DEPOSIT_FORM_FIELDS,
  EXXOGATE_UPI_43_DEPOSIT_FORM_FIELD_PATHS,

  EXXOGATE_TEST_WITHDRAWAL_FORM_FIELDS,
  EXXOGATE_TEST_WITHDRAWAL_FORM_FIELD_PATHS,

  EXXOGATE_IMPS_9_WITHDRAWAL_FORM_FIELDS,
  EXXOGATE_IMPS_9_WITHDRAWAL_FORM_FIELD_PATHS,

  EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELDS,
  EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELD_PATHS,

  EXXOGATE_IMPS_41_WITHDRAWAL_FORM_FIELDS,
  EXXOGATE_IMPS_41_WITHDRAWAL_FORM_FIELD_PATHS,

  EXXOGATE_IMPS_43_WITHDRAWAL_FORM_FIELDS,
  EXXOGATE_IMPS_43_WITHDRAWAL_FORM_FIELD_PATHS,
};
