import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubTournamentsSelectedIdChangedAction } from "../VipClubActions";

const vipClubTournamentsSelectedIdChangedReducer: TReducer<TPlatformAppState, typeof vipClubTournamentsSelectedIdChangedAction> =
  (state, { payload }) => ({
    ...state,
    vipClub: {
      ...state.vipClub,
      tournaments: {
        ...state.vipClub.tournaments,
        selectedId: payload,
      },
    },
  });

export { vipClubTournamentsSelectedIdChangedReducer };
