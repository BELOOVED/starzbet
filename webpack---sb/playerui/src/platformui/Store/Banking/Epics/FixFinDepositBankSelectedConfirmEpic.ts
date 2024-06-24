import { from, merge, of, switchMap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { getNotNil, isCreator } from "@sb/utils";
import {
  call_FixFinBanksysConfirmDepositCommand,
  call_FixFinTrHavaleEftDepositConfirmedByUserCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { type TCall } from "@sb/sdk";
import { Logger } from "../../../../common/Utils/Logger";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { depositFixFinSelectedBankConfirmAction } from "../BankingActions";
import { DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL } from "../Utils/Variables";
import { depositFixFinFiatWithBanksFormResponseSelectors } from "../Form/FixFin/FixFinFiatFormSelectors";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../Models/PaymentMethodIdModel";
import { platformBankingDepositPaymentMethodNonNullableSelector } from "../Selectors/PlatformBankingSelectors";

type TPayload = { transactionRequestId: string; }

const PAYMENT_METHOD_TO_CALL_MAP: Partial<Record<TPaymentMethodId, TCall<TPayload, null>>> = {
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_TR_HAVALE_EFT]: call_FixFinTrHavaleEftDepositConfirmedByUserCommand,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_FIN2]: call_FixFinBanksysConfirmDepositCommand,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_SERIPAY1]: call_FixFinBanksysConfirmDepositCommand,
};

const fixFinDepositBankSelectedConfirmEpic: TPlatformEpic = (action$, state$, deps) => action$.pipe(
  isCreator(depositFixFinSelectedBankConfirmAction),
  switchMap(() => {
    const httpApi = deps.platformHttpApi;
    const paymentMethodId = platformBankingDepositPaymentMethodNonNullableSelector(state$.value);

    const call = getNotNil(
      PAYMENT_METHOD_TO_CALL_MAP[paymentMethodId],
      ["fixFinDepositBankSelectedConfirmEpic", "call"],
      paymentMethodId,
    );
    const transactionRequestId = depositFixFinFiatWithBanksFormResponseSelectors.requestId(state$.value);

    return merge(
      of(callManagerStartAction(DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL)),
      from(httpApi._callToPlatform(call, { transactionRequestId })).pipe(
        map(() => callManagerSucceededAction(DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL)),
        catchError((error) => {
          Logger.error.rpc("fixFinDepositBankSelectedConfirmEpic", error);

          return of(callManagerFailedAction(DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL, error));
        }),
      ),
    );
  }),
);

export { fixFinDepositBankSelectedConfirmEpic };
