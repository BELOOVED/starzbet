// @ts-nocheck
import clsx from "clsx";
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_navLink_accountClosure,
  platformui_starzbet_navLink_depositLimit,
  platformui_starzbet_navLink_playLimit,
  platformui_starzbet_navLink_realityCheck,
  platformui_starzbet_navLink_selfExclusion,
  platformui_starzbet_timeOut_coolOff,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { preventDefault } from "@sb/utils";
import { type IWithQaAttribute, PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./MyAccountMenu.module.css";
import { playerNotVerifiedSelector } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { LinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { PlayLimitIcon } from "../../../Components/Icons/PlayLimitIcon/PlayLimitIcon";
import { DepositLimitIcon } from "../../../Components/Icons/DepositLimitIcon/DepositLimitIcon";
import { CoolOffIcon } from "../../../Components/Icons/CoolOffIcon/CoolOffIcon";
import { SelfExclusionIcon } from "../../../Components/Icons/SelfExclusionIcon/SelfExclusionIcon";
import { AccountClosureIcon } from "../../../Components/Icons/AccountClosureIcon/AccountClosureIcon";
import { RealityCheckIcon } from "../../../Components/Icons/RealityCheckIcon/RealityCheckIcon";

const gamblingLinks = [
  {
    link: platformui_starzbet_navLink_playLimit,
    to: routeMap.playLimitRoute,
    icon: PlayLimitIcon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.PlayLimitMenuElement,
  },
  {
    link: platformui_starzbet_navLink_depositLimit,
    to: routeMap.depositLimitRoute,
    icon: DepositLimitIcon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.DepositLimitMenuElement,
  },
  {
    link: platformui_starzbet_timeOut_coolOff,
    to: routeMap.timeOutRoute,
    icon: CoolOffIcon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.TimeOutMenuElement,
  },
  {
    link: platformui_starzbet_navLink_selfExclusion,
    to: routeMap.selfExclusionRoute,
    icon: SelfExclusionIcon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.SelfExclusionMenuElement,
  },
  {
    link: platformui_starzbet_navLink_accountClosure,
    to: routeMap.accountClosureRoute,
    icon: AccountClosureIcon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.AccountClosureMenuElement,
  },
  {
    link: platformui_starzbet_navLink_realityCheck,
    to: routeMap.realityChecksRoute,
    icon: RealityCheckIcon,
    qaAttribute: PlayerUIQaAttributes.MyAccountMenu.RealityChecksMenuElement,
  },
];

const MenuElement = memo<IWithQaAttribute>(({
  link,
  to,
  icon,
  flag = false,
  alwaysShow,
  qaAttribute,
  iconRight,
}) => {
  const [t] = useTranslation();

  const notVerified = useSelector(playerNotVerifiedSelector);

  const disabled = notVerified && !alwaysShow;

  const className = clsx(
    classes.menuElement,
    disabled && classes.notVerified,
  );

  const onClick = disabled ? preventDefault : undefined;

  return (
    <LinkLocalized
      to={to}
      className={className}
      onClick={onClick}
      {...qaAttr(qaAttribute)}
    >
      {flag && createElement(icon, { className: classes.icon })}

      <div className={classes.name}>
        <Ellipsis>
          {t(link)}
        </Ellipsis>
      </div>

      {iconRight && createElement(iconRight)}
    </LinkLocalized>
  );
});
MenuElement.displayName = "MenuElement";

const GamblingMenu = memo(() => (
  <div className={classes.menu}>
    {
      gamblingLinks.map((link, i) => (
        <MenuElement
          {...link}
          key={i}
          flag={true}
        />
      ))
    }
  </div>
));
GamblingMenu.displayName = "GamblingMenu";

export { GamblingMenu };
