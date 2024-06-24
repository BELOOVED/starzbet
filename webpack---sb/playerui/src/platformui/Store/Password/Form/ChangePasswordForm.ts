import {
  createForm,
  field,
  form,
  submittingExtension,
  type TFieldDefs,
  type TSyncValidator,
  type TSyncValidatorError,
  validationExtension,
  withValidation,
} from "@sb/form-new";
import {
  platformui_changePassword_error_invalidPassword,
  platformui_changePassword_error_newPasswordCanNotBeEqualToOldPassword,
  platformui_changePassword_error_passwordsDoesntMatch,
  platformui_error_somethingWentWrong,
} from "@sb/translates/platformui/CommonTKeys";
import type { IError } from "@sb/network-bus/Model";
import { formPasswordValidation, formRequiredValidation } from "../../Form/Utils/FormValidations";
import { errorCodes } from "../../Form/Model/ErrorMessages";
import { type IChangePasswordForm } from "../PasswordVariables";
import { changePasswordFormSubmitEpic } from "../Epics/ChangePasswordFormSubmitEpic";
import { changePasswordFormNewPasswordFieldValueSelector } from "../Selectors/ChangePasswordFormSelectors";

const newPasswordMatchWithConfirmNewPassword: TSyncValidator<TSyncValidatorError> = (confirmNewPassword, _, __, state) => {
  if (!confirmNewPassword) {
    return undefined;
  }

  const newPassword = changePasswordFormNewPasswordFieldValueSelector(state);
  if (!newPassword) {
    return undefined;
  }

  return confirmNewPassword === newPassword ? undefined : { tKey: platformui_changePassword_error_passwordsDoesntMatch };
};

const CHANGE_PASSWORD_FORM_FILED: TFieldDefs<keyof IChangePasswordForm> = {
  oldPassword: field({
    extensions: withValidation(formRequiredValidation()),
  }),
  newPassword: field({
    extensions: withValidation(formRequiredValidation(), formPasswordValidation),
  }),
  confirmNewPassword: field({
    extensions: withValidation(formRequiredValidation(), newPasswordMatchWithConfirmNewPassword),
  }),
};

const changePasswordFormErrorExtractor = (error: IError) => {
  if (error.code === errorCodes.invalid_password) {
    return platformui_changePassword_error_invalidPassword;
  }

  if (error.code === errorCodes.identical_password) {
    return platformui_changePassword_error_newPasswordCanNotBeEqualToOldPassword;
  }

  return platformui_error_somethingWentWrong;
};

const CHANGE_PASSWORD_FORM_CONFIG = createForm({
  extensions: [validationExtension, submittingExtension],
  form: form({ fields: CHANGE_PASSWORD_FORM_FILED }),
  epics: [changePasswordFormSubmitEpic],
});

export { CHANGE_PASSWORD_FORM_CONFIG, changePasswordFormErrorExtractor };
