import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubPlayerStateRemoveAction } from "../VipClubActions";

const vipClubPlayerStateRemoveReducer: TReducer<TPlatformAppState, typeof vipClubPlayerStateRemoveAction> = (
  state,
) => ({
  ...state,
  vipClub: {
    ...state.vipClub,
    playerState: null,
  },
});

export { vipClubPlayerStateRemoveReducer };
