import { createMemoSelector, createPropertySelectors, createSimpleSelector, getNotNil, isEmpty, isNotEmpty } from "@sb/utils";
import { callManagerFailedSelector, callManagerStartedSelector } from "@sb/call-manager";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { EVipClubLeaderBoardState } from "../VipClubModels";
import { VIP_CLUB_LEADER_BOARD_LIMIT, VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL } from "../VipClubVariables";
import { vipClubSelectors } from "./VipClubSelectors";

const vipClubLeaderBoardSelectors = createPropertySelectors(vipClubSelectors.leaderBoard);

const vipClubLeaderBoardTotalNotNilSelector = createSimpleSelector(
  [vipClubLeaderBoardSelectors.total],
  (total) => getNotNil(total, ["vipClubLeaderBoardTotalNotNilSelector"], "total"),
);

const vipClubLeaderBoardRowsSelector = createMemoSelector(
  [vipClubLeaderBoardSelectors.placesMap],
  (placesMap) => Object.values(placesMap),
);

const vipClubLeaderBoardLoadingSelector = callManagerStartedSelector.with.symbol(VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL);

const vipClubLeaderBoardStateSelector = (state: TPlatformAppState) => {
  const loading = vipClubLeaderBoardLoadingSelector(state);

  if (loading) {
    return EVipClubLeaderBoardState.loading;
  }

  const failed = callManagerFailedSelector(state, VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL);
  if (failed) {
    return EVipClubLeaderBoardState.failed;
  }

  const rows = vipClubLeaderBoardRowsSelector(state);
  if (isEmpty(rows)) {
    return EVipClubLeaderBoardState.empty;
  }

  return EVipClubLeaderBoardState.full;
};

const vipClubLeaderBoardIsPlayerRowSelector = createSimpleSelector(
  [(_, rowPlayerId) => rowPlayerId, playerDetailsSelectors.id],
  (rowPlayerId, playerId) => rowPlayerId === playerId,
);

const vipClubLeaderBoardPaginationPagesSelector = createMemoSelector(
  [vipClubLeaderBoardSelectors.total],
  (total) => total ? Array(Math.ceil(total / VIP_CLUB_LEADER_BOARD_LIMIT)).fill(null).map((_, i) => i + 1) : [],
);

const vipClubLeaderBoardPaginationVisibleSelector = createSimpleSelector(
  [vipClubLeaderBoardPaginationPagesSelector],
  (pages) => pages.length > 1,
);

const vipClubLeaderBoardNotNilPlayerPlaceSelector = (state: TPlatformAppState) =>
  getNotNil(vipClubLeaderBoardSelectors.playerRow(state), ["assertNotNilVipClubLeaderBoardPlayerPlaceSelector"], "playerRow").place;

const vipClubLeaderBoardNotNilPlayerPointsSelector = (state: TPlatformAppState) =>
  getNotNil(vipClubLeaderBoardSelectors.playerRow(state), ["vipClubLeaderBoardNotNilPlayerPointsSelector"], "playerRow").points;

const vipClubLeaderBoardTop3Selector = createMemoSelector(
  [vipClubLeaderBoardSelectors.placesMap],
  (placesMap) => [placesMap[1], placesMap[2], placesMap[3]].filter(Boolean),
);

const vipClubLeaderBoardIsTop3ExistSelector = createSimpleSelector(
  [vipClubLeaderBoardTop3Selector],
  isNotEmpty,
);

const vipClubLeaderBoardNotTop3Selector = createMemoSelector(
  [vipClubLeaderBoardRowsSelector],
  (rows) => rows.filter((it) => it.place !== 1 && it.place !== 2 && it.place !== 3),
);

const vipClubLeaderBoardIsNotTop3ExistSelector = createSimpleSelector(
  [vipClubLeaderBoardNotTop3Selector],
  isNotEmpty,
);

export {
  vipClubLeaderBoardSelectors,
  vipClubLeaderBoardStateSelector,
  vipClubLeaderBoardRowsSelector,
  vipClubLeaderBoardLoadingSelector,
  vipClubLeaderBoardIsPlayerRowSelector,
  vipClubLeaderBoardPaginationPagesSelector,
  vipClubLeaderBoardPaginationVisibleSelector,
  vipClubLeaderBoardNotNilPlayerPlaceSelector,
  vipClubLeaderBoardNotNilPlayerPointsSelector,
  vipClubLeaderBoardTop3Selector,
  vipClubLeaderBoardNotTop3Selector,
  vipClubLeaderBoardIsTop3ExistSelector,
  vipClubLeaderBoardIsNotTop3ExistSelector,
  vipClubLeaderBoardTotalNotNilSelector,
};
