import { type TRootReducer } from "../../../../common/Store/Root/TRootReducer";
import { extractIds } from "../../../../common/Utils/IDUtils";
import { addUniq } from "../../Games/Utils/GameUtils";
import { type starzGamesReceivedAction } from "../LandingActions";

const starzGamesReceivedReducer: TRootReducer<typeof starzGamesReceivedAction> = (
  state,
  { payload: { games, pageInfo } },
) => ({
  ...state,
  landing: {
    ...state.landing,
    starzGames: {
      gamesIds: extractIds(games),
      pageInfo,
    },
  },
  games: {
    ...state.games,
    games: addUniq(state.games.games, games),
  },
});

export { starzGamesReceivedReducer };
