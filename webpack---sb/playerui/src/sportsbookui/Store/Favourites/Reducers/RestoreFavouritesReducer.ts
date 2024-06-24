import { type TReducer } from "@sb/utils";
import { type IWithFavourites } from "../FavouritesState";
import { type restoreFavouritesAction } from "../FavouritesActions";

const restoreFavouritesReducer: TReducer<IWithFavourites, typeof restoreFavouritesAction> = (state, { payload: { favourites } }) => ({
  ...state,
  favourites,
});

export { restoreFavouritesReducer };
