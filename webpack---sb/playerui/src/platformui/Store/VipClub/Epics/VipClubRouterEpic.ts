import { combineEpics } from "redux-observable";
import { EMPTY, of, switchMap } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { deepEqual } from "fast-equals";
import { routerEpic } from "@sb/router";
import { type TMatch } from "@sb/react-router-compat";
import { vipClubIsLeaderBoardPeriod, vipClubParsePeriodKind } from "@sb/vip-club";
import { EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import { getNotNil, isCreator, isNotEmpty } from "@sb/utils";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { Logger } from "../../../../common/Utils/Logger";
import { whenPlayerIdExist } from "../../../../common/Store/Player/Epics/WhenPlayerIdExist";
import { whenLoggedAndWsAuthenticatedEpic } from "../../../../common/Store/WsAuth/WsAuthEpic";
import { findById } from "../../../../common/Utils/IDUtils";
import { routeMap } from "../../../RouteMap/RouteMap";
import { loadAvailableBonusesEpic } from "../../Bonuses/Epics/LoadBonusEpics";
import {
  type IVipClubLeadersParams,
  type IVipClubTournamentsParams,
  LEADER_BOARD_URL_PARAM_TO_PERIOD_MAP,
} from "../VipClubModels";
import { vipClubTournamentsSelectors } from "../Selectors/VipClubTournamentsSelectors";
import { vipClubLeaderBoardGetOffsetFromPage } from "../Util/VipClubLeaderBoardUtils";
import {
  vipClubLoadBonusesAndDependentDataAction,
  vipClubTournamentsSelectedIdChangedAction,
} from "../VipClubActions";
import {
  vipClubLoadContributionTableEpic,
  vipClubLoadLevelRulesEpic,
  vipClubLoadPlayerStateEpic,
  vipClubLoadSettingsEpic,
  vipClubLoadTournamentsEpic,
} from "./VipClubLoadEpics";
import { vipClubDoCommissionRefundEpic } from "./VipClubDoCommissionRefundEpic";
import {
  vipClubContributionTableUpdateConnectedEpic,
  vipClubLevelRulesUpdateConnectedEpic,
  vipClubRequireWSAuthConnectedEpic,
} from "./VipClubWSEpics";

const vipClubOverviewLevelRulesRouterEpic = routerEpic({
  name: "vip_club_overview_level_rules",
  match: getMatch({ path: routeMap.vipClubOverviewLevelRulesRoute, exact: true }),
  onStart: () => combineEpics(
    vipClubLoadLevelRulesEpic,
    vipClubLevelRulesUpdateConnectedEpic,
  ),
});

// todo AM mb combine it inside vipClubOverviewBonusRouterEpic ??
const vipClubHandleUpdateBonusesEpic: TMixAppEpic = (action$, state$, deps) => action$.pipe(
  isCreator(vipClubLoadBonusesAndDependentDataAction),
  switchMap(() => loadAvailableBonusesEpic(action$, state$, deps)),
);

const vipClubOverviewBonusRouterEpic = routerEpic({
  name: "vip_club_overview_bonus",
  match: getMatch({ path: routeMap.vipClubOverviewBonusRoute, exact: true }),
  onStart: () => combineEpics(
    vipClubLoadSettingsEpic,
    loadAvailableBonusesEpic,
  ),
});

const vipClubOverviewCommissionRefundRouterEpic = routerEpic({
  name: "vip_club_commission_refund",
  match: getMatch({ path: routeMap.vipClubOverviewCommissionRefundRoute, exact: true }),
  onStart: () => combineEpics(
    vipClubDoCommissionRefundEpic,
  ),
});

const vipClubOverviewContributionTableRouterEpic = routerEpic({
  name: "vip_club_contribution_table",
  match: getMatch({ path: routeMap.vipClubOverviewContributionTableRoute, exact: true }),
  onStart: () => combineEpics(
    vipClubLoadContributionTableEpic,
    vipClubContributionTableUpdateConnectedEpic,
  ),
});

type TRouterCallback = (period: EPlatform_VipClubLeaderBoardPeriod, offset: number) => TMixAppEpic

const vipClubLeadersRouterEpicFactory = (callback: TRouterCallback) => routerEpic({
  name: "vip_club_leaders",
  match: getMatch<IVipClubLeadersParams>({ path: routeMap.vipClubLeadersPeriodPageRoute, exact: true }),
  onStart: ({ params: { period, page } }: TMatch<IVipClubLeadersParams>): TMixAppEpic => combineEpics(
    (action$, state$, dependencies) => {
      const validPeriod = LEADER_BOARD_URL_PARAM_TO_PERIOD_MAP[period] ?? EPlatform_VipClubLeaderBoardPeriod.daily;

      const pageNumber = Number(page);

      const offset = vipClubLeaderBoardGetOffsetFromPage(pageNumber);

      return callback(validPeriod, offset)(action$, state$, dependencies);
    },
  ),
  shouldRestart: restartOnParamsChanged,
});

const vipClubTournamentsRouterEpic = routerEpic({
  name: "vip_club_tournaments",
  match: getMatch({ path: routeMap.vipClubTournamentsRoute }),
  onStart: (): TMixAppEpic => vipClubLoadTournamentsEpic,
});

const vipClubTournamentsIdRouterEpic = routerEpic({
  name: "vip_club_tournaments_id",
  match: getMatch<IVipClubTournamentsParams>({ path: routeMap.vipClubTournamentsIdRoute }),
  onStart: ({ params: { selectedTournamentId } }: TMatch<IVipClubTournamentsParams>): TMixAppEpic =>
    () => of(vipClubTournamentsSelectedIdChangedAction(selectedTournamentId)),
  shouldRestart: restartOnParamsChanged,
});

const vipClubTournamentsIdPeriodPageRouterEpicFactory = (callback: TRouterCallback) => routerEpic({
  name: "vip_club_tournaments_id_period_page",
  match: getMatch<IVipClubTournamentsParams>({ path: routeMap.vipClubTournamentsIdPeriodPageRoute, exact: true }),
  onStart: ({ params: { selectedTournamentId, page } }: TMatch<IVipClubTournamentsParams>): TMixAppEpic =>
    (action$, state$, dependencies) => state$.pipe(
      map(vipClubTournamentsSelectors.active),
      distinctUntilChanged(deepEqual),
      switchMap((tournaments) => {
        if (!isNotEmpty(tournaments)) {
          return EMPTY;
        }

        const firstTournament = getNotNil(tournaments[0], ["VipClubTournament"], "firstTournament");

        const tournament = findById(tournaments, selectedTournamentId);

        const period = vipClubParsePeriodKind(tournament
          ? tournament.templateSnapshot.period.kind
          : firstTournament.templateSnapshot.period.kind).period;

        if (!vipClubIsLeaderBoardPeriod(period)) {
          Logger.error(`Invalid period ${period}`);

          return EMPTY;
        }

        const offset = vipClubLeaderBoardGetOffsetFromPage(Number(page));

        return callback(period, offset)(action$, state$, dependencies);
      }),
    ),
  shouldRestart: restartOnParamsChanged,
});

const vipClubOnPlayGameRouteEpic = routerEpic({
  name: "vip_club_on_play_game",
  match: getMatch({ path: routeMap.play }),
  onStart: (): TMixAppEpic => combineEpics(
    vipClubLoadLevelRulesEpic,
    vipClubLevelRulesUpdateConnectedEpic,
    whenPlayerIdExist(
      whenLoggedAndWsAuthenticatedEpic(
        vipClubRequireWSAuthConnectedEpic,
      ),
      vipClubLoadPlayerStateEpic,
    ) as TMixAppEpic,
  ),
});

export {
  vipClubLeadersRouterEpicFactory,
  vipClubOverviewLevelRulesRouterEpic,
  vipClubOverviewCommissionRefundRouterEpic,
  vipClubOverviewContributionTableRouterEpic,
  vipClubTournamentsRouterEpic,
  vipClubTournamentsIdRouterEpic,
  vipClubTournamentsIdPeriodPageRouterEpicFactory,
  vipClubOnPlayGameRouteEpic,
  vipClubOverviewBonusRouterEpic,
  vipClubHandleUpdateBonusesEpic,
};
