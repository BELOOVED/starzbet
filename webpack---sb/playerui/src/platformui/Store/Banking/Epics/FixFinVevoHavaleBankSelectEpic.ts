import { from, merge, of, switchMap } from "rxjs";
import { catchError } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { call_FixFinVevoHavaleMakeFiatDepositCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { Logger } from "../../../../common/Utils/Logger";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { bankingFormReceiveResponseAction, fixFinVevoHavaleBankAccountSelectAction } from "../BankingActions";
import { DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL } from "../Utils/Variables";
import { depositSimpleCallPayloadSelector } from "../Form/DepositFormSelectors";

const fixFinVevoHavaleBankSelectEpic: TPlatformEpic = (action$, state$, deps) =>
  action$.pipe(
    isCreator(fixFinVevoHavaleBankAccountSelectAction),
    switchMap(({ payload: { bankAccountId } }) => {
      const httpApi = deps.platformHttpApi;
      const formState = depositSimpleCallPayloadSelector(state$.value);

      const payload = {
        ...formState,
        bankId: bankAccountId,
      };

      return merge(
        of(callManagerStartAction(DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL)),
        from(httpApi._callToPlatform(call_FixFinVevoHavaleMakeFiatDepositCommand, payload)).pipe(
          switchMap((value) => of(
            bankingFormReceiveResponseAction(value),
            callManagerSucceededAction(DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL),
          )),
          catchError((error) => {
            Logger.warn.epic("[fixFinVevoHavaleBankSelectEpic => call_FixFinVevoHavaleMakeFiatDepositCommand]", error);

            return of(callManagerFailedAction(DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL, error));
          }),
        ),
      );
    }),
  );

export { fixFinVevoHavaleBankSelectEpic };
