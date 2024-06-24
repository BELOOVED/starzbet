import { createSelector } from "reselect";
import { matchPath } from "@sb/react-router-compat";
import {
  createMemoSelector,
  createPropertySelector,
  createPropertySelectors,
  createSimpleSelector,
  deprecatedGetNotNil,
  EMoneyFormat,
  getNotNil,
  isNil,
  isNotEmpty,
  isNotNil,
  isNotVoid,
  Money,
  sortBy,
  Time,
  withParams,
} from "@sb/utils";
import type {
  TPlatform_AstroPayAccount_Fragment,
  TPlatform_AvailablePaymentMethod_Fragment,
  TPlatform_Bank_Fragment,
  TPlatform_FixFinBank_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { EPlatform_PaymentMethodType, EPlatform_Typename, type TMoneyBag_Fragment } from "@sb/graphql-client";
import { type IWithRouterState, routerLocationPathnameSelector, routerLocationSelector } from "@sb/router";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { isPrivateGroupIdSelector } from "../../../../common/Store/Player/Selectors/PlayerGroupIdSelectors";
import { profileSelectors } from "../../../../common/Store/Player/Selectors/ProfileSelectors";
import { toSelectOption } from "../../../../common/Components/Field/SelectModel";
import { routeMap } from "../../../RouteMap/RouteMap";
import { findPlayerMoneyInBag } from "../../../Utils/PlayerMoneyBag";
import { paymentAccountsSelector } from "../../PaymentAccount/Selectors/PaymentAccountSelectors";
import {
  type IWithPlatformBankingInitialState,
  type TPlatformBankType,
  type TPlatformSystemBankAccountType,
} from "../PlatformBankingInitialState";
import { FIX_FIN_CRYPTO_METHODS_MAP } from "../Models/FixFinCryptoModel";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../Models/PaymentMethodIdModel";

const platformBankingSelector = (state: IWithPlatformBankingInitialState) => state.banking;

const platformBankingPaymentMethodIdSelector = createSimpleSelector(
  [
    routerLocationSelector,
    (_: unknown, path: string) => path,
  ],
  ({ pathname }, path) => matchPath<{ paymentMethodId: TPaymentMethodId; }>(
    pathname,
    { path },
  )
    // todo^Bondarenko investigate after router update (selector call only on `paymentMethodRoute` route)
    ?.params
    .paymentMethodId,
);

const platformBankingDepositPaymentMethodSelector =
  withParams(platformBankingPaymentMethodIdSelector, routeMap.depositPaymentMethodRoute);

const platformBankingDepositPaymentMethodNonNullableSelector = createSimpleSelector(
  [platformBankingDepositPaymentMethodSelector],
  (paymentMethodId) => getNotNil(
    paymentMethodId,
    ["platformBankingDepositPaymentMethodNonNullableSelector", "platformBankingDepositPaymentMethodSelector"],
    "paymentMethodId",
  ),
);

const platformBankingWithdrawPaymentMethodSelector =
  withParams(platformBankingPaymentMethodIdSelector, routeMap.withdrawPaymentMethodRoute);

const platformBankingWithdrawPaymentMethodNonNullableSelector = createSimpleSelector(
  [platformBankingWithdrawPaymentMethodSelector],
  (paymentMethodId) => getNotNil(
    paymentMethodId,
    ["platformBankingWithdrawPaymentMethodNonNullableSelector", "platformBankingWithdrawPaymentMethodSelector"],
    "paymentMethodId",
  ),
);

const PAYMENT_METHOD_CRYPTO_NAME = "Crypto";

const platformBankingSystemBankAccountSelector = (state: IWithPlatformBankingInitialState) =>
  platformBankingSelector(state).systemBankAccount;

const getPaymentMethodsWithoutSubProviders = (
  availableMethods: TPlatform_AvailablePaymentMethod_Fragment[],
  methodType: EPlatform_PaymentMethodType,
  isPrivateGroup: boolean,
): TPlatform_AvailablePaymentMethod_Fragment[] => {
  const fixFinSubProviderIds = FIX_FIN_CRYPTO_METHODS_MAP[methodType];

  // if `availableMethods` includes `subProviders` -> filter `subProviders` and display `aggregate`
  const fixFinCryptoSubProviderList: TPlatform_AvailablePaymentMethod_Fragment[] = [];
  const paymentMethodWithoutSubProvider: TPlatform_AvailablePaymentMethod_Fragment[] = [];
  let minPaymentAmount: TMoneyBag_Fragment | null = null;
  let maxPaymentAmount: TMoneyBag_Fragment | null = null;
  let order = Number.POSITIVE_INFINITY;

  availableMethods.forEach((paymentMethod) => {
    if (fixFinSubProviderIds.includes(paymentMethod.id)) {
      fixFinCryptoSubProviderList.push(paymentMethod);

      if (
        isNil(minPaymentAmount) ||
        (
          isNotNil(minPaymentAmount) &&
          paymentMethod.minPaymentAmount &&
          Money.lessThan(paymentMethod.minPaymentAmount.system, minPaymentAmount.system)
        )
      ) {
        minPaymentAmount = paymentMethod.minPaymentAmount;
      }

      if (
        isNil(maxPaymentAmount) ||
        (
          isNotNil(maxPaymentAmount) &&
          paymentMethod.maxPaymentAmount &&
          Money.greaterThan(paymentMethod.maxPaymentAmount.system, maxPaymentAmount.system)
        )
      ) {
        maxPaymentAmount = paymentMethod.maxPaymentAmount;
      }

      if (paymentMethod.order && (paymentMethod.order < order)) {
        order = paymentMethod.order;
      }
    } else {
      paymentMethodWithoutSubProvider.push(paymentMethod);
    }
  });

  /**
   * Aggregator for all Fix Fin Crypto methods
   */
  if (isNotEmpty(fixFinCryptoSubProviderList)) {
    const cryptoMethodAgg: TPlatform_AvailablePaymentMethod_Fragment = {
      __typename: EPlatform_Typename.platformAvailablePaymentMethod,
      id: PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_COMMON_ID,
      type: methodType,
      name: PAYMENT_METHOD_CRYPTO_NAME,
      maxPaymentAmount,
      minPaymentAmount,
      order,
      noteForPlayer: null,
      forbiddenDuringActiveBonus: null,
    };

    /**
     * If player of `Private` group -> display only crypto Methods, if it available
     */
    if (isPrivateGroup) {
      return [cryptoMethodAgg];
    }

    return paymentMethodWithoutSubProvider.concat(cryptoMethodAgg);
  }

  if (isPrivateGroup) {
    return [];
  }

  return availableMethods;
};

const bankingAvailablePaymentMethodsAllSelector = createPropertySelector(
  platformBankingSelector,
  "availableMethods",
);

const sortMethodsByOrder = (methods: TPlatform_AvailablePaymentMethod_Fragment[]) => sortBy(
  (method) => method.order,
  methods,
);

const bankingPaymentMethodTypeSelector = createSimpleSelector(
  [routerLocationPathnameSelector],
  (pathname) => isNotNil(
    matchPath(
      pathname,
      { path: routeMap.depositRoute },
    ),
  )
    ? EPlatform_PaymentMethodType.deposit
    : EPlatform_PaymentMethodType.withdrawal,
);

const bankingPaymentMethodsSelector = createMemoSelector(
  [
    bankingAvailablePaymentMethodsAllSelector,
    bankingPaymentMethodTypeSelector,
    isPrivateGroupIdSelector,
    (_, searchValue?: string) => searchValue,
  ],
  (availableMethods, paymentMethodType, isPrivateGroup, searchValue) => {
    const methods = getPaymentMethodsWithoutSubProviders(
      availableMethods,
      paymentMethodType,
      isPrivateGroup,
    );

    if (isNotVoid(searchValue)) {
      return methods.filter(
        (method) => method.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    return methods;
  },
  { expensive: true },
);

const bankingAvailablePaymentMethodsSelector = createMemoSelector(
  [bankingPaymentMethodsSelector],
  sortMethodsByOrder,
);

const bankingSystemBankAccountLoadingSelector = createPropertySelector(
  platformBankingSystemBankAccountSelector,
  "loading",
);

const bankingSystemBankAccountsSelector = createPropertySelector(
  platformBankingSystemBankAccountSelector,
  "bankAccounts",
);

const bankingFixFinCryptoSubProvidersSelector = createMemoSelector(
  [
    bankingAvailablePaymentMethodsAllSelector,
    (_, methodType: EPlatform_PaymentMethodType) => methodType,
  ],
  (paymentMethods, methodType) => {
    const subProviderIdList = FIX_FIN_CRYPTO_METHODS_MAP[methodType];

    return sortMethodsByOrder(
      paymentMethods
        .filter(({ id }) => subProviderIdList.includes(id)),
    );
  },
);

const availablePaymentMethodSelector = (
  state: IWithPlatformBankingInitialState,
  paymentMethodId: TPaymentMethodId,
) => {
  const paymentMethods = bankingAvailablePaymentMethodsAllSelector(state);

  return paymentMethods.find((it) => it.id === paymentMethodId);
};

const getAvailablePaymentMethodByIdSelector = createSimpleSelector(
  [
    availablePaymentMethodSelector,
    (_, paymentId: string) => paymentId,
  ],
  (method, paymentId) => getNotNil(
    method,
    ["getAvailablePaymentMethodByIdSelector"],
    paymentId,
  ),
);

const getAvailablePaymentMethodByIdSelectors = createPropertySelectors(getAvailablePaymentMethodByIdSelector);

const paymentMethodNameSelector = (state: TMixAppState & IWithRouterState, methodId: string) => {
  if (methodId === PAYMENT_METHOD_ID_MAP.FIX_FIN_CRYPTO_COMMON_ID) {
    return PAYMENT_METHOD_CRYPTO_NAME;
  }

  const paymentMethods = bankingAvailablePaymentMethodsAllSelector(state);

  const paymentMethod = paymentMethods.find((it) => it.id === methodId);

  if (isNil(paymentMethod)) {
    return null;
  }

  return paymentMethod.name;
};

const paymentMethodDepositCurrentNameSelector = (state: TMixAppState) => {
  const paymentMethodId = platformBankingDepositPaymentMethodSelector(state);

  // todo^Bondarenko investigate after router update
  if (isNil(paymentMethodId)) {
    return null;
  }

  return paymentMethodNameSelector(state, paymentMethodId);
};

const paymentMethodWithdrawalCurrentNameSelector = (state: TMixAppState) => {
  const paymentMethodId = platformBankingWithdrawPaymentMethodSelector(state);

  // todo^Bondarenko investigate after router update
  if (isNil(paymentMethodId)) {
    return null;
  }

  return paymentMethodNameSelector(state, paymentMethodId);
};

const hasDataByPaymentMethodSelector = createSimpleSelector(
  [availablePaymentMethodSelector],
  isNotVoid,
);

const paymentMethodMinPaymentAmountSelector = createSimpleSelector(
  [
    getAvailablePaymentMethodByIdSelectors.minPaymentAmount,
    playerCurrencySelector,
  ],
  findPlayerMoneyInBag,
);

const paymentMethodMaxPaymentAmountSelector = createSimpleSelector(
  [
    getAvailablePaymentMethodByIdSelectors.maxPaymentAmount,
    playerCurrencySelector,
  ],
  findPlayerMoneyInBag,
);

// AstroPayAccount account
const isAstroPayAccount = (bankAccount: TPlatformSystemBankAccountType[]): bankAccount is TPlatform_AstroPayAccount_Fragment[] =>
  bankAccount.every(({ __typename }) => __typename === "Platform_AstroPayAccount");

const astroPayBankAccountsOptionsSelector = createMemoSelector(
  [bankingSystemBankAccountsSelector],
  (bankAccounts) => {
    if (!isAstroPayAccount(bankAccounts)) {
      throw new Error("Unexpected bank Account type");
    }

    return bankAccounts.map((bankAccount) => toSelectOption(bankAccount.externalId));
  },
);

const bankingAstroPayBankAccountSelector = createSelector(
  bankingSystemBankAccountsSelector,
  (_: unknown, id: string) => id,
  (bankAccounts, id) => {
    if (!isAstroPayAccount(bankAccounts)) {
      throw new Error("Unexpected bank Account type");
    }

    const bankAccount = bankAccounts.find((bankAccount) => bankAccount.externalId === id);

    return deprecatedGetNotNil(bankAccount, "AstroPay bank account");
  },
);

const bankingAstroPayBankAccountPhoneNumberSelector = createPropertySelector(
  bankingAstroPayBankAccountSelector,
  "phoneNumber",
);

const bankingAstroPayBankAccountLastTransactionCreatedAtSelector = createPropertySelector(
  bankingAstroPayBankAccountSelector,
  ["lastTransactionRequest", "createdAt"],
);

const bankingAstroPayBankAccountLastTransactionSumSelector = createPropertySelector(
  bankingAstroPayBankAccountSelector,
  ["lastTransactionRequest", "sum"],
);

const bankingAstroPayBankAccountOptionInfoSelector = createSimpleSelector(
  [
    bankingAstroPayBankAccountPhoneNumberSelector,
    bankingAstroPayBankAccountLastTransactionCreatedAtSelector,
    bankingAstroPayBankAccountLastTransactionSumSelector,
  ],
  (phoneNumber, lastTransactionCreatedAt, lastTransactionSum) =>
    `${Time.format(+lastTransactionCreatedAt, "dd/MM")} / ${Money.toFormat(lastTransactionSum, EMoneyFormat.symbolLeft)} / ${phoneNumber}`,
);

const bankingMuchBetterPhoneNumberSelector = createPropertySelector(
  platformBankingSelector,
  ["muchBetterPhoneNumber", "phoneNumber"],
);

const bankingMuchBetterPhoneNumberExistSelector = createSimpleSelector(
  [bankingMuchBetterPhoneNumberSelector],
  isNil,
);

// Select Payment Accounts per current payment method
const bankingAvailablePaymentAccountsSelector = createMemoSelector(
  [
    paymentAccountsSelector,
    platformBankingWithdrawPaymentMethodSelector,
  ],
  (paymentAccounts, paymentMethodId) =>
    paymentAccounts
      .filter((paymentAccount) => {
        if (paymentAccount.details.__typename === "Platform_BankAccountDetails") {
          return paymentAccount.details.paymentMethodInfo.some(({ paymentMethod }) => paymentMethod?.id === paymentMethodId);
        }

        return (paymentMethodId === PAYMENT_METHOD_ID_MAP.KOLAY_PAY_HAVALE_WITHDRAWAL_ID && paymentAccount.details.__typename === "Platform_PaparaAccountDetails") ||
          (paymentMethodId === PAYMENT_METHOD_ID_MAP.PAYMENT_CLIP_UPI_WITHDRAWAL_ID && paymentAccount.details.__typename === "Platform_PaymentClipBankAccountDetails");
      }),
);

const platformBankingCardHolderNameSelector = createSimpleSelector(
  [profileSelectors.name, profileSelectors.surname],
  (name, surname) => `${name} ${surname}`.toLocaleUpperCase(),
);

const paymentMethodNoteSelector = (state: IWithPlatformBankingInitialState, paymentMethodId: TPaymentMethodId) => {
  const paymentMethod = availablePaymentMethodSelector(state, paymentMethodId);

  if (isNil(paymentMethod)) {
    return null;
  }

  return paymentMethod.noteForPlayer;
};

const paymentMethodDepositNoteSelector = (state: IWithPlatformBankingInitialState & IWithRouterState) => {
  const paymentMethodId = platformBankingDepositPaymentMethodSelector(state);

  // todo^Bondarenko investigate after router update
  if (isNil(paymentMethodId)) {
    return null;
  }

  return paymentMethodNoteSelector(state, paymentMethodId);
};

const paymentMethodWithdrawalNoteSelector = (state: IWithPlatformBankingInitialState & IWithRouterState) => {
  const paymentMethodId = platformBankingWithdrawPaymentMethodSelector(state);

  // todo^Bondarenko investigate after router update
  if (isNil(paymentMethodId)) {
    return null;
  }

  return paymentMethodNoteSelector(state, paymentMethodId);
};

const platformBanksSelector = createPropertySelector(
  platformBankingSelector,
  "banks",
);

const platformBanksOptionsSelector = createMemoSelector(
  [platformBanksSelector],
  (banks) => banks.map(({ id }) => toSelectOption(id)),
);

const platformBankByIdSelector = createSimpleSelector(
  [
    platformBanksSelector,
    (_, bankId: string | undefined) => bankId,
  ],
  (banks, bankId) => getNotNil(
    banks.find(({ id }) => bankId === id),
    ["platformBankByIdSelector"],
    "banks.find(({ id }) => bankId === id)",
  ),
);

const platformBankNameSelector = createPropertySelector(
  platformBankByIdSelector,
  "name",
);

const isBankTransferBank = (bank: TPlatformBankType): bank is TPlatform_Bank_Fragment => bank.__typename === "Platform_Bank";

const platformBankTransferBankSelector = createSimpleSelector(
  [platformBankByIdSelector],
  (bank) => {
    if (!bank || !isBankTransferBank(bank)) {
      throw new Error(`[platformBankTransferBankSelector]: Unexpected bank type: ${JSON.stringify(bank)}`);
    }

    return bank;
  },
);

const platformBankTransferBankIconSelector = createPropertySelector(
  platformBankTransferBankSelector,
  ["logoFile", "pathToFile"],
);

const isFixFinBank = (bank: TPlatformBankType): bank is TPlatform_FixFinBank_Fragment => bank.__typename === "Platform_FixFinBank";

const platformFixFinBankSelector = createSimpleSelector(
  [platformBankByIdSelector],
  (bank) => {
    if (!bank || !isFixFinBank(bank)) {
      throw new Error(`[platformFixFinBankSelector]: Unexpected bank type: ${JSON.stringify(bank)}`);
    }

    return bank;
  },
);

const depositLinkSelector = (state: IWithPlatformBankingInitialState) => platformBankingSelector(state).depositLink;

const depositActiveBankAccountIdSelector = createPropertySelector(
  platformBankingSelector,
  ["form", "activeBankAccountId"],
);

const depositActiveBankAccountIdNotNilSelector = createSimpleSelector(
  [depositActiveBankAccountIdSelector],
  (bankAccountId) => getNotNil(
    bankAccountId,
    ["depositActiveBankAccountIdNotNilSelector"],
    "bankAccountId",
  ),
);

export {
  platformBankingSelector,

  platformBankingDepositPaymentMethodSelector,
  platformBankingDepositPaymentMethodNonNullableSelector,
  platformBankingWithdrawPaymentMethodSelector,
  platformBankingWithdrawPaymentMethodNonNullableSelector,
  bankingAvailablePaymentMethodsSelector,
  bankingSystemBankAccountLoadingSelector,
  bankingSystemBankAccountsSelector,
  paymentMethodDepositCurrentNameSelector,
  paymentMethodWithdrawalCurrentNameSelector,
  getAvailablePaymentMethodByIdSelectors,

  astroPayBankAccountsOptionsSelector,
  bankingAstroPayBankAccountOptionInfoSelector,

  paymentMethodMinPaymentAmountSelector,
  paymentMethodMaxPaymentAmountSelector,
  hasDataByPaymentMethodSelector,

  bankingMuchBetterPhoneNumberSelector,
  bankingMuchBetterPhoneNumberExistSelector,
  bankingFixFinCryptoSubProvidersSelector,
  bankingAvailablePaymentAccountsSelector,
  paymentMethodDepositNoteSelector,
  paymentMethodWithdrawalNoteSelector,
  platformBankingCardHolderNameSelector,

  platformBanksSelector,
  platformBankNameSelector,
  platformBanksOptionsSelector,
  platformBankTransferBankSelector,
  platformBankTransferBankIconSelector,
  platformFixFinBankSelector,
  depositLinkSelector,

  depositActiveBankAccountIdSelector,
  depositActiveBankAccountIdNotNilSelector,
};
