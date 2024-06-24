import { merge, of } from "rxjs";
import type { Epic } from "redux-observable";
import type { Action } from "redux";
import { playerIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { createSubscribe } from "../../../../common/Utils/EpicUtils/CreateSubscribe";
import { gainThemeContext } from "../../../../common/Utils/ThemeContext";
import type { IWithPlayerState } from "../../../../common/Store/Player/InitialState/PlayerInitialState";
import {
  createConnectedByRouteEpic,
  type IDepsWithConnection,
} from "../../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { whenLoggedAndWsAuthenticatedEpic } from "../../../../common/Store/WsAuth/WsAuthEpic";
import { whenPlayerIdExist } from "../../../../common/Store/Player/Epics/WhenPlayerIdExist";
import { routeMap } from "../../../../sportsbookui/RouteMap/RouteMap";
import type { TAppEpicWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import {
  type IBonusCanceledPayload,
  type IBonusCompletedPayload,
  type IBonusCreatedPayload,
  type IBonusLostPayload,
  type IBonusWonPayload,
  type TBonusActivatedPayload,
  type TProceededToWageringStagePayload,
} from "../../../Model/BonusWebSocketEvents";
import {
  bonusHasBeenCreatedAction,
  playerBonusHasBeenActivatedAction,
  playerBonusHasBeenCanceledAction,
  playerBonusHasBeenCompletedAction,
  playerBonusHasBeenLostAction,
  playerBonusHasBeenWonAction,
  playerBonusProceededToWageringStageAction,
} from "../BonusesActions";

const watchBonusInMainAppEpic: Epic<Action, Action, IWithPlayerState, IDepsWithConnection> = (action$, state$, deps) => {
  const playerId = playerIdNotNilSelector(state$.value);

  return merge(
    ...[
      createSubscribe<TProceededToWageringStagePayload>(
        `sumstats.bonus.player_bonus_proceeded_to_wagering_stage.${playerId}`,
        (payload) => () => of(playerBonusProceededToWageringStageAction(payload)),
        "[watchBonusInMainAppEpic] player_bonus_proceeded_to_wagering_stage failed",
      ),
      createSubscribe<IBonusCreatedPayload>(
        `sumstats.bonus.player_bonus_created.${playerId}`,
        (payload) => () => {
          const shouldBeShown = gainThemeContext().static.find("alwaysShowBonusCreatedModal") || payload.shouldBeShown;

          return of(bonusHasBeenCreatedAction({ ...payload, shouldBeShown }));
        },
        "[watchBonusInMainAppEpic] player_bonus_created failed",
      ),
      createSubscribe<TBonusActivatedPayload>(
        `sumstats.bonus.player_bonus_activated.${playerId}.*`,
        (payload) => () => of(playerBonusHasBeenActivatedAction(payload)),
        "[watchBonusInMainAppEpic] player_bonus_activated failed",
      ),
      createSubscribe<IBonusCanceledPayload>(
        `sumstats.bonus.player_bonus_cancelled.${playerId}.*`,
        (payload) => () => of(playerBonusHasBeenCanceledAction(payload)),
        "[watchBonusInMainAppEpic] player_bonus_cancelled failed",
      ),
      createSubscribe<IBonusWonPayload>(
        `sumstats.bonus.player_bonus_was_won.${playerId}.*`,
        (payload) => () => of(playerBonusHasBeenWonAction(payload)),
        "[watchBonusInMainAppEpic] player_bonus_was_won failed",
      ),
      createSubscribe<IBonusCompletedPayload>(
        `sumstats.bonus.player_bonus_was_completed.${playerId}.*`,
        (payload) => () => of(playerBonusHasBeenCompletedAction(payload)),
        "[watchBonusInMainAppEpic] player_bonus_was_completed failed",
      ),
      createSubscribe<IBonusLostPayload>(
        `sumstats.bonus.player_bonus_was_lost.${playerId}.*`,
        (payload) => () => of(playerBonusHasBeenLostAction(payload)),
        "[watchBonusInMainAppEpic] player_bonus_was_lost failed",
      ),
    ].map((epic) => epic(action$, state$, deps)),
  );
};

const watchBonusInMainAppConnectedEpic: TAppEpicWithBonuses = whenLoggedAndWsAuthenticatedEpic(
  whenPlayerIdExist(
    createConnectedByRouteEpic([routeMap.any], watchBonusInMainAppEpic),
  ),
);

export { watchBonusInMainAppConnectedEpic };
