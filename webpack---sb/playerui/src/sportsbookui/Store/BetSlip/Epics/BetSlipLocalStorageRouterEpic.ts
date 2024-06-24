import { distinctUntilChanged, filter, map, skip } from "rxjs/operators";
import { EMPTY, ignoreElements, merge, of, tap } from "rxjs";
import { deepEqual } from "fast-equals";
import { isNil, isNotNil } from "@sb/utils";
import { routerEpic } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { KIRON_ROUTES, SPORTSBOOK_ROUTES } from "../../../RouteMap/SBRoutesModel";
import { routeMap } from "../../../RouteMap/RouteMap";
import { hasEditableBet } from "../../MyBets/Selectors/MyBetsSelectors";
import { betSlipPicksSelector } from "../Selectors/BetSlipPicksSelectors";
import { betGroupSelector, betSlipPickByOutcomeIdSelector } from "../Selectors/BetSlipSelectors";
import { betSlipChangeBetGroupAction, betSlipRemoveAllPickAction } from "../BetSlipActions";
import { availableBetGroupSelector } from "../Selectors/AvailableBetGroupSelector";
import { type EBetGroup } from "../Model/BetGroup";
import { type BasePick, type TLocalStoragePick, VirtualGamePick } from "../Model/BetPick";
import { betSlipLocalStorageKeySelector } from "../Selectors/BetSlipLocalStorageKeysSelector";
import { getPicksFromLocalStorage } from "./GetPicksFromLocalStorage";
import { waitMainLineIsReadyEpic } from "./WaitMainLineIsReadyEpic";
import { getAvailableOutrightOutcomes } from "./GetAvailableOutrightOutcomes";
import { getAvailableEventOutcomes } from "./GetAvailableEventOutcomes";
import { doRestorePicks } from "./DoRestorePicks";

const isExistedPick = (pick: BasePick | VirtualGamePick | undefined): pick is BasePick | VirtualGamePick => pick !== undefined;

const preparePicksToStore = (picks: (BasePick | VirtualGamePick)[]) => picks.map((pick) => {
  if (pick instanceof VirtualGamePick) {
    return null;
  }

  const { eventId, outcomeId, outrightId } = pick;

  return isNotNil(outrightId)
    ? {
      outrightId,
      outcomeId,
    }
    : { eventId, outcomeId };
}).filter(isNotNil);

const watchPicksChangeAndStoreThemEpic: TAppEpic = (action$, state$) => state$.pipe(
  map(betSlipPicksSelector),
  //
  skip(1),
  distinctUntilChanged(deepEqual),
  filter(() => !hasEditableBet(state$.value)),
  tap((picks: ReturnType<typeof betSlipPicksSelector>) => {
    const picksToStore = preparePicksToStore(picks);

    const key = betSlipLocalStorageKeySelector(state$.value);

    setLocalStorage(key, picksToStore);
  }),
  ignoreElements(),
);

const restorePicksFromStorageEpic: TAppEpic = (action$, state$) => {
  const picksFromStorage: TLocalStoragePick[] = getPicksFromLocalStorage(state$.value);

  const eventOutcomesMap = {} as Record<string, string[]>;

  const outrightOutcomes = [] as string[];

  const picks = picksFromStorage
    .map((item) => betSlipPickByOutcomeIdSelector(state$.value, item.outcomeId));

  const existInBetslip = picks
    .filter(isExistedPick)
    .map((it) => it.outcomeId);

  picksFromStorage.forEach((pick) => {
    if (existInBetslip.includes(pick.outcomeId)) {
      return;
    }

    if (pick.outrightId) {
      outrightOutcomes.push(pick.outcomeId);

      return;
    }

    const { eventId, outcomeId } = pick;

    if (!eventId) {
      return;
    }

    if (!eventOutcomesMap.hasOwnProperty(eventId)) {
      eventOutcomesMap[eventId] = [];
    }

    const item = eventOutcomesMap[eventId];

    if (!item) {
      return;
    }

    item.push(outcomeId);
  });

  const availableOutrightOutcomes = getAvailableOutrightOutcomes(state$, outrightOutcomes);

  const availableEventOutcomes = getAvailableEventOutcomes(state$, eventOutcomesMap);

  if (availableOutrightOutcomes.length === 0 && availableEventOutcomes.length === 0) {
    return EMPTY;
  }

  return doRestorePicks(state$, availableOutrightOutcomes, availableEventOutcomes);
};

const restoreBetGroupsFromStorageEpic: TAppEpic = (action$, state$) => {
  const groupFromStorage: EBetGroup = getLocalStorage(localStorageKeys.betGroup);

  if (isNil(groupFromStorage)) {
    return EMPTY;
  }

  const currentGroup = betGroupSelector(state$.value);

  if (groupFromStorage === currentGroup) {
    return EMPTY;
  }

  const availableBetGroup = availableBetGroupSelector(state$.value);

  if (availableBetGroup.includes(groupFromStorage)) {
    return of(betSlipChangeBetGroupAction(groupFromStorage));
  }

  return EMPTY;
};

const betSlipLocalStorageEpic: TAppEpic = (action$, state$, dependencies) => merge(
  of(betSlipRemoveAllPickAction()),
  waitMainLineIsReadyEpic(
    (action$, state$, dependencies) => merge(
      restorePicksFromStorageEpic(action$, state$, dependencies),
      restoreBetGroupsFromStorageEpic(action$, state$, dependencies),
      watchPicksChangeAndStoreThemEpic(action$, state$, dependencies),
    ),
  )(action$, state$, dependencies),
);

const betSlipLocalStorageRouterEpic: TAppEpic = routerEpic({
  name: "betSlipLocalStorageRouterEpic",
  match: getMatch(SPORTSBOOK_ROUTES),
  onStart: () => betSlipLocalStorageEpic,
  shouldRestart: (prev, next) => {
    if (!prev || !next) {
      return false;
    }

    const isPrevBetSlip = !!matchPath(prev.path, routeMap.betSlip);
    const isNextBetSlip = !!matchPath(next.path, routeMap.betSlip);

    if (isPrevBetSlip || isNextBetSlip) {
      return false;
    }

    const isPrevKiron = !!matchPath(prev.path, KIRON_ROUTES);
    const isNextKiron = !!matchPath(next.path, KIRON_ROUTES);

    return isPrevKiron ? !isNextKiron : isNextKiron;
  },
});

export { betSlipLocalStorageRouterEpic };
