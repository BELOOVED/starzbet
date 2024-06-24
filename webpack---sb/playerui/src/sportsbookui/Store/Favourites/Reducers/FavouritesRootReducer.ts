import { createRootReducer } from "@sb/utils";
import { restoreFavouritesAction, toggleFavouriteEventIdAction, toggleFavouriteTournamentIdAction } from "../FavouritesActions";
import { restoreFavouritesReducer } from "./RestoreFavouritesReducer";
import { toggleFavouriteEventIdReducer } from "./ToggleFavouriteEventIdReducer";
import { toggleFavouriteTournamentIdReducer } from "./ToggleFavouriteTournamentIdReducer";

const favouritesRootReducer = createRootReducer([
  [toggleFavouriteEventIdReducer, toggleFavouriteEventIdAction],
  [restoreFavouritesReducer, restoreFavouritesAction],
  [toggleFavouriteTournamentIdReducer, toggleFavouriteTournamentIdAction],
]);

export { favouritesRootReducer };
