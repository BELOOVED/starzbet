import {
  isAlphabet,
  isArray,
  isEmail,
  isEmpty,
  isIP,
  isNil,
  isNotEmpty,
  isNotNil,
  isNumber,
  isPhoneNumber,
  isString,
  isUrl,
  isUuid,
  type TAnyObject,
} from "@sb/utils";
import { type IWithFormsState, type TFieldValue } from "../../Types";
import { selectFieldValue } from "../../Store";
import { getFormFieldPaths } from "../ExtensionsUtils";
import { createValidator, type TSyncValidator } from "./ValidationExtension";
import { selectFieldDefValidationExtension } from "./ValidationSelectors";

// todo split
const validationRules = {
  required: <Value extends TFieldValue = TFieldValue, State extends IWithFormsState = IWithFormsState>(): TSyncValidator<Value, State> =>
    (value) => {
      /**
       * Base required validation:
       * 1) check on undefined or null
       * 2) check on empty [] or {}
       */
      if (isNil(value) || (isString(value) && !value.trim()) || isEmpty(value)) {
        return "Field is required";
      }

      return undefined;
    },

  minLength: (length: number): TSyncValidator => (value) => {
    if (isNotNil(value) && (isString(value) || isArray(value)) && value.length < length) {
      return "Too short";
    }

    return undefined;
  },

  maxLength: (length: number): TSyncValidator => (value) => {
    if (isNotNil(value) && (isString(value) || isArray(value)) && value.length > length) {
      return "Too long";
    }

    return undefined;
  },

  uuid: (): TSyncValidator<string> => (value) => {
    if (isNotNil(value) && (value.length !== 36 || !isUuid(value))) {
      return "Not valid uuid";
    }

    return undefined;
  },

  ip: (): TSyncValidator<string> => (value) => {
    if (isNotNil(value) && !isIP(value)) {
      return "Not valid ip";
    }

    return undefined;
  },

  phoneNumber: (): TSyncValidator<string | number> => (value) => {
    if (isNotNil(value) && !isPhoneNumber(value.toString())) {
      return "Not valid phone number";
    }

    return undefined;
  },

  password: (regExp: RegExp): TSyncValidator<string | number> => (value) => {
    if (isNotNil(value) && isNil(regExp.exec(value.toString()))) {
      return "Not valid password";
    }

    return undefined;
  },

  email: (): TSyncValidator<string> => (value) => {
    if (isNotNil(value) && !isEmail(value)) {
      return "Not valid email";
    }

    return undefined;
  },

  number: (): TSyncValidator<number> => (value) => {
    if (isNotNil(value) && (!isNumber(value) || isNaN(value))) {
      return "Not valid number";
    }

    return undefined;
  },

  string: (): TSyncValidator<string> => (value) => {
    if (isNotNil(value) && !isString(value)) {
      return "Not valid string";
    }

    return undefined;
  },

  alphabet: (): TSyncValidator<string> => (value) => {
    if (isNotNil(value) && !isAlphabet(value)) {
      return "Not valid alphabet value";
    }

    return undefined;
  },

  url: (): TSyncValidator<string> => (value) => {
    if (isNotNil(value) && !isUrl(value)) {
      return "Not valid URL";
    }

    return undefined;
  },

  objectRequiredFields: (keys: string[]): TSyncValidator<TAnyObject> => (
    value,
  ) => {
    if (isNil(value)) {
      return undefined;
    }

    for (const key of keys) {
      const keyValue = value[key];

      if (keyValue === undefined) {
        return "The field value is invalid";
      }
    }

    return undefined;
  },

  childValidation: (): TSyncValidator => (
    value,
    fieldPath,
    formName,
    state,
  ) => {
    if (isNil(value)) {
      return undefined;
    }

    const fieldPaths = getFormFieldPaths(state, formName, fieldPath);

    const isFormInvalid = fieldPaths
      .filter((currentFieldPath) => currentFieldPath !== fieldPath)
      .some((fieldPath) => {
        const validation = selectFieldDefValidationExtension(state, formName, fieldPath);

        if (isNil(validation)) {
          return false;
        }

        const value = selectFieldValue(state, formName, fieldPath);
        const fieldValidator = createValidator(validation.validators);
        const errors = fieldValidator(value, fieldPath, formName, state);

        return isNotEmpty(errors);
      });

    return isFormInvalid ? "Child fields are invalid" : undefined;
  },
};

export { validationRules };
