import {
  createFormFieldPaths,
  field,
  type IWithFormsState,
  objectField,
  type TFieldDefs,
  withAsyncValidation,
  withValidation,
} from "@sb/form-new";
import { type TWithCallManagerState } from "@sb/call-manager";
import { phoneValueToString } from "../../../../../common/Utils/PhoneValueToString";
import { type TPhoneValue } from "../../../../../common/Model/TPhoneValue";
import {
  asyncValidationGoingValidator,
  FORM_CPF_VALIDATION,
  formDateOfBirthValidator,
  formEmailProviderValidation,
  formEmailValidation,
  formMaxWidthValidation,
  formPasswordValidation,
  formPhoneNumberValidation,
  formRequiredValidation,
  formUsernameValidation,
} from "../../../Form/Utils/FormValidations";
import { EExistCheck, registerFormExistCheck } from "./FormExistCheckValidation";
import { BRAZIL_REGISTRATION_FORM_NAME, PRIVATE_REGISTRATION_FORM_NAME, REGISTRATION_FORM_NAME } from "./Model";

type TPrivateRegistrationForm = {
  username: string;
  email: string;
  password: string;
  registrationConsent: boolean;
}

type TRegistrationForm = TPrivateRegistrationForm & {
  name: string;
  surname: string;
  mobilePhone: TPhoneValue;
  country: string;
  dateOfBirth: string;
  promoRegistration: string;
}

type TBrazilRegistrationForm = Omit<TRegistrationForm, "surname" | "country"> & {
  CPF: string;
}

const COMMON_FIELDS_WITHOUT_EXIST_CHECK = {
  password: field({
    extensions: withValidation(
      formRequiredValidation(),
      formPasswordValidation,
    ),
  }),
  registrationConsent: field({
    extensions: withValidation(
      formRequiredValidation(),
    ),
  }),
};

const commonFieldWithExistCheckFactory = (formName: string) => ({
  username: field({
    extensions: {
      ...withValidation(
        formRequiredValidation(),
        formUsernameValidation,
        asyncValidationGoingValidator,
      ),
      ...withAsyncValidation(registerFormExistCheck(EExistCheck.username, formName)),
    },
  }),
  email: field({
    extensions: {
      ...withValidation(
        formRequiredValidation(),
        formEmailValidation(),
        formEmailProviderValidation(),
        asyncValidationGoingValidator,
      ),
      ...withAsyncValidation(registerFormExistCheck(EExistCheck.email, formName)),
    },
  }),
  mobilePhone: objectField({
    extensions: {
      ...withValidation<TPhoneValue, IWithFormsState & TWithCallManagerState>(
        formRequiredValidation<TPhoneValue>(),
        (value, fieldPath, formName, state) =>
          formPhoneNumberValidation()(phoneValueToString(value), fieldPath, formName, state),
        asyncValidationGoingValidator,
      ),
      ...withAsyncValidation(registerFormExistCheck(EExistCheck.mobilePhone, formName)),
    },
  }),
});

const PRIVATE_REGISTRATION_FORM_FIELDS: TFieldDefs<keyof TPrivateRegistrationForm> = {
  ...COMMON_FIELDS_WITHOUT_EXIST_CHECK,
  username: field({
    extensions: {
      ...withValidation(
        formRequiredValidation(),
        formUsernameValidation,
        asyncValidationGoingValidator,
      ),
      ...withAsyncValidation(registerFormExistCheck(EExistCheck.username, PRIVATE_REGISTRATION_FORM_NAME)),
    },
  }),
  email: field({
    extensions: {
      ...withValidation(
        formRequiredValidation(),
        formEmailValidation(),
        formEmailProviderValidation(),
        asyncValidationGoingValidator,
      ),
      ...withAsyncValidation(registerFormExistCheck(EExistCheck.email, PRIVATE_REGISTRATION_FORM_NAME)),
    },
  }),
};

const REGISTRATION_FORM_FIELDS: TFieldDefs<keyof TRegistrationForm> = {
  ...COMMON_FIELDS_WITHOUT_EXIST_CHECK,
  ...commonFieldWithExistCheckFactory(REGISTRATION_FORM_NAME),
  name: field({
    extensions: withValidation(
      formRequiredValidation(),
      formMaxWidthValidation(undefined, 60),
    ),
  }),
  surname: field({
    extensions: withValidation(
      formRequiredValidation(),
      formMaxWidthValidation(undefined, 60),
    ),
  }),
  country: field({
    extensions: withValidation(
      formRequiredValidation(),
    ),
  }),
  dateOfBirth: field({
    extensions: withValidation(
      formRequiredValidation(),
      formDateOfBirthValidator,
    ),
  }),
  promoRegistration: field(),
};

const BRAZIL_REGISTRATION_FORM_FIELDS: TFieldDefs<keyof TBrazilRegistrationForm> = {
  ...COMMON_FIELDS_WITHOUT_EXIST_CHECK,
  ...commonFieldWithExistCheckFactory(BRAZIL_REGISTRATION_FORM_NAME),
  name: field({
    extensions: withValidation(
      formRequiredValidation(),
    ),
  }),
  dateOfBirth: field({
    extensions: withValidation(
      formRequiredValidation(),
    ),
  }),
  CPF: field({
    extensions: {
      ...withValidation(
        formRequiredValidation(),
        FORM_CPF_VALIDATION,
      ),
    },
  }),
  promoRegistration: field(),
};

const REGISTRATION_FORM_PATH = createFormFieldPaths(REGISTRATION_FORM_FIELDS);
const PRIVATE_REGISTRATION_FORM_PATH = createFormFieldPaths(PRIVATE_REGISTRATION_FORM_FIELDS);
const BRAZIL_REGISTRATION_FORM_PATH = createFormFieldPaths(BRAZIL_REGISTRATION_FORM_FIELDS);

export {
  PRIVATE_REGISTRATION_FORM_PATH,
  REGISTRATION_FORM_PATH,
  REGISTRATION_FORM_FIELDS,
  PRIVATE_REGISTRATION_FORM_FIELDS,
  BRAZIL_REGISTRATION_FORM_PATH,
  BRAZIL_REGISTRATION_FORM_FIELDS,
};
export type { TRegistrationForm, TBrazilRegistrationForm };
