import { createRootReducer } from "@sb/utils";
import {
  changePreLiveSelectedMapAction,
  preLiveFavoritesFetchedAction,
  preLiveSetRootRouteAction,
  preLiveSportIdAction,
  preLiveToggleFavouriteAction,
  preLiveTogglePinEventAction,
  resetPreLiveCustomAction,
  setPreLiveCustomAction,
} from "../PreLiveActions";
import { preLiveSportIdReducer } from "./PreLiveSportIdReducer";
import { preLiveToggleFavouriteReducer } from "./PreLiveToggleFavouriteReducer";
import { preLiveFavoritesFetchedReducer } from "./PreLiveFavoritesFetchedReducer";
import { preLiveSetRootRouteReducer } from "./PreLiveSetRootRouteReducer";
import { changePreLiveSelectedMapReducer } from "./ChangePreLiveSelectedMapReducer";
import { preLiveTogglePinEventReducer } from "./PreLiveTogglePinEventReducer";
import { setPreLiveCustomReducer } from "./SetPreLiveCustomReducer";
import { resetPreLiveCustomReducer } from "./ResetPreLiveCustomReducer";

const preLiveRootReducer = createRootReducer([
  [preLiveSportIdReducer, preLiveSportIdAction],
  [preLiveToggleFavouriteReducer, preLiveToggleFavouriteAction],
  [preLiveFavoritesFetchedReducer, preLiveFavoritesFetchedAction],
  [preLiveSetRootRouteReducer, preLiveSetRootRouteAction],
  [changePreLiveSelectedMapReducer, changePreLiveSelectedMapAction],
  [preLiveTogglePinEventReducer, preLiveTogglePinEventAction],
  [setPreLiveCustomReducer, setPreLiveCustomAction],
  [resetPreLiveCustomReducer, resetPreLiveCustomAction],
]);

export { preLiveRootReducer };
