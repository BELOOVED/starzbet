import { combineEpics } from "redux-observable";
import { distinctUntilChanged, first, map, switchMap } from "rxjs/operators";
import { EMPTY, merge, of, pipe } from "rxjs";
import { withParams } from "@sb/utils";
import { type TMixConnectedAppEpic } from "../../../common/Store/Root/Epics/TMixAppEpic";
import { playerIdNotNilSelector } from "../../../common/Store/Player/Selectors/PlayerSelectors";
import { createSubscribe } from "../../../common/Utils/EpicUtils/CreateSubscribe";
import {
  type IBonusCanceledPayload,
  type IBonusCompletedPayload,
  type IBonusLostPayload,
  type IBonusProgressUpdatedPayload,
  type IBonusWonPayload,
  type TBonusActivatedPayload,
  type TProceededToWageringStagePayload,
} from "../../Model/BonusWebSocketEvents";
import {
  playerBonusHasBeenActivatedAction,
  playerBonusHasBeenCanceledAction,
  playerBonusHasBeenCompletedAction,
  playerBonusHasBeenLostAction,
  playerBonusHasBeenWonAction,
  playerBonusProceededToWageringStageAction,
  playerBonusProgressHasBeenUpdatedAction,
} from "../Bonuses/BonusesActions";
import { playGameGameLoadedSelector } from "./PlayGameSelectors";
import { internalBonusMatchedWithGameNullableSelector } from "./BonusMatchedWithGameSelectors";

const whenGameLoaded = pipe(
  map(withParams(playGameGameLoadedSelector, undefined)),
  distinctUntilChanged(),
  first(Boolean),
);

/**
 * always subscribed:
 * - player_bonus_activated
 * - player_bonus_proceeded_to_wagering_stage
 *
 * subscribed when bonusMatchedWithGame (by bonusId):
 * - player_bonus_cancelled
 * - player_bonus_was_won
 * - player_bonus_was_completed
 * - player_bonus_was_lost
 * - player_bonus_wagering_progress_updated
 *
 * active bonuses for play route will be updated(handleBonusSocketEventEpic) on events:
 * - player_bonus_proceeded_to_wagering_stage
 * - player_bonus_activated
 * - player_bonus_cancelled
 * - player_bonus_was_won
 * - player_bonus_was_completed
 * - player_bonus_was_lost
 */
const watchBonusOnPlayGameRoute: TMixConnectedAppEpic = (action$, state$, deps) => state$.pipe(
  whenGameLoaded,
  switchMap(() => {
    const playerId = playerIdNotNilSelector(state$.value);

    return merge(
      createSubscribe<TProceededToWageringStagePayload>(
        `sumstats.bonus.player_bonus_proceeded_to_wagering_stage.${playerId}`,
        (payload) => () => of(playerBonusProceededToWageringStageAction(payload)),
        "[watchBonusOnPlayGameRoute] player_bonus_proceeded_to_wagering_stage failed",
      )(action$, state$, deps),
      createSubscribe<TBonusActivatedPayload>(
        `sumstats.bonus.player_bonus_activated.${playerId}.*`,
        (payload) => () => of(playerBonusHasBeenActivatedAction(payload)),
        "[watchBonusInMainAppEpic] player_bonus_activated failed",
      )(action$, state$, deps),
      state$.pipe(
        map((state) => internalBonusMatchedWithGameNullableSelector(state)?.id),
        distinctUntilChanged(),
        switchMap((playerBonusId) => {
          if (!playerBonusId) {
            return EMPTY;
          }

          return combineEpics(
            createSubscribe<IBonusCanceledPayload>(
              `sumstats.bonus.player_bonus_cancelled.${playerId}.${playerBonusId}`,
              (payload) => () => of(playerBonusHasBeenCanceledAction(payload)),
              "[watchBonusOnPlayGameRoute] player_bonus_cancelled failed",
            ),
            createSubscribe<IBonusWonPayload>(
              `sumstats.bonus.player_bonus_was_won.${playerId}.${playerBonusId}`,
              (payload) => () => of(playerBonusHasBeenWonAction(payload)),
              "[watchBonusOnPlayGameRoute] player_bonus_was_won failed",
            ),
            createSubscribe<IBonusCompletedPayload>(
              `sumstats.bonus.player_bonus_was_completed.${playerId}.${playerBonusId}`,
              (payload) => () => of(playerBonusHasBeenCompletedAction(payload)),
              "[watchBonusOnPlayGameRoute] player_bonus_was_completed failed",
            ),
            createSubscribe<IBonusLostPayload>(
              `sumstats.bonus.player_bonus_was_lost.${playerId}.${playerBonusId}`,
              (payload) => () => of(playerBonusHasBeenLostAction(payload)),
              "[watchBonusOnPlayGameRoute] player_bonus_was_lost failed",
            ),
            createSubscribe<IBonusProgressUpdatedPayload>(
              `sumstats.bonus.player_bonus_wagering_progress_updated.${playerId}.${playerBonusId}`,
              (payload) => () => of(playerBonusProgressHasBeenUpdatedAction(payload)),
              "[watchBonusOnPlayGameRoute] player_bonus_wagering_progress_updated failed",
            ),
          )(action$, state$, deps);
        }),
      ),
    );
  }),
);

export { watchBonusOnPlayGameRoute };
