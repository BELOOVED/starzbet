import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveRemoveClosableTournamentIdAction } from "../LiveActions";

const liveRemoveClosableTournamentIdReducer: TReducer<IWithLiveState, typeof liveRemoveClosableTournamentIdAction> = (
  state,
  { payload: { tournamentId } },
) => ({
  ...state,
  live: {
    ...state.live,
    closableTournamentIds: state.live.closableTournamentIds.filter(
      (id) => id !== tournamentId,
    ),
  },
});

export { liveRemoveClosableTournamentIdReducer };
