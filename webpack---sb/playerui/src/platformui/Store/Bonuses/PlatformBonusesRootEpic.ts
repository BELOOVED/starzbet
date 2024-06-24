import { EMPTY, interval, mergeMap, of, switchMap, take, throttle } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { routerEpic, routerLocationPathnameSelector } from "@sb/router";
import {
  isCreator,
  not,
  type TActionCreator,
  type TActionWithPayload,
  type TAnyObject,
  type TExplicitAny,
  withParams,
} from "@sb/utils";
import { matchPath, type TMatch } from "@sb/react-router-compat";
import {
  callManagerExistsSelector,
  callManagerRemoveSymbolAction,
  callManagerWasSucceededSelector,
} from "@sb/call-manager";
import { type TAppEpicWithBonuses } from "../../../common/Store/Root/Epics/TAppEpic";
import { getMatch } from "../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { availableAuthPlayerSelector } from "../../../common/Store/Player/Selectors/AvailableAuthPlayerSelector";
import { replaceLocalized } from "../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { combineEpicsWithFinalize } from "../../../common/Utils/EpicUtils/CombineEpicsWithFinalize";
import { routeMap } from "../../RouteMap/RouteMap";
import { localeSelector } from "../Locale/Selectors/localeSelector";
import {
  bonusEventDataModalClosedAction,
  changeBonusProductFilterAction,
  detailedAvailableBonusRequestedAction,
  playerBonusProceededToWageringStageAction,
} from "./BonusesActions";
import { claimBonusByPromoCodeEpic } from "./Epics/ClaimBonusByPromoCodeEpic";
import { cashbackBonusEpic } from "./Epics/CashbackEpics";
import { promoBonusEpic } from "./Epics/PromoBonusEpic";
import { unsettledBonusResourcesCountEpic } from "./Epics/UnsettledBonusResourcesCountEpic";
import { deprecatedBonusResourcesEpic } from "./Epics/DeprecatedBonusResourcesEpic";
import { bonusResourcesEpic } from "./Epics/BonusResourcesEpic";
import {
  loadAvailableAndPlayerBonusesEpic,
  loadAvailableBonusesEpic,
  loadDetailedAvailableBonusEpic,
  loadHistoryBonusEpicFactory,
  loadHistoryBonusesEpic,
  loadMyBonusEpicFactory,
  loadPlayerBonusesEpic,
} from "./Epics/LoadBonusEpics";
import { activateBonusEpic, cancelBonusEpic, claimBonusEpic } from "./Epics/BonusActionEpics";
import {
  AVAILABLE_BONUS_CALL_SYMBOL,
  AVAILABLE_BONUSES_CALL_SYMBOL,
  HISTORY_BONUS_CALL_SYMBOL,
  PLAYER_BONUS_CALL_SYMBOL,
} from "./BonusVariables";
import {
  isAvailableBonusRouteOutdatedSelector,
  isBonusHistoryRouteOutdatedSelector,
  isMyBonusRouteOutdatedSelector,
} from "./Selectors/OutdatedDetailsRouteSelectors";
import {
  availableBonusLoadingSelector,
  historyBonusLoadingSelector,
  playerBonusLoadingSelector,
} from "./Selectors/BonusCallManagerSelectors";
import { watchBonusInMainAppConnectedEpic } from "./Epics/WatchBonusInMainAppEpic";

const clearProductFilter$ = of(changeBonusProductFilterAction("all"));

const redirectOnOutdatedAvailableBonusRouteEpic = (id: string): TAppEpicWithBonuses => (_, state$) => state$.pipe(
  filter((state) => callManagerExistsSelector(state, AVAILABLE_BONUS_CALL_SYMBOL, id)),
  map(withParams(availableBonusLoadingSelector, id)),
  distinctUntilChanged(),
  filter(not<boolean>),
  switchMap(() => {
    const isOutdated = isAvailableBonusRouteOutdatedSelector(state$.value);

    return isOutdated
      ? of(replaceLocalized(localeSelector(state$.value), routeMap.availableBonusesRoute))
      : EMPTY;
  }),
);

const loadAvailableBonusWhenListSucceededEpic = (bonusId: string): TAppEpicWithBonuses =>
  (action$, state$, deps) => state$.pipe(
    map(withParams(callManagerWasSucceededSelector, AVAILABLE_BONUSES_CALL_SYMBOL)),
    filter(Boolean),
    take(1),
    switchMap(() => loadDetailedAvailableBonusEpic(bonusId, false)(action$, state$, deps)),
  );

const availableBonusRouterEpic = routerEpic({
  name: "availableBonusRouterEpic",
  match: getMatch({ path: routeMap.availableBonusRoute, exact: true }),
  onStart: ({ params: { id } }: TMatch<IWithId>): TAppEpicWithBonuses => combineEpicsWithFinalize(
    loadAvailableBonusWhenListSucceededEpic(id),
    redirectOnOutdatedAvailableBonusRouteEpic(id),
  )(
    callManagerRemoveSymbolAction(AVAILABLE_BONUS_CALL_SYMBOL, id),
  ),
});

const availableBonusesRouterEpic = routerEpic({
  name: "availableBonusesRouterEpic",
  match: getMatch({ path: routeMap.availableBonusesRoute, exact: true }),
  onStart: () => combineEpics(
    loadAvailableBonusesEpic,
    () => clearProductFilter$,
  ),
});

const redirectOnOutdatedMyBonusRouteEpic = (id: string): TAppEpicWithBonuses => (_, state$) => state$.pipe(
  filter((state) => callManagerExistsSelector(state, PLAYER_BONUS_CALL_SYMBOL, id)),
  map(withParams(playerBonusLoadingSelector, id)),
  distinctUntilChanged(),
  filter(not<boolean>),
  switchMap(() => {
    const isOutdated = isMyBonusRouteOutdatedSelector(state$.value);

    return isOutdated
      ? of(replaceLocalized(localeSelector(state$.value), routeMap.myBonusesRoute))
      : EMPTY;
  }),
);

const myBonusRouterEpic = routerEpic({
  name: "myBonusRouterEpic",
  match: getMatch<IWithId>({ path: routeMap.myBonusRoute, exact: true }),
  onStart: ({ params: { id } }: TMatch<IWithId>): TAppEpicWithBonuses => combineEpicsWithFinalize(
    loadMyBonusEpicFactory(id),
    redirectOnOutdatedMyBonusRouteEpic(id),
  )(
    callManagerRemoveSymbolAction(PLAYER_BONUS_CALL_SYMBOL, id),
  ),
  shouldRestart: restartOnParamsChanged,
});

const myBonusesRouterEpic = routerEpic({
  name: "myBonusesRouterEpic",
  match: getMatch({ path: routeMap.myBonusesRoute, exact: true }),
  onStart: () => combineEpics(
    loadPlayerBonusesEpic,
    () => clearProductFilter$,
  ),
});

const redirectOnOutdatedHistoryBonusRouteEpic = (id: string): TAppEpicWithBonuses => (_, state$) => state$.pipe(
  filter((state) => callManagerExistsSelector(state, HISTORY_BONUS_CALL_SYMBOL, id)),
  map(withParams(historyBonusLoadingSelector, id)),
  distinctUntilChanged(),
  filter(not<boolean>),
  switchMap(() => {
    const isOutdated = isBonusHistoryRouteOutdatedSelector(state$.value);

    return isOutdated
      ? of(replaceLocalized(localeSelector(state$.value), routeMap.historyBonusesRoute))
      : EMPTY;
  }),
);

const historyBonusRouterEpic = routerEpic({
  name: "historyBonusRouterEpic",
  match: getMatch<IWithId>({ path: routeMap.historyBonusRoute, exact: true }),
  onStart: ({ params: { id } }: TMatch<IWithId>): TAppEpicWithBonuses => combineEpicsWithFinalize(
    loadHistoryBonusEpicFactory(id),
    redirectOnOutdatedHistoryBonusRouteEpic(id),
  )(
    callManagerRemoveSymbolAction(HISTORY_BONUS_CALL_SYMBOL, id),
  ),
  shouldRestart: restartOnParamsChanged,
});

const historyBonusesRouterEpic = routerEpic({
  name: "historyBonusesRouterEpic",
  match: getMatch({ path: routeMap.historyBonusesRoute, exact: true }),
  onStart: () => combineEpics(
    loadHistoryBonusesEpic,
    () => clearProductFilter$,
  ),
});

// will be loaded by own routerEpics
const IGNORE_INIT_AVAILABLE_BONUSES_ROUTES = [
  routeMap.availableBonusesRoute,
  routeMap.vipClubOverviewBonusRoute,
];

const firstLoadAvailableBonusesEpic: TAppEpicWithBonuses = (action$, state$, deps) => {
  const pathname = routerLocationPathnameSelector(state$.value);
  const shouldIgnoreFirstLoad = Boolean(matchPath(
    pathname,
    {
      path: IGNORE_INIT_AVAILABLE_BONUSES_ROUTES,
      exact: true,
    },
  ));

  if (shouldIgnoreFirstLoad) {
    return EMPTY;
  }

  return loadAvailableBonusesEpic(action$, state$, deps);
};

// will be loaded by own routerEpics
const IGNORE_INIT_PLAYER_BONUSES_ROUTES = [
  routeMap.myBonusesRoute,
];

const firstLoadPlayerBonusesEpic: TAppEpicWithBonuses = (action$, state$, deps) => {
  const pathname = routerLocationPathnameSelector(state$.value);
  const shouldIgnoreFirstLoad = Boolean(matchPath(pathname, { path: IGNORE_INIT_PLAYER_BONUSES_ROUTES, exact: true }));

  if (shouldIgnoreFirstLoad) {
    return EMPTY;
  }

  return loadPlayerBonusesEpic(action$, state$, deps);
};

const TRIGGER_UPDATE_BONUSES_ACTIONS: TActionCreator<TExplicitAny, TActionWithPayload<{
  skipBonusUpdate?: boolean;
} & TAnyObject>>[] = [
  playerBonusProceededToWageringStageAction,
  bonusEventDataModalClosedAction,
];

const triggerUpdateBonusesEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(...TRIGGER_UPDATE_BONUSES_ACTIONS),
  filter(({ payload: { skipBonusUpdate } }) => !skipBonusUpdate),
  switchMap(() => loadAvailableAndPlayerBonusesEpic(action$, state$, deps)),
);

// todo make as reducer when migrate on redux-router
const redirectFromRootBonuses: TAppEpicWithBonuses = (_, state$) => state$.pipe(
  map(routerLocationPathnameSelector),
  filter((pathname) => !!matchPath(pathname, { path: routeMap.bonusesRoute, exact: true })),
  map(() => replaceLocalized(localeSelector(state$.value), routeMap.availableBonusesRoute)),
);

const handleDetailedAvailableBonusEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(detailedAvailableBonusRequestedAction),
  map(({ payload: { bonusId } }) => bonusId),
  throttle(() => interval(5_000)),
  mergeMap((bonusId) => loadDetailedAvailableBonusEpic(bonusId, false)(action$, state$, deps)),
);

// todo split epics into 2 - sb && pl_sb (remove from sb epics that required just for pl_sb)
const platformBonusesRootEpic: TAppEpicWithBonuses = (action$, state$, deps) => state$.pipe(
  map(availableAuthPlayerSelector),
  distinctUntilChanged(),
  switchMap((isPlayerAvailable) => {
    if (!isPlayerAvailable) {
      return EMPTY;
    }

    return combineEpics(
      // init
      // should be loaded cause cashback almost everywhere
      // also used on sb route for BetSlipPromotion and hints for picks
      // can be optimized by separate query for main cashback bonus / betSlipPromo bonuses
      // todo have sense?
      firstLoadAvailableBonusesEpic,
      // should be loaded to receive active bonuses, they are used to show additional wallets, in banking, on sb route for hints
      // todo possible to load just active? have sense? (on sb we need to load all of them anyway)
      firstLoadPlayerBonusesEpic,
      // base
      redirectFromRootBonuses,
      handleDetailedAvailableBonusEpic,
      triggerUpdateBonusesEpic, // pl_sb
      cashbackBonusEpic, // pl_sb
      promoBonusEpic, // pl_sb
      unsettledBonusResourcesCountEpic, // sb
      claimBonusByPromoCodeEpic, // sb
      bonusResourcesEpic, // sb
      claimBonusEpic,
      activateBonusEpic,
      cancelBonusEpic,
      // routes
      availableBonusRouterEpic,
      availableBonusesRouterEpic,
      myBonusesRouterEpic,
      myBonusRouterEpic,
      historyBonusesRouterEpic,
      historyBonusRouterEpic,
      // ws
      watchBonusInMainAppConnectedEpic,
      // deprecated
      deprecatedBonusResourcesEpic,
    )(action$, state$, deps);
  }),
);
export { platformBonusesRootEpic };
