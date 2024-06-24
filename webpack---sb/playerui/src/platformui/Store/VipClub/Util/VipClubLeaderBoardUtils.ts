import { VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_NUMBER, VIP_CLUB_LEADER_BOARD_LIMIT } from "../VipClubVariables";
import {
  type IVipClubLeaderBoardUpdateSnapshot,
  type TPlayerIdToLeaderBoardRowOrNullMap,
  type TVipClubLeaderBoardPlacesMap,
} from "../VipClubModels";

const vipClubLeaderBoardGetOffsetFromPage = (page: number) =>
  (Math.max(page, VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_NUMBER) - 1) * VIP_CLUB_LEADER_BOARD_LIMIT;

const isPlaceOnPage = (place: number, page: number) => {
  const minOffset = vipClubLeaderBoardGetOffsetFromPage(page);
  const maxOffset = minOffset + VIP_CLUB_LEADER_BOARD_LIMIT;

  return place > minOffset && place <= maxOffset;
};

const vipClubLeaderBoardIsValidPage = (page: number, totalPages: number) =>
  page >= VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_NUMBER && page <= totalPages;

const vipClubLeaderBoardParseUpdates = (
  diff: TPlayerIdToLeaderBoardRowOrNullMap,
  snapshot: IVipClubLeaderBoardUpdateSnapshot,
  currentPlayerId: string | undefined,
  currentPage: number,
  boardSize: number | null,
  boardTotal: number | null,
) => {
  const playerRowDiff = currentPlayerId ? diff[currentPlayerId] : null;
  const playerRow = playerRowDiff ?? snapshot.playerRow;

  let minPoint = snapshot.minPoint;

  const placesMapDiff: TVipClubLeaderBoardPlacesMap = {};

  Object.values(diff).forEach((row) => {
    if (row === null) {
      return;
    }

    if (boardSize && row.place === boardSize) {
      minPoint = row.points;
    }

    if (boardTotal && row.place > boardTotal) {
      return;
    }

    if (!isPlaceOnPage(row.place, currentPage)) {
      return;
    }

    placesMapDiff[row.place] = row;
  });

  return {
    playerRow,
    minPoint,
    placesMap: { ...snapshot.placesMap, ...placesMapDiff },
  };
};

export {
  vipClubLeaderBoardParseUpdates,
  vipClubLeaderBoardIsValidPage,
  vipClubLeaderBoardGetOffsetFromPage,
};
