import { isNotEmpty, type TReducer } from "@sb/utils";
import type { TPlatform_VipClubLeaderBoardRow_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubLeaderBoardReceivedAction } from "../VipClubActions";
import { type TVipClubLeaderBoardPlacesMap } from "../VipClubModels";
import { vipClubSelectedActiveTournamentSelector } from "../Selectors/VipClubTournamentsSelectors";
import { VIP_CLUB_LEADER_BOARD_LIMIT } from "../VipClubVariables";

//expect place to be 1, 101, 201, 301, ...
const getLeaderBoardPageFromRowPlace = (place: number) => Math.floor(place / VIP_CLUB_LEADER_BOARD_LIMIT) + 1;

const arrayToMap = (maxPlace: number) =>
  (acc: TVipClubLeaderBoardPlacesMap, row: TPlatform_VipClubLeaderBoardRow_Fragment) => {
    if (row.place <= maxPlace) {
      acc[row.place] = row;
    }

    return acc;
  };

const vipClubLeaderBoardReceivedReducer: TReducer<TPlatformAppState, typeof vipClubLeaderBoardReceivedAction> = (state, { payload }) => {
  const board = payload[0];
  if (!board) {
    return state;
  }

  const activeTournament = vipClubSelectedActiveTournamentSelector(state);

  const maxPlace = activeTournament === null ? board.total : activeTournament.templateSnapshot.places;

  const page = isNotEmpty(board.rows) ? getLeaderBoardPageFromRowPlace(board.rows[0].place) : 1;

  return {
    ...state,
    vipClub: {
      ...state.vipClub,
      leaderBoard: {
        ...state.vipClub.leaderBoard,
        page,
        placesMap: board.rows.reduce(arrayToMap(maxPlace), {}),
        activePeriod: board.period,
        size: board.size,
        total: Math.min(maxPlace, board.total),
        minPoint: board.minPoint,
      },
    },

  };
};

export { vipClubLeaderBoardReceivedReducer };
