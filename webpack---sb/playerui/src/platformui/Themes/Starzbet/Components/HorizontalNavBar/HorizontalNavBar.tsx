import clsx from "clsx";
import { createElement, memo } from "react";
import {
  platformui_starzbet_mainNavigationLinks_link_basketball,
  platformui_starzbet_mainNavigationLinks_link_bingo,
  platformui_starzbet_mainNavigationLinks_link_casino,
  platformui_starzbet_mainNavigationLinks_link_eSports,
  platformui_starzbet_mainNavigationLinks_link_games,
  platformui_starzbet_mainNavigationLinks_link_inPlay,
  platformui_starzbet_mainNavigationLinks_link_liveCasino,
  platformui_starzbet_mainNavigationLinks_link_soccer,
  platformui_starzbet_mainNavigationLinks_link_sports,
  platformui_starzbet_mainNavigationLinks_link_tennis,
  platformui_starzbet_mainNavigationLinks_link_virtual,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotVoid, type TComponent, withProps } from "@sb/utils";
import { type Location, matchPath } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { type TTKeys as TPlatformTKeys } from "@sb/translates/platformui/Themes/Starzbet-in/TKeys";
import classes from "./HorizontalNavBar.module.css";
import { type TIconSize } from "../../../../../common/Components/Icon/Icon";
import { NativeHorizontalScroll } from "../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { NavLinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { IS_STARZBET_KG } from "../../../../../ServerEnvironment";
import { getSportPath } from "../../../../../common/Utils/RouterUtils/GetSportPath";
import type { TLocalizedRouteParams } from "../../../../../common/Client/Core/Services/RouterService/Model/RoutesTypes";
import type { TLocalizedRoutePath } from "../../../../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { scrollToTop } from "../../../../Utils/ScrollToTop";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { PreLiveLandingIcon } from "../Icons/PreLiveLandingIcon/PreLiveLandingIcon";
import { LiveLandingIcon } from "../Icons/LiveLandingIcon/LiveLandingIcon";
import { ESportsIcon } from "../Icons/ESportsIcon/ESportsIcon";
import { CasinoLandingIcon } from "../Icons/CasinoLandingIcon/CasinoLandingIcon";
import { LiveCasinoLandingIcon } from "../Icons/LiveCasinoLandingIcon/LiveCasinoLandingIcon";
import { GamesLandingIcon } from "../Icons/GamesLandingIcon/GamesLandingIcon";
import { VirtualLandingIcon } from "../Icons/VirtualLandingIcon/VIrtualLandingIcon";
import { BingoLandingIcon } from "../Icons/BingoLandingIcon/BingoLandingIcon";
import { PromotionTabWrapper } from "../CMSComponents/HeaderPromoTab/HeaderPromoTab";

interface IIconSize {
  size: TIconSize;
}

const iconSize: IIconSize = { size: "m" };

interface ISubLinkItemProps {
  path: TLocalizedRouteParams<string>;
  tKey: TPlatformTKeys | string;
}

interface INavBarItemProps {
  path: TLocalizedRoutePath<string>;
  tKey: TPlatformTKeys | string;
  icon: TComponent;
  subLinks?: ISubLinkItemProps[];
  isActive?: (match: null, location: Location) => boolean;
}

const MAIN_NAV_LINKS: INavBarItemProps[] = [
  {
    path: routeMap.casino,
    tKey: platformui_starzbet_mainNavigationLinks_link_casino,
    icon: withProps(CasinoLandingIcon)(iconSize),
  },
  {
    path: routeMap.liveCasino,
    tKey: platformui_starzbet_mainNavigationLinks_link_liveCasino,
    icon: withProps(LiveCasinoLandingIcon)(iconSize),
  },
  {
    path: routeMap.games,
    tKey: platformui_starzbet_mainNavigationLinks_link_games,
    icon: withProps(GamesLandingIcon)(iconSize),
  },
  {
    path: routeMap.virtual,
    tKey: platformui_starzbet_mainNavigationLinks_link_virtual,
    icon: withProps(VirtualLandingIcon)(iconSize),
  },
  {
    path: routeMap.bingo,
    tKey: platformui_starzbet_mainNavigationLinks_link_bingo,
    icon: withProps(BingoLandingIcon)(iconSize),
  },
];

const NAV_LINKS_WITH_SB: INavBarItemProps[] = [
  {
    path: routeMap.preLive,
    tKey: platformui_starzbet_mainNavigationLinks_link_sports,
    icon: withProps(PreLiveLandingIcon)(iconSize),
    isActive: (match: null, location: Location) => (
      !!matchPath(location.pathname, { path: [routeMap.preLive, routeMap.tournament, routeMap.category] }) &&
      !matchPath(location.pathname, routeMap.esportLive)
    ),
    subLinks: [
      {
        path: getSportPath(ESportCode.soccer),
        tKey: platformui_starzbet_mainNavigationLinks_link_soccer,
      },
      {
        path: getSportPath(ESportCode.basketball),
        tKey: platformui_starzbet_mainNavigationLinks_link_basketball,
      },
      {
        path: getSportPath(ESportCode.tennis),
        tKey: platformui_starzbet_mainNavigationLinks_link_tennis,
      },
    ],
  },
  {
    path: routeMap.live,
    tKey: platformui_starzbet_mainNavigationLinks_link_inPlay,
    icon: withProps(LiveLandingIcon)(iconSize),
  },
  {
    path: routeMap.esport,
    tKey: platformui_starzbet_mainNavigationLinks_link_eSports,
    icon: withProps(ESportsIcon)(iconSize),
    isActive: (match: null, location: Location) => !!matchPath(location.pathname, { path: [routeMap.esport, routeMap.esportLive] }),
  },
  ...MAIN_NAV_LINKS,
];

const NAV_LINKS = IS_STARZBET_KG ? MAIN_NAV_LINKS : NAV_LINKS_WITH_SB;

const NavBarContent = memo(() => (
  <div className={classes.navbar}>
    {NAV_LINKS.map((it) => <NavBarItem {...it} key={it.path} />)}

    <PromotionTabWrapper
      wrapperClassName={clsx(classes.itemWrapper, classes.promotionTab)}
      className={classes.item}
      activeClassName={classes.activeItem}
      qaAttribute={PlayerUIQaAttributes.Cms.PromoButton}
    />
  </div>
));
NavBarContent.displayName = "NavBarContent";

const HorizontalNavBar = memo(
  () => (
    <div className={classes.horizontal}>
      <NativeHorizontalScroll className={classes.scrollWrapper} scrollInnerClassName={classes.scrollInner}>
        <NavBarContent />
      </NativeHorizontalScroll>
    </div>
  ),
);
HorizontalNavBar.displayName = "HorizontalNavBar";

const SubLinkItem = memo<ISubLinkItemProps>(({
  path,
  tKey,
}) => {
  const [t] = useTranslation();

  return (
    <NavLinkLocalized
      className={classes.sublink}
      {...path}
    >
      {t(tKey)}
    </NavLinkLocalized>
  );
});
SubLinkItem.displayName = "SubLinkItem";

const NavBarItem = memo<INavBarItemProps>(({
  path,
  tKey,
  icon,
  subLinks = [],
  ...rest
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.itemWrapper}>
      <NavLinkLocalized
        to={path}
        className={classes.item}
        activeClassName={classes.activeItem}
        onClick={scrollToTop}
        {...rest}
      >
        {createElement(icon)}

        <Ellipsis>
          {t(tKey)}
        </Ellipsis>
      </NavLinkLocalized>

      {
        isNotVoid(subLinks)
          ? (
            <div className={classes.sublinksWrapper}>
              {subLinks.map((it) => <SubLinkItem {...it} key={it.tKey} />)}
            </div>
          )
          : null
      }
    </div>
  );
});
NavBarItem.displayName = "NavBarItem";

export { HorizontalNavBar };
