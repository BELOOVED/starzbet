import { type ButtonHTMLAttributes, type ComponentType, memo } from "react";
import { useTranslation } from "@sb/translator";
import { type IWithQaAttribute, PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { FormWithWrapper, type TFormProps } from "@sb/form-new";
import { withProps } from "@sb/utils";
import { type TTTextBaseFieldProps } from "../../../common/Components/Field/TextFieldCreator";
import {
  CHANGE_PASSWORD_FORM_CONFIRM_NEW_PASSWORD_FIELD_PATH,
  CHANGE_PASSWORD_FORM_NAME,
  CHANGE_PASSWORD_FORM_NEW_PASSWORD_FIELD_PATH,
  CHANGE_PASSWORD_FORM_OLD_PASSWORD_FIELD_PATH,
} from "../../Store/Password/PasswordVariables";

interface IChangePasswordFormContentProps {
  oldPassword: {
    labelTKey: string;
    placeholderTKey: string;
    Component: ComponentType<TTTextBaseFieldProps>;
  };
  newPassword: {
    labelTKey: string;
    placeholderTKey: string;
    Component: ComponentType<TTTextBaseFieldProps>;
  };
  confirmNewPassword: {
    labelTKey: string;
    placeholderTKey: string;
    Component: ComponentType<TTTextBaseFieldProps>;
  };
  submitButton: {
    Component: ComponentType<ButtonHTMLAttributes<HTMLButtonElement> & IWithQaAttribute>;
    valueTKey: string;
  };
}

const ChangePasswordFormContent = memo<IChangePasswordFormContentProps>(({
  oldPassword,
  newPassword,
  confirmNewPassword,
  submitButton,
}) => {
  const [t] = useTranslation();

  return (
    <>
      <oldPassword.Component
        fieldPath={CHANGE_PASSWORD_FORM_OLD_PASSWORD_FIELD_PATH}
        label={t(oldPassword.labelTKey)}
        placeholder={t.plain(oldPassword.placeholderTKey)}
        qaAttribute={PlayerUIQaAttributes.PasswordInput.Input}
        validationQaAttribute={PlayerUIQaAttributes.PasswordInput.Validation}
        fieldQaAttribute={PlayerUIQaAttributes.SecurityPage.CurrentPasswordInput}
        showButtonQaAttribute={PlayerUIQaAttributes.PasswordInput.ShowButton}
      />

      <newPassword.Component
        fieldPath={CHANGE_PASSWORD_FORM_NEW_PASSWORD_FIELD_PATH}
        label={t(newPassword.labelTKey)}
        placeholder={t.plain(newPassword.placeholderTKey)}
        qaAttribute={PlayerUIQaAttributes.PasswordInput.Input}
        validationQaAttribute={PlayerUIQaAttributes.PasswordInput.Validation}
        fieldQaAttribute={PlayerUIQaAttributes.SecurityPage.NewPasswordInput}
        showButtonQaAttribute={PlayerUIQaAttributes.PasswordInput.ShowButton}

      />

      <confirmNewPassword.Component
        fieldPath={CHANGE_PASSWORD_FORM_CONFIRM_NEW_PASSWORD_FIELD_PATH}
        label={t(confirmNewPassword.labelTKey)}
        placeholder={t.plain(confirmNewPassword.placeholderTKey)}
        qaAttribute={PlayerUIQaAttributes.PasswordInput.Input}
        validationQaAttribute={PlayerUIQaAttributes.PasswordInput.Validation}
        fieldQaAttribute={PlayerUIQaAttributes.SecurityPage.ConfirmNewPasswordInput}
        showButtonQaAttribute={PlayerUIQaAttributes.PasswordInput.ShowButton}

      />

      <submitButton.Component type={"submit"} qaAttribute={PlayerUIQaAttributes.SecurityPage.ChangePasswordButton}>
        {t(submitButton.valueTKey)}
      </submitButton.Component>
    </>
  );
});
ChangePasswordFormContent.displayName = "ChangePasswordFormContent";

type TChangePasswordFormFactoryProps = IChangePasswordFormContentProps & IWithClassName & Pick<TFormProps, "fallbackContent">

const ChangePasswordFormFactory = memo<TChangePasswordFormFactoryProps>(({ fallbackContent, className, ...contentProps }) => (
  <div className={className} {...qaAttr(PlayerUIQaAttributes.SecurityPage.FormContainer)}>
    <FormWithWrapper
      formName={CHANGE_PASSWORD_FORM_NAME}
      content={withProps(ChangePasswordFormContent)(contentProps)}
      fallbackContent={fallbackContent}
    />
  </div>
));
ChangePasswordFormFactory.displayName = "ChangePasswordFormFactory";

export { ChangePasswordFormFactory };
