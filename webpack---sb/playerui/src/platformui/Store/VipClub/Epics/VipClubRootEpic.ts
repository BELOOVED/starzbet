import { combineEpics } from "redux-observable";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { dependLoggedConditionEpic } from "../../../../common/Utils/EpicUtils/DependLoggedConditionEpic";
import { whenWsAuthenticatedEpic } from "../../../../common/Store/WsAuth/WsAuthEpic";
import { whenPlayerIdExist } from "../../../../common/Store/Player/Epics/WhenPlayerIdExist";
import {
  vipClubHandleUpdateBonusesEpic,
  vipClubLeadersRouterEpicFactory,
  vipClubOverviewBonusRouterEpic,
  vipClubOverviewCommissionRefundRouterEpic,
  vipClubOverviewContributionTableRouterEpic,
  vipClubOverviewLevelRulesRouterEpic,
  vipClubTournamentsIdPeriodPageRouterEpicFactory,
  vipClubTournamentsIdRouterEpic,
  vipClubTournamentsRouterEpic,
} from "./VipClubRouterEpic";
import {
  vipClubLoadLeaderBoardLastPlaceEpicFactory,
  vipClubLoadLeaderBoardSelfPlaceEpic,
  vipClubLoadLevelRulesEpic,
  vipClubLoadPlayerStateEpic,
} from "./VipClubLoadEpics";
import { vipClubLevelRulesUpdateConnectedEpic, vipClubRequireWSAuthConnectedEpic } from "./VipClubWSEpics";
import { vipClubWhenLeaderBoardReceivedEpic } from "./VipClubWhenEpics";
import {
  vipClubLeaderBoardDiffProtocolConnectedEpic,
} from "./VipClubLeaderBoardDiffProtocol/VipClubLeaderBoardDiffProtocol";

const vipClubRootEpic: TMixAppEpic = combineEpics(
  dependLoggedConditionEpic(
    combineEpics(
      vipClubLoadLevelRulesEpic,
      vipClubLoadPlayerStateEpic,
      vipClubLevelRulesUpdateConnectedEpic,
      vipClubOverviewCommissionRefundRouterEpic,
      vipClubOverviewContributionTableRouterEpic,

      whenPlayerIdExist(
        vipClubOverviewBonusRouterEpic,
        whenWsAuthenticatedEpic(vipClubRequireWSAuthConnectedEpic),
        vipClubHandleUpdateBonusesEpic,
      ),
    ),
    vipClubOverviewLevelRulesRouterEpic,
  ),
  vipClubTournamentsRouterEpic,
  vipClubTournamentsIdRouterEpic,
  vipClubLeadersRouterEpicFactory(
    (period, offset) => combineEpics(
      vipClubLeaderBoardDiffProtocolConnectedEpic(period, offset),

      dependLoggedConditionEpic(
        vipClubWhenLeaderBoardReceivedEpic(
          vipClubLoadLeaderBoardSelfPlaceEpic,
        ),
        undefined,
      ),
    ),
  ),
  vipClubTournamentsIdPeriodPageRouterEpicFactory(
    (period, offset) => combineEpics(
      vipClubLeaderBoardDiffProtocolConnectedEpic(period, offset),

      dependLoggedConditionEpic(
        vipClubWhenLeaderBoardReceivedEpic(
          vipClubLoadLeaderBoardSelfPlaceEpic,
          vipClubLoadLeaderBoardLastPlaceEpicFactory(period),
        ),
        undefined,
      ),
    ),
  ),
);

export { vipClubRootEpic };
