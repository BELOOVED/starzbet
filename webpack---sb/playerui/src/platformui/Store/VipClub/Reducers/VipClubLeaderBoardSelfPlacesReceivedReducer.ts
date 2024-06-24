import { getNotNil, type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubLeaderBoardSelfPlacesReceivedAction } from "../VipClubActions";
import { vipClubLeaderBoardSelectors } from "../Selectors/VipClubLeaderBoardSelectors";

const vipClubLeaderBoardSelfPlacesReceivedReducer: TReducer<TPlatformAppState, typeof vipClubLeaderBoardSelfPlacesReceivedAction> =
  (state, action) => {
    const activePeriod = vipClubLeaderBoardSelectors.activePeriod(state);

    const playerInfo = getNotNil(
      action.payload.find((it) => it.period === activePeriod),
      ["vipClubLeaderBoardSelfPlacesReceivedReducer"],
      "playerInfo",
    );

    return {
      ...state,
      vipClub: {
        ...state.vipClub,
        leaderBoard: {
          ...state.vipClub.leaderBoard,
          playerRow: playerInfo.place,
        },
      },
    };
  };

export { vipClubLeaderBoardSelfPlacesReceivedReducer };
