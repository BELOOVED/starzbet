import { type TCallPayload, type TCallResponsePayload } from "@sb/sdk";
import {
  type call_GetBetHistoryByBetIdQuery,
  type call_GetPlayerBetHistoryQuery,
} from "@sb/sdk/SDKClient/sportsbookread";
import { type call_GetBetStatesQuery } from "@sb/sdk/SDKClient/placebet";
import { type IMoney, type TVoidFn, type UnionToTuple } from "@sb/utils";
import { type ESportsbook_BetStatusEnum, type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { isOutrightKind } from "../../Feed/Model/Outright";

type TTimeRange = {
  gte: number;
  lte: number;
}

/**
 * temp decision
 * for long-term development plans it is necessary to transfer these requests to GQL and use types from there
 * !! do not create alias for primitives !!
 */
type TWhere = NonNullable<TCallPayload<typeof call_GetPlayerBetHistoryQuery>["where"]>
type TOrderBy = NonNullable<TCallPayload<typeof call_GetPlayerBetHistoryQuery>["orderBy"]>
type TGetPlayerBetHistoryResponse = TCallResponsePayload<typeof call_GetPlayerBetHistoryQuery>
type TGetBetStatesResponse = TCallResponsePayload<typeof call_GetBetStatesQuery>
type TBet = TCallResponsePayload<typeof call_GetBetHistoryByBetIdQuery>
type TBetBonus = TBet["betBonus"]
type TBetContract = TBet["contract"]
type TBetContractItem = TBetContract[number]
type TBetStatus = TBet["betStatus"]
type TBetAutoCashOut = TBet["autoCashOut"]
type TBetBoostSize = Exclude<TBet["boost"], null | undefined>["size"]
type TBetBoostSizeMonetary = UnionToTuple<TBetBoostSize>[0];
type TBetBoostSizePercentage = UnionToTuple<TBetBoostSize>[1];

type TBetHistoryPick = TGetBetStatesResponse[number]["picks"][number]
type TBetHistoryEventPick = UnionToTuple<TBetHistoryPick>[0]
type TBetHistoryOutrightPick = UnionToTuple<TBetHistoryPick>[1]

type TBetHistoryEventPickMarket = TBetHistoryEventPick["market"]
type TMarketType = TBetHistoryEventPickMarket["type"]
type TBetHistoryScope = TBetHistoryEventPickMarket["scope"]
type TScopeType = TBetHistoryScope["type"]
type TBetHistoryEventPickEvent = TBetHistoryEventPick["event"]
type TBetHistoryOutcome = TBetHistoryEventPick["outcome"]
type TBetPickEventInfo = TBetHistoryEventPick["eventInfo"]

type TBetHistoryOutright = TBetHistoryOutrightPick["outright"]

function assertMonetaryBoostSize(size: TBetBoostSize, context: string): asserts size is TBetBoostSizeMonetary {
  if (size.type !== "monetary") {
    throw new Error(`[assertMonetaryBoostSize] [${context}] odds boost size should be monetary}`);
  }
}

function assertPercentageBoostSize(size: TBetBoostSize, context: string): asserts size is TBetBoostSizePercentage {
  if (size.type !== "percentage") {
    throw new Error(`[assertPercentageBoostSize] [${context}] odds boost size should be monetary}`);
  }
}

const isBetHistoryOutrightPick = (pick: TBetHistoryPick): pick is TBetHistoryOutrightPick => isOutrightKind(pick["@kind"]);

// uncomment when needed
// const isBetHistoryEventPick = (pick: TBetHistoryPick): pick is TBetHistoryEventPick => pick["@kind"] === "event";

// function asserBetHistoryEventPick(pick: TBetHistoryPick, context: string): asserts pick is TBetHistoryEventPick {
//   if (!isBetHistoryEventPick(pick)) {
//     throw new Error(`[asserBetHistoryEventPick] [${context}] pick should be event}`);
//   }
// }
//
// function assertBetHistoryOutrightPick(pick: TBetHistoryPick, context: string): asserts pick is TBetHistoryOutrightPick {
//   if (!isBetHistoryOutrightPick(pick)) {
//     throw new Error(`[assertBetHistoryOutrightPick] [${context}] pick should be outright}`);
//   }
// }

// todo refactor as union
type TBetPickEntry = {
  outrightId?: string;
  marketId?: string;
  eventId?: string;
  translatesForManuallyCreated?: TBetHistoryOutcome["translatesForManuallyCreated"];
  outcomeId: TBetHistoryOutcome["id"];
  coefficient: TBetHistoryPick["coefficient"];
  updatedAt?: number;
  applied: boolean;
  newPick?: boolean;
  removed: boolean;
  id: string;
}
type TBetTotalStake = TBet["totalStake"]
type TBetHash = TBet["hash"]
type TEditableBet = {
  id: string;
  committing?: boolean;
  saving: boolean;
  adding: boolean;
  changed: boolean;
  lastSaveError: undefined | Error;
  picks: TBetPickEntry[];
  committedPicks: TBetPickEntry[];
  additionalStakeAmount: TBetTotalStake;
  hash: TBetHash;
  distanceToTop?: number;
  changedSinceLastCommit?: boolean;
}

type TBetHistoryStateListItem = {
  hash?: TBetHash;
  live?: TBet["live"];
  createdAt?: TBet["createdAt"];
  totalStake?: TBetTotalStake;
  totalPotentialPayout?: TBet["totalPotentialPayout"];
  picks?: TBetHistoryPick[];
  original?: boolean;
}

type TBetHistoryState = {
  list: TBetHistoryStateListItem[];
  cashoutHistory: TBetContract;
};

type TOutcomeHistory = Record<number, Record<string, number>>

type TPageInfo = TGetPlayerBetHistoryResponse["pageInfo"]

type TCasinoBet = {
  id: string;
  status: ESportsbook_BetStatusEnum;
  stake: IMoney;
  payout: IMoney;
  name: TTranslateRecord_Fragment[];
  createdAt: string | number | undefined;
  contribution?: IMoney;
  toggleModal?: TVoidFn;
}

export {
  type TTimeRange,
  type TWhere,
  type TGetPlayerBetHistoryResponse,
  type TOrderBy,
  type TBet,
  type TPageInfo,
  type TEditableBet,
  type TBetPickEntry,
  type TBetHistoryOutrightPick,
  type TBetHistoryEventPick,
  type TGetBetStatesResponse,
  type TBetHistoryState,
  type TBetHistoryPick,
  type TBetHistoryStateListItem,
  type TOutcomeHistory,
  type TBetBonus,
  type TBetContract,
  type TBetBoostSize,
  type TBetBoostSizePercentage,
  type TBetBoostSizeMonetary,
  type TScopeType,
  type TMarketType,
  type TBetStatus,
  type TBetHistoryOutcome,
  type TBetHistoryEventPickMarket,
  type TBetHistoryEventPickEvent,
  type TBetHistoryOutright,
  type TBetContractItem,
  type TBetPickEventInfo,
  type TCasinoBet,
  type TBetAutoCashOut,

  assertMonetaryBoostSize,
  assertPercentageBoostSize,
  isBetHistoryOutrightPick,
};
