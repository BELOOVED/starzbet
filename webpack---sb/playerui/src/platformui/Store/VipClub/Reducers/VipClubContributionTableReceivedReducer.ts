import { sortBy, type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubContributionTableReceivedAction } from "../VipClubActions";

const vipClubContributionTableReceivedReducer: TReducer<TPlatformAppState, typeof vipClubContributionTableReceivedAction> =
  (state, { payload }) => ({
    ...state,
    vipClub: {
      ...state.vipClub,
      contributionTable: sortBy((value) => value.product, payload.filter(({ rate }) => rate !== "0")),
    },
  });

export { vipClubContributionTableReceivedReducer };
