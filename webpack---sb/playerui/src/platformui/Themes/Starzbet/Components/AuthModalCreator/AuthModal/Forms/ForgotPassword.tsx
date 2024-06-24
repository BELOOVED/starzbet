import clsx from "clsx";
import { memo } from "react";
import { type TVoidFn, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import {
  platformui_starzbet_button_joinNow,
  platformui_starzbet_button_login,
  platformui_starzbet_forgotPassword_succeed_text,
  platformui_starzbet_forgotPassword_succeed_title,
  platformui_starzbet_passRecovery_recoverPassword,
  platformui_starzbet_placeholder_email,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { platformui_error_failed } from "@sb/translates/platformui/CommonTKeys";
import { FormWithWrapper } from "@sb/form-new";
import classes from "../AuthModal.module.css";
import { Button } from "../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { FORGOT_PASSWORD_FORM_NAME, FORGOT_PASSWORD_FORM_PATH } from "../../../../../../Store/Auth/Forms/ForgetPassword/Model";
import { useFormSubmitResult } from "../../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { authErrorExtractor } from "../../../../../../Store/Auth/Forms/AuthErrorExtractor";
import { useForgotPasswordNavigation } from "../../../../../../Store/Auth/Forms/ForgetPassword/UseForgotPasswordNavigation";
import { ThemedModalFormSubmitResult } from "../../../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";
import { LoginArrow } from "../../../Icons/LoginArrow";
import { MessageIcon } from "../../../Icons/MessageIcon/MessageIcon";
import { BaseAuthInput } from "../AuthInputs";

const EmailIcon = withProps(MessageIcon)({ color: "darkText" });

const EmailInput = withProps(BaseAuthInput)({
  fieldPath: FORGOT_PASSWORD_FORM_PATH.email,
  tKey: platformui_starzbet_placeholder_email,
  prefix: EmailIcon,
  qaAttribute: PlayerUIQaAttributes.ForgotPasswordPage.EmailInput,
  validationQaAttribute: PlayerUIQaAttributes.ForgotPasswordPage.EmailInputValidation,
});

interface ILinkButton {
  title: TTKeys;
  onClick: TVoidFn;
  qaAttribute?: string;
}

const LinkButton = memo<ILinkButton>(({
  title,
  onClick,
  qaAttribute,
}) => {
  const [t] = useTranslation();

  return (
    <div
      onClick={onClick}
      className={classes.modalSwitchButton}
      {...qaAttr(qaAttribute)}
    >
      <div>
        <Ellipsis>
          {t(title)}
        </Ellipsis>
      </div>
    </div>
  );
});
LinkButton.displayName = "LinkButton";

interface ILinksProps {
  goToRegister: TVoidFn;
  goToLogin: TVoidFn;
}

const Links = memo<ILinksProps>(({ goToLogin, goToRegister }) => (
  <div className={classes.links}>
    <LinkButton
      title={platformui_starzbet_button_login}
      onClick={goToLogin}
      qaAttribute={PlayerUIQaAttributes.AuthPage.SignInButton}
    />

    <LinkButton
      title={platformui_starzbet_button_joinNow}
      onClick={goToRegister}
      qaAttribute={PlayerUIQaAttributes.AuthPage.SignUpButton}
    />
  </div>
));
Links.displayName = "Links";

const ForgotPasswordFormContent = memo(() => {
  const [t] = useTranslation();

  const { loading, submitErrors } = useFormSubmitResult(authErrorExtractor);

  const { close, openLogin, openRegistration } = useForgotPasswordNavigation();

  return (
    <div className={classes.loginForm} {...qaAttr(PlayerUIQaAttributes.AuthPage.Form)}>
      <EmailInput />

      <ThemedModalFormSubmitResult
        errorTitle={platformui_error_failed}
        errorSubtitle={submitErrors ? submitErrors.error : ""}
        successTitle={platformui_starzbet_forgotPassword_succeed_title}
        successSubtitle={platformui_starzbet_forgotPassword_succeed_text}
        onSuccess={close}
      />

      <Button
        className={clsx(classes.button, classes.recoverButton)}
        contentClassName={classes.mainButtonContent}
        qaAttribute={PlayerUIQaAttributes.ForgotPasswordPage.RecoverPasswordButton}
        colorScheme={"blue-gradient"}
        type={"submit"}
        loading={loading}
        wide
      >
        <div>
          {t(platformui_starzbet_passRecovery_recoverPassword)}
        </div>

        <LoginArrow />
      </Button>

      <Links goToRegister={openRegistration} goToLogin={openLogin} />
    </div>
  );
});
ForgotPasswordFormContent.displayName = "ForgotPasswordFormContent";

const ForgotPasswordForm = withProps(FormWithWrapper)({ formName: FORGOT_PASSWORD_FORM_NAME, content: ForgotPasswordFormContent });

export { ForgotPasswordForm };
