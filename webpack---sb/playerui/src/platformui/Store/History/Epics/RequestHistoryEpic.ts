import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { filter } from "rxjs";
import {
  EOrderDirection,
  EPlatform_PlayerTransactionOrderByPaths,
  EPlatform_PlayerTransactionWhereFieldPaths,
  EWhere_Predicate,
} from "@sb/graphql-client";
import {
  platformPlayerTransactionsQueryOptionalFields,
  query_Platform_PlayerTransactions,
} from "@sb/graphql-client/PlayerUI";
import { getNotNil, isNotNil } from "@sb/utils";
import { type EProductCode } from "@sb/betting-core/EProductCode";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { playerWalletSelectors } from "../../../../common/Store/Player/Selectors/WalletSelectors";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import {
  graphQlDataSelector,
  graphQlNodeSelector,
  graphQlPageInfoSelector,
} from "../../Root/Selectors/GraphQlSelectors";
import { historyReceivedAction } from "../HistoryActions";
import { HISTORY_LOADING_SYMBOL, historyFilterSelector, historyVariablesSelector } from "../Selectors/HistorySelectors";
import { type EHistoryProduct } from "../Model/EHistoryProduct";
import { type IHistoryFilter } from "../HistoryInitialState";

const transactionsOrderBy = [
  {
    fieldPath: EPlatform_PlayerTransactionOrderByPaths.playerTransactionCreatedAt,
    direction: EOrderDirection.desc,
  },
];

const getIntervals = (filter: IHistoryFilter) => {
  if (filter.duration) {
    const now = Date.now();

    return {
      lte: now.toString(),
      gte: (now - filter.duration).toString(),
    };
  }

  const notNilTo = getNotNil(filter.to, ["RequestHistoryEpic"], "filter.to").toString();
  const notNilFrom = getNotNil(filter.from, ["RequestHistoryEpic"], "filter.to").toString();

  return {
    lte: notNilTo,
    gte: notNilFrom,
  };
};

const createRequestHistoryEpic = (operandValue: EProductCode, product: EHistoryProduct): TMixAppEpic => (
  action$,
  state$,
  deps,
) => state$.pipe(
  map(playerDetailsSelectors.wallet),
  distinctUntilChanged(),
  filter(isNotNil),
  map(() => playerWalletSelectors.id(state$.value)),
  switchMap((walletId) => {
    const variables = historyVariablesSelector(state$.value);
    const filter = historyFilterSelector(state$.value);
    const intervals = getIntervals(filter);

    return gqlLoadingFactory(
      HISTORY_LOADING_SYMBOL,
      query_Platform_PlayerTransactions,
      {
        optionalFields: platformPlayerTransactionsQueryOptionalFields,
        variables: {
          ...variables,
          orderBy: transactionsOrderBy,
          where: {
            predicate: EWhere_Predicate.and,
            operands: [
              {
                predicate: EWhere_Predicate.eq,
                fieldPath: EPlatform_PlayerTransactionWhereFieldPaths.playerTransactionWalletId,
                value: walletId,
              },
              {
                predicate: EWhere_Predicate.eq,
                fieldPath: EPlatform_PlayerTransactionWhereFieldPaths.playerTransactionProduct,
                value: operandValue,
              },
              {
                predicate: EWhere_Predicate.lte,
                fieldPath: EPlatform_PlayerTransactionWhereFieldPaths.playerTransactionCreatedAt,
                value: intervals.lte,
              },
              {
                predicate: EWhere_Predicate.gte,
                fieldPath: EPlatform_PlayerTransactionWhereFieldPaths.playerTransactionCreatedAt,
                value: intervals.gte,
              },
            ],
          },
        },
      },
      historyReceivedAction,
      (response) => {
        const data = graphQlDataSelector(response).PlayerTransactions;

        return [
          graphQlNodeSelector(data),
          graphQlPageInfoSelector(data),
          product,
        ];
      },
      undefined,
      undefined,
      true,
    )(action$, state$, deps);
  }),
);

export { createRequestHistoryEpic };
