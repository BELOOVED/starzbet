import { ESportCode } from "@sb/betting-core/ESportCode";
import type { TExtractRouteParams } from "@sb/react-router-compat";
import { getLocalizedRouteMap } from "../../common/Client/Core/Services/RouterService/Utils/GetLocalizedRouteMap";
import { type TLocalizedRouteParams } from "../../common/Client/Core/Services/RouterService/Model/RoutesTypes";
import { type TLocalizedRoutePath } from "../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";
import { ESportPeriod } from "../Store/SportMenu/Model/SportPeriod";

const preLivePeriods = Object.values(ESportPeriod).filter((value) => value !== ESportPeriod.LIVE).join("|");

const statisticsRoot = "/statistics/:eventId";

const preLiveRoot = "/prelive";
const preLiveEvent = `${preLiveRoot}/event/:eventId`;
const preLivePeriod = `${preLiveRoot}/:period(${preLivePeriods})` as const;
const preLiveSport = `${preLivePeriod}/:sportSlug` as const;
const preLiveCategory = `${preLiveSport}/:categorySlug`;
const preLiveTournament = `${preLiveCategory}/:tournamentSlug`;
const preLiveFavourite = `${preLiveRoot}/favourite`;
const preLiveFavouritePeriod = `${preLiveRoot}/favourite/:period(${preLivePeriods})`;
const preLiveCoupons = `${preLiveRoot}/coupons`;
const preLiveCoupon = `${preLiveCoupons}/:couponId`;

const liveRoot = "/live";
const liveEvent = `${liveRoot}/event/:eventId`;
const liveAll = `${liveRoot}/all`;
const liveSchedule = `${liveRoot}/schedule`;
const liveSport = `${liveRoot}/sport/:sportSlug`;
const liveMultiView = `${liveRoot}/multi_view/:events(.*?)`;
const liveFavourite = `${liveRoot}/favourite`;

const esportRoot = "/esport";
const esportPreLiveEvent = `${esportRoot}/event/:eventId`;
const esportPreLivePeriod = `${esportRoot}/:period(${preLivePeriods})` as const;
const esportPreLiveSport = `${esportPreLivePeriod}/:sportSlug` as const;
const esportPreLiveCategory = `${esportPreLiveSport}/:categorySlug`;
const esportPreLiveCoupons = `${esportRoot}/coupons`;
const esportPreLiveFavourite = `${esportRoot}/favourite`;
const esportPreLiveFavouritePeriod = `${esportRoot}/favourite/:period(${preLivePeriods})`;
const esportPreLiveCoupon = `${esportPreLiveCoupons}/:couponId`;
const esportLiveRoot = `${esportRoot}/live`;
const esportLiveSport = `${esportLiveRoot}/sport/:sportSlug`;
const esportLveFavourite = `${esportLiveRoot}/favourite`;
const esportLiveEvent = `${esportLiveRoot}/event/:eventId`;
const esportAllSports = `${esportRoot}/all-sports`;
const esportliveMultiView = `${esportLiveRoot}/multi_view/:events(.*?)`;
const esportAllSportsCategory = `${esportRoot}/all-sports/:sportSlug/:categorySlug`;

const virtualRoot = "/virtual";
const virtualProvider = `${virtualRoot}/:provider` as const;

// Kiron routes
const virtualCategory = `${virtualProvider}/category/:categoryId` as const;
const virtualRoulette = `${virtualProvider}/roulette/:sportId` as const;

const searchRoute = "/search";

const myAccountRoute = "/my_account" as const;
const bonusesRoute = `${myAccountRoute}/bonuses` as const;
const availableBonusesRoute = `${bonusesRoute}/available` as const;
const availableBonusRoute = `${availableBonusesRoute}/:id` as const;
const myBonusesRoute = `${bonusesRoute}/my_bonuses` as const;
const myBonusRoute = `${myBonusesRoute}/:id` as const;
const historyBonusesRoute = `${bonusesRoute}/history` as const;
const historyBonusRoute = `${historyBonusesRoute}/:id` as const;

const baseRouteMap = {
  root: "/",
  all: "/all",
  any: "*",
  login: "/login",
  share: "/share",
  statistics: {
    root: statisticsRoot,
  },
  preLive: {
    root: preLiveRoot,
    sport: preLiveSport,
    category: preLiveCategory,
    tournament: preLiveTournament,
    period: preLivePeriod,
    event: preLiveEvent,
    selection: `${preLivePeriod}/:path(.*?)`,
    all: `${preLiveRoot}/${ESportPeriod.ALL}`,
    allSports: `${preLiveRoot}/all-sports`,
    search: `${preLiveRoot}${searchRoute}`,
    searchResult: `${preLiveRoot}${searchRoute}/:searchText?`,
    searchPerSport: `${preLiveRoot}${searchRoute}/:sportSlug/:searchText`,
    favourite: preLiveFavourite,
    favouritePeriod: preLiveFavouritePeriod,
    coupons: preLiveCoupons,
    coupon: preLiveCoupon,
    custom: `${preLiveRoot}/custom`,
    outrights: `${preLiveRoot}/outrights/:id`,
  },
  live: {
    root: liveRoot,
    sport: liveSport,
    event: liveEvent,
    schedule: liveSchedule,
    streaming: `${liveRoot}/streaming`,
    selection: `${liveRoot}/selection/:path(.*?)`,
    all: liveAll,
    allSports: `${liveRoot}/all-sports`,
    search: `${liveRoot}${searchRoute}`,
    searchResult: `${liveRoot}${searchRoute}/:searchText?`,
    searchPerSport: `${liveRoot}${searchRoute}/:sportSlug/:searchText`,
    multiView: liveMultiView,
    favourite: liveFavourite,
  },
  virtual: {
    root: virtualRoot,
    provider: virtualProvider,
    category: virtualCategory,
    roulette: virtualRoulette,
  },
  search: {
    root: searchRoute,
    searchResult: `${searchRoute}/:searchText`,
  },
  betSlip: "/bet-slip",
  sportsHistory: "/history/sports",
  sportsHistoryDetail: "/history/sports/:id",
  esport: {
    root: esportRoot,
    preLive: {
      root: esportRoot,
      event: esportPreLiveEvent,
      favourite: esportPreLiveFavourite,
      favouritePeriod: esportPreLiveFavouritePeriod,
      sport: esportPreLiveSport,
      period: esportPreLivePeriod,
      category: esportPreLiveCategory,
      selection: `${esportPreLivePeriod}/:path(.*?)`,
      coupons: esportPreLiveCoupons,
      coupon: esportPreLiveCoupon,
      all: `${esportRoot}/${ESportPeriod.ALL}`,
      search: `${esportRoot}${searchRoute}`,
      searchPerSport: `${esportRoot}${searchRoute}/:sportSlug/:searchText`,
      searchResult: `${esportRoot}${searchRoute}/:searchText?`,
      allSports: esportAllSports,
      allSportsCategory: esportAllSportsCategory,
      custom: `${esportRoot}/custom`,
    },
    live: {
      root: esportLiveRoot,
      streaming: `${esportLiveRoot}/streaming`,
      selection: `${esportLiveRoot}/selection/:path(.*?)`,
      event: esportLiveEvent,
      sport: esportLiveSport,
      favourite: esportLveFavourite,
      multiView: esportliveMultiView,
      search: `${esportLiveRoot}${searchRoute}`,
      searchResult: `${esportLiveRoot}${searchRoute}/:searchText?`,
      searchPerSport: `${esportLiveRoot}${searchRoute}/:sportSlug/:searchText`,
      allSports: `${esportLiveRoot}/all-sports`,
    },
  },
  tournament: "/tournament/:tournamentSlug/:id/",
  category: "/category/:categorySlug/:id/",
  sport: "/sport/:sportSlug/:id/",
  myAccount: {
    root: myAccountRoute,
    bonuses: {
      root: bonusesRoute,
      available: availableBonusesRoute,
      availableDetails: availableBonusRoute,
      myBonuses: myBonusesRoute,
      myBonusDetails: myBonusRoute,
      history: historyBonusesRoute,
      historyDetails: historyBonusRoute,
    },
  },
  signUp: "/registration",
} as const;

const getRouteParamsDecode = <R extends string, U = string | number | boolean, S = unknown>(
  to: TLocalizedRoutePath<R>,
  params?: TExtractRouteParams<`${R}`, U>,
): TLocalizedRouteParams<R, U, S> => ({ to, params, convertTo: decodeURIComponent });

const routeMap = getLocalizedRouteMap(baseRouteMap);

const preLiveDefaultPath = {
  to: routeMap.preLive.sport,
  params: {
    period: ESportPeriod.FORTY_EIGHT_HOURS,
    sportSlug: ESportCode.soccer,
  },
};

const esportPreLiveDefaultPath = {
  to: routeMap.esport.preLive.sport,
  params: {
    period: ESportPeriod.FORTY_EIGHT_HOURS,
    sportSlug: ESportCode.csgo,
  },
};

export {
  baseRouteMap,
  routeMap,
  getRouteParamsDecode,
  preLiveDefaultPath,
  esportPreLiveDefaultPath,
};
