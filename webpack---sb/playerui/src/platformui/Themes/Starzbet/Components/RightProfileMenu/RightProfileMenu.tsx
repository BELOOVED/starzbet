// @ts-nocheck
import clsx from "clsx";
import { createElement, memo, useCallback, useEffect } from "react";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { noopStopPropagation, type TVoidFn, withProps, withStopPropagation } from "@sb/utils";
import { platformui_starzbet_profileMenu_button_cashback } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./RightProfileMenu.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { CloseIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon";
import { When } from "../../../../../common/Components/When";
import { ProfileInfo } from "../../Desktop/Components/ProfileInfo/ProfileInfo";
import { NavBar } from "../NavBar/NavBar";
import { MyAccountMenu } from "../MyAccountMenu/MyAccountMenu";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { NotVerified } from "../NotVerified/NotVerified";
import { CashbackButton as CashbackButtonBase } from "../Bonuses/CashbackButton/CashbackButton";
import { Language } from "../Language/Language";

const CashbackButton = memo(() => {
  const [t] = useTranslation();

  return (
    <CashbackButtonBase className={classes.cashbackButton} notVipClubBonus>
      {t(platformui_starzbet_profileMenu_button_cashback)}
    </CashbackButtonBase>
  );
});
CashbackButton.displayName = "CashbackButton";

interface ISideMenuProps {
  onClick: TVoidFn;
  active?: boolean;
}

const MobileMenuHeader = memo<ISideMenuProps>(({ onClick }) => (
  <div className={classes.mobileHeader}>
    <div className={classes.logo} />

    <div onClick={onClick} {...qaAttr(PlayerUIQaAttributes.SideMenu.CloseButton)}>
      <CloseIcon size={"xs"} />
    </div>
  </div>
));
MobileMenuHeader.displayName = "MobileMenuHeader";

const RightProfileMenu = memo<ISideMenuProps>(
  (
    { onClick, active },
  ) => {
    const className = IS_MOBILE_CLIENT_SIDE
      ? clsx(classes.sideMenuWrapper, classes.sideMenuWrapperMobile)
      : clsx(classes.sideMenuWrapper, !active && classes.notVisible);

    return (
      <div className={className} {...qaAttr(PlayerUIQaAttributes.SideMenu.Container)} onClick={noopStopPropagation}>
        <When condition={IS_MOBILE_CLIENT_SIDE}>
          <MobileMenuHeader onClick={onClick} />
        </When>

        <ProfileInfo
          closeHandler={onClick}
          cashbackButton={CashbackButton}
          mainBalanceValueQaAttribute={PlayerUIQaAttributes.SideMenu.MainBalanceValue}
          usernameQaAttribute={PlayerUIQaAttributes.SideMenu.Username}
          showHideBalanceButtonQaAttribute={PlayerUIQaAttributes.SideMenu.ShowHideBalanceButton}
          updateBalanceButtonQaAttribute={PlayerUIQaAttributes.SideMenu.UpdateBalanceButton}
          profileSectionQaAttribute={PlayerUIQaAttributes.SideMenu.ProfileContainer}
          depositButtonQaAttribute={PlayerUIQaAttributes.SideMenu.DepositButton}
          withdrawalButtonQaAttribute={PlayerUIQaAttributes.SideMenu.WithdrawButton}
        />

        <div className={classes.myAccount}>
          <NotVerified closeHandler={onClick} />

          <MyAccountMenu onClick={onClick} />

          <LogoutButton
            className={classes.logout}
            icon
            qaAttribute={PlayerUIQaAttributes.SideMenu.LogoutButton}
          />
        </div>

        <div className={classes.language}>
          <Language direction={"top"} dropdownClassName={classes.dropdown} selectClassName={classes.select} />
        </div>
      </div>
    );
  },
);
RightProfileMenu.displayName = "RightProfileMenu";

enum ERightMenu {
  navbar,
  profileMenu
}

const menus = {
  [ERightMenu.navbar]: NavBar,
  [ERightMenu.profileMenu]: RightProfileMenu,
};

interface IMobileRightMenuProps extends ISideMenuProps {
  type: ERightMenu;
}

const MobileRightMenu = memo<IMobileRightMenuProps>(({ onClick, active, type }) => {
  useEffect(
    () => {
      if (active) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    },
    [active],
  );

  const onOverlayClick = useCallback(
    () => {
      if (active) {
        onClick();
      }
    },
    [active],
  );

  return (
    <div className={clsx(classes.overlay, active && classes.overlayActive)} onClick={onOverlayClick}>
      {createElement(withProps(menus[type])({ onClick: withStopPropagation(onClick) }))}
    </div>
  );
});
MobileRightMenu.displayName = "MobileRightMenu";

export { RightProfileMenu, MobileRightMenu, ERightMenu };
