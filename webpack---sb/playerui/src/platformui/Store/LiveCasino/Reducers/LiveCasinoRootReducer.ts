import { createRootReducer } from "@sb/utils";
import { liveCasinoToggleFavouriteAction } from "../LiveCasinoActions";
import { liveCasinoFavouritesSelector } from "../Selectors/LiveCasinoSelectors";
import { type TWithLiveCasinoState } from "../LiveCasinoInitialState";

const liveCasinoToggleFavouriteReducer = (
  state: TWithLiveCasinoState,
  { payload: { gameId } }: ReturnType<typeof liveCasinoToggleFavouriteAction>,
): TWithLiveCasinoState => {
  const favourites = liveCasinoFavouritesSelector(state);

  return {
    ...state,
    liveCasino: {
      ...state.liveCasino,
      favourites: favourites.includes(gameId)
        ? favourites.filter((it) => it !== gameId)
        : [...favourites, gameId],
    },
  };
};

const liveCasinoRootReducer = createRootReducer([
  [liveCasinoToggleFavouriteReducer, liveCasinoToggleFavouriteAction],
]);

export { liveCasinoRootReducer };
