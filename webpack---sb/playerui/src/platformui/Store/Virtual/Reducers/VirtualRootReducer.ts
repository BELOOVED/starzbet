import { createRootReducer } from "@sb/utils";
import { virtualToggleFavouriteAction } from "../VirtualActions";
import { virtualFavouritesSelector } from "../Selectors/VirtualSelectors";
import { type TWithVirtualState } from "../VirtualInitialState";

const virtualToggleFavouriteReducer = (
  state: TWithVirtualState,
  { payload: { gameId } }: ReturnType<typeof virtualToggleFavouriteAction>,
): TWithVirtualState => {
  const favourites = virtualFavouritesSelector(state);

  return {
    ...state,
    virtual: {
      ...state.virtual,
      favourites: favourites.includes(gameId)
        ? favourites.filter((it) => it !== gameId)
        : [...favourites, gameId],
    },
  };
};

const virtualRootReducer = createRootReducer([
  [virtualToggleFavouriteReducer, virtualToggleFavouriteAction],
]);

export { virtualRootReducer };
