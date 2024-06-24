import type { TReducer } from "@sb/utils";
import type { TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubSettingsReceivedAction } from "../VipClubActions";

const vipClubSettingsReceivedReducer: TReducer<TPlatformAppState, typeof vipClubSettingsReceivedAction> = (state, { payload }) => ({
  ...state,
  vipClub: {
    ...state.vipClub,
    settings: payload,
  },
});

export { vipClubSettingsReceivedReducer };
