import clsx from "clsx";
import { createElement, type FC, memo, type PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_2fa_login_enterCode,
  platformui_starzbet_forgotPassword_headline_weWillSendInstruction,
  platformui_starzbet_forgotUsername_headline_forgotYourPassword,
  platformui_starzbet_login_bottom_siteLink,
  platformui_starzbet_login_bottom_siteLinkDescription,
  platformui_starzbet_login_bottom_TheSiteIsProtected,
  platformui_starzbet_login_title_enterToYourAccount,
  platformui_starzbet_login_title_loginToYourAccount,
  platformui_starzbet_updatePasswordByEmail_headline_updatePassword,
  platformui_starzbet_updatePasswordByEmail_title_enterStrongPassword,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useActionWithBind, withCondition, withProps } from "@sb/utils";
import classes from "./AuthModal.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { CloseDefaultIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { BaseModalComponent } from "../../../../../../common/Components/BaseModalComponent/BaseModalComponent";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { authDataSelector } from "../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { ETheme } from "../../../../../../common/Store/Theme/ThemeState";
import { themeSelector } from "../../../../../../common/Store/Theme/ThemeSelectors";
import { Space } from "../../../../../../common/Components/Space/Space";
import { useLockBodyScroll } from "../../../../../../common/Hooks/UseLockBodyScroll";
import { IS_STARZBET_KG } from "../../../../../../ServerEnvironment";
import { AntiPhishingCatcher } from "../../../../../../common/Components/Protection/AntiPhisingCatcher";
import { useCloseAuthModal } from "../../../../../Store/Auth/Hooks/UseCloseAuthModal";
import { twoFactorAuthSelectors } from "../../../../../Store/TwoFactorAuth/TwoFactorAuthSelectors";
import { finishTwoFactorAuthStepAction } from "../../../../../Store/TwoFactorAuth/TwoFactorAuthActions";
import { Register } from "../../../Desktop/Pages/Register/Register";
import { RegistrationForm } from "../../../Desktop/Pages/Register/Forms/RegistrationForm";
import { PrivateRegistrationForm } from "../../../Desktop/Pages/Register/Forms/PrivateRegistrationForm";
import { ProfileIconLogin } from "../../Icons/ProfileIcon/ProfileIcon";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalText } from "../../ThemedModal/ThemedModalText/ThemedModalText";
import { TwoFactorAuthConfirmForm } from "../../TwoFactorAuth/TwoFactorAuthPageForms/TwoFactorAuthPageForm";
import { LoginForm } from "./Forms/LoginForm";
import { ForgotPasswordForm } from "./Forms/ForgotPassword";
import { UpdatePasswordByEmailForm } from "./Forms/UpdatePassword";

const SITE_LINK = "https://cutt.ly/starzbet";

interface IModalHeader {
  title1: TTKeys;
  title2: TTKeys;
}

const ModalHeader = memo<IModalHeader>(({
  title1,
  title2,
}) => {
  const [t] = useTranslation();

  const onCancel = useCloseAuthModal();

  return (
    <div className={classes.header}>
      <div className={classes.left}>
        <ProfileIconLogin />

        <div>
          <div className={classes.title1} {...qaAttr(PlayerUIQaAttributes.AuthPage.Title)}>{t(title1)}</div>

          <div className={classes.title2}>{t(title2)}</div>

          <AntiPhishingCatcher />
        </div>
      </div>

      {
        !IS_MOBILE_CLIENT_SIDE
          ? (
            <div
              className={classes.close}
              {...qaAttr(PlayerUIQaAttributes.AuthPage.CloseButton)}
              onClick={onCancel}
            >
              <CloseDefaultIcon size={"xs"} color={"darkText"} />
            </div>
          )
          : null
      }
    </div>
  );
});
ModalHeader.displayName = "ModalHeader";

const SiteLink = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.siteLink}>
      <div>
        <span className={classes.siteLinkTop}>{t(platformui_starzbet_login_bottom_siteLink)}</span>

        &nbsp;

        <a href={SITE_LINK} className={classes.link}>{SITE_LINK}</a>
      </div>

      <div>{t(platformui_starzbet_login_bottom_siteLinkDescription)}</div>
    </div>
  );
});
SiteLink.displayName = "SiteLink";

const Content: FC<IModalHeader & PropsWithChildren> = ({
  title1,
  title2,
  children,
}) => {
  const [t] = useTranslation();

  useEffect(
    () => {
      if (IS_MOBILE_CLIENT_SIDE) {
        window.scrollTo(0, 0);
      }
    },
    [],
  );

  const theme = useSelector(themeSelector);

  const isLight = theme === ETheme.light;

  return (
    <div className={classes.content} {...qaAttr(PlayerUIQaAttributes.AuthPage.Container)}>
      {
        !IS_MOBILE_CLIENT_SIDE
          ? (
            <div className={classes.rect}>
              <div className={clsx(classes.logo, isLight && classes.logoDark)} />
            </div>
          )
          : null
      }

      <div className={classes.form}>
        <ModalHeader title1={title1} title2={title2} />

        {children}

        <SiteLink />

        <div className={classes.bottom}>
          {t(platformui_starzbet_login_bottom_TheSiteIsProtected)}
        </div>
      </div>
    </div>
  );
};
Content.displayName = "Content";

const LoginContent = memo(() => (
  <Content
    title1={platformui_starzbet_login_title_loginToYourAccount}
    title2={platformui_starzbet_login_title_enterToYourAccount}
  >
    <LoginForm />
  </Content>
));
LoginContent.displayName = "LoginContent";

const ForgotPasswordContent = memo(() => (
  <Content
    title1={platformui_starzbet_forgotUsername_headline_forgotYourPassword}
    title2={platformui_starzbet_forgotPassword_headline_weWillSendInstruction}
  >
    <ForgotPasswordForm />
  </Content>
));
ForgotPasswordContent.displayName = "ForgotPasswordContent";

const UpdatePasswordByEmailContent = memo(() => (
  <Content
    title1={platformui_starzbet_updatePasswordByEmail_headline_updatePassword}
    title2={platformui_starzbet_updatePasswordByEmail_title_enterStrongPassword}
  >
    <UpdatePasswordByEmailForm />
  </Content>
));
UpdatePasswordByEmailContent.displayName = "UpdatePasswordByEmailContent";

const TwoFactorAuthModal = withCondition(
  twoFactorAuthSelectors.isTwoFactorAuthStep,
  memo(() => {
    const closeTwoFactorAuth = useActionWithBind(finishTwoFactorAuthStepAction);
    const [t] = useTranslation();

    useLockBodyScroll();

    return (
      <ThemedModal onCancel={closeTwoFactorAuth} className={classes.twoFactorAuthModal}>
        <Space value={16} vertical>
          <ThemedModalText>
            {t(platformui_starzbet_2fa_login_enterCode)}
          </ThemedModalText>

          <TwoFactorAuthConfirmForm />
        </Space>
      </ThemedModal>
    );
  }),
);
TwoFactorAuthModal.displayName = "TwoFactorAuthModal";

const AUTH_MODALS = {
  [EAuthModal.login]: LoginContent,
  [EAuthModal.forgotPassword]: ForgotPasswordContent,
  [EAuthModal.updatePassword]: UpdatePasswordByEmailContent,
  [EAuthModal.registration]: withProps(Register)({ formComponent: RegistrationForm }),
  [EAuthModal.privateRegistration]: withProps(Register)({ formComponent: IS_STARZBET_KG ? RegistrationForm : PrivateRegistrationForm }),
};

const AuthModal = memo(() => {
  const { authType } = useSelector(authDataSelector);

  const closeModal = useCloseAuthModal();

  return (
    <BaseModalComponent onCancel={closeModal}>
      <div className={classes.modal}>
        {createElement(AUTH_MODALS[authType])}
      </div>
    </BaseModalComponent>
  );
});
AuthModal.displayName = "AuthModal";

export {
  AuthModal,
  LoginContent,
  ForgotPasswordContent,
  UpdatePasswordByEmailContent,
  TwoFactorAuthModal,
};
