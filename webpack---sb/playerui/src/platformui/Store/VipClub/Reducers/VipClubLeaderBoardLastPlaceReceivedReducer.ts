import { isNotEmpty, type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubLeaderBoardLastPlaceReceivedAction } from "../VipClubActions";

const vipClubLeaderBoardLastPlaceReceivedReducer: TReducer<TPlatformAppState, typeof vipClubLeaderBoardLastPlaceReceivedAction> =
  (state, { payload }) => {
    const board = payload[0];

    if (!board) {
      return state;
    }

    const rows = board.rows;

    if (!isNotEmpty(rows)) {
      return state;
    }

    const lastPlaceRow = rows[0];

    return {
      ...state,
      vipClub: {
        ...state.vipClub,
        leaderBoard: {
          ...state.vipClub.leaderBoard,
          minPoint: lastPlaceRow.points,
        },
      },
    };
  };

export { vipClubLeaderBoardLastPlaceReceivedReducer };
