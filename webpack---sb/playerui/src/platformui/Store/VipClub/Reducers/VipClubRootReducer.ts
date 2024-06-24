import { createRootReducer } from "@sb/utils";
import {
  vipClubContributionTableReceivedAction,
  vipClubLeaderBoardLastPlaceReceivedAction,
  vipClubLeaderBoardReceivedAction,
  vipClubLeaderBoardSelfPlacesReceivedAction,
  vipClubLeaderBoardUpdateReceivedAction,
  vipClubLevelProgressAction,
  vipClubLevelRulesReceivedAction,
  vipClubPlayerStateReceivedAction,
  vipClubPlayerStateRemoveAction,
  vipClubSettingsReceivedAction,
  vipClubTournamentsReceivedAction,
  vipClubTournamentsSelectedIdChangedAction,
} from "../VipClubActions";
import { vipClubContributionTableReceivedReducer } from "./VipClubContributionTableReceivedReducer";
import { vipClubPlayerStateReceivedReducer } from "./VipClubPlayerStateReceivedReducer";
import { vipClubLevelRulesReceivedReducer } from "./VipClubLevelRulesReceivedReducer";
import { vipClubPlayerStateRemoveReducer } from "./VipClubPlayerStateRemoveReducer";
import { vipClubLeaderBoardUpdateReceivedReducer } from "./VipClubLeaderBoardUpdateReceivedReducer";
import { vipClubTournamentsReceivedReducer } from "./VipClubTournamentsReceivedReducer";
import { vipClubLeaderBoardReceivedReducer } from "./VipClubLeaderBoardReceivedReducer";
import { vipClubLeaderBoardSelfPlacesReceivedReducer } from "./VipClubLeaderBoardSelfPlacesReceivedReducer";
import { vipClubTournamentsSelectedIdChangedReducer } from "./VipClubTournamentsSelectedIdChangedReducer";
import { vipClubLeaderBoardLastPlaceReceivedReducer } from "./VipClubLeaderBoardLastPlaceReceivedReducer";
import { vipClubSettingsReceivedReducer } from "./VipClubSettingsReceivedReducer";
import { vipClubLevelProgressReducer } from "./VipClubLevelProgressReducer";

const vipClubRootReducer = createRootReducer([
  [vipClubContributionTableReceivedReducer, vipClubContributionTableReceivedAction],
  [vipClubLevelRulesReceivedReducer, vipClubLevelRulesReceivedAction],
  [vipClubPlayerStateReceivedReducer, vipClubPlayerStateReceivedAction],
  [vipClubLeaderBoardReceivedReducer, vipClubLeaderBoardReceivedAction],
  [vipClubLeaderBoardUpdateReceivedReducer, vipClubLeaderBoardUpdateReceivedAction],
  [vipClubPlayerStateRemoveReducer, vipClubPlayerStateRemoveAction],
  [vipClubTournamentsReceivedReducer, vipClubTournamentsReceivedAction],
  [vipClubLeaderBoardSelfPlacesReceivedReducer, vipClubLeaderBoardSelfPlacesReceivedAction],
  [vipClubTournamentsSelectedIdChangedReducer, vipClubTournamentsSelectedIdChangedAction],
  [vipClubLeaderBoardLastPlaceReceivedReducer, vipClubLeaderBoardLastPlaceReceivedAction],
  [vipClubSettingsReceivedReducer, vipClubSettingsReceivedAction],
  [vipClubLevelProgressReducer, vipClubLevelProgressAction],
]);

export { vipClubRootReducer };
