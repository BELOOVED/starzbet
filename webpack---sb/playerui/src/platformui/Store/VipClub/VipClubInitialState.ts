import { type Nullable } from "vitest";
import {
  type TPlatform_VipClubContributionTableRule_Fragment,
  type TPlatform_VipClubLeaderBoardRow_Fragment,
  type TPlatform_VipClubLevelRule_Fragment,
  type TPlatform_VipClubPlayerState_Fragment,
  type TPlatform_VipClubSettings_Fragment,
  type TPlatform_VipClubTournament_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import { type TVipClubLeaderBoardPlacesMap } from "./VipClubModels";

interface IVipClubTournaments {
  active: TPlatform_VipClubTournament_Fragment[];
  finished: TPlatform_VipClubTournament_Fragment[];
  upcoming: TPlatform_VipClubTournament_Fragment[];
}

interface IVipClubTournamentsState extends IVipClubTournaments {
  selectedId: string | null;
}

interface IVipClubLeaderBoard {
  placesMap: TVipClubLeaderBoardPlacesMap;
  activePeriod: EPlatform_VipClubLeaderBoardPeriod;
  size: number | null;
  total: number | null;
  page: number;
  playerRow: TPlatform_VipClubLeaderBoardRow_Fragment | null;
  minPoint: string | null;
}

interface IVipClubState {
  contributionTable: TPlatform_VipClubContributionTableRule_Fragment[];
  levelRules: TPlatform_VipClubLevelRule_Fragment[];
  playerState: Nullable<TPlatform_VipClubPlayerState_Fragment>;
  leaderBoard: IVipClubLeaderBoard;
  tournaments: IVipClubTournamentsState;
  settings: TPlatform_VipClubSettings_Fragment | null;
}

interface IWithVipClubState {
  vipClub: IVipClubState;
}

const VIP_CLUB_LEADER_BOARD_INITIAL_STATE: IVipClubLeaderBoard = {
  placesMap: {},
  activePeriod: EPlatform_VipClubLeaderBoardPeriod.daily,
  size: null,
  total: null,
  page: 0,
  playerRow: null,
  minPoint: null,
};

const tournamentsInitialState: IVipClubTournamentsState = {
  active: [],
  finished: [],
  upcoming: [],
  selectedId: null,
};

const vipClubInitialState: IWithVipClubState = {
  vipClub: {
    contributionTable: [],
    levelRules: [],
    playerState: null,
    leaderBoard: VIP_CLUB_LEADER_BOARD_INITIAL_STATE,
    tournaments: tournamentsInitialState,
    settings: null,
  },
};

export {
  vipClubInitialState,
  type IWithVipClubState,
  type IVipClubTournaments,
  VIP_CLUB_LEADER_BOARD_INITIAL_STATE,
};
