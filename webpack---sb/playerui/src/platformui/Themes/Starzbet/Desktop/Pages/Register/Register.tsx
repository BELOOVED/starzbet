import clsx from "clsx";
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { type TComponent, type TVoidFn } from "@sb/utils";
import {
  platformui_starzbet_login_bottom_TheSiteIsProtected,
  platformui_starzbet_register_title_createAccountInMinutes,
  platformui_starzbet_register_title_joinUsNow,
  platformui_starzbet_register_title_privateMembership,
  platformui_starzbet_register_title_regularMembership,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { useTranslation } from "@sb/translator";
import classes from "./Register.module.css";
import { CloseDefaultIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { ETheme } from "../../../../../../common/Store/Theme/ThemeState";
import { themeSelector } from "../../../../../../common/Store/Theme/ThemeSelectors";
import { isMobileSelector } from "../../../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { IS_STARZBET_KG } from "../../../../../../ServerEnvironment";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { useCloseAuthModal } from "../../../../../Store/Auth/Hooks/UseCloseAuthModal";
import { useRegistrationType } from "../../../../../Store/Auth/Forms/Registration/Hooks/UseRegistrationType";
import { ProfileIconLogin } from "../../../Components/Icons/ProfileIcon/ProfileIcon";

const ModalHeader = memo(() => {
  const [t] = useTranslation();
  const isMobile = useSelector(isMobileSelector);

  const close = useCloseAuthModal();

  return (
    <div className={classes.header}>
      <div className={classes.left}>
        <ProfileIconLogin />

        <div>
          <div
            className={classes.title1} {...qaAttr(PlayerUIQaAttributes.AuthPage.Title)}
          >
            {t(platformui_starzbet_register_title_joinUsNow)}
          </div>

          <div className={classes.title2}>{t(platformui_starzbet_register_title_createAccountInMinutes)}</div>
        </div>
      </div>

      {
        !isMobile
          ? (
            <div className={classes.close} onClick={close} {...qaAttr(PlayerUIQaAttributes.AuthPage.CloseButton)}>
              <CloseDefaultIcon size={"xs"} color={"darkText"} />
            </div>
          )
          : null
      }
    </div>
  );
});
ModalHeader.displayName = "ModalHeader";

interface IControlsProps {
  isRegister: boolean;
  toggle: TVoidFn;
}

const Controls = memo<IControlsProps>(({ toggle, isRegister }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.controls}>
      <div
        onClick={toggle}
        className={clsx(classes.control, isRegister && classes.active)}
        {...qaAttr(PlayerUIQaAttributes.SignUpPage.RegularMembershipButton)}
      >
        <Ellipsis>
          {t(platformui_starzbet_register_title_regularMembership)}
        </Ellipsis>
      </div>

      <div
        onClick={toggle}
        className={clsx(classes.control, !isRegister && classes.active)}
        {...qaAttr(PlayerUIQaAttributes.SignUpPage.PrivateMembershipButton)}
      >
        <Ellipsis>
          {t(platformui_starzbet_register_title_privateMembership)}
        </Ellipsis>
      </div>
    </div>
  );
});
Controls.displayName = "Controls";

interface IRegisterProps {
  formComponent: TComponent;
}

const Register = memo<IRegisterProps>(({ formComponent }) => {
  const [t] = useTranslation();

  const [isRegister, toggle] = useRegistrationType();

  const theme = useSelector(themeSelector);
  const isMobile = useSelector(isMobileSelector);

  const isLight = theme === ETheme.light;
  const contentClassName = clsx(classes.content, IS_STARZBET_KG && classes.kgContent);

  return (
    <div className={contentClassName} {...qaAttr(PlayerUIQaAttributes.AuthPage.Container)}>
      {
        !isMobile
          ? (
            <div className={classes.rect}>
              <div className={clsx(classes.logo, isLight && classes.logoDark)} />
            </div>
          )
          : null
      }

      <div className={classes.form}>
        <ModalHeader />

        {IS_STARZBET_KG ? null : <Controls isRegister={isRegister} toggle={toggle} />}

        {createElement(formComponent)}

        {
          isMobile
            ? (
              <div className={classes.bottom}>
                {t(platformui_starzbet_login_bottom_TheSiteIsProtected)}
              </div>
            )
            : null
        }
      </div>
    </div>
  );
});
Register.displayName = "Register";

export { Register };
