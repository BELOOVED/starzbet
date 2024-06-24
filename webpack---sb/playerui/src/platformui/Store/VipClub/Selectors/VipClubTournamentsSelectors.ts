import { matchPath } from "@sb/react-router-compat";
import { createPropertySelectors, createSimpleSelector, getNotNil, isEmpty, withParams } from "@sb/utils";
import { callManagerFailedSelector, callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import { routerLocationPathnameSelector } from "@sb/router";
import { vipClubParsePeriodKind } from "@sb/vip-club";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { findById } from "../../../../common/Utils/IDUtils";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { EVipClubTournamentsPageState, LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP } from "../VipClubModels";
import { VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL, VIP_CLUB_TOURNAMENTS_LOADING_SYMBOL } from "../VipClubVariables";
import { vipClubTournamentsCalculatePrizeForPlace } from "../Util/VipClubTournamentsUtils";
import { vipClubSelectors } from "./VipClubSelectors";

const vipClubTournamentsSelectors = createPropertySelectors(vipClubSelectors.tournaments);

const vipClubSelectedActiveTournamentSelector = (state: TPlatformAppState) => {
  const pathname = routerLocationPathnameSelector(state);
  if (!matchPath(pathname, { path: routeMap.vipClubTournamentsIdPeriodPageRoute, exact: true })) {
    return null;
  }

  const selectedId = vipClubTournamentsSelectors.selectedId(state);
  if (!selectedId) {
    return null;
  }

  const activeTournaments = vipClubTournamentsSelectors.active(state);

  return activeTournaments.find((it) => it.id === selectedId) ?? null;
};

const vipClubSelectedActiveTournamentPrizeByPlaceSelector = (state: TPlatformAppState, place: number) => {
  const tournament = vipClubSelectedActiveTournamentSelector(state);
  if (!tournament) {
    return null;
  }
  const currency = playerCurrencySelector(state);

  return vipClubTournamentsCalculatePrizeForPlace(tournament.templateSnapshot, currency, place);
};

const vipClubTournamentsLoadingStartedSelector = withParams(callManagerStartedSelector, VIP_CLUB_TOURNAMENTS_LOADING_SYMBOL);

const vipClubTournamentsLoadingSucceededSelector = withParams(callManagerSucceededSelector, VIP_CLUB_TOURNAMENTS_LOADING_SYMBOL);

const vipClubTournamentsLoadingSelector = createSimpleSelector(
  [
    vipClubTournamentsLoadingStartedSelector,
    vipClubTournamentsLoadingSucceededSelector,
  ],
  (started, succeeded) => started && !succeeded,
);

const vipClubTournamentsPageStateSelector = (state: TPlatformAppState) => {
  const loading = vipClubTournamentsLoadingSelector(state);
  if (loading) {
    return EVipClubTournamentsPageState.loading;
  }

  const failed = callManagerFailedSelector(state, [VIP_CLUB_TOURNAMENTS_LOADING_SYMBOL, VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL]);
  if (failed) {
    return EVipClubTournamentsPageState.failed;
  }

  const activeTournaments = vipClubTournamentsSelectors.active(state);
  if (isEmpty(activeTournaments)) {
    return EVipClubTournamentsPageState.noActiveTournaments;
  }

  return EVipClubTournamentsPageState.full;
};

const vipClubTournamentsFirstActiveTournamentIdNotNilSelector = createSimpleSelector(
  [vipClubTournamentsSelectors.active],
  (tournaments) => getNotNil(tournaments[0], ["vipClubTournamentsFirstActiveTournamentIdNotNilSelector"], "tournaments").id,
);

const vipClubTournamentPeriodUrlParamByIdSelector = createSimpleSelector(
  [
    (_, id: string) => id,
    vipClubTournamentsSelectors.active,
  ],
  (id, tournaments) => {
    const tournament = getNotNil(findById(tournaments, id), ["vipClubTournamentPeriodByIdSelector"], "tournament");
    const templatePeriodKind = tournament.templateSnapshot.period.kind;

    const { period } = vipClubParsePeriodKind(templatePeriodKind);

    return LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP[period];
  },
);

export {
  vipClubTournamentsSelectors,
  vipClubSelectedActiveTournamentPrizeByPlaceSelector,
  vipClubTournamentsPageStateSelector,
  vipClubSelectedActiveTournamentSelector,
  vipClubTournamentsFirstActiveTournamentIdNotNilSelector,
  vipClubTournamentPeriodUrlParamByIdSelector,
};
