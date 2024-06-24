import { isArray, type TReducer } from "@sb/utils";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubLeaderBoardUpdateReceivedAction } from "../VipClubActions";
import { vipClubLeaderBoardSelectors } from "../Selectors/VipClubLeaderBoardSelectors";
import {
  type IVipClubLeaderBoardUpdatePayload,
  type IVipClubLeaderBoardUpdateSnapshot,
  type TPlayerIdToLeaderBoardRowOrNullMap,
} from "../VipClubModels";
import { vipClubLeaderBoardParseUpdates } from "../Util/VipClubLeaderBoardUtils";

const arrayOfDiffsToSingleDiff = (arrayOfDiffs: IVipClubLeaderBoardUpdatePayload[]) =>
  arrayOfDiffs.reduce<TPlayerIdToLeaderBoardRowOrNullMap>(
    (acc, val) => val.diff ? { ...acc, ...val.diff } : acc,
    {},
  );

const vipClubLeaderBoardUpdateReceivedReducer: TReducer<TPlatformAppState, typeof vipClubLeaderBoardUpdateReceivedAction> =
  (state, { payload }) => {
    const diff = isArray(payload) ? arrayOfDiffsToSingleDiff(payload) : payload.diff;

    if (diff === null) {
      return state;
    }

    const placesMap = vipClubLeaderBoardSelectors.placesMap(state);
    const currentPlayerId = playerDetailsSelectors.id(state);
    const playerRow = vipClubLeaderBoardSelectors.playerRow(state);
    const boardSize = vipClubLeaderBoardSelectors.size(state);
    const minPoint = vipClubLeaderBoardSelectors.minPoint(state);
    const currentPage = vipClubLeaderBoardSelectors.page(state);
    const boardTotal = vipClubLeaderBoardSelectors.total(state);

    const currentSnapshot: IVipClubLeaderBoardUpdateSnapshot = {
      placesMap,
      minPoint,
      playerRow,
    };

    return {
      ...state,
      vipClub: {
        ...state.vipClub,
        leaderBoard: {
          ...state.vipClub.leaderBoard,
          ...vipClubLeaderBoardParseUpdates(
            diff,
            currentSnapshot,
            currentPlayerId,
            currentPage,
            boardSize,
            boardTotal,
          ),
        },
      },
    };
  };

export { vipClubLeaderBoardUpdateReceivedReducer };
