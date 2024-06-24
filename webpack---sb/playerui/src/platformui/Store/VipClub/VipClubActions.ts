import {
  type TPlatform_VipClubContributionTableRule_Fragment,
  type TPlatform_VipClubLeaderBoardResponse_Fragment,
  type TPlatform_VipClubLevelRule_Fragment,
  type TPlatform_VipClubPlayerState_Fragment,
  type TPlatform_VipClubSelfPlace_Fragment,
  type TPlatform_VipClubSettings_Fragment,
  type TPlatform_VipClubTournament_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type IVipClubLeaderBoardUpdatePayload, type IVipClubLevelProgressPayload } from "./VipClubModels";

const vipClubContributionTableReceivedAction = (payload: TPlatform_VipClubContributionTableRule_Fragment[]) => ({
  type: "@VIP_CLUB/CONTRIBUTION_TABLE_RECEIVED",
  payload,
});

const vipClubLevelRulesReceivedAction = (payload: TPlatform_VipClubLevelRule_Fragment[]) => ({
  type: "@VIP_CLUB/LEVEL_RULES_RECEIVED",
  payload,
});

const vipClubPlayerStateReceivedAction = (payload: TPlatform_VipClubPlayerState_Fragment | null) => ({
  type: "@VIP_CLUB/PLAYER_STATE_RECEIVED",
  payload,
});

const vipClubPlayerStateRemoveAction = () => ({
  type: "@VIP_CLUB/PLAYER_STATE_REMOVE",
});

const vipClubCommissionRefundAction = () => ({
  type: "@VIP_CLUB/COMMISSION_REFUND",
});

const vipClubLoadBonusesAndDependentDataAction = () => ({
  type: "@VIP_CLUB/LOAD_BONUSES_AND_DEPENDENT_DATA",
});

const vipClubLeaderBoardReceivedAction = (payload: TPlatform_VipClubLeaderBoardResponse_Fragment[]) => ({
  type: "@VIP_CLUB/LEADER_BOARD_RECEIVED",
  payload,
});

const vipClubLeaderBoardUpdateReceivedAction = (payload: IVipClubLeaderBoardUpdatePayload | IVipClubLeaderBoardUpdatePayload[]) => ({
  type: "@VIP_CLUB/LEADER_BOARD_UPDATE_RECEIVED",
  payload,
});

const vipClubLeaderBoardSelfPlacesReceivedAction = (payload: TPlatform_VipClubSelfPlace_Fragment[]) => ({
  type: "@VIP_CLUB/LEADER_BOARD_SELF_PLACES_RECEIVED",
  payload,
});

const vipClubLeaderBoardLastPlaceReceivedAction = (payload: TPlatform_VipClubLeaderBoardResponse_Fragment[]) => ({
  type: "@VIP_CLUB/LEADER_BOARD_LAST_PLACE_RECEIVED",
  payload,
});

const vipClubTournamentsReceivedAction = (payload: TPlatform_VipClubTournament_Fragment[]) => ({
  type: "@VIP_CLUB/TOURNAMENTS_RECEIVED",
  payload,
});

const vipClubTournamentsSelectedIdChangedAction = (payload: string) => ({
  type: "@VIP_CLUB/TOURNAMENTS_SELECTED_ID_CHANGED",
  payload,
});

const vipClubSettingsReceivedAction = (payload: TPlatform_VipClubSettings_Fragment) => ({
  type: "@VIP_CLUB/SETTINGS_RECEIVED",
  payload,
});

const vipClubLevelProgressAction = (payload: IVipClubLevelProgressPayload) => ({
  type: "@VIP_CLUB/LEVEL_PROGRESS",
  payload,
});

export {
  vipClubContributionTableReceivedAction,
  vipClubLevelRulesReceivedAction,
  vipClubPlayerStateReceivedAction,
  vipClubCommissionRefundAction,
  vipClubLoadBonusesAndDependentDataAction,
  vipClubLeaderBoardReceivedAction,
  vipClubLeaderBoardUpdateReceivedAction,
  vipClubPlayerStateRemoveAction,
  vipClubTournamentsReceivedAction,
  vipClubLeaderBoardSelfPlacesReceivedAction,
  vipClubTournamentsSelectedIdChangedAction,
  vipClubLeaderBoardLastPlaceReceivedAction,
  vipClubSettingsReceivedAction,
  vipClubLevelProgressAction,
};
