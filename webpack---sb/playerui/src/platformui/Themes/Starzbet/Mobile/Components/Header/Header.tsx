import clsx from "clsx";
import { type FC, memo, type ReactNode, useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { platformui_starzbet_button_joinNow, platformui_starzbet_button_login } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { useRouteMatch } from "@sb/react-router-compat";
import { not } from "@sb/utils";
import classes from "./Header.module.css";
import { LinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { WarningIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/WarningIcon/WarningIcon";
import { hasProfileAndWalletSelector } from "../../../../../../common/Store/Player/Selectors/ProfileSelectors";
import { playerDetailsSelectors, playerNotVerifiedSelector } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { LoggedContainer } from "../../../../../../common/Containers/LoggedContainer/LoggedContainer";
import { HiddenBalance } from "../../../../../../common/Components/HiddenBalance/HiddenMainBalance";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { isKycRequiredDocumentsNotEmptySelector } from "../../../../../Store/Kyc/Selectors/PlayerKycSelectors";
import { ticketVisibleNotificationsSelector } from "../../../../../Store/Ticket/Selectors/TicketSelectors";
import { MesjIcon } from "../../../Components/Icons/MesjIcon/MesjIcon";
import { DepositIcon } from "../../../Components/Icons/DepositIcon/DepositIcon";
import { BurgerIcon } from "../../../Components/Icons/BurgerIcon/BurgerIcon";
import { ERightMenu, MobileRightMenu } from "../../../Components/RightProfileMenu/RightProfileMenu";
import { VerifiedIcon } from "../../../Components/Icons/VerifiedIcon/VerifiedIcon";
import { ToggleThemeButton } from "../../../Components/ToggleThemeButton/ToggleThemeButton";
import { HorizontalNavBar } from "../../../Components/HorizontalNavBar/HorizontalNavBar";
import { VipClubWidgetMobile } from "../../../Components/VipClub/VipClubWidget/VipClubWidget";
import { Logo } from "../Logo/Logo";

const withoutHeader = [
  routeMap.betSlip,
  routeMap.gamesSearch,
  routeMap.casinoSearch,
  routeMap.liveCasinoSearch,
];

const NotLoggedButtons = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.buttons}>
      <LinkLocalized className={classes.login} to={routeMap.loginRoute} {...qaAttr(PlayerUIQaAttributes.Header.LoginButton)}>
        <Ellipsis>
          {t(platformui_starzbet_button_login)}
        </Ellipsis>
      </LinkLocalized>

      <LinkLocalized className={classes.joinNow} to={routeMap.registrationRoute} {...qaAttr(PlayerUIQaAttributes.Header.JoinNowButton)}>
        <Ellipsis>
          {t(platformui_starzbet_button_joinNow)}
        </Ellipsis>
      </LinkLocalized>
    </div>
  );
});
NotLoggedButtons.displayName = "NotLoggedButtons";

const Noop = memo(() => null);
Noop.displayName = "Noop";

interface IHeaderSwitch {
  children: ReactNode;
}

const HeaderSwitch: FC<IHeaderSwitch> = ({ children }) => (
  <Switch>
    <Route path={withoutHeader} component={Noop} />

    <Route>
      {children}
    </Route>
  </Switch>
);
HeaderSwitch.displayName = "HeaderSwitch";

const BurgerLinks = memo(() => {
  const [expanded, toggleExpanded] = useReducer(not<boolean>, false);

  return (
    <>
      <button className={classes.burger} onClick={toggleExpanded}>
        <BurgerIcon size={"s"} />
      </button>

      <MobileRightMenu onClick={toggleExpanded} active={expanded} type={ERightMenu.navbar} />
    </>
  );
});
BurgerLinks.displayName = "BurgerLinks";

const MyAccountButton = memo(() => {
  const username = useSelector(playerDetailsSelectors.login);
  const notVerified = useSelector(playerNotVerifiedSelector);
  const isKycRequiredDocumentsNotVoid = useSelector(isKycRequiredDocumentsNotEmptySelector);
  const notificationVisibility = useSelector(ticketVisibleNotificationsSelector);

  const [show, setShow] = useReducer(not<boolean>, false);

  return (
    <div>
      <div
        className={classes.myAccount}
        onClick={setShow}
        {...qaAttr(PlayerUIQaAttributes.Header.AccountButton)}
      >
        <div className={classes.avatar} />

        {notificationVisibility ? <MesjIcon className={classes.msgIcon} color={"active"} size={"s"} /> : null}

        <div className={classes.usernameContainer}>
          <div className={classes.username} {...qaAttr(PlayerUIQaAttributes.Header.PlayerUsername)}>
            <Ellipsis>
              {username}
            </Ellipsis>

            <div className={classes.verifiedIcon}>
              {
                notVerified || isKycRequiredDocumentsNotVoid
                  ? <WarningIcon width={12} height={12} color={"warning"} />
                  : <VerifiedIcon width={12} height={12} color={"blue"} />
              }
            </div>
          </div>

          <HiddenBalance className={classes.amount} qaAttribute={PlayerUIQaAttributes.Header.MainBalance} />
        </div>
      </div>

      <MobileRightMenu onClick={setShow} type={ERightMenu.profileMenu} active={show} />
    </div>
  );
});
MyAccountButton.displayName = "MyAccountButton";

const DepositBtn = memo(() => {
  const notVerified = useSelector(playerNotVerifiedSelector);

  if (notVerified) {
    return (
      <div className={clsx(classes.iconBtn, classes.notVerified)}>
        <DepositIcon size={"s"} color={"white"} />
      </div>
    );
  }

  return (
    <LinkLocalized to={routeMap.depositRoute} className={classes.iconBtn}>
      <DepositIcon size={"s"} color={"white"} />
    </LinkLocalized>
  );
});
DepositBtn.displayName = "DepositBtn";

const Logged = memo(() => {
  const hasProfile = useSelector(hasProfileAndWalletSelector);

  return (
    hasProfile
      ? (
        <>
          <MyAccountButton />

          <DepositBtn />

          <VipClubWidgetMobile />
        </>
      )
      : null
  );
});
Logged.displayName = "Logged";

const WITHOUT_NAV_BAR_ROUTES = [
  routeMap.root,
  routeMap.loginRoute,
  routeMap.registrationRoute,
  routeMap.forgotPasswordRoute,
  routeMap.updatePasswordByEmailRoute,
];

const Header = memo(() => {
  const withoutNavBar = useRouteMatch({ path: WITHOUT_NAV_BAR_ROUTES, exact: true });

  return (
    <HeaderSwitch>
      <div>
        <header className={clsx(classes.header, !withoutNavBar && classes.headerLanding)}>
          <div className={classes.content}>
            <div className={classes.flex}>
              <Logo />
            </div>

            <div className={classes.headerControls}>
              <LoggedContainer
                logged={<Logged />}
                notLogged={<NotLoggedButtons />}
              />

              <ToggleThemeButton />

              <BurgerLinks />
            </div>
          </div>

          {withoutNavBar ? null : <HorizontalNavBar />}
        </header>
      </div>
    </HeaderSwitch>
  );
});
Header.displayName = "Header";

export { Header, WITHOUT_NAV_BAR_ROUTES };
