import {
  type IWithFormsState,
  selectFieldMetaSyncValidationErrors,
  type TAsyncValidator,
  type TAsyncValidatorError,
  type TFieldPath,
} from "@sb/form-new";
import { getNotNil, isArray, type TExplicitAny } from "@sb/utils";
import {
  platformui_phoneNumber_checkInput_warn_invalid,
  platformui_register_error_emailAlreadyInUse,
  platformui_register_error_phoneAlreadyInUse,
  platformui_register_error_playerAlreadyExists,
  platformui_validate_error_asyncIsGoing,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { isError } from "@sb/network-bus/Utils";
import { Logger } from "../../../../../common/Utils/Logger";
import { phoneValueToString } from "../../../../../common/Utils/PhoneValueToString";
import { type TPhoneValue } from "../../../../../common/Model/TPhoneValue";
import type { PlatformHttpApi } from "../../../../Api/PlatformHttpApi";
import { type IDepsWithPlatformHttpApi } from "../../../Root/Epic/TPlatformEpic";
import { errorCodes } from "../../../Form/Model/ErrorMessages";
import { PRIVATE_REGISTRATION_FORM_NAME } from "./Model";

type TExistCheck = TAsyncValidator<string | TPhoneValue, IWithFormsState, TAsyncValidatorError, IDepsWithPlatformHttpApi>

enum EExistCheck {
  username,
  email,
  mobilePhone,
}

const EXIST_CHECK_FIELD_PATH: Record<EExistCheck, TFieldPath> = {
  [EExistCheck.username]: ["username"],
  [EExistCheck.email]: ["email"],
  [EExistCheck.mobilePhone]: ["mobilePhone"],
};

const PRIVATE_EXIST_CHECK_FIELD_PATH: Partial<Record<EExistCheck, TFieldPath>> = {
  [EExistCheck.username]: ["username"],
  [EExistCheck.email]: ["email"],
};

type TCallFunction = (httpApi: PlatformHttpApi, value: TExplicitAny) => Promise<boolean>

const EXIST_CHECK_CALLS: Record<EExistCheck, TCallFunction> = {
  [EExistCheck.username]: (httpApi: PlatformHttpApi, value: string) => httpApi.callPlayerLoginExists({ login: value }),
  [EExistCheck.email]: (httpApi: PlatformHttpApi, value: string) => httpApi.callPlayerEmailExists({ email: value }),
  [EExistCheck.mobilePhone]: (httpApi: PlatformHttpApi, value: TPhoneValue) =>
    httpApi.callPlayerPhoneExists({ phone: phoneValueToString(value) }),
};

const EXIST_CHECK_TKEYS: Record<EExistCheck, TCommonTKeys> = {
  [EExistCheck.username]: platformui_register_error_playerAlreadyExists,
  [EExistCheck.email]: platformui_register_error_emailAlreadyInUse,
  [EExistCheck.mobilePhone]: platformui_register_error_phoneAlreadyInUse,
};

const formExistCheckValidation =
  (formName: string, fieldPath: TFieldPath, callFunction: TCallFunction, resultTKey: TCommonTKeys): TExistCheck =>
    async (value, state, dependencies) => {
      const errors = selectFieldMetaSyncValidationErrors<{ tKey: TCommonTKeys; }>(
        state,
        formName,
        fieldPath,
      );

      // TODO Replace after form new fix @Yahor Litavar
      const isInvalid = errors?.some((it) => it.tKey !== platformui_validate_error_asyncIsGoing);

      if (isInvalid || !value) {
        return undefined;
      }

      try {
        const result = await callFunction(dependencies.platformHttpApi, value);

        return result ? { tKey: resultTKey } : undefined;
      } catch (errors) {
        //Backend responds with an error if an invalid phone number was sent
        if (isArray(errors)) {
          const invalidPhone = errors.find((error) => isError(error) && error.code === errorCodes.phone_number_invalid);
          if (invalidPhone) {
            return { tKey: platformui_phoneNumber_checkInput_warn_invalid };
          }
        }

        if (isError(errors) && errors.code === errorCodes.phone_number_invalid) {
          return { tKey: platformui_phoneNumber_checkInput_warn_invalid };
        }

        Logger.warn.form(`Exist check: ${formName} -> ${fieldPath.join(", ")}`, errors);

        return undefined;
      }
    };

const registerFormExistCheck = (type: EExistCheck, formName: string): TExistCheck => formExistCheckValidation(
  formName,
  formName === PRIVATE_REGISTRATION_FORM_NAME
    ? getNotNil(PRIVATE_EXIST_CHECK_FIELD_PATH[type], ["Exist Check"], "field path private")
    : EXIST_CHECK_FIELD_PATH[type],
  EXIST_CHECK_CALLS[type],
  EXIST_CHECK_TKEYS[type],
);

export {
  registerFormExistCheck,
  EExistCheck,
  formExistCheckValidation,
};
