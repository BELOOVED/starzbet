import { electronicFormatIBAN, friendlyFormatIBAN, isValidIBAN } from "ibantools";
import {
  isAsyncValidationSucceededValidator,
  type IWithFormsState,
  type TFieldValue,
  type TSyncValidator,
  validationRules,
} from "@sb/form-new";
import {
  EMoneyFormat,
  type IMoney,
  isEmail,
  isNil,
  isNotNil,
  Money,
  passwordValidator,
  type TExplicitAny,
  Time,
  type TNullable,
} from "@sb/utils";
import {
  platformui_checkInput_warn_maxLength,
  platformui_checkInput_warn_minLength,
  platformui_dateOfBirth_checkInput_warn_invalid,
  platformui_dateOfBirth_checkInput_warn_over,
  platformui_password_checkInput_warn_maxLength,
  platformui_password_checkInput_warn_minLength,
  platformui_password_checkInput_warn_spacesNotAllowed,
  platformui_password_checkInput_warn_wrongByRule,
  platformui_phoneNumber_checkInput_warn_invalid,
  platformui_registration_checkInput_emailProviderNotAllowed,
  platformui_registration_checkInput_enterValidEmail,
  platformui_registration_checkInput_fieldIsRequired,
  platformui_registration_checkInput_yourUsernameCanInclude,
  platformui_validate_error_asyncIsGoing,
  platformui_validate_error_cpf,
  platformui_validate_error_emptyAmount,
  platformui_validate_error_iban,
  platformui_validation_error_invalid_upiId,
} from "@sb/translates/platformui/CommonTKeys";
import { type IOptions } from "@sb/translator";
import { type TWithCallManagerState } from "@sb/call-manager";
import { listAllowedEmailProviders } from "../../../../common/Constants/ListAllowedEmailProviders";
import { isValidCPFValue } from "../../../Utils/IsValidCPFValue";
import { parseDateString } from "../../../Utils/ParseDateString";
import { isValidUpiIdValue } from "../../../Utils/IsValidUpiIdValue";

type TAppValidatorResult = {
  tKey: string;
  options?: IOptions;
};

type TAppSimpleValidator<Value extends TFieldValue = TFieldValue> = TSyncValidator<Value, IWithFormsState, TAppValidatorResult>

const decorateRule = <A extends TExplicitAny[], V extends TFieldValue>(
  defaultTKey: string,
  validatorFactory: (...args: A) => TSyncValidator<V, TExplicitAny>,
  optionsComposer?: (...args: A) => IOptions,
) => (tKey = defaultTKey, ...factoryArgs: A): TAppSimpleValidator<V> => {
    const validator = validatorFactory(...factoryArgs);

    return (...validatorArgs) => {
      const result = validator(...validatorArgs);

      if (isNotNil(result)) {
        return {
          tKey,
          options: optionsComposer ? optionsComposer(...factoryArgs) : {},
        };
      }

      return undefined;
    };
  };

const formRequiredValidation = decorateRule(
  platformui_registration_checkInput_fieldIsRequired,
  validationRules.required,
);

const formPhoneNumberValidation = decorateRule(
  platformui_phoneNumber_checkInput_warn_invalid,
  validationRules.phoneNumber,
);

const formEmailValidation = decorateRule(
  platformui_registration_checkInput_enterValidEmail,
  validationRules.email,
);

const formEmailProviderValidation = decorateRule(
  platformui_registration_checkInput_emailProviderNotAllowed,
  (): TSyncValidator<string> => (value) => {
    if (listAllowedEmailProviders.length === 0 || isNil(value) || !isEmail(value)) {
      return undefined;
    }

    if (!listAllowedEmailProviders.some((it) => value.endsWith(it))) {
      return "Not allowed email provider";
    }

    return undefined;
  },
);

const formMaxWidthValidation = decorateRule(
  platformui_checkInput_warn_maxLength,
  validationRules.maxLength,
  (value) => ({ value }),
);

const formMinWidthValidation = decorateRule(
  platformui_checkInput_warn_minLength,
  validationRules.minLength,
  (value) => ({ value }),
);

const PASSWORD_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 6;

const formUsernameValidation = (value: TNullable<string>) => {
  if (!value) {
    return undefined;
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    return {
      tKey: platformui_checkInput_warn_minLength,
      options: { value: PASSWORD_MIN_LENGTH },
    };
  }

  if (value.length > PASSWORD_MAX_LENGTH) {
    return {
      tKey: platformui_checkInput_warn_maxLength,
      options: { value: PASSWORD_MAX_LENGTH },
    };
  }

  if (!(/^[a-z0-9_]+$/i.test(value))) {
    return {
      tKey: platformui_registration_checkInput_yourUsernameCanInclude,
    };
  }

  return undefined;
};

const notZeroMoneyValidator: TSyncValidator<TFieldValue, IWithFormsState, TAppValidatorResult> = (value) => {
  if (Money.isMoney(value) && Money.isZero(value)) {
    return {
      tKey: platformui_validate_error_emptyAmount,
      options: {},
    };
  }

  return undefined;
};

const asyncValidationGoingValidator: TSyncValidator<TFieldValue, TWithCallManagerState & IWithFormsState> = (...props) => {
  const isGoing = !!isAsyncValidationSucceededValidator(...props);

  if (isGoing) {
    return {
      tKey: platformui_validate_error_asyncIsGoing,
    };
  }

  return undefined;
};

const passwordRules = [
  passwordValidator.validateNumbers,
  passwordValidator.validateAnyLetter,
];

const formPasswordValidation = (value: TNullable<string>) => {
  if (!value) {
    return undefined;
  }

  if (value.includes(" ")) {
    return { tKey: platformui_password_checkInput_warn_spacesNotAllowed };
  }

  if (passwordRules.some((rule) => !rule(value))) {
    return { tKey: platformui_password_checkInput_warn_wrongByRule };
  }

  if (!passwordValidator.validateMinPassword(value)) {
    return { tKey: platformui_password_checkInput_warn_minLength, options: { count: 8 } };
  }

  if (!passwordValidator.validateMaxPassword(value)) {
    return { tKey: platformui_password_checkInput_warn_maxLength, options: { count: 20 } };
  }

  return undefined;
};

const DATE_OF_BIRTH_REGEX = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19)|(20))\d\d)$/;

const formDateOfBirthValidator = (value: TNullable<string>) => {
  if (!value) {
    return undefined;
  }

  if (DATE_OF_BIRTH_REGEX.test(value)) {
    const date = parseDateString(value);
    const timestamp = date.getTime();

    const currentDate = new Date().getTime();

    if (!isNaN(timestamp) && Time.isAfter(currentDate, timestamp)) {
      if (Time.differenceInYears(currentDate, timestamp) < 18) {
        return { tKey: platformui_dateOfBirth_checkInput_warn_over };
      }
    } else {
      return { tKey: platformui_dateOfBirth_checkInput_warn_invalid };
    }

    return undefined;
  }

  return { tKey: platformui_dateOfBirth_checkInput_warn_invalid };
};

type TGetText = (money: string) => TAppValidatorResult

const FORM_MONEY_VALIDATION_IN_RANGE = (
  min: IMoney | null,
  max: IMoney | null,
  minText: TGetText,
  maxText: TGetText,
  value: TNullable<IMoney>,
) => {
  if (min && value && Money.isSameCurrency(min, value) && Money.lessThan(value, min)) {
    return minText(Money.toFormat(min, EMoneyFormat.symbolLeft));
  }

  if (max && value && Money.isSameCurrency(max, value) && Money.greaterThan(value, max)) {
    return maxText(Money.toFormat(max, EMoneyFormat.symbolLeft));
  }

  return undefined;
};

const FORM_STRING_SIZE_VALIDATION = <Value extends TNullable<string>>(
  errorText: string,
  size: number,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  isOption = true,
) => (value: Value) => {
    if (isNotNil(value) && value.length !== size) {
      if (isOption) {
        return {
          tKey: errorText,
          options: { value: size },
        };
      }

      return { tKey: errorText };
    }

    return undefined;
  };

/**
 * Approved value IBAN in `Friendly` (NL91 ABNA 0417 1643 00) or `Electronic` (NL91ABNA0417164300) formats
 * @param value
 */
const FORM_IBAN_VALIDATION = (value: TNullable<string>) => {
  if (isNil(value)) {
    return undefined;
  }

  /**
   * "NL91ABNA0417164300" -> "NL91 ABNA 0417 1643 00"
   * "NL91 ABNA 0417 1643 00" -> "NL91 ABNA 0417 1643 00"
   */
  const friendlyFormat = friendlyFormatIBAN(value);

  if (!friendlyFormat) {
    return {
      tKey: platformui_validate_error_iban,
    };
  }

  /**
   * "NL91 ABNA 0417 1643 00" -> "NL91ABNA0417164300"
   */
  const electronicFormat = electronicFormatIBAN(friendlyFormat);

  /**
   * isValidIBAN approve only electronic format
   */
  if (!electronicFormat || !isValidIBAN(electronicFormat)) {
    return {
      tKey: platformui_validate_error_iban,
    };
  }

  return undefined;
};

const FORM_CPF_VALIDATION = (value: TNullable<string>) => {
  if (value && !isValidCPFValue(value)) {
    return {
      tKey: platformui_validate_error_cpf,
    };
  }

  return undefined;
};

const formUpiIdValidation: TAppSimpleValidator<string> = (value) => {
  if (value && !isValidUpiIdValue(value)) {
    return {
      tKey: platformui_validation_error_invalid_upiId,
    };
  }

  return undefined;
};

export {
  formRequiredValidation,
  formPhoneNumberValidation,
  formEmailValidation,
  formEmailProviderValidation,
  asyncValidationGoingValidator,
  formUsernameValidation,
  formMinWidthValidation,
  formMaxWidthValidation,
  formDateOfBirthValidator,
  formPasswordValidation,
  notZeroMoneyValidator,
  FORM_MONEY_VALIDATION_IN_RANGE,
  FORM_STRING_SIZE_VALIDATION,
  FORM_IBAN_VALIDATION,
  FORM_CPF_VALIDATION,
  formUpiIdValidation,
};
