import { createRootReducer, simpleReducer, type TActionWithPayload, type TExplicitAny, type TReducer } from "@sb/utils";
import { matchPath } from "@sb/react-router-compat";
import type { IWithRouterState } from "@sb/router";
import { routeMap } from "../../../RouteMap/RouteMap";
import {
  playerBonusesFetchedAction,
  playerBonusHasBeenActivatedAction,
  playerBonusHasBeenCanceledAction,
  playerBonusHasBeenCompletedAction,
  playerBonusHasBeenLostAction,
  playerBonusHasBeenWonAction,
  playerBonusProceededToWageringStageAction,
  playerBonusProgressHasBeenUpdatedAction,
} from "../../Bonuses/BonusesActions";
import { reloadGameLinkAction } from "../../PlayGamePage/Actions/PlayGameActions";
import { playGamePlayerBonusesReceivedAction } from "../../PlayGame/PlayGameActions";
import { type IWithBonusEvents, type TBonusEvent } from "../BonusEventsInitialState";
import { bonusEventsModalClosedAction } from "../BonusEventsActions";
import { bonusReceivedReducer } from "./BonusReceivedReducer";
import { bonusProgressUpdateReducer } from "./BonusProgressUpdateReducer";
import { bonusEventsCloseModalReducer } from "./BonusEventsCloseModalReducer";
import { bonusCloseAllModalsReducer } from "./BonusCloseAllModalsReducer";

type TBonusEventsWithRouter = IWithRouterState & IWithBonusEvents;

const simpleBonusEventReducer = <AC extends (...args: TExplicitAny[]) => TActionWithPayload<Record<string, unknown>>>(
  bonusStateKey: TBonusEvent,
  actionPayloadKey: keyof ReturnType<AC>["payload"],
) => simpleReducer<TBonusEventsWithRouter>([actionPayloadKey as string], ["bonusEvent", bonusStateKey]);

const playerBonusProceededToWageringStageReducer = simpleBonusEventReducer<typeof playerBonusProceededToWageringStageAction>("playerBonusProceededToWageringStage", "eventPayload");

const playerBonusHasBeenActivatedReducer: TReducer<TBonusEventsWithRouter, typeof playerBonusHasBeenActivatedAction> = (
  state,
  action,
) => action.payload.eventPayload.shouldBeShown || !!matchPath(state.router.current.pathname, routeMap.playGame)
  ? simpleBonusEventReducer<typeof playerBonusHasBeenActivatedAction>("playerBonusHasBeenActivated", "eventPayload")(state, action)
  : state;

const playerBonusHasBeenCanceledReducer: TReducer<TBonusEventsWithRouter, typeof playerBonusHasBeenCanceledAction> = (
  state,
  action,
) => action.payload.eventPayload.shouldBeShown || !!matchPath(state.router.current.pathname, routeMap.playGame)
  ? simpleBonusEventReducer<typeof playerBonusHasBeenCanceledAction>("playerBonusHasBeenCanceled", "eventPayload")(state, action)
  : state;

const playerBonusHasBeenWonReducer: TReducer<TBonusEventsWithRouter, typeof playerBonusHasBeenWonAction> = (
  state,
  action,
) => action.payload.eventPayload.shouldBeShown || !!matchPath(state.router.current.pathname, routeMap.playGame)
  ? simpleBonusEventReducer<typeof playerBonusHasBeenWonAction>("playerBonusHasBeenWon", "eventPayload")(state, action)
  : state;

const playerBonusHasBeenCompletedReducer: TReducer<TBonusEventsWithRouter, typeof playerBonusHasBeenCompletedAction> = (
  state,
  action,
) => action.payload.eventPayload.shouldBeShown || !!matchPath(state.router.current.pathname, routeMap.playGame)
  ? simpleBonusEventReducer<typeof playerBonusHasBeenCompletedAction>("playerBonusHasBeenCompleted", "eventPayload")(state, action)
  : state;

const playerBonusHasBeenLostReducer: TReducer<TBonusEventsWithRouter, typeof playerBonusHasBeenLostAction> = (
  state,
  action,
) => action.payload.eventPayload.shouldBeShown || !!matchPath(state.router.current.pathname, routeMap.playGame)
  ? simpleBonusEventReducer<typeof playerBonusHasBeenLostAction>("playerBonusHasBeenLost", "eventPayload")(state, action)
  : state;

const bonusEventsRootReducer = createRootReducer([
  [bonusReceivedReducer, playerBonusesFetchedAction],
  // TODO @Litavar @Ivanou @Mileika - Remove after full migrate to bonus events
  [bonusReceivedReducer, playGamePlayerBonusesReceivedAction],
  [bonusProgressUpdateReducer, playerBonusProgressHasBeenUpdatedAction],
  [playerBonusHasBeenCanceledReducer, playerBonusHasBeenCanceledAction],
  [playerBonusHasBeenActivatedReducer, playerBonusHasBeenActivatedAction],
  [playerBonusProceededToWageringStageReducer, playerBonusProceededToWageringStageAction],
  [playerBonusHasBeenWonReducer, playerBonusHasBeenWonAction],
  [playerBonusHasBeenCompletedReducer, playerBonusHasBeenCompletedAction],
  [playerBonusHasBeenLostReducer, playerBonusHasBeenLostAction],
  [bonusEventsCloseModalReducer, bonusEventsModalClosedAction],
  [bonusCloseAllModalsReducer, reloadGameLinkAction],
]);

export { bonusEventsRootReducer };
