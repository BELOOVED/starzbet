import React, { memo } from "react";
import clsx from "clsx";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_coupons_header_favs,
  sportsbookui_starzbet_liveEventPage_live,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { platformui_starzbet_mainNavigationLinks_link_home } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./SideBarCommonItems.module.css";
import {
  NavLinkLocalized,
} from "../../../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { type TLocalizedRoutePath } from "../../../../../../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";
import { NavLinkToTop } from "../../../../../../../common/Components/LinkToTop/LinkToTop";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import {
  sizeLiveEsportFavouriteEvenIdListSelector,
  sizeLiveFavouriteEvenIdListSelector,
  sizePreLiveEsportFavouriteEvenIdListSelector,
  sizePreLiveFavouriteEvenIdListSelector,
} from "../../../../../../Store/Favourites/Selectors/FavouritesSelectors";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { type TAppState } from "../../../../../../Store/InitialState";
import { sizeLiveEsportEventsSelector, sizeLiveNotEsportEventsSelector } from "../../../../../../Store/Feed/Selectors/LiveEventsSelector";
import { FavouriteList } from "../../../Mobile/Components/FavouriteList/FavouriteList";
import { HomeIcon } from "../../../Components/Icons/HomeIcon/HomeIcon";
import { FavsIcon } from "../../../Components/Icons/FavsIcon/FavsIcon";
import { LiveIcon } from "../../../Components/Icons/WatsappIcon/LiveIcon";

const favButtonRoutes = [
  {
    matchRoute: routeMap.live.root,
    componentRoute: routeMap.live.favourite,
    selector: sizeLiveFavouriteEvenIdListSelector,
  },
  {
    matchRoute: routeMap.preLive.root,
    componentRoute: routeMap.preLive.favourite,
    selector: sizePreLiveFavouriteEvenIdListSelector,
  },
  {
    matchRoute: routeMap.tournament,
    componentRoute: routeMap.preLive.favourite,
    selector: sizePreLiveFavouriteEvenIdListSelector,
  },
  {
    matchRoute: routeMap.category,
    componentRoute: routeMap.preLive.favourite,
    selector: sizePreLiveFavouriteEvenIdListSelector,
  },
  {
    matchRoute: routeMap.esport.live.root,
    componentRoute: routeMap.esport.live.favourite,
    selector: sizeLiveEsportFavouriteEvenIdListSelector,
  },
  {
    matchRoute: routeMap.esport.preLive.root,
    componentRoute: routeMap.esport.preLive.favourite,
    selector: sizePreLiveEsportFavouriteEvenIdListSelector,
  },
];

enum EButtons {
  LIVE,
  FAVS,
}

interface IButtonProps {
  icon: React.ReactNode;
  title: string;
  path: TLocalizedRoutePath<string>;
  selector: (state: TAppState) => number;
  type: EButtons;
  isShort?: boolean;
  exact?: boolean;
}

const HomeButton = memo<ICommon>(({ isEsport, isShort }) => {
  const path = isEsport
    ? routeMap.esport.preLive.root
    : routeMap.preLive.root;

  const [t] = useTranslation();

  return (
    <NavLinkLocalized
      to={path}
      className={clsx(classes.sideItem, isShort && classes.mobileButton)}
      activeClassName={classes.homeActive}
      exact={isEsport}
    >
      <div className={classes.icon}>
        <HomeIcon />
      </div>

      <Ellipsis className={classes.sideText}>
        {t(platformui_starzbet_mainNavigationLinks_link_home)}
      </Ellipsis>
    </NavLinkLocalized>
  );
});
HomeButton.displayName = "HomeButton";

const activeClass = {
  [EButtons.FAVS]: "favs-active",
  [EButtons.LIVE]: "live-active",
};

const ButtonWithCount = memo<IButtonProps>(({
  title,
  icon,
  path,
  selector,
  type,
  isShort,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  exact = true,
}) => {
  const [t] = useTranslation();

  const count = useSelector(selector);

  const className = isShort ? classes.sideItemMobile : classes.sideItem;

  return (
    <NavLinkToTop
      to={path}
      className={className}
      activeClassName={classes[activeClass[type]]}
      exact={exact}
    >
      <div className={classes.icon}>
        {icon}
      </div>

      <Ellipsis className={clsx(classes.sideText, isShort && classes.shortSideText)}>
        {t(title)}
      </Ellipsis>

      <div className={classes.eventsCount}>{count}</div>
    </NavLinkToTop>
  );
});
ButtonWithCount.displayName = "ButtonWithCount";

interface ICommon {
  isEsport?: boolean;
  isShort?: boolean;
}

const SideBarCommonItems = memo<ICommon>(({ isEsport }) => {
  const livePath = isEsport ? routeMap.esport.live.root : routeMap.live.root;
  const liveSelector = isEsport ? sizeLiveEsportEventsSelector : sizeLiveNotEsportEventsSelector;

  return (
    <div className={classes.sideCommonItems}>
      <HomeButton isEsport={isEsport} />

      <ButtonWithCount
        title={sportsbookui_starzbet_liveEventPage_live}
        selector={liveSelector}
        icon={<LiveIcon />}
        path={livePath}
        type={EButtons.LIVE}
        exact={false}
      />

      <Switch>
        {
          favButtonRoutes.map(({ matchRoute, componentRoute, selector }) => (
            <Route path={matchRoute} key={matchRoute}>
              <ButtonWithCount
                title={sportsbookui_starzbet_coupons_header_favs}
                selector={selector}
                icon={<FavsIcon />}
                path={componentRoute}
                type={EButtons.FAVS}
              />
            </Route>
          ))
        }
      </Switch>

      <FavouriteList />
    </div>
  );
});
SideBarCommonItems.displayName = "SideBarCommonItems";

interface IMobileNavBar extends ICommon {
  isLive?: boolean;
}

const MobileNavBar = memo<IMobileNavBar>(({ isEsport, isLive }) => {
  const livePath = isEsport ? routeMap.esport.live.root : routeMap.live.root;
  const liveSelector = isEsport ? sizeLiveEsportEventsSelector : sizeLiveNotEsportEventsSelector;

  return (
    <div className={clsx(classes.sideCommonItemsMobile, !isLive && classes.sideCommonItemsMobilePreLive)}>
      {isLive && <HomeButton isEsport={isEsport} isShort={true} />}

      <ButtonWithCount
        title={sportsbookui_starzbet_liveEventPage_live}
        selector={liveSelector}
        icon={<LiveIcon />}
        path={livePath}
        type={EButtons.LIVE}
        isShort={true}
      />

      <Switch>
        {
          favButtonRoutes.map(({ matchRoute, componentRoute, selector }) => (
            <Route path={matchRoute} key={matchRoute}>
              <ButtonWithCount
                selector={selector}
                icon={<FavsIcon />}
                path={componentRoute}
                type={EButtons.FAVS}
                title={sportsbookui_starzbet_coupons_header_favs}
                isShort={true}
              />
            </Route>
          ))
        }
      </Switch>

      <FavouriteList />
    </div>
  );
});
MobileNavBar.displayName = "MobileNavBar";

export { SideBarCommonItems, MobileNavBar };
