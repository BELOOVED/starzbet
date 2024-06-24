import { combineEpics } from "redux-observable";
import { type TAppEpicWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import {
  AVAILABLE_BONUS_CALL_SYMBOL,
  AVAILABLE_BONUSES_CALL_SYMBOL,
  HISTORY_BONUS_CALL_SYMBOL,
  HISTORY_BONUSES_CALL_SYMBOL,
  PLAYER_BONUS_CALL_SYMBOL,
  PLAYER_BONUSES_CALL_SYMBOL,
} from "../BonusVariables";
import {
  historyBonusesFetchedAction,
  historyBonusFetchedAction,
  playerBonusesFetchedAction,
  playerBonusFetchedAction,
} from "../BonusesActions";
import {
  loadAvailableBonusEpicFactory,
  loadAvailableBonusesEpicFactory,
} from "./LoadEpicFactories/LoadAvailableBonusesEpicFactory";
import {
  activePlayerBonusesStatusOperand,
  finishedPlayerBonusesStatusOperand,
  getPlayerBonusFinishedAtOperand,
  historyBonusOrderBy,
  loadPlayerBonusEpicFactory,
  loadPlayerBonusesEpicFactory,
} from "./LoadEpicFactories/LoadPlayerBonusesEpicFactory";

const loadDetailedAvailableBonusEpic = (bonusId: string, ignoreNullResponseError: boolean) => loadAvailableBonusEpicFactory(
  bonusId,
  [AVAILABLE_BONUS_CALL_SYMBOL, bonusId],
  ignoreNullResponseError,
);

const loadAvailableBonusesEpic = loadAvailableBonusesEpicFactory(AVAILABLE_BONUSES_CALL_SYMBOL);

const loadMyBonusEpicFactory = (playerBonusId: string): TAppEpicWithBonuses => loadPlayerBonusEpicFactory(
  playerBonusId,
  [PLAYER_BONUS_CALL_SYMBOL, playerBonusId],
  playerBonusFetchedAction,
);

const loadPlayerBonusesEpic = loadPlayerBonusesEpicFactory(
  PLAYER_BONUSES_CALL_SYMBOL,
  playerBonusesFetchedAction,
  [activePlayerBonusesStatusOperand],
);

const loadHistoryBonusEpicFactory = (playerBonusId: string) => loadPlayerBonusEpicFactory(
  playerBonusId,
  [HISTORY_BONUS_CALL_SYMBOL, playerBonusId],
  historyBonusFetchedAction,
  [finishedPlayerBonusesStatusOperand, getPlayerBonusFinishedAtOperand()],
);

const loadHistoryBonusesEpic = loadPlayerBonusesEpicFactory(
  HISTORY_BONUSES_CALL_SYMBOL,
  historyBonusesFetchedAction,
  [finishedPlayerBonusesStatusOperand, getPlayerBonusFinishedAtOperand()],
  { orderBy: [historyBonusOrderBy] },
);

const loadAvailableAndPlayerBonusesEpic = combineEpics(loadAvailableBonusesEpic, loadPlayerBonusesEpic);

export {
  loadDetailedAvailableBonusEpic,
  loadAvailableBonusesEpic,
  loadMyBonusEpicFactory,
  loadPlayerBonusesEpic,
  loadHistoryBonusEpicFactory,
  loadHistoryBonusesEpic,
  loadAvailableAndPlayerBonusesEpic,
};
