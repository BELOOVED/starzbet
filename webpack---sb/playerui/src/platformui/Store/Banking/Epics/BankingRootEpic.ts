import { combineEpics } from "redux-observable";
import { merge, type ObservableInput, of, switchMap } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { type Action } from "redux";
import { EPlatform_PaymentMethodType } from "@sb/graphql-client";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import { extractExport } from "@sb/utils";
import { routerEpic } from "@sb/router";
import { type TExtractRouteParams, type TMatch } from "@sb/react-router-compat";
import { selectIsFormMounted, unmountFormAction } from "@sb/form-new";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { isNotNilPlayerProfileSelector } from "../../../../common/Store/Player/Selectors/ProfileSelectors";
import { routeMap } from "../../../RouteMap/RouteMap";
import { bankingPaymentAccountCreateOptions, depositMethodMatchOptions, withdrawMethodMatchOptions } from "../../PlatformMatchOptions";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { fetchPlayerPaymentAccountsEpic } from "../../PaymentAccount/Epics/RequestPlayerPaymentAccountsEpic";
import { paymentAccountRootEpic } from "../../PaymentAccount/PaymentAccountRootEpic";
import { type EPaymentAccountBankAccount } from "../../PaymentAccount/Models/PaymentAccountTypeModel";
import { PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL } from "../../PaymentAccount/Models/Variables";
import { type TPlatformAppState } from "../../PlatformInitialState";
import {
  platformBankingClearAllAction,
  platformBankingClearAllBankAction,
  platformSystemBankAccountClearFormAction,
} from "../BankingActions";
import {
  BANKS_LOADING_SYMBOL,
  DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL,
  DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL,
  DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL,
  DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL,
  DEPOSIT_FORM,
  MUCH_BETTER_PHONE_NUMBER_CALL_SYMBOL,
  PAYMENT_METHODS_LOADING_SYMBOL,
  WITHDRAW_FORM,
} from "../Utils/Variables";
import { FIX_FIN_VEVO_PARAZULA_SMS_FORM } from "../Form/FixFin/FixFInVevoParazulaSmsFormModel";
import { PAYPORT_METHOD_FORM } from "../Form/Payport/PayportFormModel";
import { requestAvailableMethodEpic } from "./RequestAvailableMethodEpic";
import { fixFinFiatMethodSelectedEpic } from "./FixFinFiatMethodSelectedEpic";
import { bankAccountLoadEpicFactory } from "./RequestBanksEpic";
import { fixFinDepositBankSelectedEpic } from "./FixFinDepositBankSelectedEpic";
import { fixFinDepositBankSelectedConfirmEpic } from "./FixFinDepositBankSelectedConfirmEpic";
import { fixFinVevoHavaleBankSelectEpic } from "./FixFinVevoHavaleBankSelectEpic";

const clearAllEpic = () => merge(
  of(platformBankingClearAllAction()),
  of(callManagerRemoveSymbolAction(PAYMENT_METHODS_LOADING_SYMBOL)),
);

const requestAvailableMethodRouteEpic: TPlatformEpic = combineEpics(
  routerEpic({
    name: "requestAvailableMethodDeposit",
    match: getMatch({ path: routeMap.depositRoute }),
    onStart: () => import("./DepositRouteEpic").then(extractExport("depositRouteEpic")),
    onStop: () => clearAllEpic,
  }),
  routerEpic({
    name: "requestAvailableMethodWithdrawal",
    match: getMatch({ path: routeMap.withdrawRoute }),
    onStart: () => requestAvailableMethodEpic(EPlatform_PaymentMethodType.withdrawal),
    onStop: () => clearAllEpic,
  }),
);

const unmountForm = (state: TPlatformAppState, ...formNames: string[]) => {
  const unmount$: ObservableInput<Action>[] = [];

  formNames.forEach((formName) => {
    if (selectIsFormMounted(state, formName)) {
      unmount$.push(of(unmountFormAction(formName)));
    }
  });

  return merge(...unmount$);
};

const requestBankAccountRouteEpic: TPlatformEpic = combineEpics(
  routerEpic({
    name: "depositMethod",
    match: getMatch(depositMethodMatchOptions),
    onStart: () => import("./DepositMethodRouteEpic").then(extractExport("depositMethodRouteEpic")),
    onStop: (state) => () => merge(
      of(platformSystemBankAccountClearFormAction()),
      unmountForm(state, DEPOSIT_FORM, FIX_FIN_VEVO_PARAZULA_SMS_FORM),
      of(
        callManagerRemoveSymbolAction([
          DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL,
          DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL,
          DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL,
          DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL,
        ]),
      ),
    ),
    shouldRestart: restartOnParamsChanged,
  }),

  routerEpic({
    name: "withdrawMethod",
    match: getMatch(withdrawMethodMatchOptions),
    onStart: () => import("./WithdrawMethodRouteEpic").then(extractExport("withdrawMethodRouteEpic")),
    onStop: (state) => () => merge(
      unmountForm(state, WITHDRAW_FORM, PAYPORT_METHOD_FORM),
      of(platformSystemBankAccountClearFormAction()),
      of(
        callManagerRemoveSymbolAction([
          PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL,
          MUCH_BETTER_PHONE_NUMBER_CALL_SYMBOL,
        ]),
      ),
    ),
    shouldRestart: restartOnParamsChanged,
  }),
);

const paymentAccountCreateRouteEpic: TPlatformEpic = routerEpic({
  name: "bankingPaymentAccountCreateOptions",
  match: getMatch(bankingPaymentAccountCreateOptions),
  onStart: (
    match: TMatch<TExtractRouteParams<typeof routeMap.bankingPaymentAccountCreateKindRoute, EPaymentAccountBankAccount>>,
  ) => bankAccountLoadEpicFactory(match.params.accountKind),
  onStop: () => () => merge(
    of(platformBankingClearAllBankAction()),
    of(callManagerRemoveSymbolAction(BANKS_LOADING_SYMBOL)),
  ),
  shouldRestart: restartOnParamsChanged,
});

const bankingRootEpic: TPlatformEpic = (action$, state$, deps) =>
  state$.pipe(
    map(isNotNilPlayerProfileSelector),
    distinctUntilChanged(),
    filter(Boolean),
    switchMap(() => combineEpics(
      requestAvailableMethodRouteEpic,
      requestBankAccountRouteEpic,
      paymentAccountCreateRouteEpic,
      fetchPlayerPaymentAccountsEpic,
      fixFinFiatMethodSelectedEpic,
      fixFinDepositBankSelectedEpic,
      fixFinDepositBankSelectedConfirmEpic,
      fixFinVevoHavaleBankSelectEpic,
      paymentAccountRootEpic,
    )(action$, state$, deps)),
  );

export { bankingRootEpic };
