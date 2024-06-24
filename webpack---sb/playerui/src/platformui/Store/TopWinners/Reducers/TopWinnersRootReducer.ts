import { createRootReducer } from "@sb/utils";
import { type TRootReducer } from "../../../../common/Store/Root/TRootReducer";
import { addUniq } from "../../Games/Utils/GameUtils";
import { platformTopWinnersReceiveAction } from "../Actions/TopWinnersActions";

const platformTopWinnersReceiveReducer: TRootReducer<typeof platformTopWinnersReceiveAction> = (
  state,
  { payload: { topWinners } },
) => ({
  ...state,
  topWinners: {
    nodes: topWinners,
    isServerLoaded: false,
  },
  games: {
    ...state.games,
    games: addUniq(state.games.games, topWinners.map(({ game }) => game)),
  },
});

const topWinnersRootReducer = createRootReducer([
  [platformTopWinnersReceiveReducer, platformTopWinnersReceiveAction],
]);

export { topWinnersRootReducer };
