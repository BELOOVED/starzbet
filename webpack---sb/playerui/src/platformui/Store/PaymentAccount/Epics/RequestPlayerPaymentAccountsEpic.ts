import { switchMap } from "rxjs";
import { isCreator } from "@sb/utils";
import {
  platformPlayerPaymentAccountsQueryOptionalFields,
  query_Platform_PlayerPaymentAccounts,
} from "@sb/graphql-client/PlayerUI";
import {
  EPlatform_PlayerPaymentAccountWhereFieldPaths,
  EWhere_Predicate,
  type TPlatform_PlayerPaymentAccountWhereInput,
} from "@sb/graphql-client";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlDataSelector } from "../../Root/Selectors/GraphQlSelectors";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import {
  platformBankingPlayerPaymentAccountFetchAction,
  platformBankingPlayerPaymentAccountsReceiveAction,
} from "../../Banking/BankingActions";
import { PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL } from "../Models/Variables";

const operands: TPlatform_PlayerPaymentAccountWhereInput[] = [
  {
    fieldPath: EPlatform_PlayerPaymentAccountWhereFieldPaths.playerPaymentAccountRemovedAt,
    predicate: EWhere_Predicate.isNull,
  },
];

const requestPlayerPaymentAccountsEpic: TPlatformEpic = gqlLoadingFactory(
  PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL,
  query_Platform_PlayerPaymentAccounts,
  {
    optionalFields: platformPlayerPaymentAccountsQueryOptionalFields,
    variables: {
      where: {
        predicate: EWhere_Predicate.and,
        operands: operands,
      },
    },
  },
  platformBankingPlayerPaymentAccountsReceiveAction,
  (response) => [graphQlDataSelector(response).PlayerPaymentAccounts],
);

const fetchPlayerPaymentAccountsEpic: TPlatformEpic = (action$, state$, deps) =>
  action$.pipe(
    isCreator(platformBankingPlayerPaymentAccountFetchAction),
    switchMap(() => requestPlayerPaymentAccountsEpic(action$, state$, deps)),
  );

export { requestPlayerPaymentAccountsEpic, fetchPlayerPaymentAccountsEpic };
