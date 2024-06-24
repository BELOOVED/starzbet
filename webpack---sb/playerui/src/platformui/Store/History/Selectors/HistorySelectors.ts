import { createSimpleSelector, getNotNil, isEmpty, isNotNil, Money } from "@sb/utils";
import type {
  TPlatform_PlayerTransaction_Fragment,
  TPlatform_SportsbookBetData_Fragment,
  TPlatform_SportsbookBetOddsBoostData_Fragment,
  TPlatform_SportsbookBetRequestBatchData_Fragment,
  TPlatform_TransactionRequestDataPayload_Fragment,
  TSportsbook_Bet_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { callManagerStartedSelector, createCallManagerSymbol } from "@sb/call-manager";
import { EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { EPlatform_Typename } from "@sb/graphql-client";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type IWithHistoryState } from "../HistoryInitialState";
import { EHistoryProduct } from "../Model/EHistoryProduct";

const historySelectors = ({ history }: IWithHistoryState) => history;

const nodesHistorySelector = (s: IWithHistoryState) => historySelectors(s).nodes;

const isEmptyNodesHistorySelector = createSimpleSelector(
  [nodesHistorySelector],
  isEmpty,
);

const historySportBetSportsbookBetSelector = (
  payload: TPlatform_SportsbookBetData_Fragment | TPlatform_SportsbookBetRequestBatchData_Fragment,
) => {
  if (payload.__typename === "Platform_SportsbookBetRequestBatchData") {
    return getNotNil(
      payload.bets[0]?.bet.sportsbookBet,
      ["historySportsbookBetSelector", "Platform_SportsbookBetRequestBatchData"],
      "payload.bets[0]?.bet.sportsbookBet",
    );
  }

  return getNotNil(
    payload.bet?.sportsbookBet,
    ["historySportsbookBetSelector", "TPlatform_SportsbookBetData_Fragment"],
    "bet.sportsbookBet",
  );
};

const pageInfoHistorySelector = (s: IWithHistoryState) => historySelectors(s).pageInfo;

/**
 * TODO @lebedev
 */
const totalCountHistorySelector = () => 0;

const historyFilterSelector = (s: IWithHistoryState) => historySelectors(s).filter;

const historyVariablesSelector = (s: IWithHistoryState) => historySelectors(s).variables;

const historyProductRouteSelector = createSimpleSelector(
  [routerLocationPathnameSelector],
  (path) =>
    matchPath<{ product: EHistoryProduct; }>(path, { path: routeMap.historyRouteWithParam })?.params.product,
);

const historyProductNotNilSelector = createSimpleSelector(
  [historyProductRouteSelector],
  (product) =>
    getNotNil(
      product,
      ["historyProductNotNilRouteSelector"],
      "product",
    ),
);

const GAME_PRODUCT: EHistoryProduct[] =
  [EHistoryProduct.games, EHistoryProduct.casino, EHistoryProduct.liveCasino, EHistoryProduct.virtual];

const isGameProductSelector = createSimpleSelector(
  [historyProductRouteSelector],
  (val) => isNotNil(val) && GAME_PRODUCT.includes(val),
);

const HISTORY_LOADING_SYMBOL = createCallManagerSymbol("HISTORY_LOADING_SYMBOL");
const historyLoadingSelector = callManagerStartedSelector.with.symbol(HISTORY_LOADING_SYMBOL);

const SPORT_TRANSACTIONS_TYPENAMES: TPlatform_TransactionRequestDataPayload_Fragment["__typename"][] = [
  EPlatform_Typename.platformSportsbookBetData,
  EPlatform_Typename.platformSportsbookBetRequestBatchData,
  EPlatform_Typename.platformSportsbookBetOddsBoostData,
];

const isSportTransaction = (candidate: { __typename: string; }): candidate is TPlatform_SportsbookBetOddsBoostData_Fragment
  | TPlatform_SportsbookBetData_Fragment
  | TPlatform_SportsbookBetRequestBatchData_Fragment =>
  SPORT_TRANSACTIONS_TYPENAMES.includes(candidate.__typename);

const assertSportPayloadTransactionSelector = (
  { details }: TPlatform_PlayerTransaction_Fragment,
): TPlatform_SportsbookBetOddsBoostData_Fragment
  | TPlatform_SportsbookBetData_Fragment
  | TPlatform_SportsbookBetRequestBatchData_Fragment => {
  if (!details?.payload || !isSportTransaction(details.payload)) {
    throw new Error(`Assert payload - ${details?.payload?.__typename}`);
  }

  return details.payload;
};

const isOutcomeResult = (candidate: string): candidate is EOutcomeResult => Object.values(EOutcomeResult).includes(candidate);

const transactionResultSelector = (
  transaction: TPlatform_PlayerTransaction_Fragment,
  sportsbookBet?: null | TSportsbook_Bet_Fragment,
): EOutcomeResult => {
  const pick = sportsbookBet?.picks[0];

  if (pick?.result && isOutcomeResult(pick.result)) {
    return pick.result;
  }

  return Money
    .greaterThan(
      getNotNil(transaction.after, ["transactionResultSelector"], "after"),
      getNotNil(transaction.before, ["transactionResultSelector"], "before"),
    )
    ? EOutcomeResult.win
    : EOutcomeResult.loss;
};

const oddsBoostBetIdSelector = (payload: TPlatform_SportsbookBetOddsBoostData_Fragment) => getNotNil(
  payload.oddsBoost?.betId,
  ["oddsBoostBetIdSelector"],
  "betId",
);

export {
  nodesHistorySelector,
  pageInfoHistorySelector,
  totalCountHistorySelector,
  historyFilterSelector,
  historyVariablesSelector,
  isEmptyNodesHistorySelector,
  historySportBetSportsbookBetSelector,
  assertSportPayloadTransactionSelector,
  transactionResultSelector,
  oddsBoostBetIdSelector,
  isGameProductSelector,
  historyLoadingSelector,
  HISTORY_LOADING_SYMBOL,
  historyProductRouteSelector,
  historyProductNotNilSelector,
};
