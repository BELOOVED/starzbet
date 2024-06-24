import { memo } from "react";
import { useSelector } from "react-redux";
import { useAction, withProps } from "@sb/utils";
import {
  platformui_starzbet_placeholder_email,
  platformui_starzbet_placeholder_username,
  platformui_starzbet_registration_private_header,
  platformui_starzbet_registration_private_text,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { platformui_error_failed } from "@sb/translates/platformui/CommonTKeys";
import { useTranslation } from "@sb/translator";
import { CloudflareTurnstile } from "@sb/captcha";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { FormWithWrapper } from "@sb/form-new";
import classes from "../Register.module.css";
import { CheckboxFieldCreator } from "../../../../../../../common/Components/Field/CheckboxFieldCreator";
import { Field } from "../../../../../../../common/Themes/Starzbet/Components/Field/Field";
import { captchaVisible } from "../../../../../../../common/Constants/CaptchaVisible";
import type { TIconProps } from "../../../../../../../common/Components/Icon/Icon";
import { REGISTRATION_FORM_PATH } from "../../../../../../Store/Auth/Forms/Registration/Fields";
import { useFormSubmitResult } from "../../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { authErrorExtractor } from "../../../../../../Store/Auth/Forms/AuthErrorExtractor";
import { authInfoModalOpenSelector } from "../../../../../../Store/Auth/AuthSelectors";
import { authInfoModalCloseAction } from "../../../../../../Store/Auth/AuthActions";
import { PRIVATE_REGISTRATION_FORM_NAME } from "../../../../../../Store/Auth/Forms/Registration/Model";
import { getFormErrorTKey } from "../../../../../../Store/Form/Utils/GetFormErrorTKey";
import { BaseAuthInput, PasswordAuthInput } from "../../../../Components/AuthModalCreator/AuthModal/AuthInputs";
import { ThemedModalErrorMessage } from "../../../../Components/ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { ProfileIcon } from "../../../../Components/Icons/ProfileIcon/ProfileIcon";
import { PasswordIcon } from "../../../../Components/Icons/PasswordIcon/PasswordIcon";
import { MessageIcon } from "../../../../Components/Icons/MessageIcon/MessageIcon";
import { RegistrationConsent } from "../RegistrationConsent/RegistrationConsent";
import { Buttons } from "./Buttons";

const iconProps: TIconProps = { size: "s", color: "darkText" };

const UserIcon = withProps(ProfileIcon)(iconProps);
const SecurityIcon = withProps(PasswordIcon)(iconProps);
const EmailIcon = withProps(MessageIcon)(iconProps);

const Username = withProps(BaseAuthInput)({
  fieldPath: REGISTRATION_FORM_PATH.username,
  tKey: platformui_starzbet_placeholder_username,
  prefix: UserIcon,
  qaAttribute: PlayerUIQaAttributes.SignUpPage.UsernameInput,
  validationQaAttribute: PlayerUIQaAttributes.SignUpPage.UsernameInputValidation,
});

const Password = withProps(PasswordAuthInput)({
  fieldPath: REGISTRATION_FORM_PATH.password,
  autoComplete: "new-password",
  prefix: SecurityIcon,
  qaAttribute: PlayerUIQaAttributes.SignUpPage.PasswordInput,
  validationQaAttribute: PlayerUIQaAttributes.SignUpPage.PasswordInputValidation,
  fieldQaAttribute: PlayerUIQaAttributes.SignUpPage.PasswordContainer,
});

const Email = withProps(BaseAuthInput)({
  fieldPath: REGISTRATION_FORM_PATH.email,
  tKey: platformui_starzbet_placeholder_email,
  autoComplete: "off",
  prefix: EmailIcon,
  qaAttribute: PlayerUIQaAttributes.SignUpPage.EmailInput,
  validationQaAttribute: PlayerUIQaAttributes.SignUpPage.EmailInputValidation,
});

const Checkbox = withProps(CheckboxFieldCreator)({
  ThemedField: Field,
  ThemedInput: RegistrationConsent,
  fieldPath: REGISTRATION_FORM_PATH.registrationConsent,
});

const title: readonly [translateKey: string] = [platformui_error_failed];

const TextBlock = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.textBlock}>
      <div className={classes.textTitle}>
        {t(platformui_starzbet_registration_private_header)}
      </div>

      <div className={classes.text}>
        {t(platformui_starzbet_registration_private_text)}
      </div>
    </div>
  );
});
TextBlock.displayName = "TextBlock";

const PrivateFields = memo(() => (
  <>
    <div className={classes.column}>
      <Username />

      <Password />
    </div>

    <div className={classes.column}>
      <Email />
    </div>
  </>
));
PrivateFields.displayName = "PrivateFields";

const PrivateRegisterFormContent = memo(() => {
  const { loading, submitErrors } = useFormSubmitResult(authErrorExtractor);

  const authInfoModal = useSelector(authInfoModalOpenSelector);

  const closeAuthInfoModal = useAction(authInfoModalCloseAction);

  const subtitle = getFormErrorTKey(submitErrors?.error);

  return (
    <div className={classes.registerForm} {...qaAttr(PlayerUIQaAttributes.AuthPage.Form)}>
      <div className={classes.formContainer}>
        <PrivateFields />

        {
          authInfoModal && submitErrors
            ? <ThemedModalErrorMessage subtitle={subtitle} hideModal={closeAuthInfoModal} title={title} />
            : null
        }
      </div>

      <TextBlock />

      <div className={classes.checkboxGroup}>
        <Checkbox />
      </div>

      <div className={classes.captcha}>
        <CloudflareTurnstile visible={captchaVisible} className={classes["captcha-inner"]} />
      </div>

      <Buttons loading={loading} />
    </div>
  );
});
PrivateRegisterFormContent.displayName = "PrivateRegisterFormContent";

const PrivateRegistrationForm = withProps(FormWithWrapper)({
  formName: PRIVATE_REGISTRATION_FORM_NAME,
  content: PrivateRegisterFormContent,
});

export { PrivateRegistrationForm };
