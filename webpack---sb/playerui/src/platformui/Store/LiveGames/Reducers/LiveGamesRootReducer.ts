import { createRootReducer } from "@sb/utils";
import { liveGamesToggleFavouriteAction } from "../LiveGamesActions";
import { liveGamesFavouritesSelector } from "../Selectors/LiveGamesSelectors";
import { type TWithLiveGamesState } from "../LiveGamesInitialState";

const liveGamesToggleFavouriteReducer = (
  state: TWithLiveGamesState,
  { payload: { gameId } }: ReturnType<typeof liveGamesToggleFavouriteAction>,
): TWithLiveGamesState => {
  const favourites = liveGamesFavouritesSelector(state);

  return {
    ...state,
    liveGames: {
      ...state.liveGames,
      favourites: favourites.includes(gameId)
        ? favourites.filter((it) => it !== gameId)
        : [...favourites, gameId],
    },
  };
};

const liveGamesRootReducer = createRootReducer([
  [liveGamesToggleFavouriteReducer, liveGamesToggleFavouriteAction],
]);

export { liveGamesRootReducer };
