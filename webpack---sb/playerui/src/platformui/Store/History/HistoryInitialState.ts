import { type TPageInfo_Fragment } from "@sb/graphql-client";
import type { TPlatform_PlayerTransaction_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IWithCursor } from "../Paginator/IWithCursor";
import { EHistoryDuration } from "./Model/HistoryDuration";
import { type EHistoryProduct } from "./Model/EHistoryProduct";

interface IHistoryFilter {
  duration: number | null;
  from: number | null;
  to: number | null;
}

interface IWithHistoryState {
  history: {
    nodes: TPlatform_PlayerTransaction_Fragment[];
    filter: IHistoryFilter;
    variables: IWithCursor;
    product?: EHistoryProduct;
    pageInfo: TPageInfo_Fragment;
  };
}

const historyInitialState: IWithHistoryState = {
  history: {
    nodes: [],
    filter: {
      duration: EHistoryDuration.last24Hours,
      from: null,
      to: null,
    },
    variables: {
      cursor: { first: 20 },
    },
    pageInfo: {} as TPageInfo_Fragment,
  },
};

export {
  historyInitialState,
  type IWithHistoryState,
  type IHistoryFilter,
};
