import { EMPTY, merge, of } from "rxjs";
import { combineEpics, type Epic } from "redux-observable";
import { type Action } from "redux";
import { type IWithRouterState, routerEpic, routerLocationPathnameSelector } from "@sb/router";
import { type IWithAuthState } from "@sb/auth";
import { matchPath, type TMatch, type TRouteProps } from "@sb/react-router-compat";
import { callManagerRemoveSymbolAction, type TCallManagerSymbol } from "@sb/call-manager";
import { EPostfix } from "@sb/sdk";
import {
  erisFeedEpic,
  kironFeedEpic,
  type TEpicFactory,
} from "../../../../sportsbookui/Store/Feed/Epics/FeedConnectedEpic";
import { widgetConnectedEpic } from "../../../../sportsbookui/Store/Widget/Epics/WidgetConnectedEpic";
import {
  couponConnectedEpic,
  COUPONS_BY_GROUP_ID_LOADING_SYMBOL,
  COUPONS_BY_PLAYER_ID_LOADING_SYMBOL,
} from "../../../../sportsbookui/Store/Coupon/Epics/CouponConnectedEpic";
import {
  ACTIVE_BOOSTS_FOR_PLAYER_LOADING_SYMBOL,
  BOOSTS_FOR_GROUP_LOADING_SYMBOL,
  oddsBoostConnectedEpic,
} from "../../../../sportsbookui/Store/OddsBoost/Epics/OddsBoostConnectedEpic";
import { type IWithFeed } from "../../../../sportsbookui/Store/Feed/FeedState";
import { translatorConnectedEpic } from "../../../../sportsbookui/Store/Locale/Epics/TranslatorConnectedEpic";
import { type IWithDebugModeState } from "../../../../sportsbookui/Store/DebugMode/DebugModeState";
import { subscribePerEventEpic } from "../../../../sportsbookui/Store/Feed/Epics/SubscribePerEventEpic";
import { ERIS_ROUTES, KIRON_ROUTES, SPORTSBOOK_ROUTES } from "../../../../sportsbookui/RouteMap/SBRoutesModel";
import { feedResetLineReadyAction } from "../../../../sportsbookui/Store/Feed/FeedActions";
import { anyLineIsReadySelector } from "../../../../sportsbookui/Store/Feed/Selectors/FeedSelectors";
import { routeMap } from "../../../../sportsbookui/RouteMap/RouteMap";
import {
  createConnectedByRouteEpic,
  type IDepsWithConnection,
} from "../../../Utils/EpicUtils/CreateConnectedByRouteEpic";
import { type TDepsWithTranslator } from "../../../Utils/EpicUtils/Dependencies";
import { noopEpic } from "../../../Utils/EpicUtils/NoopEpic";
import { gainThemeContext } from "../../../Utils/ThemeContext";
import { type IWithPlayerState } from "../../Player/InitialState/PlayerInitialState";
import { type IDepsWithHttpApi } from "./TEpicWithHttpApi";
import { type TAppEpic } from "./TAppEpic";

type TSportsbookConnectedEpic = Epic<
  Action,
  Action,
  IWithPlayerState & IWithFeed & IWithDebugModeState & IWithAuthState & IWithRouterState,
  IDepsWithConnection & IDepsWithHttpApi & TDepsWithTranslator
>;

const sportsbookConnectedEpic: TSportsbookConnectedEpic = (action$, state$, dependencies) => merge(
  subscribePerEventEpic(dependencies.connection)(action$, state$, dependencies),
  widgetConnectedEpic(dependencies.connection)(action$, state$, dependencies),
);

// BetSlip routes (some old themes on Mobile) is common for all lines

const withBetSlipCheck = (epicFactory: TEpicFactory): TSportsbookConnectedEpic => (action$, state$, dependencies) => {
  const pathname = routerLocationPathnameSelector(state$.value);
  const isBetSlip = !!matchPath(pathname, routeMap.betSlip);
  const isAnyLineReady = anyLineIsReadySelector(state$.value);

  if (isAnyLineReady && isBetSlip) {
    return EMPTY;
  }

  return epicFactory(dependencies.connection, dependencies.connectionRestartNumber)(action$, state$, dependencies);
};

const createRouterEpic = (
  routes: (TRouteProps | string)[],
  epic: Epic,
  symbols: TCallManagerSymbol[],
) => routerEpic({
  name: "createRouterEpic",
  match: (location) => {
    let match: TMatch | null = null;

    routes.forEach((route) => {
      if (match) {
        return;
      }

      match = matchPath(location.pathname, route);
    });

    return match;
  },
  onStart: () => epic,
  onStop: () => () => of(callManagerRemoveSymbolAction(symbols)),
});

const additionalRoutes = gainThemeContext().static.find("sportsbookConnectedEpicAdditionalRoutes") ?? [];

const allErisRoutes = [...ERIS_ROUTES, ...additionalRoutes];
const allRoutes = [...SPORTSBOOK_ROUTES, ...additionalRoutes];

const sportsbookEpicByRoutes: TAppEpic = combineEpics(
  createConnectedByRouteEpic(
    allErisRoutes,
    withBetSlipCheck(erisFeedEpic),
    () => of(feedResetLineReadyAction(EPostfix.erisgaming)),
  ),

  createConnectedByRouteEpic(
    KIRON_ROUTES,
    withBetSlipCheck(kironFeedEpic),
    () => of(feedResetLineReadyAction(EPostfix.kiron)),
  ),

  createConnectedByRouteEpic(
    allRoutes,
    sportsbookConnectedEpic,
  ),

  createRouterEpic(
    allRoutes,
    couponConnectedEpic,
    [COUPONS_BY_GROUP_ID_LOADING_SYMBOL, COUPONS_BY_PLAYER_ID_LOADING_SYMBOL],
  ),

  createRouterEpic(
    allRoutes,
    oddsBoostConnectedEpic,
    [ACTIVE_BOOSTS_FOR_PLAYER_LOADING_SYMBOL, BOOSTS_FOR_GROUP_LOADING_SYMBOL],
  ),
);

const getConnectedSportsbookEpics = (externalMode: boolean): TAppEpic => combineEpics(
  externalMode ? translatorConnectedEpic : noopEpic,
  sportsbookEpicByRoutes,
);

export { getConnectedSportsbookEpics };
