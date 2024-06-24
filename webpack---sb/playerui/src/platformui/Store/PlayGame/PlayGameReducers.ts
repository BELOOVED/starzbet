import {
  createRootReducer,
  getNotNil,
  simpleReducer,
  type TActionWithPayload,
  type TExplicitAny,
  type TReducer,
} from "@sb/utils";
import {
  playerBonusHasBeenActivatedAction,
  playerBonusHasBeenCanceledAction,
  playerBonusHasBeenCompletedAction,
  playerBonusHasBeenLostAction,
  playerBonusHasBeenWonAction,
  playerBonusProceededToWageringStageAction,
} from "../Bonuses/BonusesActions";
import type { IWithPlatformBonusesState } from "../Bonuses/BonusesInitialState";
import { isPlayerBonusOnWageringStage } from "../Bonuses/Utils/CommonBonusUtils";
import {
  playGameGameReceivedAction,
  playGameLinkReceivedAction,
  playGamePlayerBonusesReceivedAction,
  playGamePlayerBonusRemoveAllEventDataAction,
  playGamePlayerBonusRemoveEventDataAction,
} from "./PlayGameActions";
import { type TWithPlayGameState } from "./PlayGameState";

const simplePlayGameReducer = <AC extends (...args: TExplicitAny[]) => TActionWithPayload<Record<string, unknown>>>(
  bonusStateKey: keyof TWithPlayGameState["playGame"],
  actionPayloadKey: keyof ReturnType<AC>["payload"],
) => simpleReducer<IWithPlatformBonusesState>([actionPayloadKey as string], ["playGame", bonusStateKey]);

const playGameGameReceivedReducer = simplePlayGameReducer<typeof playGameGameReceivedAction>("game", "game");

const playGameLinkReceivedReducer: TReducer<TWithPlayGameState, typeof playGameLinkReceivedAction> = (
  state,
  { payload: { link, type } },
) => ({
  ...state,
  playGame: {
    ...state.playGame,
    link,
    type,
  },
});

const playGamePlayerBonusesReceivedReducer: TReducer<TWithPlayGameState, typeof playGamePlayerBonusesReceivedAction> = (
  state,
  { payload: { playerBonuses } },
) => {
  const bonusOnWageringStage = playerBonuses.find(isPlayerBonusOnWageringStage);

  return ({
    ...state,
    playGame: {
      ...state.playGame,
      playerBonuses,
      wageringProgress: bonusOnWageringStage
        ? {
          current: getNotNil(bonusOnWageringStage.currentWagering?.system, ["playGamePlayerBonusesReceivedReducer"], "currentWagering"),
          total: getNotNil(bonusOnWageringStage.totalWagering?.system, ["playGamePlayerBonusesReceivedReducer"], "totalWagering"),
        }
        : null,
    },
  });
};

const playerBonusHasBeenCanceledReducer = simplePlayGameReducer<typeof playerBonusHasBeenCanceledAction>("playerBonusHasBeenCanceled", "eventPayload");
const playerBonusHasBeenWonReducer = simplePlayGameReducer<typeof playerBonusHasBeenWonAction>("playerBonusHasBeenWon", "eventPayload");
const playerBonusHasBeenCompletedReducer = simplePlayGameReducer<typeof playerBonusHasBeenCompletedAction>("playerBonusHasBeenCompleted", "eventPayload");
const playerBonusHasBeenLostReducer = simplePlayGameReducer<typeof playerBonusHasBeenLostAction>("playerBonusHasBeenLost", "eventPayload");
const playerBonusHasBeenActivatedReducer = simplePlayGameReducer<typeof playerBonusHasBeenActivatedAction>("playerBonusHasBeenActivated", "eventPayload");
const playerBonusProceededToWageringStageReducer = simplePlayGameReducer<typeof playerBonusProceededToWageringStageAction>("playerBonusProceededToWageringStage", "eventPayload");

const playGamePlayerBonusRemoveEventDataReducer: TReducer<TWithPlayGameState, typeof playGamePlayerBonusRemoveEventDataAction> = (
  state,
  { payload: { eventStateKey } },
): TWithPlayGameState => ({
  ...state,
  playGame: {
    ...state.playGame,
    [eventStateKey]: null,
  },
});

const playGamePlayerBonusRemoveAllEventDataReducer: TReducer<TWithPlayGameState, typeof playGamePlayerBonusRemoveAllEventDataAction> = (
  state,
) => ({
  ...state,
  playGame: {
    ...state.playGame,
    playerBonusHasBeenCanceled: null,
    playerBonusHasBeenCompleted: null,
    playerBonusHasBeenLost: null,
    playerBonusHasBeenWon: null,
    playerBonusHasBeenActivated: null,
    playerBonusProceededToWageringStage: null,
  },
});

const playGameRootReducer = createRootReducer([
  [playGameLinkReceivedReducer, playGameLinkReceivedAction],
  [playGameGameReceivedReducer, playGameGameReceivedAction],
  [playGamePlayerBonusesReceivedReducer, playGamePlayerBonusesReceivedAction],
  [playerBonusHasBeenCanceledReducer, playerBonusHasBeenCanceledAction],
  [playerBonusHasBeenActivatedReducer, playerBonusHasBeenActivatedAction],
  [playerBonusProceededToWageringStageReducer, playerBonusProceededToWageringStageAction],
  [playerBonusHasBeenWonReducer, playerBonusHasBeenWonAction],
  [playerBonusHasBeenCompletedReducer, playerBonusHasBeenCompletedAction],
  [playerBonusHasBeenLostReducer, playerBonusHasBeenLostAction],
  [playGamePlayerBonusRemoveEventDataReducer, playGamePlayerBonusRemoveEventDataAction],
  [playGamePlayerBonusRemoveAllEventDataReducer, playGamePlayerBonusRemoveAllEventDataAction],
]);

export { playGameRootReducer };
