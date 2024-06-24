import { createRootReducer } from "@sb/utils";
import { casinoToggleFavouriteAction } from "../CasinoActions";
import { casinoFavouritesSelector } from "../Selectors/CasinoSelectors";
import { type TWithCasinoState } from "../CasinoInitialState";

const casinoToggleFavouriteReducer = (
  state: TWithCasinoState,
  { payload: { gameId } }: ReturnType<typeof casinoToggleFavouriteAction>,
): TWithCasinoState => {
  const favourites = casinoFavouritesSelector(state);

  return {
    ...state,
    casino: {
      ...state.casino,
      favourites: favourites.includes(gameId)
        ? favourites.filter((it) => it !== gameId)
        : [...favourites, gameId],
    },
  };
};

const casinoRootReducer = createRootReducer([
  [casinoToggleFavouriteReducer, casinoToggleFavouriteAction],
]);

export { casinoRootReducer };
