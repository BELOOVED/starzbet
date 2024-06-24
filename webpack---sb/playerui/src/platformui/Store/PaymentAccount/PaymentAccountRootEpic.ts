import { combineEpics } from "redux-observable";
import { merge, of } from "rxjs";
import { routerEpic } from "@sb/router";
import { extractExport } from "@sb/utils";
import { unmountFormAction } from "@sb/form-new";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import { getMatch } from "../../../common/Utils/RouterUtils/GetMatch";
import { routeMap } from "../../RouteMap/RouteMap";
import { type TPlatformEpic } from "../Root/Epic/TPlatformEpic";
import { platformBankingClearAllAction, platformBankingClearAllBankAction } from "../Banking/BankingActions";
import { BANKS_LOADING_SYMBOL } from "../Banking/Utils/Variables";
import {
  PAYMENT_ACCOUNT_CREATE_FORM,
  PAYMENT_ACCOUNT_EDIT_FORM,
  PAYMENT_ACCOUNT_REMOVE_FORM,
  PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL,
} from "./Models/Variables";

const paymentAccountEpic = routerEpic({
  name: "paymentAccount",
  match: getMatch(routeMap.bankingPaymentAccountsRoute),
  onStart: () => import("./Epics/PaymentAccountRouteEpic").then(extractExport("paymentAccountRouteEpic")),
  onStop: () => () => merge(
    of(platformBankingClearAllAction()),
    of(callManagerRemoveSymbolAction(PLAYER_PAYMENT_ACCOUNTS_CALL_SYMBOL)),
    of(unmountFormAction(PAYMENT_ACCOUNT_REMOVE_FORM)),
  ),
});

const paymentAccountCreateEpic = routerEpic({
  name: "paymentAccountCreate",
  match: getMatch(routeMap.bankingPaymentAccountCreateRoute),
  onStart: () => import("./Epics/PaymentAccountCreateRouteEpic").then(extractExport("paymentAccountCreateEpic")),
  onStop: () => () => merge(
    of(unmountFormAction(PAYMENT_ACCOUNT_CREATE_FORM)),
  ),
});

const paymentAccountEditEpic = routerEpic({
  name: "paymentAccountEdit",
  match: getMatch(routeMap.bankingPaymentAccountEditRoute),
  onStart: () => import("./Epics/PaymentAccountEditRouteEpic").then(extractExport("paymentAccountEditEpic")),
  onStop: () => () => merge(
    of(unmountFormAction(PAYMENT_ACCOUNT_EDIT_FORM)),
    of(platformBankingClearAllBankAction()),
    of(callManagerRemoveSymbolAction(BANKS_LOADING_SYMBOL)),
  ),
});

const paymentAccountRootEpic: TPlatformEpic = combineEpics(
  paymentAccountEpic,
  paymentAccountCreateEpic,
  paymentAccountEditEpic,
);

export {
  paymentAccountRootEpic,
};
