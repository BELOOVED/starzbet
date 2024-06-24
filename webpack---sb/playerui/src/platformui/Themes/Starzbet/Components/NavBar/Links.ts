import {
  platformui_starzbet_mainNavigationLinks_link_bingo,
  platformui_starzbet_mainNavigationLinks_link_casino,
  platformui_starzbet_mainNavigationLinks_link_eSports,
  platformui_starzbet_mainNavigationLinks_link_games,
  platformui_starzbet_mainNavigationLinks_link_home,
  platformui_starzbet_mainNavigationLinks_link_inPlay,
  platformui_starzbet_mainNavigationLinks_link_liveCasino,
  platformui_starzbet_mainNavigationLinks_link_sports,
  platformui_starzbet_mainNavigationLinks_link_virtual,
  platformui_starzbet_mainNavigationLinks_popularGames_casino,
  platformui_starzbet_mainNavigationLinks_popularGames_games,
  platformui_starzbet_mainNavigationLinks_popularGames_liveCasino,
  platformui_starzbet_navLink_parlayBay,
  platformui_starzbet_vipClub_page_title,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TComponent, withProps } from "@sb/utils";
import { type Location, matchPath } from "@sb/react-router-compat";
import type { TIconProps, TIconSize } from "../../../../../common/Components/Icon/Icon";
import { IS_STARZBET_KG } from "../../../../../ServerEnvironment";
import {
  ParlayBayIcon,
} from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/ParlayBayIcon/ParlayBayIcon";
import { systemLabels } from "../../../../Store/Games/Model/Games";
import { routeMap, type TRoutePath } from "../../../../RouteMap/RouteMap";
import { HomeIcon } from "../Icons/HomeIcon/HomeIcon";
import { PreLiveLandingIcon } from "../Icons/PreLiveLandingIcon/PreLiveLandingIcon";
import { LiveLandingIcon } from "../Icons/LiveLandingIcon/LiveLandingIcon";
import { ESportsIcon } from "../Icons/ESportsIcon/ESportsIcon";
import { CasinoLandingIcon } from "../Icons/CasinoLandingIcon/CasinoLandingIcon";
import { LiveCasinoLandingIcon } from "../Icons/LiveCasinoLandingIcon/LiveCasinoLandingIcon";
import { GamesLandingIcon } from "../Icons/GamesLandingIcon/GamesLandingIcon";
import { VirtualLandingIcon } from "../Icons/VirtualLandingIcon/VIrtualLandingIcon";
import { BingoLandingIcon } from "../Icons/BingoLandingIcon/BingoLandingIcon";
import { CrownIconV1 } from "../Icons/CrownIcon/CrownIcon";
import { PopularCasinoIcon } from "../Icons/PopularCasino";
import { PopularLiveCasinoIcon } from "../Icons/PopularLiveCasino";
import { PopularGamesIcon } from "../Icons/PopularGames";

interface IIconSize {
  size: TIconSize;
}

const ICON_SIZE: IIconSize = { size: "m" };

const GAMES_ICON_SIZE: IIconSize = { size: "s" };

const labelId = systemLabels.popular;

interface INavLink {
  path: TRoutePath;
  tKey: TTKeys;
  icon: TComponent<TIconProps>;
  exact?: boolean;
  isActive?: (match: null, location: Location) => boolean;
}

const HOME_LINK: INavLink = {
  path: routeMap.root,
  tKey: platformui_starzbet_mainNavigationLinks_link_home,
  icon: withProps(HomeIcon)(ICON_SIZE),
  exact: true,
};

const SB_NAV_LINKS: INavLink[] = [
  {
    path: routeMap.preLive,
    tKey: platformui_starzbet_mainNavigationLinks_link_sports,
    icon: withProps(PreLiveLandingIcon)(ICON_SIZE),
    isActive: (match: null, location: Location) => (
      !!matchPath(location.pathname, { path: [routeMap.preLive, routeMap.tournament, routeMap.category] }) &&
      !matchPath(location.pathname, routeMap.esportLive)
    ),
  },
  {
    path: routeMap.live,
    tKey: platformui_starzbet_mainNavigationLinks_link_inPlay,
    icon: withProps(LiveLandingIcon)(ICON_SIZE),
  },
  {
    path: routeMap.esport,
    tKey: platformui_starzbet_mainNavigationLinks_link_eSports,
    icon: withProps(ESportsIcon)(ICON_SIZE),
    isActive: (match: null, location: Location) => !!matchPath(location.pathname, { path: [routeMap.esport, routeMap.esportLive] }),
  },
];

const MAIN_NAV_LINKS: INavLink[] = [
  {
    path: routeMap.casino,
    tKey: platformui_starzbet_mainNavigationLinks_link_casino,
    icon: withProps(CasinoLandingIcon)(ICON_SIZE),
  },
  {
    path: routeMap.liveCasino,
    tKey: platformui_starzbet_mainNavigationLinks_link_liveCasino,
    icon: withProps(LiveCasinoLandingIcon)(ICON_SIZE),
  },
  {
    path: routeMap.games,
    tKey: platformui_starzbet_mainNavigationLinks_link_games,
    icon: withProps(GamesLandingIcon)(ICON_SIZE),
  },
  {
    path: routeMap.virtual,
    tKey: platformui_starzbet_mainNavigationLinks_link_virtual,
    icon: withProps(VirtualLandingIcon)(ICON_SIZE),
  },
  {
    path: routeMap.bingo,
    tKey: platformui_starzbet_mainNavigationLinks_link_bingo,
    icon: withProps(BingoLandingIcon)(ICON_SIZE),
  },
  {
    path: routeMap.vipClubOverviewBonusRoute,
    tKey: platformui_starzbet_vipClub_page_title,
    icon: withProps(CrownIconV1)(ICON_SIZE),
  },
];

const KG_NAV_LINKS = [
  HOME_LINK,
  ...MAIN_NAV_LINKS,
];

const TR_NAV_LINKS = [
  HOME_LINK,
  ...SB_NAV_LINKS,
  ...MAIN_NAV_LINKS,
];

const NAV_LINKS = IS_STARZBET_KG ? KG_NAV_LINKS : TR_NAV_LINKS;

const MAIN_GAMES_LINKS = [
  {
    path: {
      to: routeMap.casinoLabel,
      params: { labelId },
    },
    tKey: platformui_starzbet_mainNavigationLinks_popularGames_casino,
    icon: withProps(PopularCasinoIcon)(GAMES_ICON_SIZE),
  },
  {
    path: {
      to: routeMap.liveCasinoLabel,
      params: { labelId },
    },
    tKey: platformui_starzbet_mainNavigationLinks_popularGames_liveCasino,
    icon: withProps(PopularLiveCasinoIcon)(GAMES_ICON_SIZE),
  },
  {
    path: {
      to: routeMap.gamesLabel,
      params: { labelId },
    },
    tKey: platformui_starzbet_mainNavigationLinks_popularGames_games,
    icon: withProps(PopularGamesIcon)(GAMES_ICON_SIZE),
  },
];

const PARLAY_BAY_LINK = {
  path: { to: routeMap.parlayBay },
  tKey: platformui_starzbet_navLink_parlayBay,
  icon: withProps(ParlayBayIcon)(GAMES_ICON_SIZE),
};

const GAMES_LINKS = IS_STARZBET_KG ? MAIN_GAMES_LINKS : [...MAIN_GAMES_LINKS, PARLAY_BAY_LINK];

export { GAMES_LINKS, NAV_LINKS };
