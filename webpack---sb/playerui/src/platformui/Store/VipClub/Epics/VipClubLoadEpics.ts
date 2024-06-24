import {
  platformVipClubCurrentContributionTableQueryOptionalFields,
  platformVipClubCurrentLevelRulesQueryOptionalFields,
  platformVipClubLeaderBoardQueryOptionalFields,
  platformVipClubSelfStateQueryOptionalFields,
  query_Platform_VipClubCurrentContributionTable,
  query_Platform_VipClubCurrentLevelRules,
  query_Platform_VipClubLeaderBoard,
  query_Platform_VipClubSelfPlaces,
  query_Platform_VipClubSelfState,
  query_Platform_VipClubSettings,
  query_Platform_VipClubTournaments,
} from "@sb/graphql-client/PlayerUI";
import {
  platformVipClubTournamentsQueryOptionalFields,
} from "@sb/graphql-client/PlayerUI/OptionalFields/Platform/Platform_VipClubTournaments_Query";
import { extractNodesFromEdges } from "@sb/utils";
import {
  platformVipClubSelfPlacesQueryOptionalFields,
} from "@sb/graphql-client/PlayerUI/OptionalFields/Platform/Platform_VipClubSelfPlaces_Query";
import {
  platformVipClubSettingsQueryOptionalFields,
} from "@sb/graphql-client/PlayerUI/OptionalFields/Platform/Platform_VipClubSettings_Query";
import { type EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import {
  VIP_CLUB_CONTRIBUTION_TABLE_LOADING_SYMBOL,
  VIP_CLUB_LEADER_BOARD_LAST_PLACE_LOADING_SYMBOL,
  VIP_CLUB_LEADER_BOARD_SELF_PLACE_LOADING_SYMBOL,
  VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL,
  VIP_CLUB_PLAYER_STATE_LOADING_SYMBOL,
  VIP_CLUB_SETTINGS_LOADING_SYMBOL,
  VIP_CLUB_TOURNAMENTS_LOADING_SYMBOL,
} from "../VipClubVariables";
import {
  vipClubContributionTableReceivedAction,
  vipClubLeaderBoardLastPlaceReceivedAction,
  vipClubLeaderBoardSelfPlacesReceivedAction,
  vipClubLevelRulesReceivedAction,
  vipClubPlayerStateReceivedAction,
  vipClubSettingsReceivedAction,
  vipClubTournamentsReceivedAction,
} from "../VipClubActions";
import { vipClubLeaderBoardTotalNotNilSelector } from "../Selectors/VipClubLeaderBoardSelectors";

const vipClubLoadPlayerStateEpic: TMixAppEpic = gqlLoadingFactory(
  VIP_CLUB_PLAYER_STATE_LOADING_SYMBOL,
  query_Platform_VipClubSelfState,
  { variables: {}, optionalFields: platformVipClubSelfStateQueryOptionalFields },
  vipClubPlayerStateReceivedAction,
  ({ platform: { VipClubSelfState } }) => [VipClubSelfState],
);

const vipClubLoadLevelRulesEpic: TMixAppEpic = gqlLoadingFactory(
  VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL,
  query_Platform_VipClubCurrentLevelRules,
  { variables: {}, optionalFields: platformVipClubCurrentLevelRulesQueryOptionalFields },
  vipClubLevelRulesReceivedAction,
  ({ platform: { VipClubCurrentLevelRules: { rules } } }) => [rules],
);

const vipClubLoadContributionTableEpic: TMixAppEpic = gqlLoadingFactory(
  VIP_CLUB_CONTRIBUTION_TABLE_LOADING_SYMBOL,
  query_Platform_VipClubCurrentContributionTable,
  { variables: {}, optionalFields: platformVipClubCurrentContributionTableQueryOptionalFields },
  vipClubContributionTableReceivedAction,
  ({ platform: { VipClubCurrentContributionTable: { table } } }) => [table],
);

const vipClubLoadTournamentsEpic: TMixAppEpic = gqlLoadingFactory(
  VIP_CLUB_TOURNAMENTS_LOADING_SYMBOL,
  query_Platform_VipClubTournaments,
  { variables: {}, optionalFields: platformVipClubTournamentsQueryOptionalFields },
  vipClubTournamentsReceivedAction,
  ({ platform: { VipClubTournaments } }) => [extractNodesFromEdges(VipClubTournaments)],
);

const vipClubLoadLeaderBoardSelfPlaceEpic: TMixAppEpic = gqlLoadingFactory(
  VIP_CLUB_LEADER_BOARD_SELF_PLACE_LOADING_SYMBOL,
  query_Platform_VipClubSelfPlaces,
  { variables: {}, optionalFields: platformVipClubSelfPlacesQueryOptionalFields },
  vipClubLeaderBoardSelfPlacesReceivedAction,
  ({ platform: { VipClubSelfPlaces } }) => [VipClubSelfPlaces],
);

const vipClubLoadLeaderBoardLastPlaceEpicFactory = (period: EPlatform_VipClubLeaderBoardPeriod): TMixAppEpic =>
  (action$, state$, dependencies) => {
    const total = vipClubLeaderBoardTotalNotNilSelector(state$.value);

    return gqlLoadingFactory(
      VIP_CLUB_LEADER_BOARD_LAST_PLACE_LOADING_SYMBOL,
      query_Platform_VipClubLeaderBoard,
      {
        variables: { request: { boards: [{ period, offset: total - 1, limit: 1 }] } },
        optionalFields: platformVipClubLeaderBoardQueryOptionalFields,
      },
      vipClubLeaderBoardLastPlaceReceivedAction,
      ({ platform: { VipClubLeaderBoard } }) => [VipClubLeaderBoard],
    )(action$, state$, dependencies);
  };

const vipClubLoadSettingsEpic: TMixAppEpic = gqlLoadingFactory(
  VIP_CLUB_SETTINGS_LOADING_SYMBOL,
  query_Platform_VipClubSettings,
  { variables: {}, optionalFields: platformVipClubSettingsQueryOptionalFields },
  vipClubSettingsReceivedAction,
  ({ platform: { VipClubSettings } }) => [VipClubSettings],
);

export {
  vipClubLoadPlayerStateEpic,
  vipClubLoadLevelRulesEpic,
  vipClubLoadContributionTableEpic,
  vipClubLoadTournamentsEpic,
  vipClubLoadLeaderBoardSelfPlaceEpic,
  vipClubLoadSettingsEpic,
  vipClubLoadLeaderBoardLastPlaceEpicFactory,
};
