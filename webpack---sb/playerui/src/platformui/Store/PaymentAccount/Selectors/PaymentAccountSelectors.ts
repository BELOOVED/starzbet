import {
  createMemoSelector,
  createPropertySelector,
  createPropertySelectors,
  createSimpleSelector,
  getNotNil,
  isNil,
  isNotNil,
  withParams,
} from "@sb/utils";
import type { TPlatform_PlayerPaymentAccount_Fragment, TPlatform_PlayerPaymentAccountDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import { routerLocationPathnameSelector, routerLocationSelector } from "@sb/router";
import { matchPath, type TExtractRouteParams } from "@sb/react-router-compat";
import { EPlatform_PlayerPaymentAccountType } from "@sb/graphql-client";
import { type TCallPayload } from "@sb/sdk";
import { type call_RemovePlayerPaymentAccountCommand } from "@sb/sdk/SDKClient/payment";
import { selectIsFormMounted } from "@sb/form-new";
import { notNilModalDataSelector } from "../../../../common/Store/Modal/Selectors/ModalSelectors";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { getPaymentAccountKind } from "../Models/PaymentAccountEditFormModel";
import {
  isPaymentAccountBankAccountDetails,
  isPaymentAccountBankAccountKind,
  isPaymentAccountBankCardDetails,
  isPaymentAccountCryptoWalletDetails,
  isPaymentAccountCryptoWalletKind,
  isPaymentAccountEWalletDetails,
  isPaymentAccountEWalletKind,
  isPaymentAccountPaymentClipDetails,
} from "../Utils/PaymentAccountTypeGuards";
import { PAYMENT_ACCOUNT_CREATE_FORM } from "../Models/Variables";

const paymentAccountCreateAccountTypeSelector = createSimpleSelector(
  [routerLocationSelector],
  ({ pathname }) => matchPath<{ accountType: EPlatform_PlayerPaymentAccountType; }>(
    pathname,
    { path: routeMap.bankingPaymentAccountCreateRoute },
  )
    // todo^Bondarenko investigate after router update (selector call only on `bankingPaymentAccountCreateRoute` route)
    ?.params
    .accountType,
);

const paymentAccountCreateAccountKindSelector = createSimpleSelector(
  [routerLocationSelector],
  ({ pathname }) => matchPath<{ accountKind: string; }>(
    pathname,
    { path: routeMap.bankingPaymentAccountCreateKindRoute },
  )
    // todo^Bondarenko investigate after router update (selector call only on `bankingPaymentAccountCreateRoute` route)
    ?.params
    .accountKind,
);

const paymentAccountCreateAccountTypeNotNilSelector = createSimpleSelector(
  [paymentAccountCreateAccountTypeSelector],
  (accountType) => getNotNil(
    accountType,
    ["platformBankingPaymentAccountCreateAccountTypeNotNilSelector"],
    "accountType",
  ),
);

const paymentAccountsSelector = (state: TPlatformAppState) =>
  state.banking.playerPaymentAccounts;

type TPaymentAccountType<Details extends TPlatform_PlayerPaymentAccountDetails_Fragment = TPlatform_PlayerPaymentAccountDetails_Fragment> =
  Omit<TPlatform_PlayerPaymentAccount_Fragment, "details">
  & {
  details: Details;
}

const paymentAccountsByAccountTypeSelector = createMemoSelector(
  [
    paymentAccountsSelector,
    (_: unknown, accountType: EPlatform_PlayerPaymentAccountType) => accountType,
  ],
  (paymentAccounts, accountType) =>
    paymentAccounts
      .filter((account) => account.details.type === accountType),
);

const paymentAccountEditCurrentAccountSelector = createSimpleSelector(
  [
    routerLocationSelector,
    paymentAccountsSelector,
  ],
  ({ pathname }, paymentAccounts) => {
    const match = matchPath<{ id: string; }>(
      pathname,
      { path: routeMap.bankingPaymentAccountEditRoute },
    );

    if (isNil(match)) {
      return null;
    }

    const paymentAccountId = match.params.id;

    return paymentAccounts.find(({ id }) => id === paymentAccountId);
  },
);

const isPaymentAccountEditCurrentAccountAvailableSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountSelector],
  isNotNil,
);

const paymentAccountEditCurrentAccountNotNilSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountSelector],
  (account) => getNotNil(
    account,
    ["paymentAccountEditCurrentAccountNotNilSelector", "paymentAccountEditCurrentAccountSelector"],
    "account",
  ),
);

const paymentAccountEditCurrentAccountNotNilSelectors = createPropertySelectors(paymentAccountEditCurrentAccountNotNilSelector);

const paymentAccountEditCurrentAccountKindSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountNotNilSelectors.details],
  getPaymentAccountKind,
);

const paymentAccountEditCurrentAccountTypeSelector = createPropertySelector(
  paymentAccountEditCurrentAccountNotNilSelector,
  ["details", "__typename"],
);

const getPaymentAccountByTypeGuard = <K extends V, V>(
  condition: (accountKind: V) => accountKind is K,
  context: string,
) => (accountKind: V | undefined) => {
    if (!accountKind || !condition(accountKind)) {
      throw new Error(`[${context} => getPaymentAccountByKind]: Unexpected Payment account type ${JSON.stringify(accountKind)}`);
    }

    return accountKind;
  };

// Edit route
const paymentAccountBankAccountEditKindSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountKindSelector],
  getPaymentAccountByTypeGuard(isPaymentAccountBankAccountKind, "paymentAccountBankAccountEditKindSelector"),
);

const paymentAccountCryptoWalletEditKindSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountKindSelector],
  getPaymentAccountByTypeGuard(isPaymentAccountCryptoWalletKind, "paymentAccountCryptoWalletEditKindSelector"),
);

const paymentAccountEWalletEditKindSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountKindSelector],
  getPaymentAccountByTypeGuard(isPaymentAccountEWalletKind, "paymentAccountEWalletEditKindSelector"),
);

const paymentAccountCryptoWalletEditCurrentAccountDetailsSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountNotNilSelectors.details],
  getPaymentAccountByTypeGuard(isPaymentAccountCryptoWalletDetails, "paymentAccountEditCurrentAccountDetailsSelector"),
);

const paymentAccountEWalletEditCurrentAccountDetailsSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountNotNilSelectors.details],
  getPaymentAccountByTypeGuard(isPaymentAccountEWalletDetails, "paymentAccountEWalletEditCurrentAccountDetailsSelector"),
);

const paymentAccountBankCardEditCurrentAccountDetailsSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountNotNilSelectors.details],
  getPaymentAccountByTypeGuard(isPaymentAccountBankCardDetails, "paymentAccountBankCardEditCurrentAccountDetailsSelector"),
);

const paymentAccountPaymentClipEditCurrentAccountDetailsSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountNotNilSelectors.details],
  getPaymentAccountByTypeGuard(isPaymentAccountPaymentClipDetails, "paymentAccountPaymentClipEditCurrentAccountDetailsSelector"),
);

const paymentAccountBankAccountEditCurrentAccountDetailsSelector = createSimpleSelector(
  [paymentAccountEditCurrentAccountNotNilSelectors.details],
  getPaymentAccountByTypeGuard(isPaymentAccountBankAccountDetails, "paymentAccountBankAccountEditCurrentAccountDetailsSelector"),
);

const paymentAccountRemoveFormCallPayloadSelector = createSimpleSelector(
  [withParams(notNilModalDataSelector<string>, EModal.paymentAccountRemove, "EModal.paymentAccountRemove => id")],
  (accountId): TCallPayload<typeof call_RemovePlayerPaymentAccountCommand> => ({ accountId }),
);

const isPaymentAccountCreateBankAccountFormRouteSelector = createSimpleSelector(
  [
    routerLocationPathnameSelector,
    withParams(selectIsFormMounted, PAYMENT_ACCOUNT_CREATE_FORM),
  ],
  (pathname, mounted) => {
    if(!mounted) {
      return false;
    }
    const match = matchPath<TExtractRouteParams<typeof routeMap.bankingPaymentAccountCreateRoute, EPlatform_PlayerPaymentAccountType>>(
      pathname,
      routeMap.bankingPaymentAccountCreateRoute,
    );

    return match?.params.accountType !== EPlatform_PlayerPaymentAccountType.bankCard;
  },
);

export type { TPaymentAccountType };
export {
  paymentAccountsByAccountTypeSelector,
  paymentAccountsSelector,
  paymentAccountCreateAccountTypeNotNilSelector,
  paymentAccountCreateAccountKindSelector,
  paymentAccountCreateAccountTypeSelector,

  isPaymentAccountEditCurrentAccountAvailableSelector,
  paymentAccountEditCurrentAccountTypeSelector,
  paymentAccountEditCurrentAccountNotNilSelectors,
  paymentAccountEditCurrentAccountKindSelector,
  paymentAccountEWalletEditKindSelector,

  paymentAccountBankAccountEditKindSelector,
  paymentAccountCryptoWalletEditKindSelector,

  paymentAccountCryptoWalletEditCurrentAccountDetailsSelector,
  paymentAccountEWalletEditCurrentAccountDetailsSelector,
  paymentAccountBankCardEditCurrentAccountDetailsSelector,
  paymentAccountPaymentClipEditCurrentAccountDetailsSelector,
  paymentAccountBankAccountEditCurrentAccountDetailsSelector,
  paymentAccountRemoveFormCallPayloadSelector,
  isPaymentAccountCreateBankAccountFormRouteSelector,
};
