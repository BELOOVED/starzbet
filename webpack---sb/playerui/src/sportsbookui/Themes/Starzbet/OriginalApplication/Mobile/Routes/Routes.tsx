import { withProps } from "@sb/utils";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { BetSlip } from "../../Components/BetSlip/BetSlip/BetSlip";
import { ELiveSearch, EPreLiveSearch, LiveSearch, PreLiveSearch } from "../../Pages/Search/Search";
import { CategoryPage } from "../Pages/CategoryPage/CategoryPage";
import { EsportLiveFavourites, EsportPreLiveFavourites, LiveFavourites, PreLiveFavourites } from "../Pages/Favourites/Favourites";
import { PreLive } from "../Pages/PreLive/PreLive";
import { PreLiveAll } from "../Pages/PreLiveAll/PreLiveAll";
import { EsportPreLiveAllSports } from "../Pages/PreLiveAllSports/EsportPreLiveAllSports";
import { LiveAllSports, PreLiveAllSports } from "../Pages/PreLiveAllSports/PreLiveAllSports";
import { PreLiveCoupon } from "../Pages/PreLiveCoupon/PreLiveCoupon";
import { PreLiveSport } from "../Pages/PreLiveSport/PreLiveSport";
import { PreLiveSelection } from "../Pages/PreLiveSelection/PreLiveSelection";
import { PreLiveEvent } from "../Pages/PreLiveEvent/PreLiveEvent";
import { Live } from "../Pages/Live/Live";
import { LiveAll } from "../Pages/LiveAll/LiveAll";
import { LiveSport } from "../Pages/LiveSport/LiveSport";
import { LiveEvent } from "../Pages/LiveEvent/LiveEvent";
import { EsportLive } from "../Pages/EsportLive/EsportLive";
import { EsportPreLive } from "../Pages/EsportPreLive/EsportPreLive";
import { EsportPreLiveAll } from "../Pages/EsportPreLiveAll/EsportPreLiveAll";
import { EsportPreLiveSport } from "../Pages/EsportPreLiveSport/EsportPreLiveSport";
import { EsportPreLiveSelection } from "../Pages/EsportPreLiveSelection/EsportPreLiveSelection";
import { EsportPreLiveCoupon } from "../Pages/EsportPreLiveCoupon/EsportPreLiveCoupon";
import { EsportLiveAll } from "../Pages/EsportLiveAll/EsportLiveAll";
import { EsportLiveSport } from "../Pages/EsportLiveSport/EsportLiveSport";
import { Statistics } from "../Pages/Statistics/Statistics";
import { PreLiveOutrights } from "../Pages/PreLiveOutrights/PreLiveOutrights";
import { TournamentPage } from "../Pages/TournamentPage/TournamentPage";
import { VirtualCategory } from "../Pages/VirtualCategory/VirtualCategory";
import { VirtualRoulette } from "../Pages/VirtualRoulette/VirtualRoulette";
import { LiveSelection } from "../Pages/LiveSelection/LiveSelection";

const preLiveRoutes = [
  {
    path: routeMap.preLive.period,
    component: PreLiveAll,
    exact: true,
  },
  {
    path: routeMap.preLive.sport,
    component: PreLiveSport,
    exact: true,
  },
  {
    path: routeMap.preLive.selection,
    component: PreLiveSelection,
    exact: true,
  },
  {
    path: routeMap.preLive.coupon,
    component: PreLiveCoupon,
    exact: true,
  },
  {
    path: routeMap.preLive.favourite,
    component: PreLiveFavourites,
    exact: true,
  },
  {
    path: routeMap.preLive.event,
    component: PreLiveEvent,
    exact: true,
  },
  {
    path: routeMap.preLive.outrights,
    component: PreLiveOutrights,
    exact: true,
  },
  {
    path: routeMap.preLive.searchResult,
    component: PreLiveSearch,
    exact: true,
  },
];

const liveRoutes = [
  {
    path: routeMap.live.root,
    component: LiveAll,
    exact: true,
  },
  {
    path: routeMap.live.sport,
    component: LiveSport,
    exact: true,
  },
  {
    path: routeMap.live.favourite,
    component: LiveFavourites,
    exact: true,
  },
  {
    path: routeMap.live.event,
    component: LiveEvent,
    exact: true,
  },
  {
    path: routeMap.live.selection,
    component: LiveSelection,
    exact: true,
  },
  {
    path: routeMap.live.searchResult,
    component: LiveSearch,
    exact: true,
  },
];

const esportLiveRoutes = [
  {
    path: routeMap.esport.live.root,
    component: EsportLiveAll,
    exact: true,
  },
  {
    path: routeMap.esport.live.sport,
    component: EsportLiveSport,
  },
  {
    path: routeMap.esport.live.favourite,
    component: EsportLiveFavourites,
  },
  {
    path: routeMap.esport.live.event,
    component: LiveEvent,
  },
  {
    path: routeMap.esport.live.selection,
    component: LiveSelection,
    exact: true,
  },
  {
    path: routeMap.esport.live.searchResult,
    component: ELiveSearch,
    exact: true,
  },
];

const esportPreLiveRoutes = [
  {
    path: routeMap.esport.preLive.period,
    component: EsportPreLiveAll,
    exact: true,
  },
  {
    path: routeMap.esport.preLive.sport,
    component: EsportPreLiveSport,
    exact: true,
  },
  {
    path: routeMap.esport.preLive.selection,
    component: EsportPreLiveSelection,
    exact: true,
  },
  {
    path: routeMap.esport.preLive.coupon,
    component: EsportPreLiveCoupon,
    exact: true,
  },
  {
    path: routeMap.esport.preLive.favourite,
    component: EsportPreLiveFavourites,
    exact: true,
  },
  {
    path: routeMap.esport.preLive.event,
    component: PreLiveEvent,
  },
  {
    path: routeMap.esport.preLive.searchResult,
    component: EPreLiveSearch,
    exact: true,
  },
];

const routes = {
  preLive: {
    path: routeMap.preLive.root,
    render: withProps(PreLive)({ routes: preLiveRoutes }),
  },
  live: {
    path: routeMap.live.root,
    render: withProps(Live)({ routes: liveRoutes }),
  },
  esport: {
    live: {
      path: routeMap.esport.live.root,
      component: withProps(EsportLive)({ routes: esportLiveRoutes }),
    },
    preLive: {
      path: routeMap.esport.preLive.root,
      component: withProps(EsportPreLive)({ routes: esportPreLiveRoutes }),
    },
  },
  betSlip: {
    path: routeMap.betSlip,
    component: BetSlip,
  },
  statistics: {
    path: routeMap.statistics.root,
    component: Statistics,
  },
  category: {
    path: routeMap.category,
    component: CategoryPage,
  },
  tournament: {
    path: routeMap.tournament,
    component: TournamentPage,
  },
  preLiveAll: {
    path: routeMap.preLive.allSports,
    component: PreLiveAllSports,
    exact: true,
  },
  liveAll: {
    path: routeMap.live.allSports,
    component: LiveAllSports,
    exact: true,
  },
  esportPreLiveAll: {
    path: routeMap.esport.preLive.allSports,
    component: EsportPreLiveAllSports,
    exact: true,
  },
  virtual: {
    category: {
      path: routeMap.virtual.category,
      component: VirtualCategory,
    },
    roulette: {
      path: routeMap.virtual.roulette,
      component: VirtualRoulette,
      exact: true,
    },
  },
};

export { routes };
