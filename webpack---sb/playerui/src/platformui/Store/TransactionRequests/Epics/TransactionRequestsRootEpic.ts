import { combineEpics } from "redux-observable";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { EPlatform_TransactionType } from "@sb/graphql-client";
import { getNotNil, isCreator, removeVoidProperties } from "@sb/utils";
import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import {
  bankingHistoryDepositsMatchOptions,
  bankingHistoryMatchOptions,
  bankingHistoryWithdrawsMatchOptions,
} from "../../PlatformMatchOptions";
import { type IWithCursor } from "../../Paginator/IWithCursor";
import { platformResetTransactionRequestsAction, platformTransactionRequestsChangePaginationAction } from "../TransactionRequestsActions";
import { transactionRequestsSelector } from "../Selectors/TransactionRequestsSelector";
import { ETransactionRequestPaginatorModel } from "../Model/TransactionRequestPaginatorModel";
import { transactionRequestsLoadEpic } from "./TransactionRequestsLoadEpic";

const PAGE_SIZE = 20;

const INITIAL_VARIABLES: IWithCursor = { cursor: { first: PAGE_SIZE } };

const transactionRequestReset = () => of(platformResetTransactionRequestsAction());

const transactionRequestHistoryRouteEpic = routerEpic({
  name: "transactionRequestHistory",
  match: getMatch(bankingHistoryMatchOptions),
  onStart: () => transactionRequestsLoadEpic([EPlatform_TransactionType.payout, EPlatform_TransactionType.payin], INITIAL_VARIABLES),
  onStop: () => transactionRequestReset,
});

const transactionRequestWithdrawRouteEpic = routerEpic({
  name: "transactionRequestWithdraw",
  match: getMatch(bankingHistoryWithdrawsMatchOptions),
  onStart: () => transactionRequestsLoadEpic([EPlatform_TransactionType.payout], INITIAL_VARIABLES),
  onStop: () => transactionRequestReset,
});

const transactionRequestDepositRouteEpic = routerEpic({
  name: "transactionRequestDeposit",
  match: getMatch(bankingHistoryDepositsMatchOptions),
  onStart: () => transactionRequestsLoadEpic([EPlatform_TransactionType.payin], INITIAL_VARIABLES),
  onStop: () => transactionRequestReset,
});

const transactionRequestPaginationEpic: TPlatformEpic = (action$, state$, deps) =>
  action$.pipe(
    isCreator(platformTransactionRequestsChangePaginationAction),
    switchMap(
      ({ payload: { pagination } }) => {
        const transactionRequests = transactionRequestsSelector(state$.value);

        const pageInfo = getNotNil(
          transactionRequests.pageInfo,
          ["transactionRequestPaginationEpic", "transactionRequestsSelector"],
          "pageInfo",
        );

        const cursor =
          pagination === ETransactionRequestPaginatorModel.nextPage
            ? {
              ...transactionRequests.variables?.cursor,
              after: pageInfo.endCursor,
              first: PAGE_SIZE,
              before: undefined,
              last: undefined,
            }
            : {
              ...transactionRequests.variables?.cursor,
              before: pageInfo.startCursor,
              last: PAGE_SIZE,
              after: undefined,
              first: undefined,
            };

        const variables = { cursor: removeVoidProperties(cursor) };

        return transactionRequestsLoadEpic(transactionRequests.transactionTypeList, variables)(action$, state$, deps);
      },
    ),
  );

const transactionRequestsRootEpic: TPlatformEpic = combineEpics(
  transactionRequestHistoryRouteEpic,
  transactionRequestWithdrawRouteEpic,
  transactionRequestDepositRouteEpic,

  transactionRequestPaginationEpic,
);

export { transactionRequestsRootEpic };
