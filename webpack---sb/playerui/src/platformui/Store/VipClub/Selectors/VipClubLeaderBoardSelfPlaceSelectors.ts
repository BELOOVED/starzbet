import { matchPath } from "react-router";
import { loggedSelector } from "@sb/auth";
import { callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import { routerLocationPathnameSelector } from "@sb/router";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { EVipClubLeaderBoardSelfPlaceState } from "../VipClubModels";
import { VIP_CLUB_LEADER_BOARD_SELF_PLACE_LOADING_SYMBOL } from "../VipClubVariables";
import { vipClubSelectors } from "./VipClubSelectors";
import { vipClubSelectedActiveTournamentPrizeByPlaceSelector } from "./VipClubTournamentsSelectors";
import { vipClubLeaderBoardLoadingSelector, vipClubLeaderBoardSelectors } from "./VipClubLeaderBoardSelectors";

const vipClubLeaderBoardSelfPlaceStateSelector = (state: TPlatformAppState) => {
  const logged = loggedSelector(state);

  if (!logged) {
    return EVipClubLeaderBoardSelfPlaceState.notLogged;
  }

  const leaderBoardLoading = vipClubLeaderBoardLoadingSelector(state);

  if (leaderBoardLoading) {
    return EVipClubLeaderBoardSelfPlaceState.loading;
  }

  const started = callManagerStartedSelector(state, VIP_CLUB_LEADER_BOARD_SELF_PLACE_LOADING_SYMBOL);
  const succeeded = callManagerSucceededSelector(state, VIP_CLUB_LEADER_BOARD_SELF_PLACE_LOADING_SYMBOL);

  if (started && !succeeded) {
    return EVipClubLeaderBoardSelfPlaceState.loading;
  }

  const vipClubState = vipClubSelectors.playerState(state);
  if (!vipClubState) {
    return EVipClubLeaderBoardSelfPlaceState.notVipClubMember;
  }

  const playerRow = vipClubLeaderBoardSelectors.playerRow(state);
  const total = vipClubLeaderBoardSelectors.total(state);

  if (!playerRow || !total || playerRow.place > total) {
    return EVipClubLeaderBoardSelfPlaceState.notInLeaderBoard;
  }

  const pathname = routerLocationPathnameSelector(state);

  if (matchPath(pathname, { path: routeMap.vipClubTournamentsIdPeriodPageRoute, exact: true })) {
    const tournamentPrize = vipClubSelectedActiveTournamentPrizeByPlaceSelector(state, playerRow.place);

    return tournamentPrize
      ? EVipClubLeaderBoardSelfPlaceState.inLeaderBoardWithTournamentPrize
      : EVipClubLeaderBoardSelfPlaceState.inLeaderBoard;
  }

  return EVipClubLeaderBoardSelfPlaceState.inLeaderBoard;
};

export { vipClubLeaderBoardSelfPlaceStateSelector };
