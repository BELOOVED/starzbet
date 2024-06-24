import { withProps } from "@sb/utils";
import {
  platformui_starzbet_password_button_changePassword,
  platformui_starzbet_password_confirmNewPassword,
  platformui_starzbet_password_currentPassword,
  platformui_starzbet_password_newPassword,
  platformui_starzbet_password_placeholder_enterPassword,
  platformui_starzbet_password_success,
  platformui_starzbet_password_successChanged,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { platformui_error_failed } from "@sb/translates/platformui/CommonTKeys";
import classes from "./ChangePasswordForm.module.css";
import { TextFieldCreator } from "../../../../../common/Components/Field/TextFieldCreator";
import { Field } from "../../../../../common/Themes/Starzbet/Components/Field/Field";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { PasswordInput } from "../../../../../common/Themes/Starzbet/Components/Input/PasswordInput";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { ChangePasswordFormFactory } from "../../../../Components/Password/ChangePasswordFormFactory";
import { changePasswordFormModalMapFactory } from "../../../../Components/Password/ChangePasswordFormModalMapFactory";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";
import { ThemedModalErrorMessage, ThemedModalSuccessMessage } from "../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

const PasswordField = withProps(TextFieldCreator)({ ThemedField: Field, ThemedInput: PasswordInput });

const SubmitButton = withProps(Button)({ colorScheme: "orange-gradient" });

const ChangePasswordForm = withProps(ChangePasswordFormFactory)({
  oldPassword: {
    labelTKey: platformui_starzbet_password_currentPassword,
    placeholderTKey: platformui_starzbet_password_placeholder_enterPassword,
    Component: PasswordField,
  },
  newPassword: {
    labelTKey: platformui_starzbet_password_newPassword,
    placeholderTKey: platformui_starzbet_password_placeholder_enterPassword,
    Component: PasswordField,
  },
  confirmNewPassword: {
    labelTKey: platformui_starzbet_password_confirmNewPassword,
    placeholderTKey: platformui_starzbet_password_placeholder_enterPassword,
    Component: PasswordField,
  },
  submitButton: {
    valueTKey: platformui_starzbet_password_button_changePassword,
    Component: SubmitButton,
  },
  submitResult: {
    Component: ThemedModalFormSubmitResult,
  },
  className: classes.container,
  fallbackContent: Loader,
});

const CHANGE_PASSWORD_FORM_MODAL_MAP = changePasswordFormModalMapFactory({
  successModal: {
    Component: ThemedModalSuccessMessage,
    titleTKey: platformui_starzbet_password_success,
    subtitleTKey: platformui_starzbet_password_successChanged,
  },
  errorModal: {
    titleTKey: platformui_error_failed,
    Component: ThemedModalErrorMessage,
  },
});

export { ChangePasswordForm, CHANGE_PASSWORD_FORM_MODAL_MAP };
