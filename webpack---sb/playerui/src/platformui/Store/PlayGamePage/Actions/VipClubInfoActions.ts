import { type EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import type {
  TPlatform_VipClubLeaderBoardRow_Fragment,
  TPlatform_VipClubSelfPlace_Fragment,
  TPlatform_VipClubTournament_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type ILeaderBoardNeighbours } from "@sb/sdk/platform/vipclub/api/leaderboard/dto/LeaderBoardNeighbours";
import type { TNullable } from "@sb/utils";
import { type EVipClubBoardType, type INeighbour, type INeighbours } from "../PlayGameState";

const setVipClubInfoPeriodAction = (period: EPlatform_VipClubLeaderBoardPeriod) => ({
  type: "@PLAY_GAME/VIP_CLUB_INFO_SET_PERIOD",
  payload: { period },
});

const setVipClubInfoTypeAction = (type: EVipClubBoardType) => ({
  type: "@PLAY_GAME/VIP_CLUB_INFO_SET_TYPE",
  payload: { type },
});

const pinVipClubInfoAction = () => ({
  type: "@PLAY_GAME/VIP_CLUB_INFO_PIN",
});

const pinVipClubInfoUpdateAction = (payload: TPlatform_VipClubLeaderBoardRow_Fragment) => ({
  type: "@PLAY_GAME/VIP_CLUB_INFO_PIN_UPDATE",
  payload,
});

const selfVipClubPlacesReceiveAction = (payload: TPlatform_VipClubSelfPlace_Fragment[]) => ({
  type: "@PLAY_GAME/SELF_VIP_CLUB_PLACES_RECEIVED",
  payload,
});

const neighboursVipClubReceiveAction = (payload: TNullable<ILeaderBoardNeighbours>) => ({
  type: "@PLAY_GAME/NEIGHBOURS_VIP_CLUB_RECEIVED",
  payload,
});

const racesVipClubReceiveAction = (payload: TPlatform_VipClubTournament_Fragment[]) => ({
  type: "@PLAY_GAME/RACES_VIP_CLUB_RECEIVED",
  payload,
});

const selfVipClubUpdateAction = (payload: TPlatform_VipClubLeaderBoardRow_Fragment) => ({
  type: "@PLAY_GAME/SELF_VIP_CLUB_PLACES_UPDATE",
  payload,
});

const neighboursVipClubUpdateAction = (payload: INeighbours) => ({
  type: "@PLAY_GAME/NEIGHBOURS_VIP_CLUB_UPDATE",
  payload,
});

const selfAndNeighboursVipClubUpdateAction = (self: TPlatform_VipClubLeaderBoardRow_Fragment, neighbours: INeighbours) => ({
  type: "@PLAY_GAME/SELF_AND_NEIGHBOURS_VIP_CLUB_PLACES_UPDATE",
  payload: { self, neighbours },
});

const diffVipClubInfoAction =
  (
    after: TNullable<INeighbour>,
    before: TNullable<INeighbour>,
    selfInfo: TNullable<TPlatform_VipClubLeaderBoardRow_Fragment>,
  ) => ({
    type: "@PLAY_GAME/DIFF_VIP_CLUB_INFO",
    payload: { after, before, selfInfo },
  });

const callNeighboursVipClubAction = () => ({
  type: "@PLAY_GAME/CALL_NEIGHBOURS_VIP_CLUB",
});

export {
  setVipClubInfoPeriodAction,
  setVipClubInfoTypeAction,
  pinVipClubInfoAction,
  selfVipClubPlacesReceiveAction,
  neighboursVipClubReceiveAction,
  neighboursVipClubUpdateAction,
  selfVipClubUpdateAction,
  diffVipClubInfoAction,
  callNeighboursVipClubAction,
  pinVipClubInfoUpdateAction,
  selfAndNeighboursVipClubUpdateAction,
  racesVipClubReceiveAction,
};
