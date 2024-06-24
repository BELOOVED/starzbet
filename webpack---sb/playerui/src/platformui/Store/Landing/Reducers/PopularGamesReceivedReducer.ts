import { type TRootReducer } from "../../../../common/Store/Root/TRootReducer";
import { extractIds } from "../../../../common/Utils/IDUtils";
import { addUniq } from "../../Games/Utils/GameUtils";
import { type popularGamesReceivedAction } from "../LandingActions";

const popularGamesReceivedReducer: TRootReducer<typeof popularGamesReceivedAction> = (
  state,
  { payload: { games, pageInfo } },
) => ({
  ...state,
  landing: {
    ...state.landing,
    popularGames: {
      gamesIds: extractIds(games),
      pageInfo,
    },
  },
  games: {
    ...state.games,
    games: addUniq(state.games.games, games),
  },
});

export { popularGamesReceivedReducer };
