import { catchError, map, switchMap } from "rxjs/operators";
import { from, merge, of } from "rxjs";
import { getNotNil, isCreator } from "@sb/utils";
import {
  call_FixFinKolayPayHavaleDepositMethodSelectedCommand,
  call_FixFinVegapayHavaleDepositMethodSelectedCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import { type TCall } from "@sb/sdk";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { platformBankingMethodSelectedAction } from "../BankingActions";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../Models/PaymentMethodIdModel";
import { DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL } from "../Utils/Variables";
import { platformBankingDepositPaymentMethodNonNullableSelector } from "../Selectors/PlatformBankingSelectors";
import { depositFixFinFiatWithBankAccountsFormResponseRequestIdSelector } from "../Form/FixFin/FixFinFiatFormSelectors";

type TPayload = Omit<ReturnType<typeof platformBankingMethodSelectedAction>["payload"], "method"> & {
  transactionRequestId: string;
}

const callPerMethodMap: Partial<Record<TPaymentMethodId, TCall<TPayload, null>>> = {
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_VEGAPAY_HAVALE]: call_FixFinVegapayHavaleDepositMethodSelectedCommand,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_KOLAYPAY_HAVALE]: call_FixFinKolayPayHavaleDepositMethodSelectedCommand,
};

const fixFinFiatMethodSelectedEpic: TPlatformEpic = (action$, state$, deps) => action$.pipe(
  isCreator(platformBankingMethodSelectedAction),
  switchMap(({ payload: actionPayload }) => {
    const httpApi = deps.platformHttpApi;
    const paymentMethod = platformBankingDepositPaymentMethodNonNullableSelector(state$.value);

    const call = getNotNil(
      callPerMethodMap[paymentMethod],
      ["fixFinFiatMethodSelectedEpic", "callPerMethodMap[paymentMethod]"],
      paymentMethod,
    );

    const transactionRequestId = depositFixFinFiatWithBankAccountsFormResponseRequestIdSelector(state$.value);
    const payload: TPayload = { ...actionPayload, transactionRequestId };

    return merge(
      of(callManagerStartAction(DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL)),
      from(httpApi._callToPlatform(call, payload)).pipe(
        map(() => callManagerSucceededAction(DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL)),
        catchError((error) => of(callManagerFailedAction(DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL, error))),
      ),
    );
  }),
);

export { fixFinFiatMethodSelectedEpic };
