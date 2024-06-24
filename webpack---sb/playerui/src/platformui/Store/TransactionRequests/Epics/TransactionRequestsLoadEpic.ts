import { concat, of, switchMap } from "rxjs";
import {
  EOrderDirection,
  EPlatform_TransactionRequestOrderByPaths,
  EPlatform_TransactionRequestWhereFieldPaths,
  type EPlatform_TransactionType,
  EWhere_Predicate,
} from "@sb/graphql-client";
import { deferWithAbort } from "@sb/utils";
import { platformPlayerTransactionsQueryOptionalFields, query_Platform_TransactionRequests } from "@sb/graphql-client/PlayerUI";
import { retryWithLog } from "../../../../common/Utils/EpicUtils/RetryWithLog";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { graphQlDataSelector, graphQlNodeSelector, graphQlPageInfoSelector } from "../../Root/Selectors/GraphQlSelectors";
import { type IWithCursor } from "../../Paginator/IWithCursor";
import { platformTransactionRequestsPendingAction, platformTransactionRequestsReceivedAction } from "../TransactionRequestsActions";
import { getPaymentPluginOperands } from "../Model/TransactionRequests";

const orderBy = [
  {
    fieldPath: EPlatform_TransactionRequestOrderByPaths.transactionRequestCreatedAt,
    direction: EOrderDirection.desc,
  },
];

const pluginCodeOperand = {
  predicate: EWhere_Predicate.or,
  operands: getPaymentPluginOperands(EPlatform_TransactionRequestWhereFieldPaths.transactionRequestPluginCode),
};

const getTransactionTypeOperand = (transactionTypeList: EPlatform_TransactionType[]) => ({
  predicate: EWhere_Predicate.or,
  operands: transactionTypeList.map((transactionType) => ({
    predicate: EWhere_Predicate.eq,
    fieldPath: EPlatform_TransactionRequestWhereFieldPaths.transactionRequestTransactionType,
    value: transactionType,
  })),
});

const transactionRequestsLoadEpic = (
  transactionTypeList: EPlatform_TransactionType[],
  variables: IWithCursor,
): TPlatformEpic => (action$, state$, deps) => {
  const graphQLClient = deps.graphQLClient;

  const playerId = playerDetailsSelectors.id(state$.value);

  return concat(
    of(platformTransactionRequestsPendingAction(true)),
    deferWithAbort(
      () =>
        query_Platform_TransactionRequests(
          graphQLClient,
          {
            optionalFields: platformPlayerTransactionsQueryOptionalFields,
            variables: {
              ...variables,
              orderBy,
              where: {
                predicate: EWhere_Predicate.and,
                operands: [
                  pluginCodeOperand,
                  getTransactionTypeOperand(transactionTypeList),
                  {
                    predicate: EWhere_Predicate.eq,
                    fieldPath: EPlatform_TransactionRequestWhereFieldPaths.transactionRequestPlayerId,
                    value: playerId,
                  },
                ],
              },
            },
          },
        ),
    ).pipe(
      switchMap(
        (response) => {
          const data = graphQlDataSelector(response).TransactionRequests;

          return concat(
            of(platformTransactionRequestsReceivedAction(
              graphQlNodeSelector(data),
              graphQlPageInfoSelector(data),
              transactionTypeList,
              variables,
            )),
            of(platformTransactionRequestsPendingAction(false)),
          );
        },
      ),
      retryWithLog("[transactionRequestLoadEpic] load error"),
    ),
  );
};

export { transactionRequestsLoadEpic };
