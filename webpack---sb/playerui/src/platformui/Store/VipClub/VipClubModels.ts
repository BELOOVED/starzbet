import {
  type TPlatform_VipClubLeaderBoardRow_Fragment,
  type TPlatform_VipClubLevelExtraMedia_Fragment,
  type TPlatform_VipClubLevelRange_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { EPlatform_VipClubLeaderBoardPeriod, type TMoney_Fragment } from "@sb/graphql-client";

enum EVipClubLevelRuleState {
  completed = "COMPLETED",
  current = "CURRENT",
  next = "NEXT",
  notCompleted = "NOT_COMPLETED",
  notDefined = "NOT_DEFINED",
}

enum EVipClubPlayerState {
  noPlayer = "NO_PLAYER",
  loading = "LOADING",
  noLevelRules = "NO_LEVEL_RULES",
  noPlayerLevelRule = "NO_PLAYER_LEVEL_RULE",
  noPlayerNextLevelRule = "NO_PLAYER_NEXT_LEVEL_RULE",
  full = "FULL",
}

enum EVipClubCommissionRefundState {
  noCommission = "NO_COMMISSION",
  loading = "LOADING",
  full = "FULL",
}

enum EVipClubBonusesState {
  loading = "LOADING",
  empty = "EMPTY",
  full = "FULL",
  failed = "FAILED",
}

enum EVipClubBonusType {
  daily = "DAILY",
  weekly = "WEEKLY",
  monthly = "MONTHLY",
  birthday = "BIRTHDAY",
  extra = "EXTRA",
}

enum EVipClubLeaderBoardState {
  empty = "EMPTY",
  loading = "LOADING",
  failed = "FAILED",
  full = "FULL",
}

enum EVipClubTournamentsPageState {
  noActiveTournaments = "NO_ACTIVE_TOURNAMENTS",
  loading = "LOADING",
  failed = "FAILED",
  full = "FULL",
}

enum EVipClubLeaderBoardSelfPlaceState {
  notLogged = "NOT_LOGGED",
  notVipClubMember = "NOT_VIP_CLUB_MEMBER",
  loading = "LOADING",
  notInLeaderBoard = "NOT_IN_LEADER_BOARD",
  inLeaderBoard = "IN_LEADER_BOARD",
  inLeaderBoardWithTournamentPrize = "IN_LEADER_BOARD_WITH_TOURNAMENT_PRIZE",
}

enum EVipClubContributionTableState {
  loading = "LOADING",
  empty = "EMPTY",
  full = "FULL",
}

enum EVipClubLeaderBoardTypeByPrize {
  withPrize = "WITH_PRIZE",
  withoutPrize = "WITHOUT_PRIZE",
}

enum EVipClubBonusCardButtonState {
  disabled = "DISABLED",
  cashback = "CASHBACK",
  showClaimRules = "SHOW_CLAIM_RULES",
  claim = "CLAIM",
}

enum EVipClubLevelRulesState {
  loading = "LOADING",
  empty = "EMPTY",
  full = "FULL",
  failed = "FAILED",
}

enum EVipClubDoCommissionRefundState {
  loading = "LOADING",
  notAvailableForRefund = "NOT_AVAILABLE_FOR_REFUND",
  failed = "FAILED",
  success = "SUCCESS",
  availableForRefund = "AVAILABLE_FOR_REFUND",
}

interface IWithVipClubLeaderBoardTypeByPrize {
  leaderBoardTypeByPrize: EVipClubLeaderBoardTypeByPrize;
}

interface IVipClubBonusCardProps extends IWithId {
  type: EVipClubBonusType;
}

type TPlayerIdToLeaderBoardRowMap = Record<string, TPlatform_VipClubLeaderBoardRow_Fragment>;

type TPlayerIdToLeaderBoardRowOrNullMap = Record<string, TPlatform_VipClubLeaderBoardRow_Fragment | null>;

type TVipClubLeaderBoardPlacesMap = Record<number, TPlatform_VipClubLeaderBoardRow_Fragment>;

interface IVipClubLeaderBoardUpdatePayload {
  version: number;
  diff: TPlayerIdToLeaderBoardRowOrNullMap | null;
}

interface IVipClubLeaderBoardUpdateSnapshot {
  placesMap: TPlayerIdToLeaderBoardRowMap;
  playerRow: TPlatform_VipClubLeaderBoardRow_Fragment | null;
  minPoint: string | null;
}

interface IVipClubLeadersParams {
  period: "daily" | "monthly" | "weekly" | "all-time";
  page: string;
}

interface IVipClubTournamentsParams extends IVipClubLeadersParams {
  selectedTournamentId: string;
}

interface IVipClubPaginationItemProps {
  value: number;
}

interface IWithVipClubLevels {
  levels: TPlatform_VipClubLevelRange_Fragment;
}

interface IWithVipClubLeaderBoardPlace {
  place: number;
}

interface IWithVipClubLeaderBoardPoints {
  points: string;
}

interface IWithVipClubExtraMedias {
  extraMedias: TPlatform_VipClubLevelExtraMedia_Fragment[];
}

const RACE_PERIOD_TO_URL_PARAM_MAP = {
  [EPlatform_VipClubLeaderBoardPeriod.daily]: "daily",
  [EPlatform_VipClubLeaderBoardPeriod.weekly]: "weekly",
  [EPlatform_VipClubLeaderBoardPeriod.monthly]: "monthly",
} as const;

const LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP = {
  ...RACE_PERIOD_TO_URL_PARAM_MAP,
  [EPlatform_VipClubLeaderBoardPeriod.allTime]: "all-time",
} as const;

const LEADER_BOARD_URL_PARAM_TO_PERIOD_MAP = {
  daily: EPlatform_VipClubLeaderBoardPeriod.daily,
  weekly: EPlatform_VipClubLeaderBoardPeriod.weekly,
  monthly: EPlatform_VipClubLeaderBoardPeriod.monthly,
  "all-time": EPlatform_VipClubLeaderBoardPeriod.allTime,
};

interface IVipClubLevelProgressPayload {
  pointsFromLastLevelUp: string | null;
  availablePointsForCashBack: string | null;
  lifetimeDeposit: TMoney_Fragment | null;
}

export {
  EVipClubLevelRuleState,
  EVipClubPlayerState,
  EVipClubCommissionRefundState,
  EVipClubBonusesState,
  EVipClubBonusType,
  EVipClubLeaderBoardState,
  EVipClubTournamentsPageState,
  EVipClubLeaderBoardSelfPlaceState,
  EVipClubContributionTableState,
  EVipClubLeaderBoardTypeByPrize,
  EVipClubBonusCardButtonState,
  EVipClubLevelRulesState,
  EVipClubDoCommissionRefundState,
  type IVipClubBonusCardProps,
  type IVipClubLeaderBoardUpdatePayload,
  type TPlayerIdToLeaderBoardRowOrNullMap,
  type IVipClubLeaderBoardUpdateSnapshot,
  type IVipClubLeadersParams,
  type IVipClubTournamentsParams,
  type IVipClubPaginationItemProps,
  type IWithVipClubLevels,
  type TVipClubLeaderBoardPlacesMap,
  type IWithVipClubLeaderBoardTypeByPrize,
  type IWithVipClubLeaderBoardPlace,
  type IWithVipClubExtraMedias,
  type IVipClubLevelProgressPayload,
  type IWithVipClubLeaderBoardPoints,
  LEADER_BOARD_PERIOD_TO_URL_PARAM_MAP,
  LEADER_BOARD_URL_PARAM_TO_PERIOD_MAP,
  RACE_PERIOD_TO_URL_PARAM_MAP,
};
