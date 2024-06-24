import { memo } from "react";
import { useSelector } from "react-redux";
import { EAlpha3Code, useAction, withProps } from "@sb/utils";
import {
  platformui_starzbet_placeholder_dateOfBirth,
  platformui_starzbet_placeholder_email,
  platformui_starzbet_placeholder_firstName,
  platformui_starzbet_placeholder_mobile,
  platformui_starzbet_placeholder_select_country,
  platformui_starzbet_placeholder_username,
  platformui_starzbet_register_dateMonthYear,
  platformui_starzbet_register_lastName,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { platformui_error_failed } from "@sb/translates/platformui/CommonTKeys";
import { CloudflareTurnstile } from "@sb/captcha";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { FormWithWrapper } from "@sb/form-new";
import classes from "../Register.module.css";
import { PhoneNumberField } from "../../../../../../../common/Themes/Starzbet/Components/Field/Fields/PhoneNumberField";
import { BonusFieldCreator, CheckboxFieldCreator } from "../../../../../../../common/Components/Field/CheckboxFieldCreator";
import { Field } from "../../../../../../../common/Themes/Starzbet/Components/Field/Field";
import { captchaVisible } from "../../../../../../../common/Constants/CaptchaVisible";
import { type TIconProps } from "../../../../../../../common/Components/Icon/Icon";
import { SelectField } from "../../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { IS_STARZBET_KG } from "../../../../../../../ServerEnvironment";
import { REGISTRATION_FORM_PATH } from "../../../../../../Store/Auth/Forms/Registration/Fields";
import { transformDateOfBirthNew } from "../../../../../../Utils/TransformInputs";
import { getCountriesList } from "../../../../../../Store/Auth/Forms/Registration/GetCountriesList";
import { CountryOption } from "../../../../../../Components/CountryOption/CountryOption";
import { useFormSubmitResult } from "../../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { authErrorExtractor } from "../../../../../../Store/Auth/Forms/AuthErrorExtractor";
import { authInfoModalOpenSelector } from "../../../../../../Store/Auth/AuthSelectors";
import { authInfoModalCloseAction } from "../../../../../../Store/Auth/AuthActions";
import { REGISTRATION_FORM_NAME } from "../../../../../../Store/Auth/Forms/Registration/Model";
import { getFormErrorTKey } from "../../../../../../Store/Form/Utils/GetFormErrorTKey";
import { BaseAuthInput, PasswordAuthInput } from "../../../../Components/AuthModalCreator/AuthModal/AuthInputs";
import { ThemedModalErrorMessage } from "../../../../Components/ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { ProfileIcon } from "../../../../Components/Icons/ProfileIcon/ProfileIcon";
import { PasswordIcon } from "../../../../Components/Icons/PasswordIcon/PasswordIcon";
import { MessageIcon } from "../../../../Components/Icons/MessageIcon/MessageIcon";
import { RegistrationConsent } from "../RegistrationConsent/RegistrationConsent";
import { WelcomeBonus } from "../WelcomeBonus/WelcomeBonus";
import { EmailHint } from "../EmailHint/EmailHint";
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
  showButtonQaAttribute: PlayerUIQaAttributes.SignUpPage.ShowHidePasswordButton,
  fieldQaAttribute: PlayerUIQaAttributes.SignUpPage.PasswordContainer,
});

const Email = withProps(BaseAuthInput)({
  fieldPath: REGISTRATION_FORM_PATH.email,
  tKey: platformui_starzbet_placeholder_email,
  autoComplete: "off",
  prefix: EmailIcon,
  postfix: EmailHint,
  qaAttribute: PlayerUIQaAttributes.SignUpPage.EmailInput,
  validationQaAttribute: PlayerUIQaAttributes.SignUpPage.EmailInputValidation,
});

const FirstName = withProps(BaseAuthInput)({
  fieldPath: REGISTRATION_FORM_PATH.name,
  tKey: platformui_starzbet_placeholder_firstName,
  autoComplete: "off",
  prefix: UserIcon,
  qaAttribute: PlayerUIQaAttributes.SignUpPage.FirstNameInput,
  validationQaAttribute: PlayerUIQaAttributes.SignUpPage.FirstNameInputValidation,
});

const LastName = withProps(BaseAuthInput)({
  fieldPath: REGISTRATION_FORM_PATH.surname,
  tKey: platformui_starzbet_register_lastName,
  autoComplete: "off",
  prefix: UserIcon,
  qaAttribute: PlayerUIQaAttributes.SignUpPage.LastNameInput,
  validationQaAttribute: PlayerUIQaAttributes.SignUpPage.LastNameInputValidation,
});

const DateOfBirth = withProps(BaseAuthInput)({
  fieldPath: REGISTRATION_FORM_PATH.dateOfBirth,
  placeholder: platformui_starzbet_register_dateMonthYear,
  tKey: platformui_starzbet_placeholder_dateOfBirth,
  valueExtractor: transformDateOfBirthNew,
  autoComplete: "off",
  prefix: UserIcon,
  qaAttribute: PlayerUIQaAttributes.SignUpPage.DateOfBirthInput,
  validationQaAttribute: PlayerUIQaAttributes.SignUpPage.DateOfBirthInputValidation,
});

const PhoneNumber = memo(() => {
  const [t] = useTranslation();

  return (
    <PhoneNumberField
      fieldPath={REGISTRATION_FORM_PATH.mobilePhone}
      placeholder={t.plain(platformui_starzbet_placeholder_mobile)}
      label={t(platformui_starzbet_placeholder_mobile)}
      inputQaAttribute={PlayerUIQaAttributes.SignUpPage.PhoneNumberInput}
      validationQaAttribute={PlayerUIQaAttributes.SignUpPage.PhoneNumberInputValidation}
      qaAttributeSelect={PlayerUIQaAttributes.SignUpPage.CountryCodeSelect}
      qaAttributeOption={PlayerUIQaAttributes.SignUpPage.CountryCodeOption}
    />
  );
});
PhoneNumber.displayName = "PhoneNumber";

const countries = getCountriesList(IS_STARZBET_KG ? EAlpha3Code.KGZ : EAlpha3Code.TUR);

const Country = memo(() => {
  const [t] = useTranslation();

  return (
    <SelectField
      fieldPath={REGISTRATION_FORM_PATH.country}
      options={countries}
      optionComponent={CountryOption}
      label={t(platformui_starzbet_placeholder_select_country)}
      placeholder={t.plain(platformui_starzbet_placeholder_select_country)}
      qaAttributeSelect={PlayerUIQaAttributes.SignUpPage.CountrySelect}
      qaAttributeOption={PlayerUIQaAttributes.SignUpPage.CountryOption}
    />
  );
});
Country.displayName = "Country";

const Checkbox = withProps(CheckboxFieldCreator)({
  ThemedField: Field,
  ThemedInput: RegistrationConsent,
  fieldPath: REGISTRATION_FORM_PATH.registrationConsent,
});

const Bonus = withProps(BonusFieldCreator)({
  ThemedField: Field,
  ThemedInput: WelcomeBonus,
  fieldPath: REGISTRATION_FORM_PATH.promoRegistration,
  hideError: true,
});

const title: readonly [translateKey: string] = [platformui_error_failed];

const LeftColumn = memo(() => (
  <div className={classes.column}>
    <Username />

    <FirstName />

    <LastName />

    <Email />
  </div>
));
LeftColumn.displayName = "LeftColumn";

const RightColumn = memo(() => (
  <div className={classes.column}>
    <PhoneNumber />

    <Password />

    <Country />

    <DateOfBirth />
  </div>
));
RightColumn.displayName = "RightColumn";

const CheckboxGroup = memo(() => (
  <div className={classes.checkboxGroup}>
    <Bonus />

    <Checkbox />
  </div>
));
CheckboxGroup.displayName = "CheckboxGroup";

const RegistrationFormContent = memo(() => {
  const { loading, submitErrors } = useFormSubmitResult(authErrorExtractor);

  const authInfoModal = useSelector(authInfoModalOpenSelector);

  const closeAuthInfoModal = useAction(authInfoModalCloseAction);

  const subtitle = getFormErrorTKey(submitErrors?.error);

  return (
    <div className={classes.registerForm} {...qaAttr(PlayerUIQaAttributes.AuthPage.Form)}>
      <div className={classes.formContainer}>
        <LeftColumn />

        <RightColumn />

        {
          authInfoModal && submitErrors
            ? <ThemedModalErrorMessage title={title} subtitle={subtitle} hideModal={closeAuthInfoModal} />
            : null
        }
      </div>

      <CheckboxGroup />

      <div className={classes.captcha}>
        <CloudflareTurnstile visible={captchaVisible} className={classes["captcha-inner"]} />
      </div>

      <Buttons loading={loading} />
    </div>
  );
});
RegistrationFormContent.displayName = "RegistrationFormContent";

const RegistrationForm = withProps(FormWithWrapper)({
  formName: REGISTRATION_FORM_NAME,
  content: RegistrationFormContent,
});

export { RegistrationForm };
