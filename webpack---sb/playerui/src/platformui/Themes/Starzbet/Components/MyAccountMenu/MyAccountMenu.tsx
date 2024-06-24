// @ts-nocheck
import clsx from "clsx";
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import { type IWithQaAttribute, PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { isNotNil, preventDefault, type TSelector } from "@sb/utils";
import {
  platformui_starzbet_navLink_requestACallBack,
  platformui_starzbet_navLink_responsibleGambling,
  platformui_starzbet_profileMenu_button_history,
  platformui_starzbet_profileMenu_button_messages,
  platformui_starzbet_profileMenu_button_myAccount,
  platformui_starzbet_profileMenu_button_offers,
  platformui_starzbet_userMessages_title_notifications,
  platformui_starzbet_vipClub_page_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { always } from "@sb/utils/Always";
import classes from "./MyAccountMenu.module.css";
import { notPrivateGroupIdSelector } from "../../../../../common/Store/Player/Selectors/PlayerGroupIdSelectors";
import { playerNotVerifiedSelector } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { NavLinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { LinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { type TLocalizedRoutePath } from "../../../../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { development } from "../../../../Components/Development/Development";
import { type TPlatformAppState } from "../../../../Store/PlatformInitialState";
import { ResponsibleGamingIcon } from "../Icons/ResponsibleGamingIcon/ResponsibleGamingIcon";
import { ProfileOctagonIcon } from "../Icons/ProfileOctagon/ProfileOctagon";
import { MesjIcon } from "../Icons/MesjIcon/MesjIcon";
import { Gift2Icon } from "../Icons/Gift2Icon/GiftIcon";
import { CalendarSecondsIcon } from "../Icons/CalendarMenuIcon/CalendarMenuIcon";
import { HeadphoneIcon } from "../Icons/HeadphoneIcon/HeadphoneIcon";
import { NotificationIcon } from "../Icons/NotificationIcon/NotificationIcon";
import { UserMessageUnseenCounter } from "../UserMessage/UserMessageUnseenCounter/UserMessageUnseenCounter";
import { UnreadMessagesCounter } from "../UnreadMessagesCounter/UnreadMessagesCounter";
import { CrownIconV1 } from "../Icons/CrownIcon/CrownIcon";

interface IMenuElementLink {
  link: string;
  to: TLocalizedRoutePath<string>;
  icon: string;
  visibleSelector?: TSelector<TPlatformAppState, boolean>;
  capitalize?: boolean;
}

interface IMenuElementListProps {
  linkList: IMenuElementLink[];
  nav: boolean;
  className?: string;
}

const accountLinks = [
  {
    link: platformui_starzbet_profileMenu_button_myAccount,
    to: routeMap.myAccountRoute,
    qaAttribute: PlayerUIQaAttributes.SideMenu.MyAccountMenuElement,
    alwaysShow: true,
    icon: ProfileOctagonIcon,
  },
  {
    link: platformui_starzbet_userMessages_title_notifications,
    to: routeMap.userMessages,
    qaAttribute: PlayerUIQaAttributes.SideMenu.NotificationsMenuElement,
    icon: NotificationIcon,
    iconRight: UserMessageUnseenCounter,
  },
  {
    link: platformui_starzbet_profileMenu_button_messages,
    to: routeMap.tickets,
    qaAttribute: PlayerUIQaAttributes.SideMenu.MessagesMenuElement,
    icon: MesjIcon,
    iconRight: UnreadMessagesCounter,
  },
  {
    link: platformui_starzbet_profileMenu_button_offers,
    to: routeMap.bonusesRoute,
    qaAttribute: PlayerUIQaAttributes.SideMenu.OffersMenuElement,
    icon: Gift2Icon,
    bonus: true,
  },
  {
    link: platformui_starzbet_vipClub_page_title,
    to: routeMap.vipClubRoute,
    qaAttribute: PlayerUIQaAttributes.SideMenu.VipClubMenuElement,
    icon: CrownIconV1,
    alwaysShow: true,
  },
  {
    link: platformui_starzbet_profileMenu_button_history,
    to: routeMap.accountHistoryRoute,
    qaAttribute: PlayerUIQaAttributes.SideMenu.HistoryMenuElement,
    icon: CalendarSecondsIcon,
  },
  {
    link: platformui_starzbet_navLink_requestACallBack,
    to: routeMap.callRequestsRoute,
    qaAttribute: PlayerUIQaAttributes.SideMenu.RequestCallBackMenuElement,
    icon: HeadphoneIcon,
  },
  development(
    {
      link: platformui_starzbet_navLink_responsibleGambling,
      to: routeMap.gamblingControl,
      qaAttribute: PlayerUIQaAttributes.SideMenu.ResponsibleGamblingMenuElement,
      icon: ResponsibleGamingIcon,
    },
  ),
].filter(Boolean);

const filterLinks = (links: typeof accountLinks, notPrivate: boolean) => (
  links.filter((it) => it.bonus ? notPrivate : true)
);

const MenuElement = memo<IWithQaAttribute>(({
  link,
  to,
  nav,
  onClick,
  icon,
  classList,
  witActive,
  alwaysShow,
  qaAttribute,
  iconRight,
  visibleSelector = always(true),
  activeRoutes,
}) => {
  const [t] = useTranslation();

  const match = useRouteMatch(activeRoutes ?? to);

  const notVerified = useSelector(playerNotVerifiedSelector);

  const visible = useSelector(visibleSelector);

  if (!visible) {
    return null;
  }

  const component = nav
    ? NavLinkLocalized
    : LinkLocalized;

  const disabled = notVerified && !alwaysShow;

  const className = clsx(
    classes.menuElement,
    disabled && classes.notVerified,
    witActive && match && classes.active,
    isNotNil(icon) && classes.withIconMenuElement,
    classList && classList,
  );

  const clickHandler = disabled ? preventDefault : onClick;

  return createElement(
    component,
    {
      className,
      to,
      onClick: clickHandler,
      ...qaAttr(qaAttribute),
    },
    (
      <>
        <div className={classes.icon}>
          {icon ? createElement(icon, { size: "s" }) : null}
        </div>

        <Ellipsis className={classes.name}>
          {t(link)}
        </Ellipsis>

        {iconRight ? createElement(iconRight) : null}
      </>
    ),
  );
});
MenuElement.displayName = "MenuElement";

const MyAccountMenu = memo(({
  onClick,
}) => {
  const notPrivate = useSelector(notPrivateGroupIdSelector);

  return (
    <div className={classes.myAccountMenu}>
      {
        filterLinks(accountLinks, notPrivate).map((link) => (
          <MenuElement
            onClick={onClick}
            {...link}
            key={link.link}
            classList={classes.myAccountMenuElement}
          />
        ))
      }
    </div>
  );
});
MyAccountMenu.displayName = "MyAccountMenu";

const MenuElementList = memo<IMenuElementListProps>(({
  linkList,
  className,
  ...props
}) => (
  <div className={clsx(classes.menu, className)}>
    {
      linkList.map((link) => (
        <MenuElement
          {...props}
          {...link}
          key={link.link}
          witActive
        />
      ))
    }
  </div>
));
MenuElementList.displayName = "MenuElementList";

export {
  MyAccountMenu,
  MenuElementList,
  type IMenuElementLink,
};
