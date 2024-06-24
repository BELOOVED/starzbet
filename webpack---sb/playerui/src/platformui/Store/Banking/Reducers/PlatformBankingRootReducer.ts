import { createRootReducer, simpleReducer } from "@sb/utils";
import {
  bankingFormReceiveResponseAction,
  depositLinkReceiveAction,
  payportMethodChangeAction,
  platformAvailablePaymentMethodsReceiveAction,
  platformBankAccountChangeAction,
  platformBankingAstroPayChangeTabAction,
  platformBankingClearAllAction,
  platformBankingClearAllBankAction,
  platformBankingMuchBetterPhoneNumberAction,
  platformBankingMuchBetterTrackingCodeAction,
  platformBankingPlayerPaymentAccountsReceiveAction,
  platformBanksReceiveAction,
  platformSystemBankAccountClearFormAction,
  platformSystemBankAccountsLoadingAction,
  platformSystemBankAccountsReceiveAction,
} from "../BankingActions";
import { bankingInitialState, type IWithPlatformBankingInitialState } from "../PlatformBankingInitialState";

const platformAvailablePaymentMethodReducer = simpleReducer(["availableMethods"], ["banking", "availableMethods"]);

const platformSystemBankAccountFetchReducer = simpleReducer(["systemBankAccounts"], ["banking", "systemBankAccount", "bankAccounts"]);
const platformSystemBankAccountLoaderReducer = simpleReducer(["loading"], ["banking", "systemBankAccount", "loading"]);

const platformBankAccountChangeReducer = (
  state: IWithPlatformBankingInitialState,
  { payload }: ReturnType<typeof platformBankAccountChangeAction>,
): IWithPlatformBankingInitialState => ({
  ...state,
  banking: {
    ...state.banking,
    form: {
      ...state.banking.form,
      activeBankAccountId: payload.bankAccountId,
    },
  },
});

const platformSystemBankAccountClearFormReducer = (state: IWithPlatformBankingInitialState): IWithPlatformBankingInitialState => ({
  ...state,
  banking: {
    ...state.banking,
    form: bankingInitialState.banking.form,
    systemBankAccount: bankingInitialState.banking.systemBankAccount,
  },
});

const platformBankingClearAllReducer = (state: IWithPlatformBankingInitialState): IWithPlatformBankingInitialState => ({
  ...state,
  banking: bankingInitialState.banking,
});

const platformBankingClearAllBankReducer = (state: IWithPlatformBankingInitialState): IWithPlatformBankingInitialState => ({
  ...state,
  banking: {
    ...state.banking,
    banks: bankingInitialState.banking.banks,
  },
});

const platformAstroPayChangeActiveTabReducer = simpleReducer(["tab"], ["banking", "astroPayActiveTab"]);

const platformMuchBetterPhoneNumberReducer = simpleReducer(["phoneNumber"], ["banking", "muchBetterPhoneNumber", "phoneNumber"]);
const platformMuchBetterTrackingCodeReducer = simpleReducer(["trackingCode"], ["banking", "muchBetterPhoneNumber", "trackingCode"]);

const playerPaymentAccountsFetchReducer = simpleReducer(["paymentAccounts"], ["banking", "playerPaymentAccounts"]);

const platformBanksReceiveReducer = simpleReducer(["banks"], ["banking", "banks"]);

const depositLinkReceiveReducer = simpleReducer(["depositLink"], ["banking", "depositLink"]);
const bankingFormReceiveResponseReducer = simpleReducer(["formResponse"], ["banking", "formResponse"]);
const payportMethodChangeReducer = simpleReducer(["payportMethod"], ["banking", "form", "payportMethod"]);

const platformBankingRootReducer = createRootReducer([
  [platformAvailablePaymentMethodReducer, platformAvailablePaymentMethodsReceiveAction],
  [platformSystemBankAccountFetchReducer, platformSystemBankAccountsReceiveAction],
  [platformSystemBankAccountLoaderReducer, platformSystemBankAccountsLoadingAction],

  [platformBankAccountChangeReducer, platformBankAccountChangeAction],
  [platformSystemBankAccountClearFormReducer, platformSystemBankAccountClearFormAction],
  [platformBankingClearAllReducer, platformBankingClearAllAction],
  [platformBankingClearAllBankReducer, platformBankingClearAllBankAction],
  [platformAstroPayChangeActiveTabReducer, platformBankingAstroPayChangeTabAction],
  [platformMuchBetterPhoneNumberReducer, platformBankingMuchBetterPhoneNumberAction],
  [platformMuchBetterTrackingCodeReducer, platformBankingMuchBetterTrackingCodeAction],

  [playerPaymentAccountsFetchReducer, platformBankingPlayerPaymentAccountsReceiveAction],

  [platformBanksReceiveReducer, platformBanksReceiveAction],
  [depositLinkReceiveReducer, depositLinkReceiveAction],
  [bankingFormReceiveResponseReducer, bankingFormReceiveResponseAction],
  [payportMethodChangeReducer, payportMethodChangeAction],
]);

export { platformBankingRootReducer };
