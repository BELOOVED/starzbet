import { createRootReducer } from "@sb/utils";
import { betSlipCreatePickAction } from "../../BetSlip/BetSlipActions";
import {
  addDockToSideEventAction,
  addEventToMultiViewAction,
  addLiveViewAction,
  changeLiveSelectedMapAction,
  completeInsertEventInMultiViewAction,
  completeSwapEventInMultiViewAction,
  liveAddClosableSportIdAction,
  liveAddClosableSportIdsAction,
  liveAddClosableTournamentIdAction,
  liveAddFavoriteAction,
  liveChangeSportIdAction,
  liveFavoritesFetchedAction,
  liveRemoveClosableSportIdAction,
  liveRemoveClosableTournamentIdAction,
  liveRemoveFavoriteAction,
  liveToggleFavouriteAction,
  liveTogglePinEventAction,
  moveDockedEventToMultiViewAction,
  removeDockToSideEventAction,
  removeEventFromMultiViewAction,
  removeLiveViewAction,
  setLiveOnlyVideoAction,
  setLiveOnlyWidgetAction,
  setStreamingTabAction,
  setVideoIdAction,
  showLiveViewAction,
  startInsertEventInMultiViewAction,
  startSwapEventInMultiViewAction,
  swapEventInMultiViewAction,
  toggleDockedEventAction,
} from "../LiveActions";
import { addDockToSideEventReducer } from "./AddDockToSideEventReducer";
import { collapseAllDockedEventReducer } from "./CollapseAllDockedEventReducer";
import { completeInsertEventInMultiViewReducer } from "./CompleteInsertEventInMultiViewReducer";
import { completeSwapEventInMultiViewReducer } from "./CompleteSwapEventInMultiViewReducer";
import { liveAddFavoriteReducer } from "./LiveAddFavoriteReducer";
import { liveRemoveFavoriteReducer } from "./LiveRemoveFavoriteReducer";
import { liveChangeSportIdReducer } from "./LiveChangeSportIdReducer";
import { liveAddClosableSportIdReducer } from "./LiveAddClosableSportIdReducer";
import { liveRemoveClosableSportIdReducer } from "./LiveRemoveClosableSportIdReducer";
import { liveAddClosableTournamentIdReducer } from "./LiveAddClosableTournamentIdReducer";
import { liveRemoveClosableTournamentIdReducer } from "./LiveRemoveClosableTournamentIdReducer";
import { liveToggleFavouritesReducer } from "./LiveToggleFavouritesReducer";
import { liveFavoritesFetchedReducer } from "./LiveFavoritesFetchedReducer";
import { addLiveViewReducer } from "./AddLiveViewReducer";
import { moveDockedEventToMultiViewReducer } from "./MoveDockedEventToMultiViewReducer";
import { removeDockToSideEventReducer } from "./RemoveDockToSideEventReducer";
import { removeLiveViewReducer } from "./RemoveLiveViewReducer";
import { showLiveViewReducer } from "./ShowLiveViewReducer";
import { changeLiveSelectedMapReducer } from "./ChangeLiveSelectedMapReducer";
import { liveTogglePinEventReducer } from "./LiveTogglePinEventReducer";
import { startInsertEventInMultiViewReducer } from "./StartInsertEventInMultiViewReducer";
import { startSwapEventInMultiViewReducer } from "./StartSwapEventInMultiViewReducer";
import { toggleDockedEventReducer } from "./ToggleDockedEventReducer";
import { setLiveOnlyWidgetReducer } from "./SetLiveOnlyWidgetReducer";
import { setLiveOnlyVideoReducer } from "./SetLiveOnlyVideoReducer";
import { setStreamingTabReducer } from "./SetStreamingTabReducer";
import { setVideoIdReducer } from "./SetVideoIdReducer";
import { liveAddClosableSportIdsReducer } from "./LiveAddClosableSportIdsReducer";

const liveRootReducer = createRootReducer([
  [liveAddFavoriteReducer, liveAddFavoriteAction],
  [liveRemoveFavoriteReducer, liveRemoveFavoriteAction],
  [liveChangeSportIdReducer, liveChangeSportIdAction],
  [liveAddClosableSportIdReducer, liveAddClosableSportIdAction],
  [liveAddClosableSportIdsReducer, liveAddClosableSportIdsAction],
  [liveRemoveClosableSportIdReducer, liveRemoveClosableSportIdAction],
  [liveAddClosableTournamentIdReducer, liveAddClosableTournamentIdAction],
  [liveRemoveClosableTournamentIdReducer, liveRemoveClosableTournamentIdAction],
  [liveToggleFavouritesReducer, liveToggleFavouriteAction],
  [liveFavoritesFetchedReducer, liveFavoritesFetchedAction],
  [addLiveViewReducer, addLiveViewAction],
  [addLiveViewReducer, addEventToMultiViewAction],
  [removeLiveViewReducer, removeLiveViewAction],
  [removeLiveViewReducer, removeEventFromMultiViewAction],
  [showLiveViewReducer, showLiveViewAction],
  [changeLiveSelectedMapReducer, changeLiveSelectedMapAction],
  [liveTogglePinEventReducer, liveTogglePinEventAction],
  [addDockToSideEventReducer, addDockToSideEventAction],
  [removeDockToSideEventReducer, removeDockToSideEventAction],
  [toggleDockedEventReducer, toggleDockedEventAction],
  [collapseAllDockedEventReducer, betSlipCreatePickAction],
  [startSwapEventInMultiViewReducer, startSwapEventInMultiViewAction],
  [completeSwapEventInMultiViewReducer, completeSwapEventInMultiViewAction],
  [completeInsertEventInMultiViewReducer, completeInsertEventInMultiViewAction],
  [removeLiveViewReducer, swapEventInMultiViewAction],
  [startInsertEventInMultiViewReducer, startInsertEventInMultiViewAction],
  [moveDockedEventToMultiViewReducer, moveDockedEventToMultiViewAction],
  [setLiveOnlyWidgetReducer, setLiveOnlyWidgetAction],
  [setLiveOnlyVideoReducer, setLiveOnlyVideoAction],
  [setStreamingTabReducer, setStreamingTabAction],
  [setVideoIdReducer, setVideoIdAction],
]);

export { liveRootReducer };
