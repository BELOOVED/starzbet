import { type TRootReducer } from "../../../../common/Store/Root/TRootReducer";
import { addToRecentlyPlayedAction, overwriteRecentlyPlayedAction } from "../Actions/GamesRecentlyPlayedActions";
import { addUniq } from "../Utils/GameUtils";

const overwriteRecentlyPlayedReducer: TRootReducer<typeof overwriteRecentlyPlayedAction> = (
  state,
  { payload: { games } },
) => ({
  ...state,
  games: {
    ...state.games,
    games: addUniq(state.games.games, games),
    recentlyGames: games.map(({ id }) => id),
  },
});

const addToRecentlyPlayedReducer: TRootReducer<typeof addToRecentlyPlayedAction> = (
  state,
  { payload: { gameId } },
) => {
  const filtered = state.games.recentlyGames
    .filter((id) => id !== gameId);

  filtered.unshift(gameId);

  return ({
    ...state,
    games: {
      ...state.games,
      recentlyGames: filtered,
    },
  });
};

const gamesRecentlyPlayedRootReducer = [
  [overwriteRecentlyPlayedReducer, overwriteRecentlyPlayedAction],
  [addToRecentlyPlayedReducer, addToRecentlyPlayedAction],
];

export {
  gamesRecentlyPlayedRootReducer,
};
