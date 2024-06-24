import { type TFormFieldPath } from "@sb/form-new";

const CHANGE_PASSWORD_FORM_NAME = "changePasswordForm";

interface IChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const CHANGE_PASSWORD_FORM_OLD_PASSWORD_FIELD_PATH: TFormFieldPath<IChangePasswordForm> = ["oldPassword"];

const CHANGE_PASSWORD_FORM_NEW_PASSWORD_FIELD_PATH: TFormFieldPath<IChangePasswordForm> = ["newPassword"];

const CHANGE_PASSWORD_FORM_CONFIRM_NEW_PASSWORD_FIELD_PATH: TFormFieldPath<IChangePasswordForm> = ["confirmNewPassword"];

export {
  CHANGE_PASSWORD_FORM_NAME,
  CHANGE_PASSWORD_FORM_OLD_PASSWORD_FIELD_PATH,
  CHANGE_PASSWORD_FORM_NEW_PASSWORD_FIELD_PATH,
  CHANGE_PASSWORD_FORM_CONFIRM_NEW_PASSWORD_FIELD_PATH,
};

export type{
  IChangePasswordForm,
};
