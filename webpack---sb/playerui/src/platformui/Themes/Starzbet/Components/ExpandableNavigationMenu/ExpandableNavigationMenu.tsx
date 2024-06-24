// @ts-nocheck
/* eslint-disable rulesdir/jsx-element-max-length */
import clsx from "clsx";
import { createElement, memo, useReducer } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_accountPage_name_myAccount,
  platformui_starzbet_banking_page_deposit,
  platformui_starzbet_banking_page_withdraw,
  platformui_starzbet_myAccount_devices_devices,
  platformui_starzbet_navLink_2fa,
  platformui_starzbet_navLink_accountClosure,
  platformui_starzbet_navLink_changePassword,
  platformui_starzbet_navLink_depositLimit,
  platformui_starzbet_navLink_details,
  platformui_starzbet_navLink_history,
  platformui_starzbet_navLink_liveChat,
  platformui_starzbet_navLink_messages,
  platformui_starzbet_navLink_offers,
  platformui_starzbet_navLink_playLimit,
  platformui_starzbet_navLink_realityCheck,
  platformui_starzbet_navLink_requestACallBack,
  platformui_starzbet_navLink_security,
  platformui_starzbet_navLink_selfExclusion,
  platformui_starzbet_navLink_verification,
  platformui_starzbet_navMenu_gaming,
  platformui_starzbet_navMenu_help,
  platformui_starzbet_sideMenu_banking,
  platformui_starzbet_sideMenu_contactUs,
  platformui_starzbet_timeOut_coolOff,
  platformui_starzbet_title_paymentAccounts,
  platformui_starzbet_userMessages_title_notifications,
  platformui_starzbet_vipClub_page_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotNil, not, useParamSelector, withParams } from "@sb/utils";
import { type IWithQaAttribute, PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { always } from "@sb/utils/Always";
import classes from "./ExpandableNavigationMenu.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { When } from "../../../../../common/Components/When";
import { CollapseIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";
import { WarningIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/WarningIcon/WarningIcon";
import { notPrivateGroupIdSelector } from "../../../../../common/Store/Player/Selectors/PlayerGroupIdSelectors";
import { playerDetailsSelectors, playerNotVerifiedSelector } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { openChatComm100 } from "../../../../../common/Integrations/Comm100API/OpenChatComm100";
import { NavLinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { HiddenBalance } from "../../../../../common/Components/HiddenBalance/HiddenMainBalance";
import { LockIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/LockIcon/LockIcon";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import {
  isKycDocumentsRequiredOrAlreadySentSelector,
  isKycRequiredDocumentsNotEmptySelector,
} from "../../../../Store/Kyc/Selectors/PlayerKycSelectors";
import { Development } from "../../../../Components/Development/Development";
import { HelpCenterRoutesSelector, HelpLinksSelector } from "../../../../Store/CMS/Selectors/HelpLinksSelectors";
import { STARZBET_VERIFY_DEVICE_ENABLE } from "../../../../Store/VerifyDevice/EnableFlags";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { type IMenuElementLink, MenuElementList } from "../MyAccountMenu/MyAccountMenu";
import { ResponsibleGamingIcon } from "../Icons/ResponsibleGamingIcon/ResponsibleGamingIcon";
import { UserIcon } from "../Icons/UserIcon/UserIcon";
import { HeadphoneIcon } from "../Icons/HeadphoneIcon/HeadphoneIcon";
import { Gift2Icon } from "../Icons/Gift2Icon/GiftIcon";
import { CalendarSecondsIcon } from "../Icons/CalendarMenuIcon/CalendarMenuIcon";
import { VerifiedIcon } from "../Icons/VerifiedIcon/VerifiedIcon";
import { MesjIcon } from "../Icons/MesjIcon/MesjIcon";
import { BankingGradientIcon } from "../Icons/BankingIcon/BankingGradientIcon";
import { NotificationIcon } from "../Icons/NotificationIcon/NotificationIcon";
import { UserMessageUnseenCounter } from "../UserMessage/UserMessageUnseenCounter/UserMessageUnseenCounter";
import { UnreadMessagesCounter } from "../UnreadMessagesCounter/UnreadMessagesCounter";
import { ChatIcon } from "../Icons/ChatIcon/ChatIcon";
import { CrownIconV1 } from "../Icons/CrownIcon/CrownIcon";

const GAMBLING_ROUTES = [
  routeMap.playLimitRoute,
  routeMap.timeOutRoute,
  routeMap.depositLimitRoute,
  routeMap.selfExclusionRoute,
  routeMap.accountClosureRoute,
  routeMap.realityChecksRoute,
];

const MY_ACCOUNT_ROUTES = [
  routeMap.myDetailsRoute,
  routeMap.accountVVerificationRoute,
];

const SECURITY_ROUTES = [
  routeMap.passwordRoute,
  routeMap.twoFactorAuthenticationRoute,
  routeMap.devices,
];

const GAMBLING_LINKS = [
  {
    link: platformui_starzbet_navLink_playLimit,
    to: routeMap.playLimitRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.PlayLimitMenuElement,
  },
  {
    link: platformui_starzbet_navLink_depositLimit,
    to: routeMap.depositLimitRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.DepositLimitMenuElement,
  },
  {
    link: platformui_starzbet_timeOut_coolOff,
    to: routeMap.timeOutRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.TimeOutMenuElement,
  },
  {
    link: platformui_starzbet_navLink_selfExclusion,
    to: routeMap.selfExclusionRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.SelfExclusionMenuElement,
  },
  {
    link: platformui_starzbet_navLink_accountClosure,
    to: routeMap.accountClosureRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.AccountClosureMenuElement,
  },
  {
    link: platformui_starzbet_navLink_realityCheck,
    to: routeMap.realityChecksRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.RealityChecksMenuElement,
  },
];

const BANKING_LINKS = [
  {
    link: platformui_starzbet_banking_page_deposit,
    to: routeMap.depositRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.DepositMenuElement,
  },
  {
    link: platformui_starzbet_banking_page_withdraw,
    to: routeMap.withdrawRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.WithdrawMenuElement,
  },
  {
    link: platformui_starzbet_title_paymentAccounts,
    to: routeMap.bankingPaymentAccountsRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.PaymentAccountsMenuElement,
    capitalize: true,
  },
  {
    link: platformui_starzbet_navLink_history,
    to: routeMap.bankingHistoryRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.BankingHistoryMenuElement,
  },
];

const KycWarningIcon = memo(() => {
  const visible = useSelector(isKycRequiredDocumentsNotEmptySelector);

  if (!visible) {
    return null;
  }

  return (
    <WarningIcon width={22} height={22} color={"warning"} />
  );
});
KycWarningIcon.displayName = "KycWarningIcon";

const MY_ACCOUNT_LINKS = [
  {
    link: platformui_starzbet_navLink_details,
    to: routeMap.myDetailsRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.DetailsMenuElement,
    alwaysShow: true,
    verifyIcon: true,
  },
  {
    link: platformui_starzbet_navLink_verification,
    to: routeMap.accountVVerificationRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.VerificationMenuElement,
    kycIcon: true,
    visibleSelector: withParams(isKycDocumentsRequiredOrAlreadySentSelector, "ExpandableNavigationMenu", "MY_ACCOUNT_LINKS"),
    iconRight: KycWarningIcon,
  },
];

const SECURITY_LINKS = [
  {
    link: platformui_starzbet_navLink_changePassword,
    to: routeMap.passwordRoute,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.SecurityMenuElement,
    alwaysShow: true,
  },
  {
    link: platformui_starzbet_navLink_2fa,
    to: routeMap.twoFactorAuthenticationRoute,
    alwaysShow: true,
  },
  STARZBET_VERIFY_DEVICE_ENABLE
    ? {
      link: platformui_starzbet_myAccount_devices_devices,
      to: routeMap.devices,
      alwaysShow: true,
    }
    : null,
].filter(isNotNil);

const Expandable = memo<IWithQaAttribute>(({
  icon,
  expanded,
  onClick,
  name,
  qaAttribute,
  alwaysShow,
}) => {
  const [t] = useTranslation();

  const notVerified = useSelector(playerNotVerifiedSelector);

  const disabled = notVerified && !alwaysShow;

  const className = clsx(
    classes.expandPreview,
    disabled && classes.notVerified,
  );

  const clickHandler = disabled ? undefined : onClick;

  return (
    <div className={className} onClick={clickHandler} {...qaAttr(qaAttribute)}>
      <div className={classes.expandTitle}>
        {createElement(icon)}

        <Ellipsis className={classes.name}>
          {t(name)}
        </Ellipsis>
      </div>

      <CollapseIcon expanded={expanded} />
    </div>
  );
});
Expandable.displayName = "Expandable";

interface IListItem extends IMenuElementLink, IWithQaAttribute {
  alwaysShow: boolean;
}

const ListItem = memo<IListItem>(({
  to,
  alwaysShow,
  link,
  visibleSelector = always(true),
  capitalize,
  qaAttribute,
}) => {
  const [t] = useTranslation();

  const visible = useSelector(visibleSelector);

  const notVerified = useSelector(playerNotVerifiedSelector);

  const match = useRouteMatch(to);

  if (!visible) {
    return null;
  }

  const className = clsx(classes.expendedItem, match && classes.active, notVerified && !alwaysShow && classes.disabled);

  return (
    <NavLinkLocalized to={to} className={className} {...qaAttr(qaAttribute)}>
      <div className={classes.dot} />

      <div className={clsx(classes.expendedItemText, capitalize && classes.capitalize)}>
        <Ellipsis>{t(link)}</Ellipsis>
      </div>
    </NavLinkLocalized>
  );
});
ListItem.displayName = "ListItem";

interface IExpandableMenuComponentProps {
  route: string;
  name: string;
  icon: string;
  linkList: IMenuElementLink[];
}

const ExpandableMenuComponent = memo<IExpandableMenuComponentProps, IWithQaAttribute>(({
  route,
  name,
  icon,
  linkList,
  qaAttribute,
  alwaysShow,
}) => {
  const matchRoute = useRouteMatch(route);

  const [expanded, toggleExpanded] = useReducer(not<boolean>, isNotNil(matchRoute));

  return (
    <div className={classes.expandContainer}>
      <Expandable
        onClick={toggleExpanded}
        expanded={expanded}
        name={name}
        icon={icon}
        active={isNotNil(matchRoute)}
        qaAttribute={qaAttribute}
        alwaysShow={alwaysShow}
      />

      <When condition={expanded}>
        <div className={classes.expandItems}>
          {linkList.map((link) => <ListItem {...link} key={link.link} qaAttribute={link.qaAttribute} />)}
        </div>
      </When>
    </div>
  );
});
ExpandableMenuComponent.displayName = "ExpandableMenuComponent";

const DEFAULT_LINK = [
  {
    link: platformui_starzbet_userMessages_title_notifications,
    to: routeMap.userMessages,
    icon: NotificationIcon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.NotificationsMenuElement,
    iconRight: UserMessageUnseenCounter,
  },
  {
    iconRight: UnreadMessagesCounter,
    link: platformui_starzbet_navLink_messages,
    to: routeMap.tickets,
    icon: MesjIcon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.MessagesMenuElement,
  },
  {
    link: platformui_starzbet_navLink_offers,
    to: routeMap.bonusesRoute,
    icon: Gift2Icon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.OffersMenuElement,
    bonus: true,
  },
  {
    link: platformui_starzbet_vipClub_page_title,
    to: routeMap.vipClubRoute,
    icon: CrownIconV1,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.VipClubMenuElement,
    alwaysShow: true,
  },
  {
    link: platformui_starzbet_navLink_history,
    to: routeMap.historyRoute,
    icon: CalendarSecondsIcon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.HistoryMenuElement,
  },
  {
    link: platformui_starzbet_navLink_liveChat,
    to: "#",
    onClick: openChatComm100,
    icon: ChatIcon,
  },
];

const filterLinks = (links: typeof DEFAULT_LINK, notPrivate: boolean) => (
  links.filter((it) => it.bonus ? notPrivate : true)
);

const BeforeMenu = memo(() => {
  const username = useSelector(playerDetailsSelectors.login);
  const notVerified = useSelector(playerNotVerifiedSelector);
  const isKycRequiredDocumentsNotVoid = useSelector(isKycRequiredDocumentsNotEmptySelector);

  return (
    <div className={classes.myAccount} {...qaAttr(PlayerUIQaAttributes.MyAccountMenu.ProfileContainer)}>
      <div className={classes.avatar} />

      <div className={classes.usernameContainer}>
        <div className={classes.username}>
          <Ellipsis {...qaAttr(PlayerUIQaAttributes.MyAccountMenu.Username)}>
            {username}
          </Ellipsis>

          <div className={classes["verified-icon"]}>
            {
              notVerified || isKycRequiredDocumentsNotVoid
                ? <WarningIcon width={12} height={12} />
                : <VerifiedIcon width={12} height={12} color={"blue"} />
            }
          </div>
        </div>

        <HiddenBalance className={classes.amount} />
      </div>
    </div>
  );
});
BeforeMenu.displayName = "BeforeMenu";

const ExpandableNavigationMenu = memo(() => {
  const notPrivate = useSelector(notPrivateGroupIdSelector);

  const className = clsx(classes.sidebar, IS_MOBILE_CLIENT_SIDE && classes.mobileSidebar);

  const helpLinks = useParamSelector(
    HelpLinksSelector,
    [
      platformui_starzbet_navLink_requestACallBack,
      platformui_starzbet_sideMenu_contactUs,
    ],
  );

  const helpCenterRoutes = useSelector(HelpCenterRoutesSelector);

  return (
    <div className={className} {...qaAttr(PlayerUIQaAttributes.MyAccountMenu.MenuContainer)}>
      <BeforeMenu />

      <div className={classes.menu} {...qaAttr(PlayerUIQaAttributes.MyAccountMenu.NavigationContainer)}>
        <ExpandableMenuComponent
          linkList={BANKING_LINKS}
          icon={BankingGradientIcon}
          name={platformui_starzbet_sideMenu_banking}
          route={routeMap.bankingRoute}
          qaAttribute={PlayerUIQaAttributes.MyAccountMenu.BankingNode}
        />

        <ExpandableMenuComponent
          linkList={MY_ACCOUNT_LINKS}
          icon={UserIcon}
          name={platformui_starzbet_accountPage_name_myAccount}
          route={MY_ACCOUNT_ROUTES}
          qaAttribute={PlayerUIQaAttributes.MyAccountMenu.MyAccountNode}
          alwaysShow
        />

        <ExpandableMenuComponent
          linkList={SECURITY_LINKS}
          icon={LockIcon}
          name={platformui_starzbet_navLink_security}
          route={SECURITY_ROUTES}
          qaAttribute={PlayerUIQaAttributes.MyAccountMenu.SecurityNode}
          alwaysShow
        />

        <ExpandableMenuComponent
          linkList={helpLinks}
          icon={HeadphoneIcon}
          name={platformui_starzbet_navMenu_help}
          route={helpCenterRoutes}
          qaAttribute={PlayerUIQaAttributes.MyAccountMenu.HelpNode}
          alwaysShow
        />

        <Development>
          <ExpandableMenuComponent
            linkList={GAMBLING_LINKS}
            icon={ResponsibleGamingIcon}
            name={platformui_starzbet_navMenu_gaming}
            route={GAMBLING_ROUTES}
            qaAttribute={PlayerUIQaAttributes.MyAccountMenu.ResponsibleGamblingNode}
          />
        </Development>

        <MenuElementList
          linkList={filterLinks(DEFAULT_LINK, notPrivate)}
          nav
          classList={classes.listItem}
          className={classes.buttonList}
        />

        <LogoutButton
          className={classes.logout}
          icon={true}
          qaAttribute={PlayerUIQaAttributes.MyAccountMenu.LogoutButton}
        />
      </div>
    </div>
  );
});
ExpandableNavigationMenu.displayName = "ExpandableNavigationMenu";

export { ExpandableNavigationMenu };
