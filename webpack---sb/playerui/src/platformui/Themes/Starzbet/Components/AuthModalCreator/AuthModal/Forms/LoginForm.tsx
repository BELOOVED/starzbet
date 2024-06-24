import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { useTranslation } from "@sb/translator";
import { noopStopPropagation, type TVoidFn, useAction, withProps } from "@sb/utils";
import {
  platformui_starzbet_button_joinNow,
  platformui_starzbet_button_login,
  platformui_starzbet_link_forgotPassword,
  platformui_starzbet_placeholder_password,
  platformui_starzbet_placeholder_username,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { FormWithWrapper } from "@sb/form-new";
import { platformui_error_failed } from "@sb/translates/platformui/CommonTKeys";
import classes from "../AuthModal.module.css";
import { Button } from "../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { LOGIN_FORM_NAME, LOGIN_FORM_PATH } from "../../../../../../Store/Auth/Forms/Login/Model";
import { useLoginNavigation } from "../../../../../../Store/Auth/Forms/Login/Hooks/UseLoginNavigation";
import { useFormSubmitResult } from "../../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { loginErrorExtractor } from "../../../../../../Store/Auth/Forms/Login/LoginErrorExtractor";
import { useTooManyAttemptsLock } from "../../../../../../Store/Auth/Forms/Login/Hooks/UseTooManyAttemptsLock";
import { authInfoModalOpenSelector } from "../../../../../../Store/Auth/AuthSelectors";
import { authInfoModalCloseAction } from "../../../../../../Store/Auth/AuthActions";
import { getFormErrorTKey } from "../../../../../../Store/Form/Utils/GetFormErrorTKey";
import { QuestionIcon } from "../../../Icons/QuestionIcon";
import { RegisterIcon } from "../../../Icons/RegisterIcon";
import { LoginArrow } from "../../../Icons/LoginArrow";
import { ThemedModalErrorMessage } from "../../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { ProfileIcon } from "../../../Icons/ProfileIcon/ProfileIcon";
import { PasswordIcon } from "../../../Icons/PasswordIcon/PasswordIcon";
import { BaseAuthInput, PasswordAuthInput } from "../AuthInputs";

const LoginIcon = withProps(ProfileIcon)({ color: "darkText" });

const UsernameInput = withProps(BaseAuthInput)({
  fieldPath: LOGIN_FORM_PATH.username,
  tKey: platformui_starzbet_placeholder_username,
  prefix: LoginIcon,
  qaAttribute: PlayerUIQaAttributes.SignInPage.UsernameInput,
});

const PasswordInput = withProps(PasswordAuthInput)({
  fieldPath: LOGIN_FORM_PATH.password,
  tKey: platformui_starzbet_placeholder_password,
  prefix: PasswordIcon,
  qaAttribute: PlayerUIQaAttributes.SignInPage.PasswordInput,
  showButtonQaAttribute: PlayerUIQaAttributes.SignInPage.ShowHidePasswordButton,
});

interface IForgotButtonProps {
  goToRecovery: TVoidFn;
}

const ForgotButton = memo<IForgotButtonProps>(({ goToRecovery }) => {
  const [t] = useTranslation();

  return (
    <button
      className={classes.forgotButton}
      onClick={noopStopPropagation}
    >
      <QuestionIcon />

      <div
        className={classes.forgotLink}
        onClick={goToRecovery}
        {...qaAttr(PlayerUIQaAttributes.AuthPage.ForgotPasswordButton)}
      >
        {t(platformui_starzbet_link_forgotPassword)}
      </div>
    </button>
  );
});
ForgotButton.displayName = "ForgotButton";

const title: readonly [translateKey: string] = [platformui_error_failed];

const LoginFormContent = memo(() => {
  const [t] = useTranslation();

  const { openRegistration, openForgot } = useLoginNavigation();

  const { loading, submitErrors } = useFormSubmitResult(loginErrorExtractor);

  const { timeString, disable } = useTooManyAttemptsLock();

  const authInfoModal = useSelector(authInfoModalOpenSelector);

  const closeAuthInfoModal = useAction(authInfoModalCloseAction);

  const subtitle = getFormErrorTKey(submitErrors?.error, submitErrors?.option);

  const RegisterButton = (
    <div
      onClick={openRegistration}
      className={clsx(classes.button, classes.registerButton)}
      {...qaAttr(PlayerUIQaAttributes.AuthPage.SignUpButton)}
    >
      <div>
        <Ellipsis>
          {t(platformui_starzbet_button_joinNow)}
        </Ellipsis>
      </div>

      <RegisterIcon />
    </div>
  );

  return (
    <div className={classes.loginForm} {...qaAttr(PlayerUIQaAttributes.AuthPage.Form)}>
      <div>
        <UsernameInput />

        <PasswordInput />

        <ForgotButton goToRecovery={openForgot} />
      </div>

      {authInfoModal && submitErrors ? <ThemedModalErrorMessage subtitle={subtitle} title={title} hideModal={closeAuthInfoModal} /> : null}

      <div className={classes.buttons}>
        {RegisterButton}

        <Button
          className={classes.button}
          contentClassName={classes.mainButtonContent}
          qaAttribute={PlayerUIQaAttributes.AuthPage.SignInButton}
          colorScheme={"blue-gradient"}
          loading={loading}
          disabled={disable || loading}
        >
          <Ellipsis>
            {disable ? timeString : t(platformui_starzbet_button_login)}
          </Ellipsis>

          <LoginArrow />
        </Button>
      </div>
    </div>
  );
});
LoginFormContent.displayName = "LoginFormContent";

const LoginForm = withProps(FormWithWrapper)({ formName: LOGIN_FORM_NAME, content: LoginFormContent });

export { LoginForm };
