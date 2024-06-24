import { simpleReducer, type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubPlayerStateReceivedAction } from "../VipClubActions";

const vipClubPlayerStateReceivedReducer: TReducer<TPlatformAppState, typeof vipClubPlayerStateReceivedAction> =
  simpleReducer([], ["vipClub", "playerState"]);

export { vipClubPlayerStateReceivedReducer };
