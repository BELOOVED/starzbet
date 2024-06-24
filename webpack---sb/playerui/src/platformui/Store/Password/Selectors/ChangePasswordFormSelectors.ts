import { createSimpleSelector, getNotNil, withParams } from "@sb/utils";
import { selectFieldValue } from "@sb/form-new";
import {
  CHANGE_PASSWORD_FORM_CONFIRM_NEW_PASSWORD_FIELD_PATH,
  CHANGE_PASSWORD_FORM_NAME,
  CHANGE_PASSWORD_FORM_NEW_PASSWORD_FIELD_PATH,
  CHANGE_PASSWORD_FORM_OLD_PASSWORD_FIELD_PATH,
} from "../PasswordVariables";

const changePasswordFormOldPasswordFieldValueSelector = withParams(
  selectFieldValue<string>,
  CHANGE_PASSWORD_FORM_NAME,
  CHANGE_PASSWORD_FORM_OLD_PASSWORD_FIELD_PATH,
);

const changePasswordFormNewPasswordFieldValueSelector = withParams(
  selectFieldValue<string>,
  CHANGE_PASSWORD_FORM_NAME,
  CHANGE_PASSWORD_FORM_NEW_PASSWORD_FIELD_PATH,
);

const changePasswordFormConfirmNewPasswordFieldValueSelector = withParams(
  selectFieldValue<string>,
  CHANGE_PASSWORD_FORM_NAME,
  CHANGE_PASSWORD_FORM_CONFIRM_NEW_PASSWORD_FIELD_PATH,
);

const changePasswordFormSubmitPayloadSelector = createSimpleSelector(
  [
    changePasswordFormOldPasswordFieldValueSelector,
    changePasswordFormConfirmNewPasswordFieldValueSelector,
  ],
  (oldPassword, newPassword) => ({
    oldPassword: getNotNil(oldPassword, ["changePasswordFormSubmitPayloadSelector"], "changePasswordFormOldPasswordFieldValueSelector"),
    newPassword: getNotNil(newPassword, ["changePasswordFormSubmitPayloadSelector"], "changePasswordFormConfirmNewPasswordFieldValueSelector"),
  }),
);

export {
  changePasswordFormNewPasswordFieldValueSelector,
  changePasswordFormSubmitPayloadSelector,
};
