import { isNil, type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type vipClubLevelProgressAction } from "../VipClubActions";

const vipClubLevelProgressReducer: TReducer<TPlatformAppState, typeof vipClubLevelProgressAction> = (state, { payload }) => {
  const playerState = state.vipClub.playerState;

  if (isNil(playerState)) {
    return state;
  }

  const { pointsFromLastLevelUp, availablePointsForCashBack, lifetimeDeposit } = playerState;

  return ({
    ...state,
    vipClub: {
      ...state.vipClub,
      playerState: {
        ...playerState,
        pointsFromLastLevelUp: payload.pointsFromLastLevelUp ?? pointsFromLastLevelUp,
        availablePointsForCashBack: payload.availablePointsForCashBack ?? availablePointsForCashBack,
        lifetimeDeposit: payload.lifetimeDeposit ?? lifetimeDeposit,
      },
    },
  });
};

export { vipClubLevelProgressReducer };
