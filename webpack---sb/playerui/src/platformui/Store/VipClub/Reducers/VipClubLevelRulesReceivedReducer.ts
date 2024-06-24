import { simpleReducer, type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubLevelRulesReceivedAction } from "../VipClubActions";

const vipClubLevelRulesReceivedReducer: TReducer<TPlatformAppState, typeof vipClubLevelRulesReceivedAction> =
  simpleReducer([], ["vipClub", "levelRules"]);

export { vipClubLevelRulesReceivedReducer };
