import { sortBy, type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubTournamentsReceivedAction } from "../VipClubActions";
import { VIP_CLUB_LEADER_BOARD_INITIAL_STATE } from "../VipClubInitialState";
import { vipClubReceivedTournamentHandler } from "../Util/VipClubReceivedTournamentHandler";

const vipClubTournamentsReceivedReducer: TReducer<TPlatformAppState, typeof vipClubTournamentsReceivedAction> = (state, { payload }) => {
  const { active, upcoming, finished } = vipClubReceivedTournamentHandler(payload);

  return {
    ...state,
    vipClub: {
      ...state.vipClub,
      leaderBoard: VIP_CLUB_LEADER_BOARD_INITIAL_STATE,
      tournaments: {
        ...state.vipClub.tournaments,
        selectedId: active[0]?.id ?? null,
        active: sortBy(({ templateSnapshot: { period } }) => period, active),
        upcoming,
        finished,
      },
    },
  };
};

export { vipClubTournamentsReceivedReducer };
