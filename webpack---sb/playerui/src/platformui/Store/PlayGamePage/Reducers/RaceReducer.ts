import { isEmpty, isNotEmpty, type TReducer } from "@sb/utils";
import { type EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import { vipClubParsePeriodKind } from "@sb/vip-club";
import { vipClubReceivedTournamentHandler } from "../../VipClub/Util/VipClubReceivedTournamentHandler";
import type { TWithPlayGameState } from "../PlayGameState";
import { type racesVipClubReceiveAction } from "../Actions/VipClubInfoActions";

const raceReducer: TReducer<TWithPlayGameState, typeof racesVipClubReceiveAction> = (
  state,
  { payload },
) => {
  const races = vipClubReceivedTournamentHandler(payload);

  if (isEmpty(races.active) && isEmpty(races.upcoming)) {
    return {
      ...state,
      playGameNew: {
        ...state.playGameNew,
        vipClubInfo: {
          ...state.playGameNew.vipClubInfo,
          races: null,
        },
      },
    };
  }

  const period = isNotEmpty(races.active)
    ? vipClubParsePeriodKind(races.active[0].templateSnapshot.period.kind).period as unknown as  EPlatform_VipClubLeaderBoardPeriod
    : state.playGameNew.vipClubInfo.period;

  return ({
    ...state,
    playGameNew: {
      ...state.playGameNew,
      vipClubInfo: {
        ...state.playGameNew.vipClubInfo,
        period,
        races,
      },
    },
  });
};

export { raceReducer };
