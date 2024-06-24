import { exhaustMap, finalize, from, merge, of, Subject, switchMap, takeUntil, timer } from "rxjs";
import { catchError, filter } from "rxjs/operators";
import { getNotNil, isCreator, isFunction, isNotNil, type TExplicitAny, type TNullable, type TSelector } from "@sb/utils";
import {
  call_FixFinBanksysSelectBankCommand,
  call_FixFinFindBanksysBankAccountDetailsQuery,
  call_FixFinFindTrHavaleEftGetBankAccountInfoQuery,
  call_FixFinTrHavaleEftDepositMethodSelectedCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { go, goBack, goForward, locationChangeAction, push, replace } from "@sb/router";
import { type TCall, type TCallResponsePayload } from "@sb/sdk";
import { Logger } from "../../../../common/Utils/Logger";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { bankingFormReceiveResponseAction, depositFixFinBankSelectedAction } from "../BankingActions";
import { DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL } from "../Utils/Variables";
import {
  depositFixFinFiatWithBanksFormResponseSelector,
  depositFixFinFiatWithBanksFormResponseSelectors,
  depositFixFinFiatWithBankShouldRequestAccountInfoSelector,
} from "../Form/FixFin/FixFinFiatFormSelectors";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../Models/PaymentMethodIdModel";
import { platformBankingDepositPaymentMethodNonNullableSelector } from "../Selectors/PlatformBankingSelectors";
import { type TFixFinFiatBank, type TFixFinWithBanksResponse } from "../Models/FixFinFiatModel";

/**
 * Need to display updated info of Bank Account with `shouldRequestAccountInfo = true`
 * @param prevValue banks of response `call_FixFinMakeFiatDepositCommand`
 * @param bankAccountInfo updated info for Bank with `shouldRequestAccountInfo = true`
 * @param bankId
 */
const updateBankAccountInfo = <Bank extends TFixFinFiatBank, Info>(
  prevValue: TFixFinWithBanksResponse<Bank>,
  bankAccountInfo: Info,
  bankId: string,
): TFixFinWithBanksResponse<Bank> => {
  const nextBanks = prevValue.info.banks.reduce<Bank[]>(
    (acc, current) => {
      if (current.id === bankId) {
        acc.push({
          ...current,
          ...bankAccountInfo,
        });
      }

      acc.push(current);

      return acc;
    },
    [],
  );

  return {
    ...prevValue,
    info: {
      banks: nextBanks,
    },
  };
};

const POLLING_INTERVAL = 2_000;

type TGetInfoCallPayload = {
  transactionRequestId: string;
}

/**
 * For Bank account with `shouldRequestAccountInfo = true`
 * Should call `SelectedCommand`
 * Then refetching Bank Account info by `GetBankAccountInfoQuery` until call response non nil or error
 * Use call response Info for display info of Bank Account
 */
const pollingBankAccountInfo = <R>(
  call: TCall<TGetInfoCallPayload, R>,
  payload: TSelectedCallPayload,
): TPlatformEpic =>
    (action$, state$, deps) => {
      const httpApi = deps.platformHttpApi;
      const stopPolling$ = new Subject();
      let isCompleted = false;

      return timer(0, POLLING_INTERVAL).pipe(
        exhaustMap(
          () =>
            from(httpApi._callToPlatform(call, { transactionRequestId: payload.transactionRequestId })).pipe(
              filter(isNotNil),
              switchMap((response) => {
                const prevValue = depositFixFinFiatWithBanksFormResponseSelector(state$.value);
                isCompleted = true;

                // Update value of Bank Account
                return merge(
                  of(bankingFormReceiveResponseAction(updateBankAccountInfo(prevValue, response, payload.bankId))),
                  of(callManagerSucceededAction(DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL)),
                );
              }),
              catchError((error) => {
                Logger.warn.epic("[fixFinDepositBankSelectedEpic => pollingBankAccountInfo]", error);
                isCompleted = true;

                return of(callManagerFailedAction(DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL, error));
              }),
              finalize(() => {
                if (isCompleted) {
                  stopPolling$.next(null);
                }
              }),
            ),
        ),
        /**
       * Stop polling on positive response (not nil or error) or leaving route
       */
        takeUntil(
          merge(
            stopPolling$,
            action$.pipe(isCreator(push, replace, go, goBack, goForward, locationChangeAction)),
          ),
        ),
      );
    };

type TSelectedCallPayload = TGetInfoCallPayload & {
  bankId: string;
}

type TPollingConfig<Info = TExplicitAny> = {
  selectedCall: TCall<TSelectedCallPayload, null>;
  shouldRequestAccountInfo: boolean | TSelector<TPlatformAppState, boolean, [bankId: string]>;

  getInfoCall: TCall<TGetInfoCallPayload, TNullable<Info>>;
}

const BANK_TR_HAVALE_POLLING_CONFIG: TPollingConfig<TCallResponsePayload<typeof call_FixFinFindTrHavaleEftGetBankAccountInfoQuery>> = {
  shouldRequestAccountInfo: depositFixFinFiatWithBankShouldRequestAccountInfoSelector,
  selectedCall: call_FixFinTrHavaleEftDepositMethodSelectedCommand,
  getInfoCall: call_FixFinFindTrHavaleEftGetBankAccountInfoQuery,
};

const BANK_SYS_POLLING_CONFIG: TPollingConfig<TCallResponsePayload<typeof call_FixFinFindBanksysBankAccountDetailsQuery>> = {
  shouldRequestAccountInfo: depositFixFinFiatWithBankShouldRequestAccountInfoSelector,
  selectedCall: call_FixFinBanksysSelectBankCommand,
  getInfoCall: call_FixFinFindBanksysBankAccountDetailsQuery,
};

const PAYMENT_METHOD_TO_POLLING_CONFIG_MAP: Partial<Record<TPaymentMethodId, TPollingConfig>> = {
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_TR_HAVALE_EFT]: BANK_TR_HAVALE_POLLING_CONFIG,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_FIN2]: BANK_SYS_POLLING_CONFIG,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_SERIPAY1]: BANK_SYS_POLLING_CONFIG,
};

const fixFinDepositBankSelectedEpic: TPlatformEpic = (action$, state$, deps) => action$.pipe(
  isCreator(depositFixFinBankSelectedAction),
  switchMap(({ payload: { bankId } }) => {
    const httpApi = deps.platformHttpApi;
    const paymentMethodId = platformBankingDepositPaymentMethodNonNullableSelector(state$.value);

    const config = getNotNil(
      PAYMENT_METHOD_TO_POLLING_CONFIG_MAP[paymentMethodId],
      ["fixFinDepositBankSelectedEpic", "config"],
      paymentMethodId,
    );

    const {
      selectedCall,
      shouldRequestAccountInfo,
      getInfoCall,
    } = config;

    const transactionRequestId = depositFixFinFiatWithBanksFormResponseSelectors.requestId(state$.value);

    const payload = { bankId, transactionRequestId };

    return merge(
      of(callManagerStartAction(DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL)),
      from(httpApi._callToPlatform(selectedCall, payload)).pipe(
        switchMap(() => {
          const shouldGetInfo = isFunction(shouldRequestAccountInfo)
            ? shouldRequestAccountInfo(state$.value, bankId)
            : shouldRequestAccountInfo;

          if (shouldGetInfo) {
            return pollingBankAccountInfo(getInfoCall, payload)(action$, state$, deps);
          }

          return of(callManagerSucceededAction(DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL));
        }),
        catchError((error) => {
          Logger.warn.epic("[fixFinDepositBankSelectedEpic => selectedCall]", error);

          return of(callManagerFailedAction(DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL, error));
        }),
      ),
    );
  }),
);

export { fixFinDepositBankSelectedEpic };
