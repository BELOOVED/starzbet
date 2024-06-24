import { EMPTY } from "rxjs";
import {
  platformBanksQueryOptionalFields,
  platformFixFixBanksQueryOptionalFields,
  query_Platform_Banks,
  query_Platform_FixFixBanks,
} from "@sb/graphql-client/PlayerUI";
import { EPlatform_BankWhereFieldPaths, EPlatform_FixFinTransactionType, EWhere_Predicate } from "@sb/graphql-client";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlDataSelector, graphQlNodeSelector } from "../../Root/Selectors/GraphQlSelectors";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import {
  EPaymentAccountBankAccount,
  isPaymentAccountBankAccountBaseForm,
  type TPaymentAccountBankAccountDefaultForm,
} from "../../PaymentAccount/Models/PaymentAccountTypeModel";
import { platformBanksReceiveAction } from "../BankingActions";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../Models/PaymentMethodIdModel";
import { BANKS_LOADING_SYMBOL } from "../Utils/Variables";

const requestBanksEpic = gqlLoadingFactory(
  BANKS_LOADING_SYMBOL,
  query_Platform_Banks,
  {
    optionalFields: platformBanksQueryOptionalFields,
    variables: {
      where: {
        fieldPath: EPlatform_BankWhereFieldPaths.bankIsDeleted,
        predicate: EWhere_Predicate.isFalse,
      },
      // Expected not large numbers of banks. Any way, refactor, if provide `Dynamic Select` in the package
      cursor: { first: -1 },
    },
  },
  platformBanksReceiveAction,
  (response) => [graphQlNodeSelector(graphQlDataSelector(response).Banks)],
  undefined,
  undefined,
  true,
);

const requestFixFinBanksEpicFactory = (
  paymentMethodId: TPaymentMethodId,
) => gqlLoadingFactory(
  BANKS_LOADING_SYMBOL,
  query_Platform_FixFixBanks,
  {
    optionalFields: platformFixFixBanksQueryOptionalFields,
    variables: {
      paymentMethodId: paymentMethodId,
      type: EPlatform_FixFinTransactionType.withdraw,
    },
  },
  platformBanksReceiveAction,
  (response) => [graphQlDataSelector(response).FixFixBanks],
  undefined,
  undefined,
  true,
);

const bankAccountLoadEpicPerKindMap: Record<TPaymentAccountBankAccountDefaultForm, TPlatformEpic> = {
  [EPaymentAccountBankAccount.bankTransfer]: requestBanksEpic,
  [EPaymentAccountBankAccount.trHavaleEft]: requestFixFinBanksEpicFactory(PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TR_HAVALE_EFT),
};

const bankAccountLoadEpicFactory = (accountKind: EPaymentAccountBankAccount): TPlatformEpic => (action$, state$, deps) => {
  if (isPaymentAccountBankAccountBaseForm(accountKind)) {
    return EMPTY;
  }

  const loader = bankAccountLoadEpicPerKindMap[accountKind];

  return loader(action$, state$, deps);
};

export { bankAccountLoadEpicFactory };
