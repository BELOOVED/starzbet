import { EOrderDirection } from "@sb/graphql-client";
import { getLocalStorage, localStorageKeys } from "../../../common/Store/LocalStorage/localStorageKeys";
import { betWhereExtension } from "./Model/BetWhereExtension";
import {
  type TBet,
  type TBetHistoryState,
  type TEditableBet,
  type TOrderBy,
  type TOutcomeHistory,
  type TPageInfo,
  type TWhere,
} from "./Model/TBet";
import { type TBetTypeFilter } from "./Model/BetTypeFilter";

interface IMyBetsState {
  bets: TBet[];
  editableBet: TEditableBet | undefined;
  filter: TBetTypeFilter | null;
  pageInfo: TPageInfo;
  where: TWhere | null;
  orderBy: TOrderBy;

  cursor: {
    before?: string | null;
    last?: number | null;
    after?: string | null;
    first?: number | null;
  };

  betHistory: {
    [betId: string]: TBetHistoryState;
  };
  outcomeHistory: TOutcomeHistory;

  countPerPage: number | null;
  openedBetsCount: number;
  totalBetsCount: number;

  pending: boolean;
  skipEditBetTutorial: boolean;
  skipAddSelectionTip: boolean;

  bet: null;
}

interface IWithMyBetsState {
  myBets: IMyBetsState;
}

const myBetsState: IWithMyBetsState = {
  myBets: {
    pending: false,

    pageInfo: {
      endCursor: null,
      startCursor: null,
      hasNextPage: false,
      hasPreviousPage: false,
      total: 0,
    },

    cursor: {
      first: null,
      after: null,
      last: null,
      before: null,
    },

    where: null,

    orderBy: [
      {
        fieldPath: betWhereExtension.bet__createdAt,
        direction: EOrderDirection.desc,
      },
    ],

    filter: null,

    countPerPage: null,

    bets: [],

    bet: null,

    openedBetsCount: 0,
    totalBetsCount: 0,

    editableBet: undefined,

    betHistory: {},

    outcomeHistory: {},

    skipEditBetTutorial: !!getLocalStorage(localStorageKeys.skipEditBetTutorial),
    skipAddSelectionTip: !!getLocalStorage(localStorageKeys.skipAddSelectionTip),
  },
};

export { myBetsState, type IWithMyBetsState };
