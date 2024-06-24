import { type TCallResponsePayload } from "@sb/sdk";
import { type call_GetGameLinkCommand } from "@sb/sdk/SDKClient/gamemanager";
import { EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import type { TPlatform_VipClubLeaderBoardRow_Fragment, TPlatform_VipClubTournament_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IMoney, type TNullable } from "@sb/utils";

type TGameLinkType = TCallResponsePayload<typeof call_GetGameLinkCommand>["type"]

enum EVipClubBoardType {
  leaderboard = "LEADERBOARD",
  race = "RACE"
}

interface INeighbour {
  place: number;
  playerId: string;
  playerMaskedName: string;
  points: string;
  reward?: IMoney | null;
}

interface INeighbours {
  before: TNullable<INeighbour>;
  after: TNullable<INeighbour>;
}

interface IVipClubInfoPin {
  type: EVipClubBoardType;
  period: EPlatform_VipClubLeaderBoardPeriod;
  place: number | null;
}

interface ISelfInfo {
  place: number | null;
  points: string | null;
  reward?: IMoney | null;
}

interface IDiffInfo extends INeighbours {
  selfInfo: TNullable<TPlatform_VipClubLeaderBoardRow_Fragment>;
}

interface IRaces {
  active: TPlatform_VipClubTournament_Fragment[];
  upcoming: TPlatform_VipClubTournament_Fragment[];
}

interface IVipClubInfoState {
  type: EVipClubBoardType;
  period: EPlatform_VipClubLeaderBoardPeriod | null;
  pin: IVipClubInfoPin;
  neighbours: INeighbours | null;
  self: ISelfInfo;
  diff: IDiffInfo | null;
  races: IRaces | null;
}

interface IPlayGameState {
  link: string | null;
  type: TGameLinkType | null;
  isDemo: boolean | null;
  vipClubInfo: IVipClubInfoState;
}

type TWithPlayGameState = {
  playGameNew: IPlayGameState;
}

const DEFAULT_PIN =
  { type: EVipClubBoardType.leaderboard, period: EPlatform_VipClubLeaderBoardPeriod.daily, place: null };

const playGameInitialStateNew: TWithPlayGameState = {
  playGameNew: {
    link: null,
    type: null,
    isDemo: false,
    vipClubInfo: {
      type: EVipClubBoardType.leaderboard,
      period: null,
      pin: DEFAULT_PIN,
      neighbours: null,
      self: {
        place: null,
        points: null,
      },
      diff: null,
      races: null,
    },
  },
};

export {
  type TGameLinkType,
  type TWithPlayGameState,
  type IVipClubInfoPin,
  type INeighbours,
  type INeighbour,
  type ISelfInfo,
  EVipClubBoardType,
  playGameInitialStateNew,
  DEFAULT_PIN,
};
