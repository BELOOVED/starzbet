import { type TReducer } from "@sb/utils";
import { type IWithFavourites } from "../FavouritesState";
import { type toggleFavouriteEventIdAction } from "../FavouritesActions";

const toggleFavouriteEventIdReducer: TReducer<
  IWithFavourites, typeof toggleFavouriteEventIdAction
> = (state, { payload: { eventId } }) => ({
  ...state,
  favourites: {
    ...state.favourites,
    events: state.favourites.events.includes(eventId)
      ? state.favourites.events.filter((id) => id !== eventId)
      : [...state.favourites.events, eventId],
  },
});

export { toggleFavouriteEventIdReducer };
