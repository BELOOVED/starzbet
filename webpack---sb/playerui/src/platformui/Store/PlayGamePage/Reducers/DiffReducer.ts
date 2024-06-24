import type { TReducer } from "@sb/utils";
import type { TWithPlayGameState } from "../PlayGameState";
import { type diffVipClubInfoAction } from "../Actions/VipClubInfoActions";

const setDiffVipClubReducer: TReducer<TWithPlayGameState, typeof diffVipClubInfoAction> = (
  state,
  { payload },
) => ({
  ...state,
  playGameNew: {
    ...state.playGameNew,
    vipClubInfo: {
      ...state.playGameNew.vipClubInfo,
      diff: payload,
    },
  },
});

export { setDiffVipClubReducer };
