import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveAddClosableTournamentIdAction } from "../LiveActions";

const liveAddClosableTournamentIdReducer: TReducer<IWithLiveState, typeof liveAddClosableTournamentIdAction> = (
  state,
  { payload: { tournamentId } },
) => ({
  ...state,
  live: {
    ...state.live,
    closableTournamentIds: [
      ...state.live.closableTournamentIds,
      tournamentId,
    ],
  },
});

export { liveAddClosableTournamentIdReducer };
