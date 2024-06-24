import { combineEpics, type StateObservable } from "redux-observable";
import { distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { EMPTY, filter, from, ignoreElements, timer } from "rxjs";
import { isCreator, isNil, isNotNil, not, withParams } from "@sb/utils";
import { type TAppEpicWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import {
  getLocalStorage,
  localStorageKeys,
  setLocalStorage,
} from "../../../../common/Store/LocalStorage/localStorageKeys";
import { betSlipPromotionBonusIdSelector } from "../../../../sportsbookui/Store/BetSlip/Selectors/BetSlipSelectors";
import type { TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { profileSelectors } from "../../../../common/Store/Player/Selectors/ProfileSelectors";
import { getDateByTimeZone } from "../../../../common/Utils/GetDateByTimeZone";
import { betSlipChangePromotionBonusAction } from "../../../../sportsbookui/Store/BetSlip/BetSlipActions";
import { bonusHasBeenCreatedAction, playerBonusesFetchedAction } from "../BonusesActions";
import { TIME_LIMITATION_CHECK_INTERVAL } from "../Model/ClaimRulesTimeLimitations";
import { isAvailablePromotionBonusMatchedSelector } from "../Selectors/BetSlip/FreeBetLabelSelectors";

/**
 * remove created promoBonusId from awaited storage
 */
const handleBonusCreatedEpic: TAppEpicWithBonuses = (action$) => action$.pipe(
  isCreator(bonusHasBeenCreatedAction),
  tap(({ payload: { eventPayload: { bonusId } } }) => {
    const awaitedBonusIds = getLocalStorage<string[]>(localStorageKeys.awaitedPromotionBonusIds) ?? [];

    if (awaitedBonusIds.includes(bonusId)) {
      setLocalStorage(localStorageKeys.awaitedPromotionBonusIds, awaitedBonusIds.filter((it) => it !== bonusId));
    }
  }),
  ignoreElements(),
);

/**
 *  if bonusCreated Event wasn't received but player already receive bonus from awaited storage -
 *  dispatch bonusHasBeenCreatedAction to show him that it happens (info modal)
 *  todo mb mark event as synthetic to prevent bonus loading when info modal closed
 */
const handleAwaitedBonusFetchedEpic: TAppEpicWithBonuses = (action$) => action$.pipe(
  isCreator(playerBonusesFetchedAction),
  map(({ payload: { playerBonuses } }) => {
    const awaitedBonusIds = getLocalStorage<string[]>(localStorageKeys.awaitedPromotionBonusIds) ?? [];

    return playerBonuses.filter(({ bonusId }) => awaitedBonusIds.includes(bonusId));
  }),
  filter(isNotNil),
  switchMap((playerBonuses) => from(playerBonuses.map((it) => bonusHasBeenCreatedAction({
    bonusId: it.bonusId,
    playerBonusId: it.id,
    shouldBeShown: true,
  })))),
);

/**
 * promotionBonusId can be set in state just if it matched with picks in betslip
 * after it set we watch for match and if it doesn't -> clear it
 */
const watchForSelectedPromoBonusMatchEpic: TAppEpicWithBonuses = (_, state$) => state$.pipe(
  map(betSlipPromotionBonusIdSelector),
  distinctUntilChanged(),
  switchMap((promotionBonusId) => {
    if (isNil(promotionBonusId)) {
      return EMPTY;
    }

    return timer(0, TIME_LIMITATION_CHECK_INTERVAL).pipe(
      switchMap(() => {
        const timeZone = profileSelectors.timeZone(state$.value);

        const now = getDateByTimeZone(timeZone);

        const matchedSelector = withParams(isAvailablePromotionBonusMatchedSelector, promotionBonusId, now.getHours(), now.getMinutes());

        return (state$ as StateObservable<TMixAppState>).pipe(
          map(matchedSelector),
          distinctUntilChanged(),
          filter(not<boolean>),
          map(() => betSlipChangePromotionBonusAction(null)),
        );
      }),
    );
  }),
);

const promoBonusEpic = combineEpics(
  handleBonusCreatedEpic,
  handleAwaitedBonusFetchedEpic,
  watchForSelectedPromoBonusMatchEpic,
);

export { promoBonusEpic };
